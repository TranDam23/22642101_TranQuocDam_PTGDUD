import { Link } from "react-router-dom";
import avt from "./img/avt.png";

const users = [ 
  { id: 1, name: "Nguyễn Văn A", img: avt }, 
  { id: 2, name: "Trần Thị B", img: avt }, 
  { id: 3, name: "Lê Văn C", img: avt },
  { id: 4, name: "Hồ Văn D", img: avt }
]; 

function UserList() { 
  return ( 
    <ul> 
      {users.map((user) => ( 
        <li key={user.id}> 
            <Link to={`/user/${user.id}`} style={{ color: "black", textDecoration: "none" }}>
                <div>
                    <img src={user.img} alt={user.name} className="user-image1" />
                    <p>{user.name}</p>
                </div>
            </Link> 
        </li> 
      ))} 
    </ul> 
  ); 
} 

export default UserList;
