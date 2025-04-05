import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaShoppingCart, FaClock, FaEye, FaHeart } from "react-icons/fa";

const TourCard = ({ tour }) => {
  const [tourImages, setTourImages] = useState([]);
  const [favourites, setFavourites] = useState(tour.favourites || 0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchTourImages = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/get-tour-image/${tour.tourID}`);
        setTourImages(response.data.images || []);
        
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu ảnh tour:", error);
      }
    };

    fetchTourImages();
  }, [tour.tourID]);

  const thumbnail = tourImages.length > 0 ? tourImages[0] : "/imgs/default.jpg";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const response = await fetch(`http://localhost:3002/increase-favourite/${tour.tourID}`, {
        method: "POST",
      });

      if (response.ok) {
        setFavourites((prev) => prev + 1);
      } else {
        console.error("Lỗi khi tăng lượt thích");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card className="tour-card shadow">
      <div className="position-relative">
        <Link to={`/tours/${tour.tourID}`}>
          <Card.Img src={thumbnail} alt={tour.name} />
        </Link>
        <div className="tour-favourites" onClick={handleLike} style={{ cursor: "pointer" }}>
          {favourites} <FaHeart color={isLiking ? "gray" : "red"} />
        </div>
        <div className="tour-type">{tour.tourType}</div>
      </div>
      <Card.Body>
        <h5>{tour.name}</h5>
        <div>
          <FaClock className="text-primary" /> Thời gian: <b>{tour.duration}</b>
        </div>
        <div>
          <FaCalendarAlt className="text-muted" /> Ngày khởi hành: <b>{formatDate(tour.startDate)}</b>
        </div>
        <div>
          <FaMapMarkerAlt className="text-danger" /> Nơi khởi hành: {tour.departure}
        </div>
        <div>
          <FaDollarSign className="text-success" /> Giá: <b className="text-danger">{tour.price}</b>
        </div>
      </Card.Body>
      <div className="d-flex justify-content-between p-3">
        <Button variant="danger m-1" as={Link} to={`/booking/${tour.tourID}`}>
          <FaShoppingCart /> Đặt ngay
        </Button>
        <Link to={`/tours/${tour.tourID}`}>
          <Button variant="warning m-1">
            <FaEye /> Xem thêm
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TourCard;
