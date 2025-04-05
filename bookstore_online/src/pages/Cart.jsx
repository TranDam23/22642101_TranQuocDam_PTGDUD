import { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [message, setMessage] = useState("");
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống! Vui lòng thêm sản phẩm.");
      return;
    }
    setMessage("Cảm ơn đã thanh toán!");
    clearCart(); // Xóa toàn bộ giỏ hàng sau khi thanh toán
  };

  return (
    <div>
      <h2>Giỏ hàng</h2>
      {cart.length === 0 ? <p>Giỏ hàng trống!</p> : (
        <ul className="list-group">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {item.title} - {item.price} VND
              <button onClick={() => removeFromCart(index)} className="btn btn-danger">Xóa</button>
            </li>
          ))}
        </ul>
      )}
      <h4 className="mt-3">Tổng tiền: {total} VND</h4>
      <button onClick={handleCheckout} className="btn btn-success mt-2">Thanh toán</button>
      {message && <p className="alert alert-info mt-3">{message}</p>}
    </div>
  );
};

export default Cart;
