import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import TourCard from "./TourCard";

const RelatedTours = ({ currentTour }) => {
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedTours = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/get-tours?region=${currentTour.region}&exclude=${currentTour.id}`
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu tour liên quan");
        }
        const data = await response.json();
        setRelatedTours(data.slice(0, 3)); // Lấy tối đa 3 tour liên quan
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedTours();
  }, [currentTour]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (relatedTours.length === 0) return <p>Không có tour liên quan nào.</p>;

  return (
    <Row>
      {relatedTours.map((tour) => (
        <Col key={tour.id} sm={12} md={4} className="mb-3">
          <TourCard tour={tour} />
        </Col>
      ))}
    </Row>
  );
};

export default RelatedTours;
