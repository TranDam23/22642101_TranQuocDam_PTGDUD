import express from "express";
import cors from "cors";
import { createServer } from "http";
import { CONNECT_DB } from "./mongodb.js";

// Import các router
import authRoutes from "./routers/authRoutes.js";
import listTourRoutes from "./routers/listTourRoutes.js";
import {
  router as chatRouter,
  initializeSocket,
} from "./routers/chatRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import customerRoutes from "./routers/customerRoutes.js";
import bookingRoutes from "./routers/bookingRoutes.js";

const app = express();
const httpServer = createServer(app);

// Khởi tạo Socket.IO từ chatRoutes
const io = initializeSocket(httpServer);

// Cấu hình CORS
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://192.168.33.1:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware để parse JSON
app.use(express.json());

// Middleware để truyền io vào req
app.use((req, res, next) => {
  req.io = io; // Đồng bộ với tên biến trong chatRoutes.js
  next();
});

// Sử dụng các router
app.use("/", authRoutes);
app.use("/", listTourRoutes);
app.use("/", chatRouter);
app.use("/", userRoutes);
app.use("/", customerRoutes);
app.use("/", bookingRoutes);

// Khởi chạy server
const startServer = async () => {
  try {
    await CONNECT_DB();
    httpServer.listen(3002, () => {
      console.log("🚀 Server running on port 3002 with Socket.IO");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();

// import express from "express";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import { CONNECT_DB } from "./mongodb.js";

// // Import các router
// import authRoutes from "./routers/authRoutes.js";
// import listTourRoutes from "./routers/listTourRoutes.js";
// import chatRoutes from "./routers/chatRoutes.js";
// import userRoutes from "./routers/userRoutes.js";
// import customerRoutes from "./routers/customerRoutes.js";
// import bookingRoutes from "./routers/bookingRoutes.js";

// const app = express();
// const httpServer = createServer(app);

// // Cấu hình CORS
// const allowedOrigins = [
//   "http://localhost:5174",
//   "http://localhost:5173",
//   "http://192.168.33.1:5173",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(cors()); // Đặt CORS ngay sau khi tạo `app`
// app.use(express.json());

// // Sau đó mới định nghĩa các route
// app.use("/", authRoutes);
// app.use("/", listTourRoutes);
// app.use("/", chatRoutes);
// app.use("/", userRoutes);
// app.use("/", customerRoutes);
// app.use("/", bookingRoutes);

// // **Cấu hình Socket.IO**
// const io = new Server(httpServer, {
//   cors: {
//     origin: [
//       "http://localhost:5174",
//       "http://localhost:5173",
//       "http://192.168.33.1:5173",
//     ],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // Cho phép gửi cookies & thông tin xác thực
//   },
// });

// // **Lắng nghe sự kiện kết nối**
// io.on("connection", (socket) => {
//   console.log(`⚡ Client connected: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log(`⚡ Client disconnected: ${socket.id}`);
//   });
// });

// // **Khởi chạy server**
// const startServer = async () => {
//   try {
//     await CONNECT_DB();
//     httpServer.listen(3002, () => {
//       console.log("🚀 Server running on port 3002 with Socket.IO");
//     });
//   } catch (error) {
//     console.error("❌ Failed to start server:", error);
//   }
// };

// startServer();
