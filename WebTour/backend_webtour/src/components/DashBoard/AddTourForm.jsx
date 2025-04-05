import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/AddTourForm.css';

function AddTourForm({ onAddTour }) {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    departure: '',
    destinationName: '',
    destinationDescription: '',
    startDate: '',
    transport: '',
    tourType: '',
    price: '',
    region: '',
    images: [],
  });
  const [notification, setNotification] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('departure', formData.departure);
      formDataToSend.append('destinationName', formData.name);
      formDataToSend.append('destinationDescription', formData.destinationDescription);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('transport', formData.transport);
      formDataToSend.append('tourType', formData.tourType);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('region', formData.region);

      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post('http://localhost:3002/add-tour', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onAddTour(response.data.tour);

      setFormData({
        name: '',
        duration: '',
        departure: '',
        destinationName: '',
        destinationDescription: '',
        startDate: '',
        transport: '',
        tourType: '',
        price: '',
        region: '',
        images: [],
      });
    } catch (error) {
      console.error('Error adding tour:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi thêm tour!' });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div className="add-tour-form">
      <h3>Thêm Tour</h3>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="add-tour-form-content">
        <div className="form-grid">
          <div className="form-group">
            <label>Địa điểm:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập địa điểm"
            />
          </div>
          <div className="form-group">
            <label>Thời gian đi:</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập thời gian (ví dụ: 3 ngày 2 đêm)"
            />
          </div>
          <div className="form-group">
            <label>Ngày khởi hành:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Giá:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập giá (VNĐ)"
            />
          </div>
          <div className="form-group">
            <label>Địa điểm khởi hành:</label>
            <input
              type="text"
              name="departure"
              value={formData.departure}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập địa điểm khởi hành"
            />
          </div>
          <div className="form-group">
            <label>Địa điểm đến:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.tourType}
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
              value={formData.region}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập dòng tour"
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              name="destinationDescription"
              value={formData.destinationDescription}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Nhập mô tả tour"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Hình ảnh:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Thêm Tour
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTourForm;