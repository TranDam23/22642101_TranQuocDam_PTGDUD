// pages/EditProduct.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct } from '../features/products/productSlice';

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading, error } = useSelector(state => state.products);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id,
      name,
      description,
      price: parseInt(price),
    };
    dispatch(updateProduct(updatedProduct));
    navigate('/'); // Quay lại trang home sau khi chỉnh sửa
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-green-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Chỉnh sửa sản phẩm</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border rounded-md"
            required
          />
          <textarea
            placeholder="Mô tả sản phẩm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Giá sản phẩm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-4 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Cập nhật sản phẩm
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
