import { useState, useEffect } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
        placeholder="🔍 Tìm kiếm..."
        className="border p-2 w-full mb-4 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Bảng hiển thị danh sách */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">AVATAR</th>
              <th className="py-3 px-4 text-left">CUSTOMER NAME</th>
              <th className="py-3 px-4 text-left">COMPANY</th>
              <th className="py-3 px-4 text-left">ORDER VALUE</th>
              <th className="py-3 px-4 text-left">ORDER DATE</th>
              <th className="py-3 px-4 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b">
                {/* Cột Avatar */}
                <td className="py-3 px-4">
                  <img
                    src={`https://i.pravatar.cc/50?img=${index + 1}`}
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
                {/* Cột Giá Trị Đơn Hàng */}
                <td className="py-3 px-4 text-green-600 font-bold">
                  ${Math.floor(Math.random() * 1000)}
                </td>
                {/* Cột Ngày Đặt Hàng */}
                <td className="py-3 px-4 text-gray-500">10/07/2023</td>
                {/* Cột Trạng Thái */}
                <td className="py-3 px-4">
                  <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-lg text-sm">
                    New
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">63 results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-pink-500 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg">
            2
          </button>
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg">
            3
          </button>
          ...
        </div>
      </div>
    </div>
  );
};

export default UserTable;
