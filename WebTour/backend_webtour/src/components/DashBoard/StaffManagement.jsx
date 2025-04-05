import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/StaffManagement.css';

function StaffManagement({ onEditStaff, onAddStaff }) {
  const [staff, setStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    address: '',
    SDT: '',
    email: '',
    status: 'active',
    role: 'guide',
    avatar: 'https://via.placeholder.com/100?text=Staff',
  });

  // Hàm lấy dữ liệu từ API
  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3002/get-users');
      const users = response.data;
      console.log('Fetched users:', JSON.stringify(users, null, 2));

      const staffData = users.map((user) => ({
        id: user.userID,
        name: user.username,
        address: user.address,
        SDT: user.phoneNumber,
        email: user.email,
        status: 'active', // Giả sử mặc định là active
        role: user.role,
        avatar: 'https://via.placeholder.com/100?text=Staff',
      }));

      setStaff(staffData);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setStaff([
        {
          id: 1,
          name: 'Nguyễn Văn A',
          address: '123 Street, City',
          SDT: '0987654321',
          email: 'nguyenvana@example.com',
          status: 'active',
          role: 'admin',
          avatar: 'https://via.placeholder.com/100?text=Staff',
        },
        {
          id: 2,
          name: 'Trần Thị B',
          address: '456 Street, City',
          SDT: '0123456789',
          email: 'tranthib@example.com',
          status: 'active',
          role: 'guide',
          avatar: 'https://via.placeholder.com/100?text=Staff',
        },
        {
          id: 3,
          name: 'Lê Văn C',
          address: 'New York, New Town',
          SDT: '0123456789',
          email: 'sieunhango@gmail.com',
          status: 'inactive',
          role: 'guide',
          avatar: 'https://via.placeholder.com/100?text=Staff',
        },
      ]);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchStaff();
  }, []);

  const handleEditStaff = (staffMember) => {
    setEditingStaff(staffMember);
  };

  const handleSaveStaff = async (updatedStaff) => {
    try {
      // Gọi API để cập nhật user
      await axios.put(`http://localhost:3002/update-user/${updatedStaff.id}`, {
        username: updatedStaff.name,
        address: updatedStaff.address,
        phoneNumber: updatedStaff.SDT,
        email: updatedStaff.email,
        role: updatedStaff.role,
      });

      onEditStaff(updatedStaff);
      setEditingStaff(null);
      // Cập nhật state staff sau khi chỉnh sửa
      setStaff((prevStaff) =>
        prevStaff.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
      );
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingStaff(null);
  };

  const handleAddStaff = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewStaff = async () => {
    try {
      // Gọi API để thêm user mới
      const response = await axios.post('http://localhost:3002/add-user', {
        username: newStaff.name,
        address: newStaff.address,
        phoneNumber: newStaff.SDT,
        email: newStaff.email,
        role: newStaff.role,
      });

      const newUser = response.data.user;

      onAddStaff({
        ...newStaff,
        id: newUser.userID,
      });

      setIsAddModalOpen(false);
      // Cập nhật state staff sau khi thêm mới
      setStaff((prevStaff) => [
        ...prevStaff,
        {
          id: newUser.userID,
          name: newStaff.name,
          address: newStaff.address,
          SDT: newStaff.SDT,
          email: newStaff.email,
          status: newStaff.status,
          role: newStaff.role,
          avatar: newStaff.avatar,
        },
      ]);

      setNewStaff({
        name: '',
        address: '',
        SDT: '',
        email: '',
        status: 'active',
        role: 'guide',
        avatar: 'https://via.placeholder.com/100?text=Staff',
      });
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
    setNewStaff({
      name: '',
      address: '',
      SDT: '',
      email: '',
      status: 'active',
      role: 'guide',
      avatar: 'https://via.placeholder.com/100?text=Staff',
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStaff({
        ...newStaff,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="staff-management">
      <div className="staff-header">
        <h3>Quản lý Nhân viên</h3>
        <button className="add-staff-btn" onClick={handleAddStaff}>
          Thêm nhân viên
        </button>
      </div>
      <div className="staff-list">
        <table className="staff-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) =>
              editingStaff && editingStaff.id === staffMember.id ? (
                <tr key={staffMember.id}>
                  <td>{staffMember.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editingStaff.name}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, name: e.target.value })
                      }
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingStaff.address}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, address: e.target.value })
                      }
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingStaff.SDT}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, SDT: e.target.value })
                      }
                      className="form-input"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editingStaff.email}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, email: e.target.value })
                      }
                      className="form-input"
                    />
                  </td>
                  <td>
                    <select
                      value={editingStaff.status}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, status: e.target.value })
                      }
                      className="form-input"
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Không hoạt động</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={editingStaff.role}
                      onChange={(e) =>
                        setEditingStaff({ ...editingStaff, role: e.target.value })
                      }
                      className="form-input"
                    >
                      <option value="guide">Guide</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="save-staff-btn"
                      onClick={() => handleSaveStaff(editingStaff)}
                    >
                      Lưu
                    </button>
                    <button
                      className="cancel-staff-btn"
                      onClick={handleCancelEdit}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={staffMember.id}>
                  <td>{staffMember.id}</td>
                  <td>{staffMember.name}</td>
                  <td>{staffMember.address}</td>
                  <td>{staffMember.SDT}</td>
                  <td>{staffMember.email}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        staffMember.status === 'active' ? 'active' : 'inactive'
                      }`}
                    >
                      {staffMember.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td>{staffMember.role === 'guide' ? 'Guide' : 'Admin'}</td>
                  <td>
                    <button
                      className="edit-staff-btn"
                      onClick={() => handleEditStaff(staffMember)}
                    >
                      Chỉnh sửa
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm Nhân viên */}
      {isAddModalOpen && (
        <div className="add-staff-modal">
          <div className="modal-content">
            <h2>Thêm Nhân viên</h2>
            <div className="modal-form">
              <div className="modal-avatar">
                <img
                  src={newStaff.avatar}
                  alt="Staff Avatar"
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/100?text=Staff')
                  }
                />
                <div className="avatar-upload-wrapper">
                  <label htmlFor="avatar-upload" className="avatar-upload-label">
                    Chọn tệp
                  </label>
                  <input
                    id="avatar-upload"
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
                    value={newStaff.name}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, name: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ:</label>
                  <input
                    type="text"
                    value={newStaff.address}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, address: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="tel"
                    value={newStaff.SDT}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, SDT: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái:</label>
                  <select
                    value={newStaff.status}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, status: e.target.value })
                    }
                    className="form-input"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Vai trò:</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, role: e.target.value })
                    }
                    className="form-input"
                  >
                    <option value="guide">Guide</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveNewStaff}>
                Thêm
              </button>
              <button className="cancel-btn" onClick={handleCancelAdd}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffManagement;