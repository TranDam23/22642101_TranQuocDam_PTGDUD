import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, totalItems, totalPrice } = useCart();

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Cart ({totalItems} items)</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button style={removeBtnStyle} onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 style={{ marginTop: "20px" }}>Total Price: ${totalPrice}</h3>
    </div>
  );
};

// CSS Styles
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

const removeBtnStyle = {
  backgroundColor: "#e74c3c",
  color: "white",
  border: "1px",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default Cart;
