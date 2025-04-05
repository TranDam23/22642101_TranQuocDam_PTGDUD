import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../CSS/ChartPanel.css";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3002", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

function ChatPanel({ type, selectedChat, onMessageSent }) {
  const [messages, setMessages] = useState(selectedChat?.messages || []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageIds, setMessageIds] = useState(new Set());
  const chatName = selectedChat?.name || (type === "client" ? "Khách hàng" : "Guide");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("Selected chat in ChatPanel:", JSON.stringify(selectedChat, null, 2));
    if (selectedChat && Array.isArray(selectedChat.messages)) {
      const newMessages = selectedChat.messages.map((msg) => {
        const timestamp = new Date(msg.timestamp);
        const messageId = `${msg.sender}-${msg.text}-${msg.timestamp}`;
        setMessageIds((prev) => new Set(prev).add(messageId));
        return {
          sender: msg.sender,
          text: msg.text || "[Tin nhắn trống]",
          timestamp,
          messageId,
        };
      });
      setMessages(newMessages);
    } else {
      setMessages([]);
    }

    if (selectedChat?.chatID) {
      const room = selectedChat.chatID.toString();
      socket.emit("joinChat", room);
      console.log(`ChatPanel joined chat: ${room}`);
    }

    const handleConnect = () => {
      console.log("ChatPanel connected to Socket.IO server:", socket.id);
      if (selectedChat?.chatID) {
        const room = selectedChat.chatID.toString();
        socket.emit("joinChat", room);
        console.log(`ChatPanel rejoined chat on connect: ${room}`);
      }
    };

    const handleDisconnect = (reason) => {
      console.log("ChatPanel disconnected from Socket.IO server:", reason);
    };

    const handleNewMessage = (message) => {
      console.log("Received new message in ChatPanel:", JSON.stringify(message, null, 2));
      const timestamp = new Date(message.timestamp);
      const messageId = `${message.sender}-${message.text}-${message.timestamp}`;
    
      // Skip if the message was sent by the current user (sender)
      if (message.sender === "guide") {
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
          timestamp,
          messageId,
        },
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
    };
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const tempMessageId = `guide-${input}-${Date.now()}`;
    const newMessage = {
      sender: "guide",
      text: input,
      timestamp: new Date(),
      messageId: tempMessageId,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageIds((prev) => new Set(prev).add(tempMessageId));
    setIsLoading(true);
    setInput("");

    try {
      const response = await axios.post("http://localhost:3002/send-message", {
        cusID: selectedChat?.cusID,
        message: input,
      });
      console.log("Send message response from ChatPanel:", JSON.stringify(response.data, null, 2));

      if (onMessageSent) {
        onMessageSent();
      }

      setIsLoading(false);
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
          timestamp: new Date(),
          messageId: `guide-error-${Date.now()}`,
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>
          Chat với <span className="chat-name">{chatName}</span>
        </h3>
      </div>
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.messageId} className={`chat-message ${msg.sender}`}>
              <div className="message-content">
                <p className="chat-text">{msg.text || "[Tin nhắn trống]"}</p>
                <span className="message-time">
                  {msg.timestamp instanceof Date && !isNaN(msg.timestamp)
                    ? msg.timestamp.toLocaleString()
                    : "Invalid Date"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-messages">Chưa có tin nhắn nào.</p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn của bạn..."
          className="chat-textarea"
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
        />
        <Button className={`send-btn ${isLoading ? "loading" : ""}`} onClick={handleSend} disabled={isLoading}>
          Gửi
        </Button>
      </div>
    </div>
  );
}

export default ChatPanel;


// import React, { useState, useRef, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import '../CSS/ChartPanel.css';
// import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3002', {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 1000,
// });

// function ChatPanel({ type, selectedChat, onMessageSent }) {
//   const [messages, setMessages] = useState(selectedChat?.messages || []);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [messageIds, setMessageIds] = useState(new Set()); // Theo dõi các tin nhắn đã được thêm
//   const chatName = selectedChat?.name || (type === 'client' ? 'Khách hàng' : 'Guide');
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     console.log('Selected chat in ChatPanel:', JSON.stringify(selectedChat, null, 2));
//     if (selectedChat && Array.isArray(selectedChat.messages)) {
//       const newMessages = selectedChat.messages.map((msg, index) => {
//         console.log('Processing message in ChatPanel:', msg);
//         const timestamp = msg.timestamp ? new Date(msg.timestamp) : new Date();
//         const messageId = `${msg.sender}-${msg.text}-${msg.timestamp}`; // Tạo ID duy nhất cho tin nhắn
//         setMessageIds((prev) => new Set(prev).add(messageId));
//         return {
//           sender: msg.sender,
//           text: msg.text || "[Tin nhắn trống]",
//           timestamp: isNaN(timestamp) ? new Date() : timestamp,
//           messageId,
//         };
//       });
//       setMessages(newMessages);
//     } else {
//       setMessages([]);
//     }

//     if (selectedChat?.chatID) {
//       const room = selectedChat.chatID.toString();
//       socket.emit('joinChat', room);
//       console.log(`ChatPanel joined chat: ${room}`);
//     }

//     const handleConnect = () => {
//       console.log('ChatPanel connected to Socket.IO server:', socket.id);
//       if (selectedChat?.chatID) {
//         const room = selectedChat.chatID.toString();
//         socket.emit('joinChat', room);
//         console.log(`ChatPanel rejoined chat on connect: ${room}`);
//       }
//     };

//     const handleDisconnect = (reason) => {
//       console.log('ChatPanel disconnected from Socket.IO server:', reason);
//     };

//     const handleNewMessage = (message) => {
//       console.log('Received new message in ChatPanel:', JSON.stringify(message, null, 2));
//       const timestamp = message.timestamp ? new Date(message.timestamp) : new Date();
//       const messageId = `${message.sender}-${message.text}-${message.timestamp || Date.now()}`; // Đảm bảo timestamp không rỗng
    
//       if (messageIds.has(messageId)) {
//         console.log('Duplicate message detected (already in messages), skipping:', message);
//         return;
//       }
    
//       setMessageIds((prev) => new Set(prev).add(messageId));
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           sender: message.sender,
//           text: message.text || "[Tin nhắn trống]",
//           timestamp: isNaN(timestamp) ? new Date() : timestamp,
//           messageId,
//         },
//       ]);
//     };

//     // const handleNewMessage = (message) => {
//     //   console.log('Received new message in ChatPanel:', JSON.stringify(message, null, 2));
//     //   const timestamp = message.timestamp ? new Date(message.timestamp) : new Date();
//     //   const messageId = `${message.sender}-${message.text}-${message.timestamp}`; // Tạo ID duy nhất cho tin nhắn

//     //   // Kiểm tra xem tin nhắn đã được thêm chưa
//     //   if (messageIds.has(messageId)) {
//     //     console.log('Duplicate message detected (already in messages), skipping:', message);
//     //     return;
//     //   }

//     //   setMessageIds((prev) => new Set(prev).add(messageId));
//     //   setMessages((prevMessages) => [
//     //     ...prevMessages,
//     //     {
//     //       sender: message.sender,
//     //       text: message.text || "[Tin nhắn trống]",
//     //       timestamp: isNaN(timestamp) ? new Date() : timestamp,
//     //       messageId,
//     //     },
//     //   ]);
//     // };

//     socket.on('connect', handleConnect);
//     socket.on('disconnect', handleDisconnect);
//     socket.on('newMessage', handleNewMessage);

//     return () => {
//       socket.off('connect', handleConnect);
//       socket.off('disconnect', handleDisconnect);
//       socket.off('newMessage', handleNewMessage);
//     };
//   }, [selectedChat]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // const handleSend = async () => {
//   //   if (input.trim() === '') return;

//   //   setIsLoading(true);
//   //   setInput(''); // Xóa input ngay lập tức

//   //   try {
//   //     const response = await axios.post('http://localhost:3002/send-message', {
//   //       cusID: selectedChat?.cusID,
//   //       message: input,
//   //     });
//   //     console.log('Send message response from ChatPanel:', JSON.stringify(response.data, null, 2));

//   //     if (onMessageSent) {
//   //       onMessageSent();
//   //     }

//   //     setIsLoading(false);
//   //   } catch (error) {
//   //     console.error('Error sending message:', error);
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleSend = async () => {
//     if (input.trim() === '') return;
  
//     const newMessage = {
//       sender: "guide",
//       text: input,
//       timestamp: new Date(),
//       messageId: `guide-${input}-${Date.now()}`, // Tạo messageId tạm thời
//     };
  
//     // Thêm tin nhắn vào state ngay lập tức
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setMessageIds((prev) => new Set(prev).add(newMessage.messageId));
//     setIsLoading(true);
//     setInput(''); // Xóa input ngay lập tức
  
//     try {
//       const response = await axios.post('http://localhost:3002/send-message', {
//         cusID: selectedChat?.cusID,
//         message: input,
//       });
//       console.log('Send message response from ChatPanel:', JSON.stringify(response.data, null, 2));
  
//       if (onMessageSent) {
//         onMessageSent();
//       }
  
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="chat-panel">
//       <div className="chat-header">
//         <h3>
//           Chat với <span className="chat-name">{chatName}</span>
//         </h3>
//       </div>
//       <div className="chat-messages">
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div key={msg.messageId || index} className={`chat-message ${msg.sender}`}>
//               <div className="message-content">
//                 <p className="chat-text">{msg.text || "[Tin nhắn trống]"}</p>
//                 <span className="message-time">
//                   {msg.timestamp instanceof Date && !isNaN(msg.timestamp)
//                     ? msg.timestamp.toLocaleString()
//                     : "Invalid Date"}
//                 </span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-messages">Chưa có tin nhắn nào.</p>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="chat-input">
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Nhập tin nhắn của bạn..."
//           className="chat-textarea"
//           onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
//         />
//         <Button className={`send-btn ${isLoading ? 'loading' : ''}`} onClick={handleSend} disabled={isLoading}>
//           Gửi
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ChatPanel;