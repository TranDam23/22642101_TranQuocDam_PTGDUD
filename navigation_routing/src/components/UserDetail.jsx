import { useParams, useNavigate } from "react-router-dom"; 
import avt from "./img/avt.png";

const users = [ 
  { id: 1, name: "Nguyễn Văn A", age: 25, email: "a@example.com", img: avt }, 
  { id: 2, name: "Trần Thị B", age: 30, email: "b@example.com", img: avt }, 
  { id: 3, name: "Lê Văn C", age: 28, email: "c@example.com", img: avt } 
]; 
function UserDetail() { 
  const { id } = useParams(); 
  const navigate = useNavigate();
  const user = users.find((u) => u.id === parseInt(id)); 
  if (!user) { 
    return(
        <div>
            <h2 style={{color : "black"}}>Người dùng không tồn tại</h2>
            <button onClick={() => navigate(-1)} className="back-button">Quay lại</button>
        </div>
    ); 
  } 
  return ( 
    <div className="user-detail-container"> 
        <img src={user.img} alt={user.name} className="user-image" />
        <div className="user-info">
            <h1>{user.name}</h1> 
            <p>Tuổi: {user.age}</p> 
            <p>Email: {user.email}</p>
            <button onClick={() => navigate(-1)} className="back-button">Quay lại</button>
        </div>
    </div> 
  ); 
} 
export default UserDetail;