import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const BookCard = ({ book }) => {
  
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card" style={{width:"400px",  height:"500px"}}>
      <img src={book.img} className="card-img-top" style={{width:"280px", height:"300px"}} alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">Tác giả: {book.author}</p>
        <p className="card-text">💰 {book.price} VND</p>
        <Link to={`/book/${book.id}`} className="btn btn-primary">Xem chi tiết</Link>
        <button onClick={() => addToCart(book)} className="btn btn-success ml-2">Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default BookCard;
