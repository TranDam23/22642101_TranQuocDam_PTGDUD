import React from "react";
import { useParams, Link } from "react-router-dom";
import "./NewsDetail.css";

export default function NewsDetail() {
  const { id } = useParams();

  const newsData = [
    {
      id: "1",
      title: "Khám phá thiên đường biển đảo Phú Quốc",
      images: ["/imgs/phuquoc1.jpg", "/imgs/phuquoc2.jpg", "/imgs/phuquoc3.jpg"],
      content: [
        "Phú Quốc nổi tiếng với những bãi biển xanh ngọc bích, cát trắng mịn và hải sản tươi ngon.",
        "Bạn có thể tham quan VinWonders, Safari, hoặc khám phá làng chài Hàm Ninh.",
        "Nhờ có điều kiện tự nhiên và khí hậu ôn hòa, Phú Quốc đang trở thành thiên đường nghỉ dưỡng, thu hút đông đảo nhà đầu tư trong và ngoài nước.",
        "Phía Bắc có làng chài Rạch Vẹm, Bãi Thơm, Hòn Một,… nổi bật với vẻ đẹp hoang sơ. Nam Đảo có quần đảo An Thới với Hòn Thơm, Hòn Móng Tay, Hòn Gầm Ghì – những điểm đến lý tưởng cho du thuyền, câu cá, lặn ngắm san hô và khám phá thiên nhiên."
      ],
    },
    {
      id: "2",
      title: "Hành trình khám phá Đà Lạt mùa hoa nở",
      images: ["/imgs/dalat1.jpg", "/imgs/dalat2.jpg", "/imgs/dalat3.jpg"],
      content: [
        "Đà Lạt mỗi mùa đều mang một vẻ đẹp khác nhau, nhưng mùa hoa nở là thời điểm lý tưởng nhất để du lịch.",
        "Bạn có thể check-in tại đồi chè Cầu Đất, thung lũng tình yêu hoặc thưởng thức các món ăn đặc sản như bánh tráng nướng, sữa đậu nành.",
        "Để khai thác cơ hội từ thị trường quốc tế, Đà Lạt cần đầu tư mạnh mẽ vào hạ tầng du lịch, đặc biệt là nâng cấp sân bay Liên Khương thành một trung tâm vận chuyển quốc tế. Việc phát triển các sản phẩm du lịch cao cấp và độc đáo, như khám phá nông nghiệp, và tổ chức các sự kiện mang tầm cỡ quốc tế sẽ là bước đột phá để thu hút dòng khách nước ngoài. Ngoài ra, cần hợp tác với các nền tảng số để triển khai các chương trình quảng bá hình ảnh Đà Lạt đến với du khách quốc tế.",
        "Chụp ảnh từ con dốc, du khách có thể bắt trọn hình ảnh cung đường tấp nập xe cộ, phía xa là hồ nước trong xanh và núi non hùng vĩ. Những đoạn video check-in ở đây nhanh chóng thu hút triệu lượt xem trên các nền tảng mạng xã hội."
      ],
    },
    {
      id: "3",
      title: "Những trải nghiệm không thể bỏ lỡ khi du lịch Nhật Bản",
      images: ["/imgs/nhatban1.jpg", "/imgs/nhatban2.jpg", "/imgs/nhatban3.jpg"],
      content: [
        "Nhật Bản nổi tiếng với hoa anh đào, các ngôi đền cổ kính và nền ẩm thực độc đáo.",
        "Bạn không thể bỏ qua Tokyo, Kyoto, và Osaka khi du lịch tại đây.",
        "Du khách có thể khoác lên mình bộ Yukata truyền thống check-in với gian hàng hay tham gia trò chơi truyền thống Nhật Bản như Búa gỗ Kendama, Người gỗ bất tử Daruma. Đặc biệt, chương trình “xé túi mù” với những món quà bất ngờ hứa hẹn mang đến nhiều niềm vui thú vị.",
        "Ngoài các khu vực đất liền, cảnh báo còn mở rộng đến các đảo Iki và Tsushima. Đây là những điểm thu hút khách du lịch trong nước. Người dân cũng như du khách ở những khu vực này nên thận trọng và tuân thủ chặt chẽ hướng dẫn của chính quyền địa phương. Cơ quan Khí tượng Nhật Bản, chịu trách nhiệm theo dõi và cảnh báo về hoạt động địa chấn, tiếp tục nhấn mạnh khả năng xảy ra các dư chấn với cường độ tương tự trong tuần tới, nhấn mạnh tầm quan trọng của các biện pháp chuẩn bị liên tục cho các cộng đồng bị ảnh hưởng."
      ],
    },
  ];

  const article = newsData.find((item) => item.id === id);

  if (!article) {
    return <h2 className="text-center mt-5 text-danger">Bài viết không tồn tại</h2>;
  }

  // Trộn nội dung và hình ảnh theo thứ tự xen kẽ
  const mergedContent = [];
  const maxLength = Math.max(article.content.length, article.images.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (article.content[i]) {
      mergedContent.push({ type: "text", data: article.content[i] });
    }
    if (article.images[i]) {
      mergedContent.push({ type: "image", data: article.images[i] });
    }
  }

  return (
    <div className="container news-detail-container">
      <h1 className="news-title">{article.title}</h1>
      <p className="news-date">Ngày đăng: 30/03/2025</p>

      {/* Hiển thị nội dung xen kẽ với hình ảnh */}
      <div className="news-content">
        {mergedContent.map((item, index) =>
          item.type === "text" ? (
            <p key={index}>{item.data}</p>
          ) : (
            <img key={index} src={item.data} alt={`Ảnh ${index + 1}`} className="news-image" />
          )
        )}
      </div>

      {/* Tin liên quan */}
      <div className="related-news">
        <h3 className="related-title">Tin liên quan</h3>
        <ul>
          {newsData
            .filter((item) => item.id !== id)
            .map((news) => (
              <li key={news.id}>
                <Link to={`/newsDetail/${news.id}`}>{news.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
