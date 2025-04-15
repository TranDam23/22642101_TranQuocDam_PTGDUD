import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Content.css";
import Recipe from "./Recipe";
const Content = () => {
    return (
        <div className="content  w-100">
            <div className="container py-5 text-white">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <Recipe></Recipe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
