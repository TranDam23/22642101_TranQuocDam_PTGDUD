import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./DestinationGrid.css"; // Import file CSS

const destinations = [
  { id: 1, name: "Miền Bắc", img: "/imgs/mienbac.jpg", link: "/tours?region=mien-bac", size: "large" },
  { id: 2, name: "Miền Trung", img: "/imgs/mientrung.jpg", link: "/tours?region=mien-trung", size: "medium" },
  { id: 3, name: "Miền Nam", img: "/imgs/miennam.jpg", link: "/tours?region=mien-nam", size: "medium" },
  { id: 4, name: "Châu Á", img: "/imgs/chaua.jpg", link: "/tours?region=chau-a", size: "small" },
  { id: 5, name: "Châu Âu", img: "/imgs/chauau.jpg", link: "/tours?region=chau-au", size: "small" },
  { id: 6, name: "Châu Mỹ", img: "/imgs/chaumy.jpg", link: "/tours?region=chau-my", size: "small" },
  { id: 7, name: "Châu Phi", img: "/imgs/chauphi.jpg", link: "/tours?region=chau-phi", size: "small" },
];

const DestinationGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="destination-container">
      <h2 className="destination-title">🌍 Điểm Đến Yêu Thích ✈️</h2>
      <p className="destination-subtitle">
        Cùng chúng tôi khám phá những miền đất tuyệt vời, từ núi rừng Tây Bắc hùng vĩ, biển xanh miền Trung thơ mộng 
        đến những thành phố xa hoa tại châu Âu, châu Mỹ!  
        <strong>Hành trình của bạn bắt đầu ngay tại đây! 🚀</strong>
      </p>
      <div className="destination-grid">
        {destinations.map((destination) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`destination-card ${destination.size}`}
            onClick={() => navigate(destination.link)}
          >
            <img src={destination.img} alt={destination.name} className="destination-img" />
            <div className="destination-overlay">
              <h5 className="destination-name">{destination.name}</h5>
              <button className="explore-btn" onClick={() => navigate(destination.link)}>Khám Phá</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

  );
};

export default DestinationGrid;
