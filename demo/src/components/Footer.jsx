import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 w-100 fixed-bottom">
      <div className="container">
        <div className="row">
          {/* Hàng 1 */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Welcome to our website, a wonderful place to explore and learn how to cook like a pro </p>
            <form className="d-flex">
              <input type="email" className="form-control mb-2" placeholder="Enter your email" />
              <button className="btn" style={{ backgroundColor: "red", color: "white" }}>Send</button>
            </form>
          </div>

          <div className="col-md-4">
            <h5>Learn More</h5>
            <p>Our Cooks</p>
            <p>See Our Features</p>
            <p>FAQ</p>
          </div>
          <div className="col-md-4">
            <h5>Recipes</h5>
            <p>What to Cook This Week</p>
            <p>Pasta</p>
            <p>Dinner</p>
            <p>Healthy</p>
            <p>Vegetarian</p>
            <p>Vegan</p>
            <p>Christmas</p>
          </div>
        </div>

        <div className="row mt-4">
          {/* Hàng 2 */}
          <div className="col-md-4 d-flex">
            <img src="/img/Lab_04/white_chefify.png" alt="Logo" width="100" height="25" className="me-2 mb-2" />
            <p>      2023 Chefify Company</p>
            <p>    Terms of Servicel Privacy Policy</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <p>
              <a href="#" className="text-light me-2">Facebook</a>
              <a href="#" className="text-light me-2">Twitter</a>
              <a href="#" className="text-light">Instagram</a>
            </p>
          </div>
        </div>

        <hr className="mt-4" />
        <p className="text-center mb-0">&copy; 2024 My Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
