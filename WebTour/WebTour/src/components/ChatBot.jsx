import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaTimes, FaSmile, FaPaperclip } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";
import "../App.css";
import anh from "../img/anh1.jpg";

const socket = io("http://localhost:3002", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

const Chatbot = ({ show, handleClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [cusId, setCusId] = useState(null);
  const [messageIds, setMessageIds] = useState(new Set());

  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user ? user.phoneNumber : null;

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3002/get-messages");
      const chats = response.data || [];
      console.log("Fetched chats in Chatbot:", JSON.stringify(chats, null, 2));

      let chatCusID = 1;
      if (userId) {
        const userResponse = await axios.get(`http://localhost:3002/home?phoneNumber=${userId}`);
        const fetchedUser = userResponse.data.user;
        console.log("Fetched user in Chatbot:", fetchedUser);
        chatCusID = fetchedUser ? fetchedUser.userID : 1;
        setCusId(chatCusID);
      } else {
        console.log("No user logged in, using default chatCusID:", chatCusID);
      }

      const chat = chats.find((c) => c.cusID === chatCusID);
      if (chat) {
        setChatId(chat.chatID);
        const newMessages = chat.messages.map((msg) => {
          const timestamp = new Date(msg.timestamp);
          const messageId = `${msg.sender}-${msg.text}-${msg.timestamp}`;
          setMessageIds((prev) => new Set(prev).add(messageId));
          return {
            sender: msg.sender,
            text: msg.text || "[Tin nhắn trống]",
            avatar: msg.sender === "guide" ? "/imgs/bot-avatar.jpg" : anh,
            timestamp,
            messageId,
          };
        });
        setMessages(newMessages);
      } else {
        const defaultMessage = {
          sender: "guide",
          text: "Xin chào! Quý khách cần hỗ trợ?",
          avatar: "/imgs/bot-avatar.jpg",
          timestamp: new Date(),
          messageId: `guide-Xin chào! Quý khách cần hỗ trợ?-default`,
        };
        setMessageIds((prev) => new Set(prev).add(defaultMessage.messageId));
        setMessages([defaultMessage]);
      }
    } catch (error) {
      console.error("Error fetching messages in Chatbot:", error);
      const defaultMessage = {
        sender: "guide",
        text: "Xin chào! Quý khách cần hỗ trợ?",
        avatar: "/imgs/bot-avatar.jpg",
        timestamp: new Date(),
        messageId: `guide-Xin chào! Quý khách cần hỗ trợ?-default`,
      };
      setMessageIds((prev) => new Set(prev).add(defaultMessage.messageId));
      setMessages([defaultMessage]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []); // Chỉ gọi fetchMessages một lần khi component mount

  useEffect(() => {
    const handleConnect = () => {
      console.log("Chatbot connected to Socket.IO server:", socket.id);
      if (chatId) {
        const room = chatId.toString();
        socket.emit("joinChat", room);
        console.log(`Chatbot joined chat on connect: ${room}`);
      }
    };

    const handleDisconnect = (reason) => {
      console.log("Chatbot disconnected from Socket.IO server:", reason);
    };

    const handleNewMessage = (message) => {
      console.log("Received new message in Chatbot:", JSON.stringify(message, null, 2));
      const timestamp = new Date(message.timestamp);
      const messageId = `${message.sender}-${message.text}-${message.timestamp}`;
    
      // Skip if the message was sent by the current user (sender)
      if (message.sender === "customer") {
        console.log("Message sent by this user, skipping:", message);
        return;
      }
    
      if (messageIds.has(messageId)) {
        console.log("Duplicate message detected, skipping:", message);
        return;
      }
    
      setMessageIds((prev) => new Set(prev).add(messageId));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: message.sender,
          text: message.text || "[Tin nhắn trống]",
          avatar: message.sender === "guide" ? "/imgs/bot-avatar.jpg" : anh,
          timestamp,
          messageId,
        },
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMessage", handleNewMessage);

    // Join room khi chatId thay đổi
    if (chatId) {
      const room = chatId.toString();
      socket.emit("joinChat", room);
      console.log(`Chatbot joined chat: ${room}`);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId]); // Thêm chatId vào dependency để join room khi chatId thay đổi

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const tempMessageId = `customer-${input}-${Date.now()}`;
    const newMessage = {
      sender: "customer",
      text: input,
      avatar: anh,
      timestamp: new Date(),
      messageId: tempMessageId,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageIds((prev) => new Set(prev).add(tempMessageId));
    setInput("");

    try {
      const response = await axios.post("http://localhost:3002/send-message", {
        userId,
        message: input,
      });
      console.log("Send message response:", JSON.stringify(response.data, null, 2));
      if (response.data.chatId && !chatId) {
        setChatId(response.data.chatId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.messageId !== tempMessageId));
      setMessageIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(tempMessageId);
        return newSet;
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "guide",
          text: "Có lỗi xảy ra, vui lòng thử lại!",
          avatar: "/imgs/bot-avatar.jpg",
          timestamp: new Date(),
          messageId: `guide-error-${Date.now()}`,
        },
      ]);
    }
  };

  return (
    show && (
      <div className="chatbot-container">
        <div className="chatbot-header">
          <span>Web Đặt Tour OXY Support</span>
          <FaTimes className="close-icon" onClick={handleClose} />
        </div>
        <div className="chatbot-body">
          {messages.map((msg) => (
            <div key={msg.messageId} className={`chat-message ${msg.sender}`}>
              {msg.sender === "guide" && <img src={msg.avatar} alt="Avatar" className="chat-avatar" />}
              <div className="message-content">
                <p className="chat-text">{msg.text || "[Tin nhắn trống]"}</p>
                <span className="message-time">
                  {msg.timestamp instanceof Date && !isNaN(msg.timestamp)
                    ? msg.timestamp.toLocaleString()
                    : "Invalid Date"}
                </span>
              </div>
              {msg.sender === "customer" && <img src={msg.avatar} alt="Avatar" className="chat-avatar" />}
            </div>
          ))}
        </div>
        <div className="chatbot-footer">
          <FaSmile className="chat-icon" />
          <FaPaperclip className="chat-icon" />
          <Form.Control
            type="text"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="primary" onClick={sendMessage}>
            <FaPaperPlane />
          </Button>
        </div>
      </div>
    )
  );
};

export default Chatbot;


// import React, { useState, useEffect } from "react";
// import { FaPaperPlane, FaTimes, FaSmile, FaPaperclip } from "react-icons/fa";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import io from "socket.io-client";
// import "../App.css";
// import anh from "../img/anh1.jpg";

// const socket = io("http://localhost:3002", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 1000,
// });

// const Chatbot = ({ show, handleClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [chatId, setChatId] = useState(null);
//   const [cusId, setCusId] = useState(null);
//   const [messageIds, setMessageIds] = useState(new Set());

//   // Lấy thông tin người dùng từ localStorage
//   const user = JSON.parse(localStorage.getItem("user")) || null;
//   const userId = user ? user.phoneNumber : null;

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get("http://localhost:3002/get-messages");
//       const chats = response.data || [];
//       console.log("Fetched chats in Chatbot:", JSON.stringify(chats, null, 2));

//       let chatCusID = 1;
//       if (userId) {
//         // Gọi API để lấy thông tin người dùng dựa trên phoneNumber
//         const userResponse = await axios.get(`http://localhost:3002/home?phoneNumber=${userId}`);
//         const fetchedUser = userResponse.data.user;
//         console.log("Fetched user in Chatbot:", fetchedUser);
//         chatCusID = fetchedUser ? fetchedUser.userID : 1;
//         setCusId(chatCusID);
//       } else {
//         console.log("No user logged in, using default chatCusID:", chatCusID);
//       }

//       const chat = chats.find((c) => c.cusID === chatCusID);
//       if (chat) {
//         setChatId(chat.chatID);
//         const newMessages = chat.messages.map((msg) => {
//           const timestamp = new Date(msg.timestamp);
//           const messageId = `${msg.sender}-${msg.text}-${msg.timestamp}`;
//           setMessageIds((prev) => new Set(prev).add(messageId));
//           return {
//             sender: msg.sender,
//             text: msg.text || "[Tin nhắn trống]",
//             avatar: msg.sender === "guide" ? "/imgs/bot-avatar.jpg" : anh,
//             timestamp,
//             messageId,
//           };
//         });
//         setMessages(newMessages);
//       } else {
//         const defaultMessage = {
//           sender: "guide",
//           text: "Xin chào! Quý khách cần hỗ trợ?",
//           avatar: "/imgs/bot-avatar.jpg",
//           timestamp: new Date(),
//           messageId: `guide-Xin chào! Quý khách cần hỗ trợ?-default`,
//         };
//         setMessageIds((prev) => new Set(prev).add(defaultMessage.messageId));
//         setMessages([defaultMessage]);
//       }
//     } catch (error) {
//       console.error("Error fetching messages in Chatbot:", error);
//       const defaultMessage = {
//         sender: "guide",
//         text: "Xin chào! Quý khách cần hỗ trợ?",
//         avatar: "/imgs/bot-avatar.jpg",
//         timestamp: new Date(),
//         messageId: `guide-Xin chào! Quý khách cần hỗ trợ?-default`,
//       };
//       setMessageIds((prev) => new Set(prev).add(defaultMessage.messageId));
//       setMessages([defaultMessage]);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();

//     const handleConnect = () => {
//       console.log("Chatbot connected to Socket.IO server:", socket.id);
//       if (chatId) {
//         const room = chatId.toString();
//         socket.emit("joinChat", room);
//         console.log(`Chatbot rejoined chat on connect: ${room}`);
//       }
//     };

//     const handleDisconnect = (reason) => {
//       console.log("Chatbot disconnected from Socket.IO server:", reason);
//     };

//     const handleNewMessage = (message) => {
//       console.log("Received new message in Chatbot:", JSON.stringify(message, null, 2));
//       const timestamp = new Date(message.timestamp);
//       const messageId = `${message.sender}-${message.text}-${message.timestamp}`;

//       if (messageIds.has(messageId)) {
//         console.log("Duplicate message detected, skipping:", message);
//         return;
//       }

//       setMessageIds((prev) => new Set(prev).add(messageId));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           sender: message.sender,
//           text: message.text || "[Tin nhắn trống]",
//           avatar: message.sender === "guide" ? "/imgs/bot-avatar.jpg" : anh,
//           timestamp,
//           messageId,
//         },
//       ]);
//     };

//     socket.on("connect", handleConnect);
//     socket.on("disconnect", handleDisconnect);
//     socket.on("newMessage", handleNewMessage);

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("disconnect", handleDisconnect);
//       socket.off("newMessage", handleNewMessage);
//     };
//   }, [chatId]);

//   const sendMessage = async () => {
//     if (input.trim() === "") return;

//     const tempMessageId = `customer-${input}-${Date.now()}`;
//     const newMessage = {
//       sender: "customer",
//       text: input,
//       avatar: anh,
//       timestamp: new Date(),
//       messageId: tempMessageId,
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessageIds((prev) => new Set(prev).add(tempMessageId));
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:3002/send-message", {
//         userId,
//         message: input,
//       });
//       console.log("Send message response:", JSON.stringify(response.data, null, 2));
//       if (response.data.chatId && !chatId) {
//         setChatId(response.data.chatId);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prevMessages) => prevMessages.filter((msg) => msg.messageId !== tempMessageId));
//       setMessageIds((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(tempMessageId);
//         return newSet;
//       });
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           sender: "guide",
//           text: "Có lỗi xảy ra, vui lòng thử lại!",
//           avatar: "/imgs/bot-avatar.jpg",
//           timestamp: new Date(),
//           messageId: `guide-error-${Date.now()}`,
//         },
//       ]);
//     }
//   };

//   return (
//     show && (
//       <div className="chatbot-container">
//         <div className="chatbot-header">
//           <span>Web Đặt Tour OXY Support</span>
//           <FaTimes className="close-icon" onClick={handleClose} />
//         </div>
//         <div className="chatbot-body">
//           {messages.map((msg) => (
//             <div key={msg.messageId} className={`chat-message ${msg.sender}`}>
//               {msg.sender === "guide" && <img src={msg.avatar} alt="Avatar" className="chat-avatar" />}
//               <div className="message-content">
//                 <p className="chat-text">{msg.text || "[Tin nhắn trống]"}</p>
//                 <span className="message-time">
//                   {msg.timestamp instanceof Date && !isNaN(msg.timestamp)
//                     ? msg.timestamp.toLocaleString()
//                     : "Invalid Date"}
//                 </span>
//               </div>
//               {msg.sender === "customer" && <img src={msg.avatar} alt="Avatar" className="chat-avatar" />}
//             </div>
//           ))}
//         </div>
//         <div className="chatbot-footer">
//           <FaSmile className="chat-icon" />
//           <FaPaperclip className="chat-icon" />
//           <Form.Control
//             type="text"
//             placeholder="Nhập tin nhắn..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <Button variant="primary" onClick={sendMessage}>
//             <FaPaperPlane />
//           </Button>
//         </div>
//       </div>
//     )
//   );
// };

// export default Chatbot;
