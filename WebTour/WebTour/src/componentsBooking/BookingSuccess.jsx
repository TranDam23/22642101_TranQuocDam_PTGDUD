import React, {useState, useEffect} from "react"
import { Card, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import {FaCheck} from "react-icons/fa"

const BookingSuccess = ({ booking }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [])

  return (
    <Card className="p-4 mb-4" style={{ fontSize: "20px" }}>
        {loading ? (
            <div className="text-center">
            <img src="/imgs/success.gif" alt="Loading..." width={200} />
            <p>Đang xử lý, vui lòng chờ...</p>
            </div>
        ) : (
            <>
            <h4 className="text-success text-center mb-4">Đặt Tour Thành Công! <FaCheck className="success"/></h4>
                <p className="text-center mb-4">
                    Cảm ơn bạn đã đặt tour {booking.tour.name}. Nhân viên sẽ kiểm tra và liên hệ qua số {booking.customer.phone} sớm nhất có thể.
                </p>
                <Row>
                    <Col md={6}>
                    <div className="mb-4"><strong>Mã tour:</strong> {booking.bookingID}</div>
                    <div className="mb-2"><strong>Khách hàng:</strong> {booking.customer.name}</div>
                    <div className="mb-2"><strong>Ngày sinh:</strong> {booking.customer.dateBirth}</div>
                    <div className="mb-2"><strong>Số điện thoại:</strong> {booking.customer.phone}</div>
                    <div className="mb-2"><strong>Email:</strong> {booking.customer.email}</div>
                    <div className="mb-2"><strong>Địa chỉ:</strong> {booking.customer.address || "Không có"}</div>
                    <div className="mb-2">
                        <strong>Giới tính:</strong>{" "}
                        {booking.customer.gender === "male" ? "Nam" : booking.customer.gender === "female" ? "Nữ" : "Khác"}
                    </div>
                    </Col>

                    <Col md={6}>
                    <div className="mb-4"><strong>Tour:</strong> {booking.tour.name}</div>
                    <div className="mb-2"><strong>Ghi chú:</strong> {booking.customer.notes || "Không có"}</div>
                    <div className="mb-2">
                        <strong>Hành khách:</strong>
                        <ul className="list-unstyled mb-0">
                        <li>Người lớn: {booking.passengers.adults}</li>
                        <li>Trẻ từ 10-14: {booking.passengers.teens}</li>
                        <li>Trẻ nhỏ: {booking.passengers.childrens}</li>
                        <li>Em bé: {booking.passengers.babies}</li>
                        </ul>
                    </div>
                    <div className="mb-2"><strong>Thời gian đặt:</strong> {new Date(booking.createdAt).toLocaleString("vi-VN")}</div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={6}>
                    <div className="mb-2"><strong>Phương thức thanh toán:</strong> {booking.paymentMethod}</div>
                    </Col>
                    <Col md={6}>
                    <div className="mb-2"><strong>Tổng tiền:</strong> {booking.totalPrice.toLocaleString()} VNĐ</div>
                    </Col>
                </Row>
                <div className="text-center mt-4">
                    <Link to="/">
                    <Button variant="primary">Quay về trang chủ</Button>
                    </Link>
                </div>
            </>
        )}
    </Card>
  )
}

export default BookingSuccess;