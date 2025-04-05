import React from "react"
import { Card, Row, Col, Image, Button } from "react-bootstrap"
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa"

const TotalTour = ({ tour, img, passengers, price, formatDate, handleNextStep, step}) => {
  return (
    <Card style={{boxShadow: "1px 2px 10px 1px grey"}} className="p-3 mb-2">
      <h4 className="text-center text-primary" >Tóm tắt Tour</h4>
      <Image src={img[0]} style={{ height: "150px", width: "100%", borderRadius: "10px" }} />
      <div className="tour-favourites">{tour.favourites} ❤️</div>
      <Row>
        <h5>Chuyến đi {tour.name}</h5>
        <div><FaClock className="text-primary" /> Thời gian: <b>{tour.duration}</b></div>
        <div><FaCalendarAlt className="text-muted" /> Ngày khởi hành: <b>{formatDate(tour.startDate)}</b></div>
        <div><FaMapMarkerAlt className="text-danger" /> Nơi khởi hành: <b>{tour.departure}</b></div>
        <div><FaDollarSign className="text-success" /> Giá: <b className="text-danger">{tour.price}</b></div>
      </Row>
      <Row className="mt-5">
        <h5>Hành khách: </h5>
        {passengers.adults > 0 && (
          <Row>
            <Col md={7}>Người lớn:</Col>
            <Col md={5}><strong>{passengers.adults} x {price.toLocaleString()}</strong></Col>
          </Row>
        )}
        {passengers.teens > 0 && (
          <Row>
            <Col md={7}>Trẻ từ 10-14:</Col>
            <Col md={5}><strong>{passengers.teens} x {(price * 0.8).toLocaleString()}</strong></Col>
          </Row>
        )}
        {passengers.childrens > 0 && (
          <Row>
            <Col md={7}>Trẻ nhỏ:</Col>
            <Col md={5}><strong>{passengers.childrens} x {(price * 0.5).toLocaleString()}</strong></Col>
          </Row>
        )}
        {passengers.babies > 0 && (
          <Row>
            <Col md={7}>Em bé:</Col>
            <Col md={5}><strong>{passengers.babies} (Miễn phí)</strong></Col>
          </Row>
        )}
        <div>Tiền phòng:</div>
      </Row>
      <Row className="mt-5 mb-5 text-success">
        <h5>Tổng tiền: </h5>
        <h5 className="text-danger">
          {(passengers.adults * price + passengers.teens * price * 0.8 + passengers.childrens * price * 0.5).toLocaleString()} VNĐ
        </h5>
      </Row>
      {step === 1 && (
        <Button variant="primary" onClick={handleNextStep}>
          Thanh toán
        </Button>
      )}
    </Card>
  )
}

export default TotalTour;