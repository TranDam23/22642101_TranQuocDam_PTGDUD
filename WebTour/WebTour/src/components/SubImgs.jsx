import React from "react";
import { Row, Col, Image } from "react-bootstrap";

const SubImgs = ({ images, onImageClick }) => {
  const maxVisibleImages = 3;
  const subImages = Array.isArray(images) ? images.slice(1) : []; 

  return (
    <Row className="mb-4 mt-2" style={{ cursor: "pointer" }}>
      {subImages.slice(0, maxVisibleImages).map((img, index) => (
        <Col key={index} xs={6} md={4} className="mb-3">
          <Image style={{height: "150px"}} src={img} className="rounded w-100" onClick={() => onImageClick(img)} alt={`Sub image ${index + 1}`}/>
        </Col>
      ))}
    </Row>
  );
};

export default SubImgs;