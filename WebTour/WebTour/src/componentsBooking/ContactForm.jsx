import React from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import {FaUser, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaVenusMars, FaEnvelope} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const ContactForm = ({ formData, errors, handleInputChange, validateField }) => {
  return (
    <Card style={{boxShadow: "1px 2px 10px 1px grey", background: "silver"}} className="p-4 mb-4 fs-5">
      <h4 className="text-center text-primary">THÔNG TIN LIÊN LẠC</h4>
      
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label> <FaUser /> Họ và tên <span className="text-danger">*</span></Form.Label>
            <Form.Control placeholder="Nhập họ tên" name="name" value={formData.name} onChange={handleInputChange}
              onBlur={(e) => validateField("name", e.target.value)}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </Col>
          <Col md={6}>
            <Form.Label> <FaPhone /> Số điện thoại <span className="text-danger">*</span></Form.Label>
            <Form.Control placeholder="Nhập số điện thoại" name="phone" value={formData.phone} onChange={handleInputChange}
              onBlur={(e) => validateField("phone", e.target.value)}
            />
            {errors.phone && <span className="text-danger">{errors.phone}</span>}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label><FaMapMarkerAlt /> Địa chỉ</Form.Label>
            <Form.Control placeholder="Nhập địa chỉ" name="address" value={formData.address} onChange={handleInputChange}
              onBlur={(e) => validateField("address", e.target.value)}
            />
            {errors.address && <span className="text-danger">{errors.address}</span>}
          </Col>
          <Col md={6}>
            <Form.Label><FaEnvelope /> Email <span className="text-danger">*</span></Form.Label>
            <Form.Control placeholder="Nhập email" name="email" value={formData.email} onChange={handleInputChange}
              onBlur={(e) => validateField("email", e.target.value)}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label><FaCalendarAlt /> Ngày sinh <span className="text-danger">*</span></Form.Label>
            <Form.Control type="date" placeholder="dd/mm/yyyy" name="dateBirth" value={formData.dateBirth} onChange={handleInputChange}
              onBlur={(e) => validateField("dateBirth", e.target.value)}
            />
            {errors.dateBirth && <span className="text-danger">{errors.dateBirth}</span>}
          </Col>
          <Col md={6}>
            <Form.Label><FaVenusMars />Giới tính <span className="text-danger">*</span> </Form.Label>
            <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}
              onBlur={(e) => validateField("gender", e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </Form.Select>
            {errors.gender && <span className="text-danger">{errors.gender}</span>}
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default ContactForm;