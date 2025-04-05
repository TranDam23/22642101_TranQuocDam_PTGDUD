import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Image, Card, Modal } from "react-bootstrap";
import axios from "axios";  // Import axios
import RelatedTours from "../components/RelatedTours";
import CustomerReviews from "../components/CustomerReviews";
import ImageSlider from "../components/ImageSlider";
import BreadcrumbNav from "../components/BreadcrumNav";
import TourMap from "../components/TourMap";
import TourFAQs from "../components/TourFAQs";
import TripInfo from "../components/TripInfo";
import NoticeInfo from "../components/NoticeInfo";
import SubImgs from "../components/SubImgs";

const TourDetail = () => {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [destination, setDestination] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const [tourRes, imagesRes, destinationRes] = await Promise.all([
          axios.get(`http://localhost:3002/get-tour/${id}`),
        axios.get(`http://localhost:3002/get-tour-image/${id}`),
        axios.get(`http://localhost:3002/get-destination/${id}`)
        ]);

        setTour(tourRes.data);
        setImages(imagesRes.data.images || []);
        setDestination(destinationRes.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchTourData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!tour) {
    return <h2 className="text-center">Tour không tồn tại!</h2>;
  }
  console.log("Tour data:", tour);
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <BreadcrumbNav tour={tour} />
        <Col md={8}>
          <Row className="position-relative" style={{ cursor: "pointer" }}>
            <Image
              src={images[0] || "/imgs/default.jpg"}
              className="mainImg"
              onClick={() => { setSelectedImage(images[0]); setShowModal(true); }}
            />
            <div>
              <span className="tour-favourite">{tour.favourites}❤️</span>
            </div>
          </Row>

          <SubImgs
            images={images}
            onImageClick={(img) => {
              setSelectedImage(img);
              setShowModal(true);
            }}
          />

          <Row className="mb-4" style={{ fontSize: "25px" }}>
            <h2 className="text-primary">Tour du lịch {tour.name}</h2>
            <hr />
            <Card className="mb-2 shadow" bg="light">
              <b>Mô tả:</b>
              <p>{destination?.description || "Chưa có thông tin mô tả"}</p>
            </Card>

            <Col>
              <p><strong>Thời gian:</strong> {tour.duration}</p>
              <p><strong>Dòng tour:</strong> {tour.tourType}</p>
            </Col>
            <Col>
              <p><strong>Điểm khởi hành:</strong> {tour.departure}</p>
              <p><strong>Ngày khởi hành:</strong> {tour.startDate}</p>
            </Col>
          </Row>

          <Row>
            <img src="/imgs/fly.webp" alt="Fly" style={{ width: "100%", height: "300px", borderRadius: "20px" }} />
          </Row>
          <Row>
            <TourMap location={tour.name} />
          </Row>
          <Row>
            <TripInfo places={destination?.name} transport={tour.transport} />
          </Row>
        </Col>

        <Col md={4}>
          <div style={{ top: "100px" }} className="position-sticky">
            <Card className="p-3 shadow">
              <h3 className="text-danger">Giá: {tour.price}</h3>

              <Button variant="success" size="lg" className="w-100 mt-3" as={Link} to={`/booking/${tour.tourID}`}>
                Đặt Tour Ngay
              </Button>
            </Card>
            <img src="/imgs/corgi.webp" alt="Price highlight" width={200} />
          </div>
        </Col>
      </Row>

      <hr />
      {images.length > 0 && (
        <Row className="mb-5">
          <Col>
            <h3 className="mb-3 text-primary">Hình ảnh nổi bật</h3>
            <ImageSlider images={images} />
          </Col>
        </Row>
      )}

      <Row className="mb-5">
        <Col>
          <h3 className="mb-3 text-primary">Đánh giá từ khách hàng</h3>
          <CustomerReviews tourId={tour.id} />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3 className="mb-3 text-primary">Hỏi đáp thường gặp</h3>
          <TourFAQs
            faqs={[
              { question: "Lịch trình có thể thay đổi không?", answer: "Lịch trình có thể thay đổi tùy thuộc vào thời tiết và tình hình thực tế." },
              { question: "Tour có bao gồm bảo hiểm không?", answer: "Tour đã bao gồm bảo hiểm du lịch với mức bảo hiểm tối đa 50 triệu VNĐ." },
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="text-center fw-bold mb-1 text-warning">NHỮNG THÔNG TIN CẦN LƯU Ý</h2>
          <NoticeInfo />
        </Col>
      </Row>

      <hr />
      <Row className="mb-5">
        <Col>
          <h3 className="mb-3 text-primary">Các tour liên quan</h3>
          <RelatedTours currentTour={tour} />
        </Col>
      </Row>

      <img src="/imgs/travelBus.webp" alt="Fly" style={{ width: "100%", height: "300px", borderRadius: "20px" }} />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>Ảnh chụp {tour.name}</Modal.Header>
        <Modal.Body className="p-0">
          {selectedImage && <img src={selectedImage} alt="Full view" className="w-100" />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TourDetail;
