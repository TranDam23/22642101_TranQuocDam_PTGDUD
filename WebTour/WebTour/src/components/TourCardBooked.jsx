import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaClock, FaEye, FaTimes } from "react-icons/fa";

const API_BASE_URL = "http://localhost:3002"; // Cập nhật URL API của bạn

const TourCardBooked = ({ tourId }) => {
  const [tour, setTour] = useState(null);
  const [tourImage, setTourImage] = useState(null);
  const [booking, setBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const userData = localStorage.getItem("user");
  const userID = userData ? JSON.parse(userData).userID : null;

  useEffect(() => {
    const fetchTourAndBooking = async () => {
      if (!userID || !tourId) return;

      try {
        const tourResponse = await fetch(`${API_BASE_URL}/get-tour/${tourId}`);
        const bookingResponse = await fetch(`${API_BASE_URL}/get-booking/${userID}/${tourId}`);
        const imageResponse = await fetch(`${API_BASE_URL}/get-tour-image/${tourId}`);
        const tourData = await tourResponse.json();
        const bookingData = await bookingResponse.json();
        const imageData = await imageResponse.json();
        if (tourResponse.ok) setTour(tourData);
        if (bookingResponse.ok) setBooking(bookingData);
        if (imageResponse.ok) setTourImage(imageData.images?.[0] || "/imgs/default.jpg");
        console.log("Hinh anh: ", imageData.images?.[0] );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tour hoặc booking:", error);
      }
    };

    fetchTourAndBooking();
  }, [userID, tourId]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("vi-VN");

  const handleCancelBooking = async () => {
    if (!booking || !booking.bookingID) {
      alert("Lỗi: Không tìm thấy ID booking.");
      return;
    }

    if (!window.confirm("Bạn có chắc muốn hủy tour này?")) return;
    setIsCancelling(true);

    try {
      const response = await fetch(`${API_BASE_URL}/delete-booking/${booking.bookingID}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setBooking({ ...booking, status: "cancelled" });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi hủy booking:", error);
      alert("Lỗi khi hủy booking. Vui lòng thử lại.");
    } finally {
      setIsCancelling(false);
    }
  };

  const renderStatusButton = (status) => {
    const statusMap = {
      pending: { variant: "warning", text: "Đang chờ xác nhận" },
      confirmed: { variant: "success", text: "Đã xác nhận" },
      cancelled: { variant: "danger", text: "Đã hủy" },
    };
    const { variant, text } = statusMap[status] || { variant: "secondary", text: "Không rõ trạng thái" };
    return <Button variant={variant} disabled>{text}</Button>;
  };

  if (!tour || !booking) return null; // Chờ tải dữ liệu

  return (
    <Card className="tour-card shadow">
      <div className="position-relative">
        <Link to={`/tours/${tour.id}`}>
          <Card.Img src={tourImage} alt={tour.name} />
        </Link>
      </div>
      <Card.Body>
        <h5>{tour.name}</h5>
        <div><FaClock className="text-primary" /> Thời gian: <b>{tour.duration}</b></div>
        <div><FaCalendarAlt className="text-muted" /> Ngày khởi hành: <b>{formatDate(tour.startDate)}</b></div>
        <div><FaMapMarkerAlt className="text-danger" /> Nơi khởi hành: {tour.departure}</div>
        <div><FaDollarSign className="text-success" /> Giá: <b className="text-danger">{tour.price}</b></div>
      </Card.Body>
      <div className="d-flex justify-content-between p-3">
        {renderStatusButton(booking.status)}
        <div>
          <Link to={`/tours/${tour.tourID}`}>
            <Button variant="warning m-1">
              <FaEye /> Xem thêm
            </Button>
          </Link>
          {booking.status !== "cancelled" && (
            <Button
              variant="danger m-1"
              onClick={handleCancelBooking}
              disabled={isCancelling}
            >
              <FaTimes /> {isCancelling ? "Đang hủy..." : "Hủy tour"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TourCardBooked;
