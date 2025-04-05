import { useState, useEffect } from "react";
import axios from "axios";

const UserList_Axios = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false); // Để quản lý loading cho chi tiết người dùng

  useEffect(() => {
    // Lấy danh sách người dùng khi component được mount
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserClick = (userId) => {
    setLoadingUser(true); // Bắt đầu loading khi click vào một người dùng

    // Gọi API để lấy chi tiết người dùng
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setSelectedUser(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết người dùng:", error);
      })
      .finally(() => {
        setLoadingUser(false); // Kết thúc loading
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-700 flex items-center">
            Detailed Report
        </h1>
      </div>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder=" Tìm kiếm..."
        className="border p-2 w-full mb-4 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Bảng hiển thị danh sách */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center text-gray-500 py-6">Đang tải dữ liệu...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">AVATAR</th>
                <th className="py-3 px-4 text-left">CUSTOMER NAME</th>
                <th className="py-3 px-4 text-left">COMPANY</th>
                <th className="py-3 px-4 text-left">EMAIL</th>
                <th className="py-3 px-4 text-left">CITY</th>
                <th className="py-3 px-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b cursor-pointer"
                  onClick={() => handleUserClick(user.id)}
                >
                  {/* Cột Avatar */}
                  <td className="py-3 px-4">
                    <img
                      src={`https://i.pravatar.cc/50?img=${user.id}`}
                      alt="Avatar"
                      className="rounded-full w-10 h-10"
                    />
                  </td>
                  {/* Cột Tên Khách Hàng */}
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {user.name}
                  </td>
                  {/* Cột Công Ty */}
                  <td className="py-3 px-4">{user.company.name}</td>
                  {/* Cột Email */}
                  <td className="py-3 px-4">{user.email}</td>
                  {/* Cột Thành Phố */}
                  <td className="py-3 px-4">{user.address.city}</td>
                  {/* Cột Hành Động */}
                  <td className="py-3 px-4">
                    <button className="px-4 py-1 bg-blue-500 text-white rounded-md">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Hiển thị chi tiết người dùng */}
      {selectedUser && (
        <div className="mt-6 p-4 border rounded bg-gray-50 shadow">
          {loadingUser ? (
            <p className="text-center text-gray-500">Đang tải chi tiết...</p>
          ) : (
            <>
              <h2 className="text-lg font-bold text-blue-600">{selectedUser.name}</h2>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Website:</strong> {selectedUser.website}</p>
              <p><strong>Company:</strong> {selectedUser.company.name}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setSelectedUser(null)}
              >
                Đóng
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList_Axios;
