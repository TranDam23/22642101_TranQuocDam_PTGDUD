import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/CustomerManagement.css';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Hàm lấy danh sách khách hàng từ API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/get-customers');
      const customersData = response.data.map((customer) => ({
        id: customer.userID,
        name: customer.username,
        email: customer.email,
        phone: customer.phoneNumber,
        address: customer.address,
        status: 'Hoạt động', // Giả sử mặc định là Hoạt động, có thể thêm trường status vào database nếu cần
      }));
      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Dữ liệu mặc định nếu có lỗi
      setCustomers([
        {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phone: '0901234567',
          address: '123 Đường Láng, Hà Nội',
          status: 'Hoạt động',
        },
        {
          id: 2,
          name: 'Trần Thị B',
          email: 'tranthib@example.com',
          phone: '0912345678',
          address: '456 Nguyễn Huệ, TP.HCM',
          status: 'Không hoạt động',
        },
        {
          id: 3,
          name: 'Lê Văn C',
          email: 'levanc@example.com',
          phone: '0923456789',
          address: '789 Lê Lợi, Đà Nẵng',
          status: 'Hoạt động',
        },
      ]);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
  };

  const handleSaveCustomer = async (updatedCustomer) => {
    try {
      // Gọi API để cập nhật customer
      await axios.put(`http://localhost:3002/update-customer/${updatedCustomer.id}`, {
        username: updatedCustomer.name,
        address: updatedCustomer.address,
        phoneNumber: updatedCustomer.phone,
        email: updatedCustomer.email,
      });

      // Cập nhật state customers
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
      );
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      // Gọi API để xóa customer
      await axios.delete(`http://localhost:3002/delete-customer/${id}`);

      // Cập nhật state customers
      setCustomers((prevCustomers) => prevCustomers.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="customer-management">
      <h3>Quản lý Khách hàng</h3>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) =>
            editingCustomer && editingCustomer.id === customer.id ? (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  <input
                    type="text"
                    value={editingCustomer.name}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, name: e.target.value })
                    }
                    className="form-input"
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, email: e.target.value })
                    }
                    className="form-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, phone: e.target.value })
                    }
                    className="form-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editingCustomer.address}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, address: e.target.value })
                    }
                    className="form-input"
                  />
                </td>
                <td>
                  <select
                    value={editingCustomer.status}
                    onChange={(e) =>
                      setEditingCustomer({ ...editingCustomer, status: e.target.value })
                    }
                    className="form-input"
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Không hoạt động">Không hoạt động</option>
                  </select>
                </td>
                <td>
                  <button
                    className="action-btn save"
                    onClick={() => handleSaveCustomer(editingCustomer)}
                  >
                    Lưu
                  </button>
                  <button className="action-btn cancel" onClick={handleCancelEdit}>
                    Hủy
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <span
                    className={`status ${
                      customer.status === 'Hoạt động' ? 'active' : 'inactive'
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEditCustomer(customer)}
                  >
                    Sửa
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteCustomer(customer.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;