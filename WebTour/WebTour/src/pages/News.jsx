import React from "react";
import { Link } from "react-router-dom";
import "./News.css"; // File CSS tùy chỉnh

export default function NewsPage() {
  // Danh sách tin tức (fake data)
  const newsList = [
    {
      id: 1,
      title: "Khám phá thiên đường biển đảo Phú Quốc",
      description: "Những bãi biển xanh mát và hải sản tươi ngon tại Phú Quốc...",
      image: "/imgs/phuquoc3.jpg",
    },
    {
      id: 2,
      title: "Hành trình khám phá Đà Lạt mùa hoa nở",
      description: "Cùng tận hưởng không khí se lạnh và rừng thông tuyệt đẹp...",
      image: "/imgs/dalat1.jpg",
    },
    {
      id: 3,
      title: "Những trải nghiệm không thể bỏ lỡ khi du lịch Nhật Bản",
      description: "Trải nghiệm mùa hoa anh đào, ẩm thực Nhật Bản và các lâu đài cổ kính...",
      image: "/imgs/nhatban1.jpg",
    },
  ];

  return (
    <div className="news-container container mt-5">
      <h1 className="text-center text-primary fw-bold mb-4">Tin tức du lịch</h1>

      <div className="row">
        {newsList.map((news) => (
          <div key={news.id} className="col-md-4 mb-4">
            <div className="card news-card">
              <img src={news.image} alt={news.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">{news.description}</p>
                <Link to={`/newsDetail/${news.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
