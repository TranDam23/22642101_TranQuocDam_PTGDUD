import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DestinationGrid from "../components/DestinationGrid";
import SearchBox from "../components/SearchBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TourCard from "../components/TourCard";

const Home = () => {
  const [searchFilters, setSearchFilters] = useState({}); // 🔹 Thêm state này
  const [error, setError] = useState("");
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:3002/get-tours");
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu tours");
        }
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTours();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleClick = (id) => {
    navigate("/list-tour");
  };

  if (error) {
    return (
      <Container className="text-center py-5">
        <h1>Lỗi</h1>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <div className="m-0 p-0 position-relative">
      <div className="position-relative">
        <img 
          src="/home/anh-home.png" 
          alt="Du lịch tuyệt vời" 
          className="img-fluid"
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
        {/* 🔹 Fix lỗi: Thêm setSearchFilters vào SearchBox */}
        <SearchBox  />
      </div>

      <div style={{ marginTop: "80px" }}></div>

      <Container className="text-center py-5">
        <h1 className="text-primary fw-bold">🌍 Chào mừng bạn đến với Travel! ✈️</h1>
        <p className="text-muted">
          Khám phá những điểm đến thú vị, ưu đãi hấp dẫn và tin tức du lịch mới nhất.  
          <strong>Đặt chân đến những vùng đất mới, tận hưởng khoảnh khắc đáng nhớ và lưu giữ những kỷ niệm tuyệt vời cùng chúng tôi!</strong>  
        </p>
      </Container>

      <div className="container py-4">
        <h1 className="text-primary fw-bold" style={{textAlign:"center"}}>Du lịch – Trải nghiệm và Khám phá!</h1>
        <p className="text-muted">
          Du lịch không chỉ là một hành trình khám phá những vùng đất mới, mà còn mang lại vô số lợi ích. 
          Nó giúp bạn thư giãn, mở mang tầm nhìn, kết nối với những nền văn hóa đa dạng, 
          và mang lại những kỷ niệm đáng nhớ. Hãy cùng Travel.com.vn lên kế hoạch cho chuyến đi trong mơ của bạn!
        </p>
        <Slider {...settings}>
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id}>
              <img 
                src={`/home/tour${id}.png`} 
                alt={`Tour ${id}`} 
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%", height: "250px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => handleClick(id)}
              />
            </div>
          ))}
        </Slider>
      </div>

      <Container className="py-4">
        <h2 className="text-center text-primary fw-bold mb-4">Tour Nổi Bật</h2>
        <p className="text-center text-muted">
          Dưới đây là những tour du lịch nổi bật, được nhiều du khách lựa chọn nhất. 
          Hãy khám phá ngay những hành trình thú vị, điểm đến hấp dẫn và ưu đãi cực tốt!
        </p>
        <Row>
          {tours.slice(0, 3).map((tour) => (
            <Col key={tour.id} sm={12} md={4} className="mb-3">
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>

      <DestinationGrid />

    </div>
  );
};

export default Home;
