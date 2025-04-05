import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const regionMap = {
  "mien-bac": "Miền Bắc",
  "mien-trung": "Miền Trung",
  "mien-nam": "Miền Nam",
  "chau-a": "Châu Á",
  "chau-au": "Châu Âu",
  "chau-phi": "Châu Phi",
  "chau-my": "Châu Mỹ",
  "chau-dai-duong": "Châu Đại Dương",
};

const regionDescriptions = {
  "mien-bac":
    "Khám phá hành trình tuyệt vời tại Miền Bắc, nơi hội tụ những cảnh sắc thiên nhiên hùng vĩ với núi non trùng điệp, " +
    "những cánh đồng lúa chín vàng và các di sản văn hóa đặc sắc. Đến với Miền Bắc, bạn sẽ được chiêm ngưỡng vẻ đẹp của Vịnh Hạ Long - " +
    "kỳ quan thiên nhiên thế giới, trải nghiệm không khí trong lành ở Sapa với những ruộng bậc thang thơ mộng, và tìm hiểu lịch sử lâu đời " +
    "qua các di tích cổ kính tại Hà Nội, thủ đô nghìn năm văn hiến.",
  "mien-trung":
    "Trải nghiệm Miền Trung quyến rũ, nơi sở hữu những bãi biển thơ mộng với cát trắng mịn và làn nước trong xanh như Nha Trang, " +
    "Đà Nẵng hay Quy Nhơn. Vùng đất này còn nổi tiếng với các di sản văn hóa thế giới như Thánh địa Mỹ Sơn, Phố cổ Hội An và Cố đô Huế, " +
    "nơi lưu giữ nét đẹp truyền thống của Việt Nam qua từng công trình kiến trúc cổ kính. Bên cạnh đó, ẩm thực Miền Trung độc đáo với hương vị " +
    "đậm đà từ bún bò Huế, mì Quảng đến các món hải sản tươi ngon sẽ khiến bạn không thể nào quên.",
  "mien-nam":
    "Khám phá Miền Nam sôi động, vùng đất của những miệt vườn sông nước trù phú, nơi bạn có thể trải nghiệm cuộc sống bình dị " +
    "của người dân Nam Bộ qua những chuyến đi thuyền trên chợ nổi Cái Răng hay tham quan những vườn trái cây sai trĩu quả ở Cần Thơ, Tiền Giang. " +
    "Miền Nam còn hấp dẫn với các điểm du lịch nổi tiếng như đảo ngọc Phú Quốc, nơi có những bãi biển tuyệt đẹp, và TP.HCM - " +
    "trung tâm kinh tế sầm uất với những công trình hiện đại xen lẫn nét văn hóa truyền thống đặc sắc.",
  "chau-a":
    "Khám phá thế giới với danh sách các tour du lịch Châu Á đa dạng, đưa bạn đến những điểm đến tuyệt đẹp như Bangkok sôi động, " +
    "Tokyo hiện đại, và Phuket nhiệt đới, nơi bạn sẽ trải nghiệm văn hóa phong phú, ẩm thực độc đáo và cảnh quan thiên nhiên tuyệt vời.",
  "chau-au":
    "Hành trình khám phá Châu Âu sang trọng với các điểm đến nổi bật như Paris lãng mạn, Rome cổ kính, và Zurich thơ mộng, " +
    "nơi bạn sẽ đắm mình trong kiến trúc tuyệt mỹ, lịch sử lâu đời và phong cách sống tinh tế.",
  "chau-phi":
    "Trải nghiệm Châu Phi hoang dã với các tour du lịch đến Cairo huyền bí, Cape Town ngoạn mục, và những vùng đất chưa khai phá, " +
    "nơi bạn sẽ chiêm ngưỡng kim tự tháp, sa mạc rộng lớn và động vật hoang dã trong các khu bảo tồn tự nhiên.",
  "chau-my":
    "Khám phá Châu Mỹ sôi động với các điểm đến như New York hiện đại, Rio de Janeiro rực rỡ, và Buenos Aires đầy đam mê, " +
    "nơi bạn sẽ trải nghiệm nhịp sống đô thị nhộn nhịp, văn hóa đa dạng và cảnh quan thiên nhiên ấn tượng.",
  "chau-dai-duong":
    "Trải nghiệm Châu Đại Dương với các tour du lịch đến Sydney rực rỡ và Queenstown hùng vĩ, nơi bạn sẽ chiêm ngưỡng Nhà hát Opera, " +
    "cầu Harbour Bridge, và những cảnh quan núi non tuyệt đẹp cùng các hoạt động phiêu lưu độc đáo.",
};

const BreadcrumbNav = ({ tour }) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const region = query.get("region");

  const validRegion = regionMap[region] ? region : null;
  const regionName = validRegion ? regionMap[validRegion] : "nước ngoài";
  const description = validRegion ? regionDescriptions[validRegion] : "Khám phá hành trình thú vị với nhiều điểm đến hấp dẫn trong và ngoài nước.";
  const isDomestic = ["mien-bac", "mien-trung", "mien-nam"].includes(validRegion);

  return (
    <div>
      <Breadcrumb className="my-3">
        <Breadcrumb.Item>
          <Link to="/" className="breadcrumb-link">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-primary" active>
          {tour?.name ? `Du lịch ${tour.name}` : isDomestic ? "Du lịch trong nước" : "Du lịch nước ngoài"}
        </Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="text-center text-primary">
        {tour?.name ? `Du lịch ${tour.name}` : `Danh sách tour du lịch ${regionName}`}
      </h2>
      <p className="text-justify text-muted" style={{ fontSize: "20px" }}>
        {tour?.name ? "" : description}
      </p>

      <hr />
    </div>
  );
};

export default BreadcrumbNav;