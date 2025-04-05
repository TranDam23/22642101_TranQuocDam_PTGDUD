import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import TourCardBooked from "../components/TourCardBooked";
import BreadcrumbNav from "../components/BreadcrumNav";
import SearchFilter from "../components/SearchFilter";
import BookingCard from "./BookingCard";
const useQuery = () => new URLSearchParams(useLocation().search);

const TourBooked = () => {
  const { userID } = useParams();
  const query = useQuery();
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]); // Thay listTour bằng state
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    price: "",
    departure: "",
    destinationId: "",
    startDate: "",
    transport: "",
    tourType: "",
  });
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:3002/get-tours");
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tour:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3002/get-tour-booking-user/${userID}`);
        const data = await response.json();
        setBookings(data);
        
        console.log("Số lượng bookings:", data.length);
        const bookedTours = tours.filter(tour =>
          data.some(booking => booking.tourID === tour.id)
        );
        setFilteredTours(bookedTours);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userID && tours.length > 0) {
      fetchBookings();
    }
  }, [userID, tours]); // Chạy lại khi danh sách tours thay đổi

  const searchFilteredTours = useMemo(() => {
    return filteredTours.filter(tour => {
      const price = parseInt(tour.price.replace(/[^\d]/g, ""), 10);
      const matchesDeparture = !searchFilters.departure || tour.departure === searchFilters.departure;
      const matchesDestination = !searchFilters.destinationId || tour.destinationId === parseInt(searchFilters.destinationId);
      const matchesStartDate = !searchFilters.startDate || tour.startDate === searchFilters.startDate;
      const matchesTransport = !searchFilters.transport || tour.transport === searchFilters.transport;
      const matchesTourType = !searchFilters.tourType || tour.tourType === searchFilters.tourType;
      const matchesPrice =
        !searchFilters.price ? true :
        searchFilters.price === "under-5m" ? price < 5000000 :
        searchFilters.price === "5-10m" ? price >= 5000000 && price <= 10000000 :
        searchFilters.price === "10-20m" ? price >= 10000000 && price <= 20000000 :
        searchFilters.price === "over-20m" ? price > 20000000 : true;

      return matchesDeparture && matchesDestination && matchesStartDate && matchesTransport && matchesTourType && matchesPrice;
    });
  }, [filteredTours, searchFilters]);

  const toursPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedTours = searchFilteredTours.slice((currentPage - 1) * toursPerPage, currentPage * toursPerPage);
  const totalPages = Math.ceil(searchFilteredTours.length / toursPerPage);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <SearchFilter></SearchFilter>
        </Col>
        <Col md={8}>
          {bookings.length > 0 ? (
            <h4 className="text-center text-muted">
              Bạn đã đặt <strong>{bookings.length}</strong> tour.
            </h4>
          ) : (
            <h4 className="text-center text-warning">Bạn chưa đặt tour nào!</h4>
          )}
          <Row className="mt-3">
            {bookings.map(tour => (
                <Col key={tour.bookingID} sm={12} md={4} lg={4} className="mb-3 d-flex">
                <BookingCard booking={tour} className="h-100 d-flex flex-column" />
              </Col>
            ))}
          </Row>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TourBooked;
