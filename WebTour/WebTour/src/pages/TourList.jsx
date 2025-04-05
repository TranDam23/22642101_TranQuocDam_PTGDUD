import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TourCard from "../components/TourCard";
import BreadcrumbNav from "../components/BreadcrumNav";
import SearchFilter from "../components/SearchFilter";

const useQuery = () => new URLSearchParams(useLocation().search);

const TourList = () => {
  const query = useQuery();
  const region = query.get("region");

  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    name: "",  // 🔹 Thêm tìm kiếm theo tên
    price: "",
    departure: "",
    destinationId: "",
    startDate: "",
    transport: "",
    tourType: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:3002/get-tours");
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tour:", error);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    const filtered = tours.filter((tour) => {
      const price = tour.price ? parseInt(tour.price.replace(/[^\d]/g, ""), 10) : 0;
      const tourRegion = tour.region
        ? tour.region.toLowerCase().replace(/\s/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";
  
      const matchesRegion = !region || tourRegion === region;
      const matchesName = !searchFilters.name || tour.name.toLowerCase().includes(searchFilters.name.toLowerCase());  // 🔹 Thêm lọc theo tên
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
  
      return matchesRegion && matchesName && matchesDeparture && matchesDestination && matchesStartDate && matchesTransport && matchesTourType && matchesPrice;
    });
  
    setFilteredTours(filtered);
  }, [tours, region, searchFilters]);
  

  const paginatedTours = useMemo(() => {
    return filteredTours.slice((currentPage - 1) * toursPerPage, currentPage * toursPerPage);
  }, [filteredTours, currentPage]);

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  return (
    <Container className="py-4">
      <BreadcrumbNav />
      <Row>
        <Col md={4}>
          <SearchFilter onSearch={setSearchFilters} />
        </Col>
        <Col md={8}>
          {filteredTours.length > 0 ? (
            <h4 className="text-center text-muted">
              Chúng tôi tìm thấy <strong>{filteredTours.length}</strong> tour du lịch theo nhu cầu của bạn.
            </h4>
          ) : (
            <h4 className="text-center text-warning">Không tìm thấy bất kỳ tour nào!!!</h4>
          )}
          <Row className="mt-3">
            {paginatedTours.map((tour) => (
              <Col key={tour.id} sm={12} md={6} lg={6} className="mb-3">
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item key={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TourList;
