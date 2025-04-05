import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaArrowRight,
  FaPlane,
  FaStar,
  FaCreditCard,
  FaPaperPlane,
} from "react-icons/fa";
import anh1 from "../assets/package-1.jpg";
import anh2 from "../assets/package-2.jpg";
import anh3 from "../assets/package-3.jpg";
import anh4 from "../assets/package-4.jpg";
import anh5 from "../assets/package-5.jpg";
import anh6 from "../assets/package-6.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className="footer position-relative">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#26A69A"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Container className="py-5">
        <Row className="g-5">
          {/* Company Info */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h4 className="text-primary fw-bold mb-4 animate__animated animate__fadeIn">
              CÔNG TY
            </h4>
            <div className="d-flex flex-column">
              <Link to="/" className="footer-link mb-2">
                <FaArrowRight className="me-2" /> Về Chúng Tôi
              </Link>
              <Link to="/contact" className="footer-link mb-2">
                <FaArrowRight className="me-2" /> Liên Hệ
              </Link>
              <Link to="/policy" className="footer-link mb-2">
                <FaArrowRight className="me-2" /> Chính Sách Bảo Mật
              </Link>
              <Link to="/terms" className="footer-link mb-2">
                <FaArrowRight className="me-2" /> Điều Khoản & Điều Kiện
              </Link>
              <Link to="/faqs" className="footer-link mb-2">
                <FaArrowRight className="me-2" /> FAQs & Trợ Giúp
              </Link>
              <Link to="/careers" className="footer-link mb-2">
                <FaArrowRight className="me-2" /> Tuyển Dụng
              </Link>
            </div>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h4 className="text-primary fw-bold mb-4 animate__animated animate__fadeIn">
              LIÊN HỆ
            </h4>
            <div className="contact-info">
              <p className="mb-3">
                <FaMapMarkerAlt className="contact-icon me-2" />
                12 Nguyễn Văn Bảo, Gò Vấp, TP. HCM
              </p>
              <p className="mb-3">
                <FaPhoneAlt className="contact-icon me-2" />
                +84 123 456 789
              </p>
              <p className="mb-3">
                <FaEnvelope className="contact-icon me-2" />
                info@dulich.com.vn
              </p>
              <p className="mb-3">
                <FaPhoneAlt className="contact-icon me-2" />
                Hotline: 1900 1234
              </p>
              <div className="d-flex pt-2">
                
                <a className="btn btn-outline-primary btn-social me-2" href="https://www.facebook.com/profile.php?id=100006872863995">
                  <FaFacebookF />
                </a>
                <a className="btn btn-outline-primary btn-social me-2" href="https://www.youtube.com/@oaihocdanh">
                  <FaYoutube />
                </a>
                {/* Tiktok */}
                 {/* icon tiktok */}
                 
                
              </div>
            </div>
          </Col>

          {/* Gallery */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h4 className="text-primary fw-bold mb-4 animate__animated animate__fadeIn">
              THƯ VIỆN ẢNH
            </h4>
            <Row className="g-2">
              {[anh1, anh2, anh3, anh4, anh5, anh6].map((image, index) => (
                <Col key={index} xs={4} className="gallery-item">
                  <img
                    src={image}
                    alt={`Ảnh du lịch ${index + 1}`}
                    className="img-fluid rounded"
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-info">
                      <h6 className="text-white">Du Lịch</h6>
                      <p className="text-white-50">Khám phá ngay</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Newsletter */}
          <Col lg={3} md={6}>
            <h4 className="text-primary fw-bold mb-4 animate__animated animate__fadeIn">
              ĐĂNG KÝ NHẬN TIN
            </h4>
            <p>Đăng ký để nhận những thông tin du lịch mới nhất và ưu đãi đặc biệt.</p>
            <Form className="newsletter-form">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Nhập email"
                  aria-label="Nhập email"
                  className="py-3 form-control-newsletter"
                />
                <Button variant="primary" className="newsletter-btn">
                  Đăng Ký
                </Button>
              </InputGroup>
            </Form>
            <div className="mt-4">
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <div className="feature-icon bg-primary text-white rounded-circle">
                    <i className="fa fa-check"></i>
                  </div>
                </div>
                <div className="ms-3">
                  <p className="mb-0">Ưu đãi độc quyền</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="feature-icon bg-primary text-white rounded-circle">
                    <i className="fa fa-check"></i>
                  </div>
                </div>
                <div className="ms-3">
                  <p className="mb-0">Cập nhật tin tức mới nhất</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Customer Testimonials */}
        <Row className="mt-5 pt-5 border-top border-light border-opacity-10">
          <Col xs={12}>
            <h4 className="text-primary fw-bold mb-4 text-center animate__animated animate__fadeIn">
              Ý KIẾN KHÁCH HÀNG
            </h4>
            <Row className="g-4">
              <Col lg={4} md={6}>
                <div className="testimonial-card p-4 bg-light rounded shadow-sm">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={anh4}
                      alt="Customer 1"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <h6 className="mb-0">Nguyễn Thái An</h6>
                      <div className="text-warning">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted">
                    "Tour Đà Lạt thật tuyệt vời! Hướng dẫn viên nhiệt tình, lịch trình hợp lý."
                  </p>
                </div>
              </Col>
              <Col lg={4} md={6}>
                <div className="testimonial-card p-4 bg-light rounded shadow-sm">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={anh5}
                      alt="Customer 2"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <h6 className="mb-0">Nguyễn Đức Hậu</h6>
                      <div className="text-warning">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted">
                    "Phú Quốc đẹp không lời nào tả! Dịch vụ rất chuyên nghiệp."
                  </p>
                </div>
              </Col>
              <Col lg={4} md={12}>
                <div className="testimonial-card p-4 bg-light rounded shadow-sm">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={anh6}
                      alt="Customer 3"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div>
                      <h6 className="mb-0">Đặng Nguyễn Tiến Phát</h6>
                      <div className="text-warning">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted">
                    "Chuyến đi Sapa rất đáng nhớ, cảnh đẹp và văn hóa độc đáo."
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Payment Methods and Quick Contact */}
        <Row className="mt-5 pt-5 border-top border-light border-opacity-10">
          <Col lg={6} md={6}>
            <h4 className="text-primary fw-bold mb-4 animate__animated animate__fadeIn">
              PHƯƠNG THỨC THANH TOÁN
            </h4>
            <div className="d-flex flex-wrap gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                style={{ height: "40px" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                alt="MasterCard"
                style={{ height: "40px" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/MoMo_Logo.png"
                alt="MoMo"
                style={{ height: "40px" }}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/PayPal-Logo.svg"
                alt="PayPal"
                style={{ height: "40px" }}
              />
            </div>
          </Col>
          <Col lg={6} md={6}>
            <h4 className="text-primary fw-bold mb-4 animate__animated animate__fadeIn">
              LIÊN HỆ NHANH
            </h4>
            <Form className="quick-contact-form">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Họ và tên"
                  className="form-control-custom"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="form-control-custom"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tin nhắn của bạn"
                  className="form-control-custom"
                />
              </Form.Group>
              <Button variant="primary" className="quick-contact-btn">
                <FaPaperPlane className="me-2" /> Gửi Tin Nhắn
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom py-4 border-top border-light border-opacity-10">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              © {new Date().getFullYear()}{" "}
              <Link to="/" className="text-primary text-decoration-none">
                Du Lịch Việt Nam
              </Link>
              , All Right Reserved.
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-menu">
                <Link to="/" className="footer-menu-link me-3">
                  Trang Chủ
                </Link>
                <Link to="/cookies" className="footer-menu-link me-3">
                  Cookies
                </Link>
                <Link to="/help" className="footer-menu-link me-3">
                  Trợ Giúp
                </Link>
                <Link to="/faq" className="footer-menu-link">
                  FAQs
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <a
        href="#"
        className={`btn btn-lg btn-primary btn-lg-square back-to-top ${
          showButton ? "show" : ""
        }`}
      >
        <i className="bi bi-arrow-up"></i>
      </a>
    </footer>
  );
}

export default Footer;