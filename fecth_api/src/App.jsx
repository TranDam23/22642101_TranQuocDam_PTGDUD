import PostList from "./component/PostList";
import UserList from "./component/UserList";
import UserList_Axios from "./component/UserList_Axios";
import UserList_part3 from "./component/UserList_part3";
import { UserProvider } from "./context/UserContext"; 
import './App.css'

function App() {
  return (
    // <div>
    //   <div> 
    //     <h1>Ứng dụng Fetch API</h1> 
    //     <PostList /> 
    //   </div>

    //   <div className="container mx-auto mt-10"> 
    //     <h1 className="text-2xl font-bold text-center">Danh sách người dùng</h1> 
    //     <UserList /> 
    //   </div>

    //   <div className="container mx-auto mt-10"> 
    //     <h1 className="text-2xl font-bold text-center mb-4">Danh sách người dùng</h1> 
    //     <UserList_Axios /> 
    //   </div>
    // </div>
    <UserProvider> 
      <div className="container mx-auto mt-10"> 
        <h1 className="text-2xl font-bold text-center mb-4"> 
          Danh sách người dùng 
        </h1> 
        <UserList_part3 /> 
      </div> 
    </UserProvider>
  )
}

export default App
