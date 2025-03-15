import { useCart } from "./CartContext";

const products = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "Samsung Galaxy S24", price: 899 },
  { id: 3, name: "Google Pixel 8", price: 799 }
];

const ProductList = () => {
    const { addToCart } = useCart(); // ✅ Nhận addToCart từ context
  
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">Product List</h2>
        <div className="d-flex flex-row flex-wrap justify-content-center gap-3">
          {products.map((product) => (
            <div key={product.id} className="card product-card text-center">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-primary fs-5">${product.price}</p>
                <button className="btn btn-success w-100" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default ProductList;
