// pages/HomePage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/products/productSlice';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="bg-green-100 min-h-screen py-8 px-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Danh sách sản phẩm
        </h1>

        <div className="text-right mb-6">
          <Link
            to="/add"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          >
            ➕ Thêm sản phẩm
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Đang tải...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Chưa có sản phẩm nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(prod => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{prod.name}</h2>
                  <p className="text-gray-600 mb-4">{prod.description}</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600 mb-4">
                    {prod.price.toLocaleString()}đ
                  </p>
                  <Link
                    to={`/product/${prod.id}`}
                    className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    🔍 Xem chi tiết
                  </Link>
                  <Link
                    to={`/edit/${prod.id}`}
                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    ✏️ Chỉnh sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    🗑️ Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
