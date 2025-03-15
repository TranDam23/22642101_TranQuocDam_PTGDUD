import { createContext, useState, useContext } from "react";

// 1. Tạo context
const CartContext = createContext();

// 2. Provider để bọc ứng dụng
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Đếm tổng số sản phẩm trong giỏ
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 🔥 Tính tổng tiền
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Custom hook để sử dụng CartContext dễ dàng hơn
export const useCart = () => useContext(CartContext);
