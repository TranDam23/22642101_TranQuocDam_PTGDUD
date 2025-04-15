// App.jsx
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="max-w-6xl w-full">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
