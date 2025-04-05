import React, { useState } from 'react';
import '../CSS/EditTourCard.css';

function EditTourCard({ tour, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...tour });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...formData.images];
      newImages[index] = file; // Lưu file vào mảng images
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, null] });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Hàm để lấy URL hiển thị ảnh
  const getImageSrc = (image) => {
    if (typeof image === 'string') {
      return image; // Nếu là URL, trả về trực tiếp
    } else if (image instanceof File) {
      return URL.createObjectURL(image); // Nếu là File, tạo URL tạm thời
    }
    return 'https://via.placeholder.com/300x200?text=No+Image'; // Mặc định nếu không có ảnh
  };

  return (
    <div className="edit-tour-card">
      <form onSubmit={handleSubmit}>
        <div className="tour-images">
          {formData.images.map((img, index) => (
            <div key={index} className="image-input">
              <div className="image-preview">
                <img
                  src={getImageSrc(img)}
                  alt={`${formData.destination} ${index}`}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error')}
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  Xóa
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e)}
                className="form-input"
              />
            </div>
          ))}
          <button type="button" className="add-image-btn" onClick={handleAddImage}>
            Thêm ảnh
          </button>
        </div>
        <div className="tour-content">
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="form-input"
            placeholder="Điểm đến"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Mô tả"
            rows="3"
          />
          <div className="tour-details">
            <div className="form-group">
              <label>Thời gian đi:</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-input"
                placeholder="Thời gian đi"
              />
            </div>
            <div className="form-group">
              <label>Ngày khởi hành:</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Giá (VNĐ):</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                placeholder="Giá"
              />
            </div>
            <div className="form-group">
              <label>Địa điểm khởi hành:</label>
              <input
                type="text"
                name="departureLocation"
                value={formData.departureLocation}
                onChange={handleChange}
                className="form-input"
                placeholder="Địa điểm khởi hành"
              />
            </div>
            <div className="form-group">
              <label>Địa điểm đến:</label>
              <input
                type="text"
                name="arrivalLocation"
                value={formData.arrivalLocation}
                onChange={handleChange}
                className="form-input"
                placeholder="Địa điểm đến"
              />
            </div>
            <div className="form-group">
              <label>Loại tour:</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-input"
                placeholder="Loại tour"
              />
            </div>
            <div className="form-group">
              <label>Dòng tour:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
                placeholder="Dòng tour"
              />
            </div>
            <div className="form-group">
              <label>Số lượng người:</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-input"
                placeholder="Số lượng người"
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="save-tour-btn">
            Lưu
          </button>
          <button type="button" className="cancel-tour-btn" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTourCard;