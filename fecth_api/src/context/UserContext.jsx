import { createContext, useState, useEffect } from "react"; 
import axios from "axios"; 
 
export const UserContext = createContext(); 
 
export const UserProvider = ({ children }) => { 
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
 
  useEffect(() => { 
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
 
  return ( 
    <UserContext.Provider value={{ users, loading }}> 
      {children} 
    </UserContext.Provider> 
  ); 
};