import { useState } from "react";
import BookCard from "../components/Bookcard";

const booksData = [
  { id: 1, title: "Sách 1", author: "Tác giả A", price: 200000, img: "/img/sach1.png"},
  { id: 2, title: "Sách 2", author: "Tác giả B", price: 150000, img: "/img/sach2.png" },
  { id: 3, title: "Sách 3", author: "Tác giả C", price: 250000, img: "/img/sach3.png" },
  { id: 4, title: "Sách 4", author: "Tác giả D", price: 150000, img: "/img/sach4.png" },
  { id: 5, title: "Sách 5", author: "Tác giả E", price: 150000, img: "/img/sach5.png" },
  { id: 6, title: "Sách 6", author: "Tác giả F", price: 150000, img: "/img/sach6.png" },
];

const Home = () => {
  const [books] = useState(booksData);

  return (
    <div className="container mt-4" style={{textAlign:"center"}}>
      <h1 className="mb-3">Danh sách sách</h1>
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-4">  
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
