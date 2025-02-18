import React from "react";
class Childcomponent extends React.Component {
    render() {
        return (
            <>
                <h1>
                    call function Sum:6+7={this.props.sum(6, 7)}
                    {/* //gọi hàm sum từ component cha */}
                </h1>
            </>
        );
    };
}
export default Childcomponent;