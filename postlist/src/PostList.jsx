import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Lấy 10 bài viết đầu tiên
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Danh sách bài viết</h2>
      <button 
        onClick={fetchPosts} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
        Tải lại
      </button>
      {loading ? (
        <p className="text-gray-500">Đang tải...</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="p-4 bg-gray-50 rounded-lg shadow">
              <strong className="block text-lg text-gray-800">{post.title}</strong>
              <p className="text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
