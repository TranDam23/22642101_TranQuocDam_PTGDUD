import { useState, useContext } from "react"; 
import { UserContext } from "../context/UserContext"; 
import { motion } from "framer-motion"; 
import UserDetails from "./UserDetails"; 

const UserList_part3 = () => { 
  const { users, loading } = useContext(UserContext); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [search, setSearch] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const usersPerPage = 5; 

  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(search.toLowerCase()) 
  ); 

  const indexOfLastUser = currentPage * usersPerPage; 
  const indexOfFirstUser = indexOfLastUser - usersPerPage; 
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser); 

  return ( 
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-700">User List</h1>
      </div>

      {/* Ô tìm kiếm */}
      <input 
        type="text" 
        placeholder="Tìm kiếm..." 
        className="border p-2 w-full mb-4 rounded-md" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      /> 

      {/* Bảng hiển thị danh sách người dùng */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center text-gray-500 py-6">Đang tải dữ liệu...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left">AVATAR</th>
                <th className="py-3 px-4 text-left">CUSTOMER NAME</th>
                <th className="py-3 px-4 text-left">EMAIL</th>
                <th className="py-3 px-4 text-left">CITY</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  className="border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedUser(user)}
                  whileHover={{ scale: 1.02 }}
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
                  <td className="py-3 px-4 font-semibold text-gray-700">{user.name}</td>
                  {/* Cột Email */}
                  <td className="py-3 px-4">{user.email}</td>
                  {/* Cột Thành Phố */}
                  <td className="py-3 px-4">{user.address.city}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].map(
          (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Hiển thị chi tiết người dùng */}
      {selectedUser && <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  ); 
};

export default UserList_part3; 
