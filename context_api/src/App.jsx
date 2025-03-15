import { CartProvider } from "./CartContext"; 
import ProductList from "./ProductList"; 
import Cart from "./Cart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() { 
  return ( 
    <CartProvider> 
      <div style={{ padding: "20px" }}> 
        <h1> Shopping Cart</h1> 
        <ProductList /> 
        <Cart /> 
      </div> 
    </CartProvider> 
  ); 
} 
export default App;