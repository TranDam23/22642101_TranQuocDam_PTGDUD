import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaClock, FaEye } from "react-icons/fa";
import TourCardBooked from "./TourCardBooked";
const API_BASE_URL = "http://localhost:3002"; // Cập nhật URL API của bạn

const BookingCard = ({ booking }) => {
  const [tour, setTour] = useState(null);
  const [tourImage, setTourImage] = useState(null);
  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourAndBookingDetail = async () => {
      try {
        // Fetch tour data
        const tourResponse = await fetch(`${API_BASE_URL}/get-tour/${booking.tourID}`);
        const tourData = await tourResponse.json();
        if (tourResponse.ok) setTour(tourData);
        else setError("Không tìm thấy thông tin tour.");

        // Fetch booking details
        const bookingResponse = await fetch(`${API_BASE_URL}/get-booking-detail/${booking.bookingID}`);
        const bookingData = await bookingResponse.json();
        if (bookingResponse.ok) setBookingDetail(bookingData);
        else setError("Không tìm thấy chi tiết đặt tour.");

        // Fetch tour image
        const imageResponse = await fetch(`${API_BASE_URL}/get-tour-image/${booking.tourID}`);
        const imageData = await imageResponse.json();
        if (imageResponse.ok) {
          setTourImage(imageData.images?.[0] || "/imgs/default.jpg");
        } else {
          setTourImage("/imgs/default.jpg"); // Ảnh mặc định nếu không có ảnh tour
        }
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu từ API.");
      } finally {
        setLoading(false);
      }
    };

    fetchTourAndBookingDetail();
  }, [booking.bookingID, booking.tourID]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Card className="booking-card shadow">
      <Card.Body>
        <h5>Booking ID: {booking.bookingID}</h5>
        <p>Trạng thái: <strong>{booking.status}</strong></p>
        <p>Tổng tiền: <strong>{booking.totalPrice.toLocaleString()} VND</strong></p>
        <hr />
        <h6>Chi tiết:</h6>
        <p>Khách hàng: {bookingDetail.travelerName}</p>
        <p>Số người: {bookingDetail.numPeople}</p>
        <p>Ngày đi: {bookingDetail.departureTime}</p>
        <p>Ngày về: {bookingDetail.returnTime}</p>
        <p>Phương tiện: {bookingDetail.transportation}</p>
      </Card.Body>

      <Card.Footer>
         <TourCardBooked tourId={tour.tourID}></TourCardBooked>
      </Card.Footer>
    </Card>
  );
};

export default BookingCard;
