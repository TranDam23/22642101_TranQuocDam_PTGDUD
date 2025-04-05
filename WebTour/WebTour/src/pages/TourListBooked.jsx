import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TourCardBooked from "../components/TourCardBooked";
import BreadcrumbNav from "../components/BreadcrumNav";
import listTour from "../data/tours";
import destinations from "../data/destinations";

const useQuery = () => new URLSearchParams(useLocation().search);

const TourListBooked = () => {
  const query = useQuery();
  const region = query.get("region");

  const [bookings, setBookings] = useState([]);

  // Lấy userID từ localStorage
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3002/get-bookings/${userID}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bookings:", error);
      }
    };

    if (userID) {
      fetchBookings();
    }
  }, [userID]);

  // Lọc tour theo khu vực
  const regionFilteredTours = useMemo(() => {
    return region
      ? listTour.filter(
          (tour) =>
            tour.region
              .toLowerCase()
              .replace(/\s/g, "-")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") === region
        )
      : listTour;
  }, [region]);

  // Kết hợp thông tin điểm đến với tour
  const toursWithDestination = useMemo(() => {
    return regionFilteredTours.map((tour) => ({
      ...tour,
      destination:
        destinations.find((dest) => dest.id === tour.destinationId) || {
          name: "Không xác định",
          description: "",
        },
      booking: bookings.find((b) => b.tourID === tour.id) || null, // Gán thông tin booking cho tour
    }));
  }, [regionFilteredTours, bookings]);

  const toursPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedTours = toursWithDestination.slice(
    (currentPage - 1) * toursPerPage,
    currentPage * toursPerPage
  );
  const totalPages = Math.ceil(toursWithDestination.length / toursPerPage);



  return (
    <Container className="py-4">
      <BreadcrumbNav />
      <Col md={12}>
        {bookings.length > 0 ? (
          <h4 className="text-center text-muted">
            Bạn đã đặt <strong>{bookings.length}</strong> tour.
          </h4>
        ) : (
          <h4 className="text-center text-warning">Không có tour nào đã đặt!</h4>
        )}
        <Row className="mt-3">
          {paginatedTours.map((tour) => (
            tour.booking && (
              <Col key={tour.id} sm={12} md={6} lg={6} className="mb-3">
                <TourCardBooked tour={tour}  />
              </Col>
            )
          ))}
        </Row>
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </Col>
    </Container>
  );
};

export default TourListBooked;
