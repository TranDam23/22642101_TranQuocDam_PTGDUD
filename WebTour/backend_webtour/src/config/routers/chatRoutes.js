import express from "express";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { Server } from "socket.io";
import Contact from "../models/Contact.js";
import { createServer } from "http";

const router = express.Router();

// Hàm để khởi tạo Socket.IO với server từ file chính
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinChat", (chatId) => {
      const room = chatId.toString();
      socket.join(room);
      console.log(`User ${socket.id} joined chat: ${room}`);
      // Log danh sách client trong room để debug
      const clientsInRoom = io.sockets.adapter.rooms.get(room);
      console.log(
        `Clients in room ${room}:`,
        clientsInRoom ? Array.from(clientsInRoom) : "No clients"
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

// Route để gửi tin nhắn
router.post("/send-message", async (req, res) => {
  try {
    const { userId, message, cusID } = req.body;
    console.log("Received /send-message request:", { userId, message, cusID });

    if (!message) {
      console.log("Missing message in request");
      return res.status(400).json({ message: "Thiếu message" });
    }

    let chatCusID, name, avatar;

    if (cusID) {
      chatCusID = parseInt(cusID);
    } else if (userId) {
      const user = await User.findOne({ phoneNumber: userId });
      if (user) {
        chatCusID = user.userID;
        name = user.username;
        avatar = "/imgs/user-avatar.jpg";
      }
    }

    if (!chatCusID) {
      const lastChat = await Chat.findOne().sort({ cusID: -1 });
      chatCusID = lastChat ? lastChat.cusID + 1 : 1000;
      name = "Khách ẩn danh";
      avatar = "/imgs/anonymous-avatar.jpg";
    }

    let chat = await Chat.findOne({ cusID: chatCusID });
    const serverTimestamp = new Date();
    const newMessage = {
      sender: cusID ? "guide" : "customer",
      text: message,
      timestamp: serverTimestamp,
    };

    if (chat) {
      chat.messages.push(newMessage);
      await chat.save();
      console.log(
        `Saved chat with new message: ${JSON.stringify(chat, null, 2)}`
      );
    } else {
      chat = new Chat({
        chatID: (await Chat.countDocuments()) + 1,
        cusID: chatCusID,
        guideID: 4,
        starred: false,
        messages: [
          {
            sender: "guide",
            text: "Xin chào! Quý khách cần hỗ trợ?",
            timestamp: serverTimestamp,
          },
          newMessage,
        ],
      });
      await chat.save();
      console.log(`Created new chat: ${JSON.stringify(chat, null, 2)}`);
    }

    const room = chat.chatID.toString();
    console.log(`Emitting new message to room ${room}:`, newMessage);
    req.io.to(room).emit("newMessage", {
      sender: newMessage.sender,
      text: newMessage.text,
      timestamp: newMessage.timestamp.toISOString(),
    });

    res.json({
      message: "Tin nhắn đã được gửi",
      chatId: chat.chatID,
      chat: {
        ...chat._doc,
        name: name || "Khách ẩn danh",
        avatar: avatar || "/imgs/anonymous-avatar.jpg",
      },
    });
  } catch (error) {
    console.error("Error in /send-message:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Route để lấy danh sách tin nhắn
router.get("/get-messages", async (req, res) => {
  try {
    const chats = await Chat.find().sort({ "messages.timestamp": -1 });
    const chatsWithUserInfo = await Promise.all(
      chats.map(async (chat) => {
        const user = await User.findOne({ userID: chat.cusID });
        return {
          ...chat._doc,
          name: user ? user.username : "Khách ẩn danh",
          avatar: user ? "/imgs/user-avatar.jpg" : "/imgs/anonymous-avatar.jpg",
        };
      })
    );
    console.log(
      "Sending chats in /get-messages:",
      JSON.stringify(chatsWithUserInfo, null, 2)
    );
    res.json(chatsWithUserInfo);
  } catch (error) {
    console.error("Error in /get-messages:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Route để đánh dấu/ bỏ đánh dấu chat
router.post("/toggle-star", async (req, res) => {
  try {
    const { chatID } = req.body;
    const chat = await Chat.findOne({ chatID });
    if (!chat) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy cuộc trò chuyện" });
    }
    chat.starred = !chat.starred;
    await chat.save();
    const user = await User.findOne({ userID: chat.cusID });
    res.json({
      message: "Đã cập nhật trạng thái đánh dấu",
      chat: {
        ...chat._doc,
        name: user ? user.username : "Khách ẩn danh",
        avatar: user ? "/imgs/user-avatar.jpg" : "/imgs/anonymous-avatar.jpg",
      },
    });
  } catch (error) {
    console.error("Error in /toggle-star:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Route để tạo mới một Contact
router.post("/contact", async (req, res) => {
  try {
    const { type, userID, name, email, phone, title, message } = req.body;

    if (!type || !userID || !name || !email || !phone || !title || !message) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin." });
    }

    const newContact = new Contact({
      type,
      userID,
      name,
      email,
      phone,
      title,
      message,
    });

    await newContact.save();

    res
      .status(201)
      .json({ message: "Gửi liên hệ thành công!", contact: newContact });
  } catch (error) {
    console.error("Lỗi khi gửi liên hệ:", error);
    res.status(500).json({ message: "Lỗi server. Vui lòng thử lại!" });
  }
});

// Route để lấy danh sách liên hệ
router.get("/get-contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export { router, initializeSocket };

// import express from "express";
// import Chat from "../models/Chat.js";
// import User from "../models/User.js";
// import { Server } from "socket.io";
// import Contact from "../models/Contact.js";
// import { CONNECT_DB } from "../mongodb.js";
// import { createServer } from "http";
// const router = express.Router();
// const httpServer = createServer(router);
// const io = new Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("joinChat", (chatId) => {
//     const room = chatId.toString();
//     socket.join(room);
//     console.log(`User ${socket.id} joined chat: ${room}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // router.post("/send-message", async (req, res) => {
// //   try {
// //     const { userId, message, cusID } = req.body;

// //     if (!message) {
// //       return res.status(400).json({ message: "Thiếu message" });
// //     }

// //     let chatCusID, name, avatar;

// //     if (cusID) {
// //       chatCusID = parseInt(cusID);
// //     } else if (userId) {
// //       const user = await User.findOne({ phoneNumber: userId });
// //       if (user) {
// //         chatCusID = user.userID;
// //         name = user.username;
// //         avatar = "/imgs/user-avatar.jpg";
// //       }
// //     }

// //     if (!chatCusID) {
// //       const lastChat = await Chat.findOne().sort({ cusID: -1 });
// //       chatCusID = lastChat ? lastChat.cusID + 1 : 1000;
// //       name = "Khách ẩn danh";
// //       avatar = "/imgs/anonymous-avatar.jpg";
// //     }

// //     let chat = await Chat.findOne({ cusID: chatCusID });
// //     const newMessage = {
// //       sender: cusID ? "guide" : "customer",
// //       text: message,
// //       timestamp: new Date(),
// //     };

// //     if (chat) {
// //       chat.messages.push(newMessage);
// //       await chat.save();
// //     } else {
// //       chat = new Chat({
// //         chatID: (await Chat.countDocuments()) + 1,
// //         cusID: chatCusID,
// //         guideID: 4,
// //         starred: false,
// //         messages: [
// //           {
// //             sender: "guide",
// //             text: "Xin chào! Quý khách cần hỗ trợ?",
// //             timestamp: new Date(),
// //           },
// //           newMessage,
// //         ],
// //       });
// //       await chat.save();
// //     }

// //     const room = chat.chatID.toString();
// //     const clientsInRoom = io.sockets.adapter.rooms.get(room);
// //     console.log(
// //       `Clients in chat ${room}:`,
// //       clientsInRoom ? Array.from(clientsInRoom) : "No clients"
// //     );

// //     console.log(`Sending new message to chat ${room}:`, newMessage);
// //     io.to(room).emit("newMessage", {
// //       sender: newMessage.sender,
// //       text: newMessage.text,
// //       timestamp: newMessage.timestamp.toISOString(),
// //     });

// //     res.json({
// //       message: "Tin nhắn đã được gửi",
// //       chat: {
// //         ...chat._doc,
// //         name: name || "Khách ẩn danh",
// //         avatar: avatar || "/imgs/anonymous-avatar.jpg",
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Error in /send-message:", error);
// //     res.status(500).json({ message: "Lỗi server", error });
// //   }
// // });
// router.post("/send-message", async (req, res) => {
//   try {
//     const { userId, message, cusID } = req.body;

//     if (!message) {
//       return res.status(400).json({ message: "Thiếu message" });
//     }

//     let chatCusID, name, avatar;

//     if (cusID) {
//       chatCusID = parseInt(cusID);
//     } else if (userId) {
//       const user = await User.findOne({ phoneNumber: userId });
//       if (user) {
//         chatCusID = user.userID;
//         name = user.username;
//         avatar = "/imgs/user-avatar.jpg";
//       }
//     }

//     if (!chatCusID) {
//       const lastChat = await Chat.findOne().sort({ cusID: -1 });
//       chatCusID = lastChat ? lastChat.cusID + 1 : 1000;
//       name = "Khách ẩn danh";
//       avatar = "/imgs/anonymous-avatar.jpg";
//     }

//     let chat = await Chat.findOne({ cusID: chatCusID });
//     const serverTimestamp = new Date(); // Sử dụng thời gian từ server
//     const newMessage = {
//       sender: cusID ? "guide" : "customer",
//       text: message,
//       timestamp: serverTimestamp,
//     };

//     if (chat) {
//       chat.messages.push(newMessage);
//       await chat.save();
//     } else {
//       chat = new Chat({
//         chatID: (await Chat.countDocuments()) + 1,
//         cusID: chatCusID,
//         guideID: 4,
//         starred: false,
//         messages: [
//           {
//             sender: "guide",
//             text: "Xin chào! Quý khách cần hỗ trợ?",
//             timestamp: serverTimestamp,
//           },
//           newMessage,
//         ],
//       });
//       await chat.save();
//     }

//     const room = chat.chatID.toString();
//     console.log(`Emitting new message to room ${room}:`, newMessage);
//     io.to(room).emit("newMessage", {
//       sender: newMessage.sender,
//       text: newMessage.text,
//       timestamp: newMessage.timestamp.toISOString(),
//     });

//     res.json({
//       message: "Tin nhắn đã được gửi",
//       chatId: chat.chatID,
//       chat: {
//         ...chat._doc,
//         name: name || "Khách ẩn danh",
//         avatar: avatar || "/imgs/anonymous-avatar.jpg",
//       },
//     });
//   } catch (error) {
//     console.error("Error in /send-message:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// });

// router.get("/get-messages", async (req, res) => {
//   try {
//     const chats = await Chat.find().sort({ "messages.timestamp": -1 });
//     const chatsWithUserInfo = await Promise.all(
//       chats.map(async (chat) => {
//         const user = await User.findOne({ userID: chat.cusID });
//         return {
//           ...chat._doc,
//           name: user ? user.username : "Khách ẩn danh",
//           avatar: user ? "/imgs/user-avatar.jpg" : "/imgs/anonymous-avatar.jpg",
//         };
//       })
//     );
//     console.log(
//       "Sending chats in /get-messages:",
//       JSON.stringify(chatsWithUserInfo, null, 2)
//     );
//     res.json(chatsWithUserInfo);
//   } catch (error) {
//     console.error("Error in /get-messages:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// });

// router.post("/toggle-star", async (req, res) => {
//   try {
//     const { chatID } = req.body;
//     const chat = await Chat.findOne({ chatID });
//     if (!chat) {
//       return res
//         .status(404)
//         .json({ message: "Không tìm thấy cuộc trò chuyện" });
//     }
//     chat.starred = !chat.starred;
//     await chat.save();
//     const user = await User.findOne({ userID: chat.cusID });
//     res.json({
//       message: "Đã cập nhật trạng thái đánh dấu",
//       chat: {
//         ...chat._doc,
//         name: user ? user.username : "Khách ẩn danh",
//         avatar: user ? "/imgs/user-avatar.jpg" : "/imgs/anonymous-avatar.jpg",
//       },
//     });
//   } catch (error) {
//     console.error("Error in /toggle-star:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// });
// // API tạo mới một Contact
// router.post("/contact", async (req, res) => {
//   try {
//     const { type, userID, name, email, phone, title, message } = req.body;

//     // Kiểm tra dữ liệu đầu vào
//     if (!type || !userID || !name || !email || !phone || !title || !message) {
//       return res
//         .status(400)
//         .json({ message: "Vui lòng điền đầy đủ thông tin." });
//     }

//     // Tạo đối tượng Contact mới
//     const newContact = new Contact({
//       type,
//       userID,
//       name,
//       email,
//       phone,
//       title,
//       message,
//     });

//     // Lưu vào database
//     await newContact.save();

//     res
//       .status(201)
//       .json({ message: "Gửi liên hệ thành công!", contact: newContact });
//   } catch (error) {
//     console.error("Lỗi khi gửi liên hệ:", error);
//     res.status(500).json({ message: "Lỗi server. Vui lòng thử lại!" });
//   }
// });
// // get lien he
// router.get("/get-contact", async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json(contacts);
//   } catch (error) {
//     console.error("Error fetching contacts:", error);
//     res.status(500).json({ message: "Lỗi server" });
//   }
// });
// export default router;
