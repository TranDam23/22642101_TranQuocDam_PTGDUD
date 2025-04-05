
import React, { useState, useContext } from 'react';
import '../CSS/Header.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; // Import AuthContext

function Header({ toggleDarkMode, unreadMessages, toggleMessages }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin User',
    phone: '0123456789',
    email: 'admin@example.com',
    address: '123 Admin Street, City',
    avatar: 'https://via.placeholder.com/100?text=Admin',
  });
  const [editingAdminInfo, setEditingAdminInfo] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // Sử dụng setUser từ AuthContext

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
    setEditingAdminInfo({ ...adminInfo });
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Xóa user trong AuthContext
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleSaveProfile = () => {
    setAdminInfo(editingAdminInfo);
    setIsProfileModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsProfileModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingAdminInfo({
        ...editingAdminInfo,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="app-header">
      <div className="header-background" />
      <div className="header-left">
        <div className="menu-toggle" onClick={toggleMessages}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
        <h1 className="header-title">BẢNG ĐIỀU KHIỂN</h1>
      </div>
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      <div className="header-right">
        <div className="header-icon dark-mode-toggle" onClick={toggleDarkMode}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-moon"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        <div className="header-icon notification">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-badge">{unreadMessages}</span>
        </div>
        <div className="user-profile">
          <div className="user-label" onClick={handleDropdownToggle}>
            ADMIN
          </div>
          <div className={`user-dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <button className="dropdown-item" onClick={handleProfileClick}>
              Hồ sơ
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Modal Hồ sơ */}
      {isProfileModalOpen && (
        <div className="profile-modal">
          <div className="modal-content">
            <h2>Hồ sơ Admin</h2>
            <div className="modal-form">
              <div className="modal-avatar">
                <img
                  src={editingAdminInfo.avatar}
                  alt="Admin Avatar"
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/100?text=Admin')
                  }
                />
                <div className="avatar-upload-wrapper">
                  <label htmlFor="avatar-upload-profile" className="avatar-upload-label">
                    Chọn tệp
                  </label>
                  <input
                    id="avatar-upload-profile"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="avatar-upload"
                  />
                  <span className="avatar-upload-text">Chưa có tệp nào được chọn</span>
                </div>
              </div>
              <div className="modal-details">
                <div className="form-group">
                  <label>Tên:</label>
                  <input
                    type="text"
                    value={editingAdminInfo.name}
                    onChange={(e) =>
                      setEditingAdminInfo({
                        ...editingAdminInfo,
                        name: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ:</label>
                  <input
                    type="text"
                    value={editingAdminInfo.address}
                    onChange={(e) =>
                      setEditingAdminInfo({
                        ...editingAdminInfo,
                        address: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="tel"
                    value={editingAdminInfo.phone}
                    onChange={(e) =>
                      setEditingAdminInfo({
                        ...editingAdminInfo,
                        phone: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editingAdminInfo.email}
                    onChange={(e) =>
                      setEditingAdminInfo({
                        ...editingAdminInfo,
                        email: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveProfile}>
                Lưu
              </button>
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;



// import React, { useState } from 'react';
// import '../CSS/Header.css';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function Header({ toggleDarkMode, unreadMessages, toggleMessages }) {
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [adminInfo, setAdminInfo] = useState({
//     name: 'Admin User',
//     phone: '0123456789',
//     email: 'admin@example.com',
//     address: '123 Admin Street, City',
//     avatar: 'https://via.placeholder.com/100?text=Admin',
//   });
//   const [editingAdminInfo, setEditingAdminInfo] = useState(null);

//   const navigate = useNavigate(); // Khởi tạo useNavigate

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleProfileClick = () => {
//     setIsProfileModalOpen(true);
//     setEditingAdminInfo({ ...adminInfo });
//     setIsDropdownOpen(false);
//   };

//   const handleLogout = () => {
//     // Xóa thông tin người dùng khỏi localStorage
//     localStorage.removeItem('user');
    
//     // Đóng dropdown
//     setIsDropdownOpen(false);
    
//     // Điều hướng về trang đăng nhập
//     navigate('/login');
//   };

//   const handleSaveProfile = () => {
//     setAdminInfo(editingAdminInfo);
//     setIsProfileModalOpen(false);
//   };

//   const handleCancelEdit = () => {
//     setIsProfileModalOpen(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditingAdminInfo({
//         ...editingAdminInfo,
//         avatar: URL.createObjectURL(file),
//       });
//     }
//   };

//   return (
//     <div className="app-header">
//       <div className="header-background" />
//       <div className="header-left">
//         <div className="menu-toggle" onClick={toggleMessages}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-menu"
//           >
//             <line x1="3" y1="12" x2="21" y2="12" />
//             <line x1="3" y1="6" x2="21" y2="6" />
//             <line x1="3" y1="18" x2="21" y2="18" />
//           </svg>
//         </div>
//         <h1 className="header-title">BẢNG ĐIỀU KHIỂN</h1>
//       </div>
//       <div className="header-center">
//         <div className="search-bar">
//           <input type="text" placeholder="Tìm kiếm" />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-search"
//           >
//             <circle cx="11" cy="11" r="8" />
//             <line x1="21" y1="21" x2="16.65" y2="16.65" />
//           </svg>
//         </div>
//       </div>
//       <div className="header-right">
//         <div className="header-icon dark-mode-toggle" onClick={toggleDarkMode}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-moon"
//           >
//             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
//           </svg>
//         </div>
//         <div className="header-icon notification">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="feather feather-bell"
//           >
//             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//           </svg>
//           <span className="notification-badge">{unreadMessages}</span>
//         </div>
//         <div className="user-profile">
//           <div className="user-label" onClick={handleDropdownToggle}>
//             ADMIN
//           </div>
//           <div className={`user-dropdown ${isDropdownOpen ? 'open' : ''}`}>
//             <button className="dropdown-item" onClick={handleProfileClick}>
//               Hồ sơ
//             </button>
//             <button className="dropdown-item" onClick={handleLogout}>
//               Đăng xuất
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal Hồ sơ */}
//       {isProfileModalOpen && (
//         <div className="profile-modal">
//           <div className="modal-content">
//             <h2>Hồ sơ Admin</h2>
//             <div className="modal-form">
//               <div className="modal-avatar">
//                 <img
//                   src={editingAdminInfo.avatar}
//                   alt="Admin Avatar"
//                   onError={(e) =>
//                     (e.target.src = 'https://via.placeholder.com/100?text=Admin')
//                   }
//                 />
//                 <div className="avatar-upload-wrapper">
//                   <label htmlFor="avatar-upload-profile" className="avatar-upload-label">
//                     Chọn tệp
//                   </label>
//                   <input
//                     id="avatar-upload-profile"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="avatar-upload"
//                   />
//                   <span className="avatar-upload-text">Chưa có tệp nào được chọn</span>
//                 </div>
//               </div>
//               <div className="modal-details">
//                 <div className="form-group">
//                   <label>Tên:</label>
//                   <input
//                     type="text"
//                     value={editingAdminInfo.name}
//                     onChange={(e) =>
//                       setEditingAdminInfo({
//                         ...editingAdminInfo,
//                         name: e.target.value,
//                       })
//                     }
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Địa chỉ:</label>
//                   <input
//                     type="text"
//                     value={editingAdminInfo.address}
//                     onChange={(e) =>
//                       setEditingAdminInfo({
//                         ...editingAdminInfo,
//                         address: e.target.value,
//                       })
//                     }
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Số điện thoại:</label>
//                   <input
//                     type="tel"
//                     value={editingAdminInfo.phone}
//                     onChange={(e) =>
//                       setEditingAdminInfo({
//                         ...editingAdminInfo,
//                         phone: e.target.value,
//                       })
//                     }
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     value={editingAdminInfo.email}
//                     onChange={(e) =>
//                       setEditingAdminInfo({
//                         ...editingAdminInfo,
//                         email: e.target.value,
//                       })
//                     }
//                     className="form-input"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="modal-actions">
//               <button className="save-btn" onClick={handleSaveProfile}>
//                 Lưu
//               </button>
//               <button className="cancel-btn" onClick={handleCancelEdit}>
//                 Hủy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;