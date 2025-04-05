import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/EditTourForm.css';

function EditTourForm({ tour, onEditTour, onCancel }) {
  const [formData, setFormData] = useState({
    ...tour,
    images: tour.images || [],
  });
  const [notification, setNotification] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleRemoveImage = async (index) => {
    const imageToRemove = formData.images[index];
    // Chỉ xóa ảnh nếu nó là URL (tức là ảnh đã lưu trong database)
    if (typeof imageToRemove === 'string') {
      try {
        await axios.delete(`http://localhost:3002/remove-tour-image/${tour.tourID}`, {
          data: { imageUrl: imageToRemove },
        });
        setNotification({ type: 'success', message: 'Xóa ảnh thành công!' });
      } catch (error) {
        console.error('Error removing image:', error);
        setNotification({ type: 'error', message: 'Có lỗi xảy ra khi xóa ảnh!' });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        return; // Nếu xóa thất bại, không tiếp tục xóa trên giao diện
      }
    }

    // Xóa ảnh khỏi giao diện
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('departure', formData.departure);
      formDataToSend.append('destinationName', formData.destination);
      formDataToSend.append('destinationDescription', formData.description);
      formDataToSend.append('startDate', formData.startDate);
      formDataToSend.append('transport', formData.transport);
      formDataToSend.append('tourType', formData.tourType);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('region', formData.region);
      formDataToSend.append('favourites', formData.favourites);

      formData.images.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append('images', image);
        }
      });

      const response = await axios.put(
        `http://localhost:3002/update-tour/${formData.tourID}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onEditTour(response.data.tour);
    } catch (error) {
      console.error('Error updating tour:', error);
      setNotification({ type: 'error', message: 'Có lỗi xảy ra khi cập nhật tour!' });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div className="edit-tour-form">
      <h3>Chỉnh sửa Tour</h3>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="edit-tour-form-content">
        <div className="form-grid">
          <div className="form-group">
            <label>Địa điểm:</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="form-input"
              placeholder="Nhập địa điểm"
            />
          </div>
          <div className="form-group">
            <label>Thời gian đi:</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="form-input"
              placeholder="Nhập thời gian (ví dụ: 3 ngày 2 đêm)"
            />
          </div>
          <div className="form-group">
            <label>Ngày khởi hành:</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Giá:</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="form-input"
              placeholder="Nhập giá (VNĐ)"
            />
          </div>
          <div className="form-group">
            <label>Địa điểm khởi hành:</label>
            <input
              type="text"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
              className="form-input"
              placeholder="Nhập địa điểm khởi hành"
            />
          </div>
          <div className="form-group">
            <label>Địa điểm đến:</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="form-input"
              placeholder="Nhập địa điểm đến"
            />
          </div>
          <div className="form-group">
            <label>Loại tour:</label>
            <input
              type="text"
              value={formData.tourType}
              onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
              className="form-input"
              placeholder="Nhập loại tour"
            />
          </div>
          <div className="form-group">
            <label>Dòng tour:</label>
            <input
              type="text"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="form-input"
              placeholder="Nhập dòng tour"
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            <div className="image-preview">
              {formData.images.map((img, index) => (
                <div key={index} className="image-container">
                  <img
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`Preview ${index}`}
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Lưu
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTourForm;