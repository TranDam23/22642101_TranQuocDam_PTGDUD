import React from "react";
class DisplayInfo extends React.Component {
    render() {
        const { listUser } = this.props;//truyền từ cha sang con
        //const listUser=this.props.listUser //tương đương với    cách trên
        console.log(listUser)//hiển thị ds trên màn hình console
        return (
            <div>
                {listUser.map((user) => {
                    return (
                        <div key={user.id} className={user.Age < 18 ? "red" : "blue"}>
                            <div>User name is: {user.Name}</div>
                            <div>User Age: {user.Age}</div>
                            <button onClick={() => {
                                this.props.handleDeleteUser(user.id)
                            }}>Delete</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default DisplayInfo;