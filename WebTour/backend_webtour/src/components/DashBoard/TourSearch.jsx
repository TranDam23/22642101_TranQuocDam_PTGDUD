import React, { useState } from 'react';
import axios from 'axios';
import EditTourForm from './EditTourForm';
import '../CSS/SearchTour.css';

function TourSearch({ tours, onEditTour, onSectionChange, setEditingTour }) {
  const [filteredTours, setFilteredTours] = useState(tours);
  const [searchCriteria, setSearchCriteria] = useState({
    destination: '',
    startDateFrom: '',
    startDateTo: '',
    price: '',
    departure: '',
    arrival: '',
    tourType: '',
    region: '',
  });
  const [editingTour, setEditingTourLocal] = useState(null);
  const [notification, setNotification] = useState(null);

  React.useEffect(() => {
    setFilteredTours(tours);
  }, [tours]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3002/search-tours', {
        params: searchCriteria,
      });
      setFilteredTours(response.data);
      setNotification({ type: 'success', message: 'Tìm kiếm tour thành công!' });
    } catch (error) {
      console.error('Error searching tours:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi tìm kiếm tour!' });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleEditTour = (tour) => {
    setEditingTourLocal(tour);
    setEditingTour(tour);
    onSectionChange('edit-tour');
  };

  const handleSaveTour = async (updatedTour) => {
    try {
      onEditTour(updatedTour);
    } catch (error) {
      console.error('Error updating tour:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi cập nhật tour!' });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setEditingTourLocal(null);
    setEditingTour(null);
    onSectionChange('tour-search');
  };

  return (
    <div className="search-tour">
      <h3>Tìm kiếm Tour</h3>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSearch} className="search-tour-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Điểm đến:</label>
            <input
              type="text"
              name="destination"
              value={searchCriteria.destination}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập điểm đến"
            />
          </div>
          <div className="form-group">
            <label>Ngày khởi hành (từ):</label>
            <input
              type="date"
              name="startDateFrom"
              value={searchCriteria.startDateFrom}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Ngày khởi hành (đến):</label>
            <input
              type="date"
              name="startDateTo"
              value={searchCriteria.startDateTo}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Giá tour (VNĐ):</label>
            <input
              type="number"
              name="price"
              value={searchCriteria.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập giá tối đa"
            />
          </div>
          <div className="form-group">
            <label>Địa điểm khởi hành:</label>
            <input
              type="text"
              name="departure"
              value={searchCriteria.departure}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập địa điểm khởi hành"
            />
          </div>
          <div className="form-group">
            <label>Địa điểm đến:</label>
            <input
              type="text"
              name="arrival"
              value={searchCriteria.arrival}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập địa điểm đến"
            />
          </div>
          <div className="form-group">
            <label>Loại tour:</label>
            <input
              type="text"
              name="tourType"
              value={searchCriteria.tourType}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập loại tour"
            />
          </div>
          <div className="form-group">
            <label>Dòng tour:</label>
            <input
              type="text"
              name="region"
              value={searchCriteria.region}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập dòng tour"
            />
          </div>
        </div>
        <button type="submit" className="search-btn">
          Tìm kiếm
        </button>
      </form>

      {editingTour ? (
        <EditTourForm
          tour={editingTour}
          onEditTour={handleSaveTour}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="tour-list">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour, index) => (
              <div
                key={tour.tourID}
                className="tour-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tour-image-main">
                  {tour.images && tour.images.length > 0 ? (
                    <img
                      src={tour.images[0]}
                      alt={`${tour.name} main`}
                      className="main-image"
                    />
                  ) : (
                    <div className="no-image">Không có hình ảnh</div>
                  )}
                </div>
                <div className="tour-info">
                  <h4>{tour.name}</h4>
                  <p className="tour-description">{tour.description}</p>
                  <p><strong>Thời gian:</strong> {tour.duration}</p>
                  <p><strong>Ngày khởi hành:</strong> {tour.startDate}</p>
                  <p><strong>Giá:</strong> {tour.price} VNĐ</p>
                  <p><strong>Địa điểm khởi hành:</strong> {tour.departure}</p>
                  <p><strong>Địa điểm đến:</strong> {tour.destination}</p>
                  <p><strong>Loại tour:</strong> {tour.tourType}</p>
                  <p><strong>Dòng tour:</strong> {tour.region}</p>
                </div>
                <button
                  className="edit-btn"
                  onClick={() => handleEditTour(tour)}
                >
                  Chỉnh sửa
                </button>
              </div>
            ))
          ) : (
            <p>Không tìm thấy tour nào phù hợp.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TourSearch;