import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link to="/" className="navbar-brand">📚 Bookstore</Link>
      <div className="ml-auto">
        <Link to="/cart" className="btn btn-light">
          Giỏ hàng ({cart.length})  
        </Link>
      </div>
    </nav>
  );
};

export default Header;
