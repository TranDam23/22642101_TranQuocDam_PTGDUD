import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const reviewsData = {
  1: [
    { id: 1, customer: "Nguyễn Văn A", rating: 5, comment: "Tour rất tuyệt vời, hướng dẫn viên nhiệt tình!" },
    { id: 2, customer: "Trần Thị B", rating: 4, comment: "Cảnh đẹp, nhưng thời gian hơi gấp." },
  ],
  2: [
    { id: 1, customer: "Lê Văn C", rating: 5, comment: "Đà Lạt quá đẹp, rất đáng để đi!" },
    { id: 2, customer: "Phạm Thị D", rating: 3, comment: "Dịch vụ ổn, nhưng giá hơi cao." },
  ],
  3: [
    { id: 1, customer: "Nguyễn Thế Anh", rating: 5, comment: "Tour quá đã" },
    { id: 2, customer: "Nguyễn Thế Em", rating: 10, comment: "Ngon, cho 10 sao luôn" },
  ]
};

const CustomerReviews = ({ tourId }) => {
  const reviews = reviewsData[tourId] || reviewsData[3];

  if (reviews.length === 0) {
    return <p className="text-warning">Chưa có đánh giá nào cho tour này!!!</p>;
  }

  return (
    <div>
      <Row>
        {reviews.map((review) => (
          <Col key={review.id} lg={6} md={6} sm={12}>
            <Card className="mb-3 p-3">
              <h6>{review.customer}</h6>
              <p>Đánh giá: {review.rating}/5 ⭐</p>
              <p>{review.comment}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomerReviews;