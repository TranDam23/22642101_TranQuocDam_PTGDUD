import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top w-100">
      <div className="container">
        {/* Logo + Tên web */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="/img/Lab_01/Group 9.png" alt="Logo" width="100%" height="40" className="me-2" />
        </a>

        {/* Nút Toggle trên mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu + Thanh tìm kiếm */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Thanh tìm kiếm */}
          <form className="d-flex ms-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Login</a>
            </li>
          </ul>

          
        </div>
      </div>
    </nav>
  );
};

export default Header;
