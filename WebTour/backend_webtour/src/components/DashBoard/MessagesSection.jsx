import { Button } from 'react-bootstrap';
import '../CSS/MessagesSection.css';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import io from 'socket.io-client';



const socket = io('http://localhost:3002');

function MessagesSection({ visible, onClose, onMessageSent, onSelectMessage }) {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isRecentFilter, setIsRecentFilter] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3002/get-messages');
      console.log('Fetched messages:', response.data);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.on('newMessage', () => {
      console.log('Received newMessage event in MessagesSection');
      fetchMessages(); // Cập nhật danh sách tin nhắn khi có tin nhắn mới
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  useEffect(() => {
    if (onMessageSent) {
      fetchMessages();
    }
  }, [onMessageSent]);

  const toggleStar = async (chatID) => {
    try {
      const response = await axios.post('http://localhost:3002/toggle-star', { chatID });
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.chatID === chatID ? { ...msg, starred: response.data.chat.starred } : msg
        )
      );
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return filter === 'starred' ? msg.starred : !msg.starred;
  });

  const filterRecentMessages = () => {
    const today = new Date();
    return filteredMessages.filter((msg) => {
      const lastMessage = msg.messages && msg.messages.length > 0 ? msg.messages[msg.messages.length - 1] : null;
      if (!lastMessage) return false;
      const msgDate = new Date(lastMessage.timestamp);
      return (
        msgDate.getDate() === today.getDate() &&
        msgDate.getMonth() === today.getMonth() &&
        msgDate.getFullYear() === today.getFullYear()
      );
    });
  };

  const displayedMessages = isRecentFilter ? filterRecentMessages() : filteredMessages;

  const handleMessageClick = (message) => {
    console.log('Message clicked:', message);
    if (message && message.messages) {
      onSelectMessage({ ...message });
    } else {
      console.error('Invalid message data:', message);
    }
  };

  return (
    <div className={`messages-section ${visible ? 'show' : ''}`}>
      <div className="messages-header">
        <p>Tin nhắn</p>
        <div>
          <button
            className="filter-btn"
            onClick={() => setFilter(filter === 'all' ? 'starred' : 'all')}
          >
            {filter === 'all' ? 'Đã đánh dấu' : 'Tất cả'}
          </button>
          <button
            className="filter-btn"
            onClick={() => setIsRecentFilter(true)}
          >
            Gần nhất
          </button>
          {isRecentFilter && (
            <button
              className="filter-btn"
              onClick={() => setIsRecentFilter(false)}
            >
              Hiển thị tất cả
            </button>
          )}
        </div>
      </div>
      <div className="messages">
        {displayedMessages.length > 0 ? (
          displayedMessages.map((msg, index) => (
            <div
              key={index}
              className="message-box"
              onClick={() => handleMessageClick(msg)}
            >
              <img src={msg.avatar || '../img/anh1.jpgg'} alt="avatar" />
              <div className="message-content">
                <div className="message-header">
                  <p className="name">{msg.name || 'Khách hàng'}</p>
                  <div className="star-checkbox">
                    <input
                      type="checkbox"
                      id={`star-${index}`}
                      checked={msg.starred || false}
                      onChange={() => toggleStar(msg.chatID)}
                    />
                    <label htmlFor={`star-${index}`}>
                      <FaStar />
                    </label>
                  </div>
                </div>
                <p className="message-line">
                  {msg.messages && msg.messages.length > 0
                    ? msg.messages[msg.messages.length - 1].text
                    : 'Không có tin nhắn'}
                </p>
                <p className="message-line time">
                  {msg.messages && msg.messages.length > 0
                    ? new Date(msg.messages[msg.messages.length - 1].timestamp).toLocaleString()
                    : ''}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-messages">Không có tin nhắn nào.</p>
        )}
      </div>
    </div>
  );
}

export default MessagesSection;