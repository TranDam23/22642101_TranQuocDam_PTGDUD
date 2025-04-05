import React, { useState, useEffect } from "react";

const SearchBox = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Cập nhật thời gian mỗi giây
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Lấy thông tin thời tiết từ API
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Ho Chi Minh City,vn&appid=YOUR_API_KEY&units=metric"
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
      }
    };

    fetchWeather();

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="position-absolute start-50 translate-middle-x bg-white shadow-lg rounded p-4"
      style={{
        width: "80%",
        maxWidth: "600px",
        top: "90%",
        transform: "translateY(-50%)",
        zIndex: 10,
      }}
    >
      <div className="text-center">
        <h5 className="fw-bold">⏰ Thời gian hiện tại</h5>
        <p>{currentTime.toLocaleString("vi-VN")}</p>
       
      </div>
    </div>
  );
};

export default SearchBox;
