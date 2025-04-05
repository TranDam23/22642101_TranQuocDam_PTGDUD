import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewsDetail from "./components/NewsDetail";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TourList from "./pages/TourList";
import TourDetail from "./pages/TourDetail";
import Contact from "./pages/Contact";
import BookingTour from "./pages/BookingTour";
import News from "./pages/News";
import Login from "./Login/Login";
import TourBooked from "./components/TourBooked";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FloatingButton from "./components/FloatingButton";
import { AuthProvider } from "./AuthContext";
// Layout chính cho các trang có Header, Footer, FloatingButton
const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <FloatingButton />
    <Footer />
  </>
);

// Layout riêng cho trang Login (không có Header, Footer, FloatingButton)
const AuthLayout = ({ children }) => <>{children}</>;

const App = () => {
  console.log("Rendering Routes in App.jsx of WebTour");

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Các route sử dụng MainLayout */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/home"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/tours"
            element={
              <MainLayout>
                <TourList />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/news"
            element={
              <MainLayout>
                <News />
              </MainLayout>
            }
          />
          <Route
            path="/newsDetail/:id"
            element={
              <MainLayout>
                <NewsDetail />
              </MainLayout>
            }
          />
          <Route
            path="/tours/:id"
            element={
              <MainLayout>
                <TourDetail />
              </MainLayout>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <MainLayout>
                <BookingTour />
              </MainLayout>
            }
          />
          <Route
            path="/tour-booked/:userID"
            element={
              <MainLayout>
                <TourBooked />
              </MainLayout>
            }
          />
          {/* Route riêng cho Login sử dụng AuthLayout */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import TourList from './pages/TourList';
// import TourDetail from './pages/TourDetail';
// import Contact from './pages/Contact';
// import BookingTour from './pages/BookingTour'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import FloatingButton from './components/FloatingButton';
// import Login from './pages/Login'
// import TourBooked from './components/TourBooked';
// const App = () => {
//   console.log('Rendering Routes in App.jsx of WebTour');

//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/tours" element={<TourList />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/tours/:id" element={<TourDetail />} />
//         <Route path="/booking/:id" element={<BookingTour />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/tour-booked/:userID" element={<TourBooked />} />
//       </Routes>
//       <FloatingButton />

//       <Footer />
//     </Router>
//   );
// };


// export default App;
