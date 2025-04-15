// pages/AddProduct.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: name.trim(),
      description: description.trim(),
      price: parseInt(price),
    };

    try {
      await dispatch(addProduct(newProduct)).unwrap();
      navigate('/');
    } catch (err) {
      alert('Lỗi khi thêm sản phẩm!');
    }
  };

  return (
    <div className="bg-green-100 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Thêm sản phẩm mới</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
          <textarea
            placeholder="Mô tả sản phẩm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Giá sản phẩm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
            min="0"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            ➕ Thêm sản phẩm
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
