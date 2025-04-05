import { Accordion, Container, Row, Col } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const NoticeInfo = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header><FaInfoCircle className="me-2" /> Giá tour bao gồm</Accordion.Header>
              <Accordion.Body>
                Bao gồm các chi phí như ăn uống, vé tham quan, khách sạn,...
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header><FaInfoCircle className="me-2" /> Giá tour không bao gồm</Accordion.Header>
              <Accordion.Body>
                Không bao gồm các chi phí cá nhân, mua sắm, tip hướng dẫn viên,...
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header><FaInfoCircle className="me-2" /> Điều kiện thanh toán</Accordion.Header>
              <Accordion.Body>
                0
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col md={6}>
          <Accordion>
            <Accordion.Item eventKey="3">
              <Accordion.Header><FaInfoCircle className="me-2" /> Lưu ý về vé chuyến hoặc hủy tour</Accordion.Header>
              <Accordion.Body>
                Vé tour có thể đổi lịch hoặc hủy theo chính sách hoàn tiền.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header><FaInfoCircle className="me-2" /> Các điều kiện hủy tour </Accordion.Header>
              <Accordion.Body>
                Hủy trước 7 ngày được hoàn 100%, hủy trước 3 ngày hoàn 50%, sát ngày không hoàn.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header><FaInfoCircle className="me-2" /> Liên hệ</Accordion.Header>
              <Accordion.Body>
                Hotline: 0909 OXYOXY - Email: nguyentheanh@gmail.com
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default NoticeInfo;