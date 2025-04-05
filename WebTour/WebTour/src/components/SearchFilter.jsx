import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaBus, FaMapMarkerAlt, FaLocationArrow, FaDollarSign, FaCalendarAlt, FaRoute } from 'react-icons/fa';

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    price: "",
    departure: "",
    destinationId: "",
    startDate: "",
    transport: "",
    tourType: "",
  });

  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:3002/get-destinations");
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách điểm đến:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleButtonSelect = (name, value) => setFilters(prev => ({ ...prev, [name]: prev[name] === value ? "" : value }));
  const handleSearch = () => onSearch(filters);

  const departureOptions = ["TP.HCM", "Hà Nội", "Hải Phòng", "Cần Thơ", "Đà Nẵng", "Hồ Chí Minh", "Nha Trang"];
  const transportOptions = ["Máy bay", "Ô tô", "Tàu"];
  const tourTypeOptions = ["Nghỉ dưỡng", "Khám phá", "Văn hóa"];

  return (
    <Card className="fil p-3 position-sticky" style={{ top: "20px" }}>
      <h2 className="text-primary">Tìm kiếm tour</h2>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label><FaLocationArrow className="text-primary" /> Điểm đến</Form.Label>
          <Form.Select name="destinationId" value={filters.destinationId} onChange={handleChange}>
            <option value="">Chọn</option>
            {destinations.map(destination => (
              <option key={destination.id} value={destination.id}>{destination.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label><FaMapMarkerAlt className="text-danger" /> Nơi khởi hành</Form.Label>
          <Form.Select name="departure" value={filters.departure} onChange={handleChange}>
            <option value="">Chọn</option>
            {departureOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label><FaDollarSign className="text-success" /> Giá</Form.Label>
          <Form.Select name="price" value={filters.price} onChange={handleChange}>
            <option value="">Chọn</option>
            <option value="under-5m">Dưới 5 triệu</option>
            <option value="5-10m">5 - 10 triệu</option>
            <option value="10-20m">10 - 20 triệu</option>
            <option value="over-20m">Trên 20 triệu</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label><FaCalendarAlt className="text-muted" /> Ngày đi</Form.Label>
          <Form.Control type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label><FaBus className="text-primary" /> Phương tiện</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {transportOptions.map(option => (
              <Button key={option} variant={filters.transport === option ? "primary" : "outline-primary"} onClick={() => handleButtonSelect("transport", option)}>
                {option}
              </Button>
            ))}
          </div>
        </Form.Group>
        
        <Form.Group className="mb-2">
          <Form.Label><FaRoute className="text-success" /> Dòng tour</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {tourTypeOptions.map(option => (
              <Button key={option} variant={filters.tourType === option ? "success" : "outline-success"} onClick={() => handleButtonSelect("tourType", option)}>
                {option}
              </Button>
            ))}
          </div>
        </Form.Group>
        
        <Button className="w-100 mt-3" variant="primary" onClick={handleSearch}>Tìm kiếm</Button>
      </Form>
    </Card>
  );
};

export default SearchFilter;
