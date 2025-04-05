import { Container, Row, Col, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaPlane, FaBus, FaTag, FaUtensils, FaUsers, FaClock } from "react-icons/fa";

const TripInfo = ({ places, transport }) => {
  console.log(transport)
  const transportIcon = transport.toLowerCase().includes("máy bay") 
                        ? <FaPlane size={40} className="text-success mb-2" /> 
                        : <FaBus size={40} className="text-success mb-2" />;

  return (
    <Container className="py-4">
      <h2 className="text-center fw-bold mb-4 text-primary">THÔNG TIN THÊM VỀ CHUYẾN ĐI</h2>
      <Row className="gy-4">

        <Col md={4}>
          <Card className="info-card text-center p-3">
            <FaMapMarkerAlt size={40} className="text-primary mb-2" />
            <Card.Body>
              <Card.Title className="fw-bold">Điểm tham quan</Card.Title>
              <Card.Text>{places}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="info-card text-center p-3">
            {transportIcon}
            <Card.Body>
              <Card.Title className="fw-bold">Phương tiện</Card.Title>
              <Card.Text>{transport}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="info-card text-center p-3">
            <FaTag size={40} className="text-danger mb-2" />
            <Card.Body>
              <Card.Title className="fw-bold">Khuyến mãi</Card.Title>
              <Card.Text>Đã bao gồm trong giá tour</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="info-card text-center p-3">
            <FaUtensils size={40} className="text-warning mb-2" />
            <Card.Body>
              <Card.Title className="fw-bold">Ẩm thực</Card.Title>
              <Card.Text>Buffet sáng, Theo thực đơn</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="info-card text-center p-3">
            <FaUsers size={40} className="text-info mb-2" />
            <Card.Body>
              <Card.Title className="fw-bold">Đối tượng thích hợp</Card.Title>
              <Card.Text>Cặp đôi, Gia đình, Thanh niên, Trẻ em</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="info-card text-center p-3">
            <FaClock size={40} className="text-secondary mb-2" />
            <Card.Body>
              <Card.Title className="fw-bold">Thời gian lý tưởng</Card.Title>
              <Card.Text>Quanh năm</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TripInfo;