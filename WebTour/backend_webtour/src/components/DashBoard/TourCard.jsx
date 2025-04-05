import React from 'react';
import '../CSS/TourCard.css';

function TourCard({ tour, onEdit }) {
  // Kiểm tra nếu tour.images không tồn tại hoặc rỗng
  const images = tour.images && tour.images.length > 0 
    ? tour.images 
    : ['https://via.placeholder.com/300x200?text=No+Image'];

  // Hàm để lấy URL hiển thị ảnh
  const getImageSrc = (image) => {
    if (typeof image === 'string') {
      return image; // Nếu là URL, trả về trực tiếp
    } else if (image instanceof File) {
      return URL.createObjectURL(image); // Nếu là File, tạo URL tạm thời
    }
    return 'https://via.placeholder.com/300x200?text=Image+Error'; // Mặc định nếu không hợp lệ
  };

  return (
    <div className="tour-card">
      <div className="tour-images">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={getImageSrc(img)} 
            alt={`${tour.destination} ${index}`} 
            onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error')} // Xử lý lỗi tải ảnh
          />
        ))}
      </div>
      <div className="tour-content">
        <h3>{tour.destination || 'Không có tiêu đề'}</h3>
        <p className="tour-description">{tour.description || 'Không có mô tả'}</p>
        <div className="tour-details">
          <p><strong>Thời gian đi:</strong> {tour.duration || 'N/A'}</p>
          <p>
            <strong>Ngày khởi hành:</strong>{' '}
            {tour.departureDate ? tour.departureDate.split('-').reverse().join('/') : 'N/A'}
          </p>
          <p>
            <strong>Giá:</strong>{' '}
            {tour.price ? tour.price.toLocaleString() + ' VNĐ' : 'N/A'}
          </p>
          <p><strong>Địa điểm khởi hành:</strong> {tour.departureLocation || 'N/A'}</p>
          <p><strong>Địa điểm đến:</strong> {tour.arrivalLocation || 'N/A'}</p>
          <p><strong>Loại tour:</strong> {tour.type || 'N/A'}</p>
          <p><strong>Dòng tour:</strong> {tour.category || 'N/A'}</p>
          <p><strong>Số lượng người:</strong> {tour.capacity || 'N/A'}</p>
        </div>
      </div>
      <button className="edit-tour-btn" onClick={onEdit}>
        Chỉnh sửa
      </button>
    </div>
  );
}

export default TourCard;