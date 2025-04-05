import React, { useState } from 'react';
import '../CSS/Sidebar.css';

function Sidebar({ onSectionChange }) {
  const [isTourDropdownOpen, setIsTourDropdownOpen] = useState(false);
  const [isStatsDropdownOpen, setIsStatsDropdownOpen] = useState(false);

  const handleTourDropdownToggle = (e) => {
    e.preventDefault();
    setIsTourDropdownOpen(!isTourDropdownOpen);
  };

  const handleStatsDropdownToggle = (e) => {
    e.preventDefault();
    setIsStatsDropdownOpen(!isStatsDropdownOpen);
  };

  return (
    <div className="app-sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item">
          <a
            href="#"
            className="menu-link"
            data-section="chat-client"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange('chat-client');
            }}
          >
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
              className="feather feather-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Tin nhắn Client</span>
          </a>
        </div>
        <div className="menu-item">
          <a
            href="#"
            className="menu-link"
            data-section="chat-admin"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange('chat-admin');
            }}
          >
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
              className="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Tin nhắn Admin & Staff</span>
          </a>
        </div>
        <div className="menu-item dropdown">
          <a
            href="#"
            className={`menu-link dropdown-toggle ${isTourDropdownOpen ? 'active' : ''}`}
            onClick={handleTourDropdownToggle}
          >
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
              className="feather feather-map"
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>Tour</span>
            <svg
              className="dropdown-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
          <div className={`dropdown-menu ${isTourDropdownOpen ? 'open' : ''}`}>
            <a
              href="#"
              className="dropdown-item"
              data-section="tour-search"
              onClick={(e) => {
                e.preventDefault();
                onSectionChange('tour-search');
              }}
            >
              Tìm kiếm Tour
            </a>
            <a
              href="#"
              className="dropdown-item"
              data-section="add-tour"
              onClick={(e) => {
                e.preventDefault();
                onSectionChange('add-tour');
              }}
            >
              Thêm Tour
            </a>
          </div>
        </div>
        <div className="menu-item dropdown">
          <a
            href="#"
            className={`menu-link dropdown-toggle ${isStatsDropdownOpen ? 'active' : ''}`}
            onClick={handleStatsDropdownToggle}
          >
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
              className="feather feather-bar-chart-2"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            <span>Thống kê</span>
            <svg
              className="dropdown-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
          <div className={`dropdown-menu ${isStatsDropdownOpen ? 'open' : ''}`}>
            <a
              href="#"
              className="dropdown-item"
              data-section="revenue-stats"
              onClick={(e) => {
                e.preventDefault();
                onSectionChange('revenue-stats');
              }}
            >
              Thống kê Doanh thu
            </a>
            <a
              href="#"
              className="dropdown-item"
              data-section="booking-stats"
              onClick={(e) => {
                e.preventDefault();
                onSectionChange('booking-stats');
              }}
            >
              Thống kê Số lượng Booking
            </a>
          </div>
        </div>
        <div className="menu-item">
          <a
            href="#"
            className="menu-link"
            data-section="customer"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange('customer');
            }}
          >
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
              className="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Quản lý Khách hàng</span>
          </a>
        </div>
        <div className="menu-item">
          <a
            href="#"
            className="menu-link"
            data-section="staff-management"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange('staff-management');
            }}
          >
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
              className="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Quản lý Nhân viên</span>
          </a>
        </div>
        <div className="menu-item">
          <a
            href="#"
            className="menu-link"
            data-section="settings"
            onClick={(e) => {
              e.preventDefault();
              onSectionChange('settings');
            }}
          >
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
              className="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l-.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            <span>Cài đặt</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;