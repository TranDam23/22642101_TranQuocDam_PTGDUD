import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import "./Header.css"; // Import file CSS mới

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="header-custom sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="header-brand">
          <img
            src="/home/logo.png"
            alt="Travel Logo"
            className="header-logo"
          />
          <span className="header-title">Travel</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="header-toggle" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={NavLink} to="/" exact className="header-nav-link">
              Trang chủ
            </Nav.Link>

            <NavDropdown title="Điểm đến" id="destination-dropdown" className="header-nav-dropdown">
              <div className="dropdown-parent">
                <NavDropdown.Item className="dropdown-title">Trong nước</NavDropdown.Item>
                <div className="submenu">
                  <NavDropdown.Item as={NavLink} to="/tours?region=mien-bac">
                    Miền Bắc
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/tours?region=mien-trung">
                    Miền Trung
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/tours?region=mien-nam">
                    Miền Nam
                  </NavDropdown.Item>
                </div>
              </div>

              <div className="dropdown-parent">
                <NavDropdown.Item className="dropdown-title">Nước ngoài</NavDropdown.Item>
                <div className="submenu">
                  <NavDropdown.Item as={NavLink} to="/tours?region=chau-a">Châu Á</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/tours?region=chau-au">Châu Âu</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/tours?region=chau-my">Châu Mỹ</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/tours?region=chau-phi">Châu Phi</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/tours?region=chau-dai-duong">Châu Đại Dương</NavDropdown.Item>
                </div>
              </div>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/contact" className="header-nav-link">
              Liên hệ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/news" className="header-nav-link">
              Tin tức
            </Nav.Link>
            {user ? (
              <NavDropdown
                title={
                  <div className="user-profile d-flex align-items-center">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                      alt="User Avatar"
                      className="user-avatar"
                    />
                    <span className="user-name">{user.user_name || "Tài khoản"}</span>
                  </div>
                }
                id="user-dropdown"
                className="header-user-dropdown"
              >
                <NavDropdown.Item as={NavLink} to={`/tour-booked/${user.userID}`}>
                  Xem các tour đã đặt
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="header-login-btn">
                <User size={20} className="me-2" />
                Đăng nhập
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;