import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaFax, FaEnvelope } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

function Contact() {
  const [validated, setValidated] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let newErrors = {};
    const data = localStorage.getItem("user");
    const userID = data ? JSON.parse(data).userID : null;
    console.log(userID);
    const formData = {
      type: form.contactType.value,
      name: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      title: form.title.value,
      message: form.content.value,
      userID: userID,
    };

    const requiredFields = ["type", "name", "email", "phone", "title", "message"];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Thông tin bắt buộc";
      }
    });

    if (!recaptchaVerified) {
      newErrors["recaptcha"] = "Vui lòng xác nhận reCAPTCHA";
    }

    setErrors(newErrors);
    setValidated(true);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3002/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Gửi liên hệ thành công!");
          form.reset();
          setRecaptchaVerified(false);
          setValidated(false);
          setErrors({});
        } else {
          alert(`Lỗi: ${result.message}`);
        }
      } catch (error) {
        console.error("Lỗi khi gửi liên hệ:", error);
        alert("Lỗi hệ thống. Vui lòng thử lại sau!");
      }
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
  };

  function OfficeInfo({ title, address, phone, fax, email }) {
    return (
      <div className="mb-4 contact-info-box p-4 bg-light border border-primary-subtle rounded shadow-sm">
        <h4 className="text-primary">{title}</h4>
        <div className="divider bg-primary mb-3"></div>
        {address && (
          <p>
            <FaMapMarkerAlt className="me-2 text-primary" /> {address}
          </p>
        )}
        {phone && (
          <p>
            <FaPhone className="me-2 text-primary" /> Hotline: {phone}
          </p>
        )}
        {fax && (
          <p>
            <FaFax className="me-2 text-primary" /> Fax: {fax}
          </p>
        )}
        {email && (
          <p>
            <FaEnvelope className="me-2 text-primary" /> Email: {email}
          </p>
        )}
      </div>
    );
  }

  function NetworkButtons() {
    const locations = [
      "TP. Hồ Chí Minh",
      "Miền Bắc",
      "Miền Trung",
      "Tây Nguyên",
      "Đồng Nam Bộ",
      "Miền Tây",
      "Nước ngoài",
    ];

    return (
      <div className="d-flex flex-wrap gap-2 mb-3">
        {locations.map((location, index) => (
          <Button
            key={index}
            variant="outline-primary"
            size="sm"
            className="rounded-pill network-btn"
          >
            {location}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <>
      <Container fluid className="contact-container py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="mb-4 text-center animate__animated animate__fadeIn">
              <h2 className="text-primary fw-bold">THÔNG TIN LIÊN LẠC</h2>
              <div className="divider bg-primary mx-auto mb-4"></div>
              <p className="lead text-muted mb-5">
                Để có thể đáp ứng được các yêu cầu và đóng góp ý kiến của quý khách, xin vui lòng điền thông tin bên dưới
              </p>
            </div>

            <div className="contact-form-wrapper p-4 rounded shadow-lg animate__animated animate__zoomIn">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-4" controlId="contactType">
                      <Form.Label className="text-primary fw-bold">
                        Loại thông tin<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select name="contactType" defaultValue="">
                        <option value="">Chọn loại liên hệ</option>
                        <option value="1">Góp ý</option>
                        <option value="2">Phản ánh</option>
                        <option value="3">Khác</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-4" controlId="fullName">
                      <Form.Label className="text-primary fw-bold">
                        Họ tên<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        placeholder="Nhập họ tên"
                        className="form-control-custom"
                      />
                      {errors.name && (
                        <div className="text-danger small">{errors.name}</div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-4" controlId="email">
                      <Form.Label className="text-primary fw-bold">
                        Email<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email"
                        className="form-control-custom"
                      />
                      {errors.email && (
                        <div className="text-danger small">{errors.email}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="phone">
                      <Form.Label className="text-primary fw-bold">
                        Điện thoại<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        className="form-control-custom"
                      />
                      {errors.phone && (
                        <div className="text-danger small">{errors.phone}</div>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="address">
                      <Form.Label className="text-primary fw-bold">
                        Địa chỉ
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ"
                        className="form-control-custom"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="title">
                      <Form.Label className="text-primary fw-bold">
                        Tiêu đề<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tiêu đề"
                        className="form-control-custom"
                      />
                      {errors.title && (
                        <div className="text-danger small">{errors.title}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-4" controlId="content">
                      <Form.Label className="text-primary fw-bold">
                        Nội dung<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Nhập nội dung"
                        className="form-control-custom"
                      />
                      {errors.content && (
                        <div className="text-danger small">{errors.content}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4 align-items-center">
                  <Col md={6}>
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={handleRecaptchaChange}
                      theme="light"
                    />
                    {errors.recaptcha && (
                      <div className="text-danger small mt-2">
                        {errors.recaptcha}
                      </div>
                    )}
                  </Col>
                  <Col md={6} className="text-end">
                    <Button
                      variant="primary"
                      type="submit"
                      className="submit-btn px-4 py-2 fw-bold"
                      size="lg"
                      disabled={!recaptchaVerified}
                    >
                      <i className="fa fa-paper-plane me-2"></i> Gửi ngay
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="contact-info-container py-5 border-top">
        <Container>
          <Row className="mb-4">
            <Col xs={12}>
              <h3 className="text-primary text-center">MẠNG LƯỚI CHI NHÁNH</h3>
              <div className="divider bg-primary mx-auto mb-4"></div>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={6} className="mb-4">
              <OfficeInfo
                title="VĂN PHÒNG CHÍNH"
                address="12 NVB - Go Vap - Tp.HCMHCM"
                phone="012 345 67896789"
                email="ptgdud@iuh"
              />
            </Col>

            <Col lg={4} md={6} className="mb-4">
              <OfficeInfo
                title="CHI NHÁNH MIỀN BẮC"
                address="Hà Nội"
                phone="012 345 6789"
                email="north@iuh"
              />
            </Col>

            <Col lg={4} md={12}>
              <div className="mb-4 p-4 bg-light border border-primary-subtle rounded shadow-sm">
                <h4 className="text-primary">MẠNG LƯỚI CHI NHÁNH</h4>
                <div className="divider bg-primary mb-3"></div>
                <NetworkButtons />
                <p className="mt-3 text-muted">
                  Chúng tôi có mặt tại nhiều tỉnh thành trên cả nước để phục vụ quý khách một cách tốt nhất.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mt-5 pt-3 border-top border-secondary">
            <Col className="text-center text-muted">
              <p>© {new Date().getFullYear()} WebTour. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Contact;