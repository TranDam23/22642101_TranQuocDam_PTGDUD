import React from "react";

class AddUserInfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '', // giá trị mặc định cho Name
            Age: ''   // giá trị mặc định cho Age
        };
    }

    handleOnSubmit = (event) => {
        event.preventDefault(); // ngăn việc tải lại trang
        this.props.handleAddnewUser({
            id: Math.floor((Math.random() * 100) + 1), // ID ngẫu nhiên
            Name: this.state.Name,
            Age: this.state.Age
        });

        // Reset giá trị sau khi submit
        this.setState({
            Name: '',
            Age: ''
        });
    };

    handleOnChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value // cập nhật giá trị dựa vào trường
        });
    };

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.Name} // gán giá trị từ state
                    onChange={(event) => this.handleOnChangeInput(event, 'Name')} // xử lý sự kiện cho Name
                />
                <br />
                <input
                    type="text"
                    placeholder="Age"
                    value={this.state.Age} // gán giá trị từ state
                    onChange={(event) => this.handleOnChangeInput(event, 'Age')} // xử lý sự kiện cho Age
                />
                <br />
                <button>Submit</button>
            </form>
        );
    }
}

export default AddUserInfor;
