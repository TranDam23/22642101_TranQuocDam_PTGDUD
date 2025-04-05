import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";

const booksData = [
  { id: 1, title: "Sách 1", author: "Tác giả A", price: 200000, img: "/img/sach1.png", description: "Mô tả sách 1" },
  { id: 2, title: "Sách 2", author: "Tác giả B", price: 150000, img: "/img/sach2.png",description: "Mô tả sách 1" },
  { id: 3, title: "Sách 3", author: "Tác giả C", price: 250000, img: "/img/sach3.png",description: "Mô tả sách 1" },
  { id: 4, title: "Sách 4", author: "Tác giả D", price: 150000, img: "/img/sach4.png",description: "Mô tả sách 1" },
  { id: 5, title: "Sách 5", author: "Tác giả E", price: 150000, img: "/img/sach5.png",description: "Mô tả sách 1" },
  { id: 6, title: "Sách 6", author: "Tác giả F", price: 150000, img: "/img/sach6.png",description: "Mô tả sách 1" },
];

const BookDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const book = booksData.find((b) => b.id === parseInt(id));

  if (!book) return <h2 className="text-center mt-4">Không tìm thấy sách!</h2>;

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.img} alt={book.title} className="w-50" />
      <p>{book.description}</p>
      <p>💰 {book.price} VND</p>
      <button onClick={() => addToCart(book)} className="btn btn-success">Thêm vào giỏ hàng</button>
    </div>
  );
};

export default BookDetail;
