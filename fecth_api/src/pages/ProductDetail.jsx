// pages/ProductDetail.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-green-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Chi tiết sản phẩm</h1>
        {selectedProduct ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedProduct.name}</h2>
            <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
            <p className="text-lg font-bold text-green-600 mt-4">
              {selectedProduct.price.toLocaleString()}đ
            </p>
          </div>
        ) : (
          <p className="text-center">Không tìm thấy sản phẩm.</p>
        )}

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
