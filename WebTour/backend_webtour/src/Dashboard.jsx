import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/DashBoard/Header';
import Sidebar from './components/DashBoard/Sidebar';
import ChatPanel from './components/DashBoard/ChatPanel';
import TourSearch from './components/DashBoard/TourSearch';
import AddTourForm from './components/DashBoard/AddTourForm';
import EditTourForm from './components/DashBoard/EditTourForm';
import MessagesSection from './components/DashBoard/MessagesSection';
import CustomerManagement from './components/DashBoard/CustomerManagement';
import StaffManagement from './components/DashBoard/StaffManagement';
import RevenueStats from './components/DashBoard/RevenueStats';
import BookingStats from './components/DashBoard/BookingStats';
import './App.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('chat-client');
  const [editingTour, setEditingTour] = useState(null);
  const [messagesVisible, setMessagesVisible] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(9);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageSentTrigger, setMessageSentTrigger] = useState(0);
  const [tours, setTours] = useState([]);
  const [notification, setNotification] = useState(null);

  const messages = [
    {
      name: 'Stephanie',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      message: 'Tới đâu rồi được cập nhật tiền tui chưa...',
      time: '15, Tháng 03, Tháng 2025',
      starred: false,
      chatHistory: [
        { text: 'Tới đâu rồi được cập nhật tiền tui chưa...', sender: 'client' },
        { text: 'Chào bạn, mình đang kiểm tra, bạn chờ chút nhé!', sender: 'admin' },
      ],
    },
    {
      name: 'Mark',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      message: 'Này, bạn có thể cho tui biết tui đã được...',
      time: '14, Tháng 03, Tháng 2025',
      starred: true,
      chatHistory: [
        { text: 'Này, bạn có thể cho tui biết tui đã được...', sender: 'client' },
        { text: 'Chào Mark, mình sẽ kiểm tra ngay cho bạn!', sender: 'admin' },
      ],
    },
    {
      name: 'Admin John',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      message: 'Đã cập nhật tiền cho bạn, mọi thứ đang đi...',
      time: '16, Tháng 03, Tháng 2025',
      starred: false,
      chatHistory: [
        { text: 'Đã cập nhật tiền cho bạn, mọi thứ đang đi...', sender: 'admin' },
        { text: 'Cảm ơn bạn nhiều!', sender: 'client' },
      ],
    },
  ];

  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      address: '123 Street, City',
      SDT: '0987654321',
      email: 'nguyenvana@example.com',
      status: 'active',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      address: '456 Street, City',
      SDT: '0123456789',
      email: 'tranthib@example.com',
      status: 'active',
      role: 'guide',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      address: 'New York, New Town',
      SDT: '0123456789',
      email: 'sieunhangao@gmail.com',
      status: 'inactive',
      role: 'guide',
    },
  ]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:3002/get-tours');
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi lấy danh sách tour!' });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMessageSent = () => {
    setMessageSentTrigger((prev) => prev + 1);
  };

  const toggleMessages = () => {
    setMessagesVisible(!messagesVisible);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'edit-tour') {
      setActiveSection('tour-search');
    }
    if (section !== 'edit-tour') setEditingTour(null);

    if (section === 'chat-client' || section === 'chat-admin') {
      setMessagesVisible(true);
    } else {
      setMessagesVisible(false);
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedChat({
      name: message.name,
      chatHistory: message.chatHistory,
    });
    setActiveSection('chat-client');
    setMessagesVisible(false);
    console.log('Selected message in Dashboard:', message);
    setSelectedChat(message);
  };

  const handleAddTour = async (newTour) => {
    try {
      await fetchTours();
      setNotification({ type: 'success', message: 'Thêm tour thành công!' });
    } catch (error) {
      console.error('Error adding tour:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi thêm tour!' });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleEditTour = async (updatedTour) => {
    try {
      setTours(
        tours.map((tour) =>
          tour.tourID === updatedTour.tourID ? updatedTour : tour
        )
      );
      setEditingTour(null);
      setActiveSection('tour-search');
      setNotification({ type: 'success', message: 'Cập nhật tour thành công!' });
    } catch (error) {
      console.error('Error updating tour:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi cập nhật tour!' });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleEditStaff = (updatedStaff) => {
    setStaff(staff.map((staffMember) => (staffMember.id === updatedStaff.id ? updatedStaff : staffMember)));
  };

  const handleAddStaff = (newStaff) => {
    setStaff([...staff, newStaff]);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <Header
        toggleDarkMode={toggleDarkMode}
        unreadMessages={unreadMessages}
        toggleMessages={toggleMessages}
      />
      <div className="app-content">
        <Sidebar onSectionChange={handleSectionChange} />
        <div className="main-content">
          {activeSection === 'chat-client' && (
            <div className="chat-container">
              <ChatPanel type="client" selectedChat={selectedChat} onMessageSent={handleMessageSent} />
            </div>
          )}
          {activeSection === 'chat-admin' && (
            <div className="chat-container">
              <ChatPanel type="admin" />
            </div>
          )}
          {activeSection === 'tour-search' && (
            <div className="tour-container">
              <TourSearch
                tours={tours}
                onEditTour={handleEditTour}
                onSectionChange={handleSectionChange}
                setEditingTour={setEditingTour}
              />
            </div>
          )}
          {activeSection === 'add-tour' && (
            <div className="tour-container">
              <AddTourForm onAddTour={handleAddTour} />
            </div>
          )}
          {activeSection === 'edit-tour' && editingTour && (
            <div className="tour-container">
              <EditTourForm
                tour={editingTour}
                onEditTour={handleEditTour}
                onCancel={() => setActiveSection('tour-search')}
              />
            </div>
          )}
          {activeSection === 'customer' && (
            <div className="tour-container">
              <CustomerManagement />
            </div>
          )}
          {activeSection === 'staff-management' && (
            <div className="tour-container">
              <StaffManagement
                staff={staff}
                onEditStaff={handleEditStaff}
                onAddStaff={handleAddStaff}
              />
            </div>
          )}
          {activeSection === 'revenue-stats' && (
            <div className="stats-container">
              <RevenueStats />
            </div>
          )}
          {activeSection === 'booking-stats' && (
            <div className="stats-container">
              <BookingStats />
            </div>
          )}
        </div>
        <button className="messages-toggle-btn" onClick={toggleMessages}>
          {messagesVisible ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        <MessagesSection
          visible={messagesVisible}
          onClose={toggleMessages}
          messages={messages}
          onSelectMessage={handleSelectMessage}
        />
      </div>
    </div>
  );
};

export default Dashboard;



// import React, { useState } from 'react';
// import Header from './components/DashBoard/Header';
// import Sidebar from './components/DashBoard/Sidebar';
// import ChatPanel from './components/DashBoard/ChatPanel';
// import TourSearch from './components/DashBoard/TourSearch';
// import AddTourForm from './components/DashBoard/AddTourForm';
// import EditTourForm from './components/DashBoard/EditTourForm';
// import MessagesSection from './components/DashBoard/MessagesSection';
// import CustomerManagement from './components/DashBoard/CustomerManagement';
// import StaffManagement from './components/DashBoard/StaffManagement';
// import './App.css';
// import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

// const Dashboard = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeSection, setActiveSection] = useState('chat-client');
//   const [editingTour, setEditingTour] = useState(null);
//   const [messagesVisible, setMessagesVisible] = useState(true);
//   const [unreadMessages, setUnreadMessages] = useState(9);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messageSentTrigger, setMessageSentTrigger] = useState(0);

 

//   const messages = [
//     {
//       name: 'Stephanie',
//       avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
//       message: 'Tới đâu rồi được cập nhật tiền tui chưa...',
//       time: '15, Tháng 03, Tháng 2025',
//       starred: false,
//       chatHistory: [
//         { text: 'Tới đâu rồi được cập nhật tiền tui chưa...', sender: 'client' },
//         { text: 'Chào bạn, mình đang kiểm tra, bạn chờ chút nhé!', sender: 'admin' },
//       ],
//     },
//     {
//       name: 'Mark',
//       avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//       message: 'Này, bạn có thể cho tui biết tui đã được...',
//       time: '14, Tháng 03, Tháng 2025',
//       starred: true,
//       chatHistory: [
//         { text: 'Này, bạn có thể cho tui biết tui đã được...', sender: 'client' },
//         { text: 'Chào Mark, mình sẽ kiểm tra ngay cho bạn!', sender: 'admin' },
//       ],
//     },
//     {
//       name: 'Admin John',
//       avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
//       message: 'Đã cập nhật tiền cho bạn, mọi thứ đang đi...',
//       time: '16, Tháng 03, Tháng 2025',
//       starred: false,
//       chatHistory: [
//         { text: 'Đã cập nhật tiền cho bạn, mọi thứ đang đi...', sender: 'admin' },
//         { text: 'Cảm ơn bạn nhiều!', sender: 'client' },
//       ],
//     },
//   ];

//   const [tours, setTours] = useState([
//     {
//       id: 1,
//       destination: "Khám phá Đà Lạt",
//       description: "Hành trình khám phá thành phố ngàn hoa với khí hậu mát mẻ, cảnh sắc thơ mộng.",
//       duration: "3 ngày 2 đêm",
//       departureDate: "2025-03-20",
//       price: 2500000,
//       departureLocation: "TP.HCM",
//       arrivalLocation: "Đà Lạt",
//       type: "Nghỉ dưỡng",
//       category: "Cao cấp",
//       capacity: 20,
//       images: [
//         "https://via.placeholder.com/300x200?text=Đà+Lạt+1",
//         "https://via.placeholder.com/300x200?text=Đà+Lạt+2",
//       ],
//     },
//     {
//       id: 2,
//       destination: "Tham quan Hà Nội",
//       description: "Khám phá thủ đô với các di tích lịch sử và văn hóa đặc sắc.",
//       duration: "4 ngày 3 đêm",
//       departureDate: "2025-03-25",
//       price: 3000000,
//       departureLocation: "Đà Nẵng",
//       arrivalLocation: "Hà Nội",
//       type: "Văn hóa",
//       category: "Tiết kiệm",
//       capacity: 15,
//       images: [
//         "https://via.placeholder.com/300x200?text=Hà+Nội+1",
//         "https://via.placeholder.com/300x200?text=Hà+Nội+2",
//       ],
//     },
//   ]);

//   const [staff, setStaff] = useState([
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       address: '123 Street, City',
//       SDT: '0987654321',
//       email: 'nguyenvana@example.com',
//       status: 'active',
//       role: 'admin',
//     },
//     {
//       id: 2,
//       name: 'Trần Thị B',
//       address: '456 Street, City',
//       SDT: '0123456789',
//       email: 'tranthib@example.com',
//       status: 'active',
//       role: 'guide',
//     },
//     {
//       id: 3,
//       name: 'Lê Văn C',
//       address: 'New York, New Town',
//       SDT: '0123456789',
//       email: 'sieunhangao@gmail.com',
//       status: 'inactive',
//       role: 'guide',
//     },
//   ]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleMessageSent = () => {
//     setMessageSentTrigger((prev) => prev + 1); // Kích hoạt cập nhật MessagesSection
//   };

//   const toggleMessages = () => {
//     setMessagesVisible(!messagesVisible);
//   };

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     if (section === 'edit-tour') {
//       setActiveSection('tour-search');
//     }
//     if (section !== 'edit-tour') setEditingTour(null);

//     if (section === 'chat-client' || section === 'chat-admin') {
//       setMessagesVisible(true);
//     } else {
//       setMessagesVisible(false);
//     }
//   };

//   const handleSelectMessage = (message) => {
//     setSelectedChat({
//       name: message.name,
//       chatHistory: message.chatHistory,
//     });
//     setActiveSection('chat-client');
//     setMessagesVisible(false);
//     console.log('Selected message in Dashboard:', message); // Thêm log
//     setSelectedChat(message);
//   };

//   const handleAddTour = (newTour) => {
//     setTours([...tours, { ...newTour, id: tours.length + 1 }]);
//   };

//   const handleEditTour = (updatedTour) => {
//     setTours(tours.map((tour) => (tour.id === updatedTour.id ? updatedTour : tour)));
//   };

//   const handleEditStaff = (updatedStaff) => {
//     setStaff(staff.map((staffMember) => (staffMember.id === updatedStaff.id ? updatedStaff : staffMember)));
//   };

//   const handleAddStaff = (newStaff) => {
//     setStaff([...staff, newStaff]);
//   };

//   return (
//     <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
//       <Header
//         toggleDarkMode={toggleDarkMode}
//         unreadMessages={unreadMessages}
//         toggleMessages={toggleMessages}
//       />
//       <div className="app-content">
//         <Sidebar onSectionChange={handleSectionChange} />
//         <div className="main-content">
//           {activeSection === 'chat-client' && (
//             <div className="chat-container">
//               <ChatPanel type="client" selectedChat={selectedChat} onMessageSent={handleMessageSent} />
//             </div>
//           )}
//           {activeSection === 'chat-admin' && (
//             <div className="chat-container">
//               <ChatPanel type="admin" />
//             </div>
//           )}
//           {activeSection === 'tour-search' && (
//             <div className="tour-container">
//               <TourSearch
//                 tours={tours}
//                 onEditTour={handleEditTour}
//                 onSectionChange={handleSectionChange}
//               />
//             </div>
//           )}
//           {activeSection === 'add-tour' && (
//             <div className="tour-container">
//               <AddTourForm onAddTour={handleAddTour} />
//             </div>
//           )}
//           {activeSection === 'edit-tour' && editingTour && (
//             <div className="tour-container">
//               <EditTourForm
//                 tour={editingTour}
//                 onEditTour={handleEditTour}
//                 onCancel={() => setActiveSection('tour-search')}
//               />
//             </div>
//           )}
//           {activeSection === 'customer' && (
//             <div className="tour-container">
//               <CustomerManagement />
//             </div>
//           )}
//           {activeSection === 'staff-management' && (
//             <div className="tour-container">
//               <StaffManagement
//                 staff={staff}
//                 onEditStaff={handleEditStaff}
//                 onAddStaff={handleAddStaff}
//               />
//             </div>
//           )}
//         </div>
//         <button className="messages-toggle-btn" onClick={toggleMessages}>
//           {messagesVisible ? <FaChevronRight /> : <FaChevronLeft />}
//         </button>
//         <MessagesSection
//           visible={messagesVisible}
//           onClose={toggleMessages}
//           messages={messages}
//           onSelectMessage={handleSelectMessage}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;