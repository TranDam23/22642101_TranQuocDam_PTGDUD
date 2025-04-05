import React, { useState, useEffect } from "react";

import { Carousel, Modal, Row, Col, Image } from "react-bootstrap";


const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Tự động chạy carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);

    }, 3000); // 3 giây


    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  return (
    <div>
      <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} interval={null}>

        {images.map((_, idx) => {
          
          const slideImages = [
            images[idx % images.length],
            images[(idx + 1) % images.length],
          ];

          return (
            <Carousel.Item key={idx}>
              <Row className="justify-content-center">
                {slideImages.map((img, imgIdx) => (
                  <Col key={imgIdx} md={6} className="mb-3">
                    <Image src={img} alt={`Image ${idx + imgIdx + 1}`}
                      style={{ width: "100%", height: "300px", objectFit: "cover", cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(img)}
                    />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          );
        })}

      </Carousel>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          {selectedImage && (
            <img src={selectedImage} alt="Full view" style={{ width: "100%", height: "auto" }} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageSlider;