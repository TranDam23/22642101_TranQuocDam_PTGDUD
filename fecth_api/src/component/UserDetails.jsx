import { motion } from "framer-motion"; 

const UserDetails = ({ user, onClose }) => { 
  return ( 
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
    > 
      <motion.div 
        className="bg-white p-6 rounded shadow-lg max-w-lg w-full" 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 50, opacity: 0 }} 
      > 
        <h2 className="text-lg font-bold text-blue-600 mb-4 text-center">
          User Details
        </h2> 
        
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Name</td>
              <td className="py-2 px-4">{user.name}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Email</td>
              <td className="py-2 px-4">{user.email}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Phone</td>
              <td className="py-2 px-4">{user.phone}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Website</td>
              <td className="py-2 px-4">{user.website}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4 font-semibold">Company</td>
              <td className="py-2 px-4">{user.company.name}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded" 
            onClick={onClose} 
          > 
            Đóng 
          </button> 
        </div>
      </motion.div> 
    </motion.div> 
  ); 
}; 

export default UserDetails;
