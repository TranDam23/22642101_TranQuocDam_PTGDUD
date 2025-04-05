import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";

const BookingTour = () => {
  const [adultCount, setAdultCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(2190000);
  
  const handleAdultChange = (type) => {
    let newCount = adultCount;
    if (type === "increase") newCount++;
    if (type === "decrease" && newCount > 1) newCount--;
    setAdultCount(newCount);
    setTotalPrice(1690000 * newCount + 500000);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">ĐẶT TOUR</h2>
      <Row>
        <Col md={8}>
          <Card className="p-4 mb-4">
            <h5>THÔNG TIN LIÊN LẠC</h5>
            <Form>
              <Row className="mb-3">
                <Col md={6}><Form.Control placeholder="Họ tên *" /></Col>
                <Col md={6}><Form.Control placeholder="Điện thoại *" /></Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><Form.Control placeholder="Email *" /></Col>
                <Col md={6}><Form.Control placeholder="Địa chỉ" /></Col>
              </Row>
            </Form>
          </Card>

          <Card className="p-4 mb-4">
            <h5>HÀNH KHÁCH</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text>Người lớn (12+)</InputGroup.Text>
              <Button variant="outline-secondary" onClick={() => handleAdultChange("decrease")}><FaMinus /></Button>
              <Form.Control value={adultCount} readOnly className="text-center" />
              <Button variant="outline-secondary" onClick={() => handleAdultChange("increase")}><FaPlus /></Button>
            </InputGroup>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-4">
            <h5>TÓM TẮT CHUYẾN ĐI</h5>
            <p>Khởi hành: <strong>TP. Hồ Chí Minh</strong></p>
            <p>Thời gian: <strong>2N1Đ</strong></p>
            <p><strong>Khách hàng + Phụ thu</strong></p>
            <p>Người lớn: {adultCount} x 1.690.000 ₫</p>
            <p>Phụ thu phòng đơn: 500.000 ₫</p>
            <h4 className="text-danger">Tổng tiền: {totalPrice.toLocaleString()} ₫</h4>
            <Button variant="primary" className="w-100">Tiếp tục</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingTour;