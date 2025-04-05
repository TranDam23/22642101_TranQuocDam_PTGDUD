import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './Dashboard';
import { AuthProvider, AuthContext } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute />} />
          <Route path="/" element={<DefaultRoute />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = () => {
  const { user } = React.useContext(AuthContext);
  return user && (user.role === 'admin' || user.role === 'guide') ? (
    <Dashboard />
  ) : (
    <Navigate to="/login" replace />
  );
};

const DefaultRoute = () => {
  const { user } = React.useContext(AuthContext);
  return user && (user.role === 'admin' || user.role === 'guide') ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;









// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login/Login';
// import Dashboard from './Dashboard';

// const App = () => {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUser(JSON.parse(localStorage.getItem('user')));
//     };

//     window.addEventListener('storage', handleStorageChange);
//     setUser(JSON.parse(localStorage.getItem('user')));
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* Trang đăng nhập */}
//         <Route path="/login" element={<Login />} />

//         {/* Trang dashboard - chỉ cho phép admin và guide */}
//         <Route
//           path="/dashboard"
//           element={
//             user && (user.role === 'admin' || user.role === 'guide') ? (
//               <Dashboard />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Trang mặc định: điều hướng đến dashboard nếu đã đăng nhập */}
//         <Route
//           path="/"
//           element={
//             user && (user.role === 'admin' || user.role === 'guide') ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;