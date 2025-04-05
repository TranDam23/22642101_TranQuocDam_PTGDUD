import React from "react"
import { Row, Col, Card, InputGroup, Form, Button } from "react-bootstrap"
import { FaMinus, FaPlus } from "react-icons/fa"

const PassengerNumber = ({ passengers, handlePassengersChange }) => {
  return (
    <Card style={{boxShadow: "1px 2px 10px 1px grey"}} className="p-4 mb-4">
      <h4 className="text-center text-primary">HÀNH KHÁCH</h4>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text style={{ width: "100%", fontSize: "18px"}}>Người lớn: từ 15 tuổi</InputGroup.Text>
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("adults", "decrease")} style={{ borderRadius: "10px" }}>
              <FaMinus />
            </Button>
            <Form.Control value={passengers.adults} readOnly className="text-center" />
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("adults", "increase")} style={{ borderRadius: "10px" }}>
              <FaPlus />
            </Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text style={{ width: "100%", fontSize: "18px"}}>Trẻ từ 10 đến 14</InputGroup.Text>
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("teens", "decrease")} style={{ borderRadius: "10px" }}>
              <FaMinus />
            </Button>
            <Form.Control value={passengers.teens} readOnly className="text-center" />
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("teens", "increase")} style={{ borderRadius: "10px" }}>
              <FaPlus />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text style={{ width: "100%", fontSize: "18px"}}>Trẻ nhỏ: từ 4 đến 9 tuổi</InputGroup.Text>
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("childrens", "decrease")} style={{ borderRadius: "10px" }}>
              <FaMinus />
            </Button>
            <Form.Control value={passengers.childrens} readOnly className="text-center" />
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("childrens", "increase")} style={{ borderRadius: "10px" }} >
              <FaPlus />
            </Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text style={{ width: "100%", fontSize: "18px" }}>Em bé</InputGroup.Text>
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("babies", "decrease")} style={{ borderRadius: "10px" }}>
              <FaMinus />
            </Button>
            <Form.Control value={passengers.babies} readOnly className="text-center" />
            <Button variant="outline-secondary" onClick={() => handlePassengersChange("babies", "increase")} style={{ borderRadius: "10px" }}>
              <FaPlus />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Card>
  )
}

export default PassengerNumber;