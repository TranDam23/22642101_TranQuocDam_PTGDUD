
import React, { useState, useContext } from "react";
import "./Login.css";
import "remixicon/fonts/remixicon.css";
import anh from "./bali2.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const districts = {
  "Hà Nội": [
    "Ba Đình", "Hoàn Kiếm", "Đống Đa", "Hai Bà Trưng", "Thanh Xuân",
    "Cầu Giấy", "Hoàng Mai", "Long Biên", "Tây Hồ", "Bắc Từ Liêm",
    "Nam Từ Liêm", "Hà Đông", "Sơn Tây", "Đông Anh", "Gia Lâm",
    "Thanh Trì", "Thường Tín", "Thanh Oai", "Mê Linh"
  ],
  "TP Hồ Chí Minh": [
    "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7",
    "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh",
    "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Thủ Đức",
    "Bình Tân", "Cần Giờ", "Củ Chi", "Hóc Môn", "Nhà Bè"
  ],
};

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [loginPassVisible, setLoginPassVisible] = useState(false);
  const [registerPassVisible, setRegisterPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace("register-", "")]: value });
    setFormErrors({ ...formErrors, [id.replace("register-", "")]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username) errors.username = "Họ và tên là bắt buộc.";
    if (!formData.email) {
      errors.email = "Email là bắt buộc.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email không hợp lệ.";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Số điện thoại là bắt buộc.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại không hợp lệ. Phải có 10-11 chữ số.";
    }
    if (!formData.password) {
      errors.password = "Mật khẩu là bắt buộc.";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Xác nhận mật khẩu là bắt buộc.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp.";
    }
    if (!selectedProvince) errors.province = "Vui lòng chọn tỉnh/thành.";
    if (!selectedDistrict) errors.district = "Vui lòng chọn quận/huyện.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const phoneNumber = e.target.querySelector("#login-email").value;
    const password = e.target.querySelector("#login-pass").value;

    console.log("Sending login request:", { phoneNumber, password });

    try {
      const response = await axios.post("http://localhost:3002/login", {
        phoneNumber,
        password,
      });

      console.log("Login response:", response.data);

      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      // Điều hướng dựa trên vai trò người dùng
      if (user.role === "admin" || user.role === "guide") {
        const token = user.token; // Backend trả về token
        if (!token) {
          throw new Error("Không tìm thấy token trong response");
        }
        // Chuyển hướng đến dashboard trên backend (port 3002)
        window.location.href = `http://localhost:3002/dashboard?token=${token}`;
      } else if (user.role === "customer") {
        navigate("/"); // Điều hướng về trang chủ trong cùng tab (frontend)
      } else {
        setError("Vai trò không hợp lệ");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/register", {
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        province: selectedProvince,
        district: selectedDistrict,
      });

      setSuccess(response.data.message);
      setTimeout(() => {
        setShowRegister(false);
        setFormData({
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
        setSelectedProvince("");
        setSelectedDistrict("");
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-login">
      <img src={anh} alt="hình nền đăng nhập" className="auth-login__img" />

      <form
        className="auth-container"
        id="login-form"
        style={{ display: showRegister ? "none" : "grid" }}
        onSubmit={handleLogin}
      >
        <h1 className="auth-login__title">Đăng Nhập</h1>

        {error && <p className="auth-login__error">{error}</p>}

        <div className="auth-login__content">
          <div className="auth-login__box">
            <i className="ri-user-3-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type="text"
                required
                className="auth-login__input"
                id="login-email"
                placeholder=" "
              />
              <label htmlFor="login-email" className="auth-login__label">Số Điện Thoại</label>
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-lock-2-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type={loginPassVisible ? "text" : "password"}
                required
                className="auth-login__input"
                id="login-pass"
                placeholder=" "
              />
              <label htmlFor="login-pass" className="auth-login__label">Mật Khẩu</label>
              <i
                className={`auth-login__eye ${loginPassVisible ? "ri-eye-line" : "ri-eye-off-line"}`}
                onClick={() => setLoginPassVisible(!loginPassVisible)}
              ></i>
            </div>
          </div>
        </div>

        <div className="auth-login__check">
          <div className="auth-login__check-group">
            <input type="checkbox" className="auth-login__check-input" id="login-check" />
            <label htmlFor="login-check" className="auth-login__check-label">Ghi nhớ tôi</label>
          </div>
          <a href="#" className="auth-login__forgot">Quên mật khẩu?</a>
        </div>

        <button type="submit" className="auth-login__button" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>

        <p className="auth-login__register">
          Chưa có tài khoản?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); setShowRegister(true); }}>
            Đăng Ký
          </a>
        </p>
      </form>

      <form
        className="auth-register-container"
        id="register-form"
        style={{ display: showRegister ? "grid" : "none" }}
        onSubmit={handleRegister}
      >
        <h1 className="auth-login__title">Đăng Ký</h1>

        {error && <p className="auth-login__error">{error}</p>}
        {success && <p className="auth-login__success">{success}</p>}

        <div className="auth-login__content">
          <div className="auth-login__box">
            <i className="ri-user-3-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type="text"
                className="auth-login__input"
                id="register-username"
                placeholder=" "
                value={formData.username}
                onChange={handleInputChange}
              />
              <label htmlFor="register-username" className="auth-login__label">Họ và Tên</label>
              {formErrors.username && <p className="auth-login__error">{formErrors.username}</p>}
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-mail-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type="email"
                className="auth-login__input"
                id="register-email"
                placeholder=" "
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="register-email" className="auth-login__label">Email</label>
              {formErrors.email && <p className="auth-login__error">{formErrors.email}</p>}
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-phone-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type="tel"
                className="auth-login__input"
                id="register-phoneNumber"
                placeholder=" "
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <label htmlFor="register-phoneNumber" className="auth-login__label">Số Điện Thoại</label>
              {formErrors.phoneNumber && <p className="auth-login__error">{formErrors.phoneNumber}</p>}
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-lock-2-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type={registerPassVisible ? "text" : "password"}
                className="auth-login__input"
                id="register-password"
                placeholder=" "
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="register-password" className="auth-login__label">Mật Khẩu</label>
              <i
                className={`auth-login__eye ${registerPassVisible ? "ri-eye-line" : "ri-eye-off-line"}`}
                onClick={() => setRegisterPassVisible(!registerPassVisible)}
              ></i>
              {formErrors.password && <p className="auth-login__error">{formErrors.password}</p>}
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-lock-2-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <input
                type={confirmPassVisible ? "text" : "password"}
                className="auth-login__input"
                id="register-confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <label htmlFor="register-confirmPassword" className="auth-login__label">Xác Nhận Mật Khẩu</label>
              <i
                className={`auth-login__eye ${confirmPassVisible ? "ri-eye-line" : "ri-eye-off-line"}`}
                onClick={() => setConfirmPassVisible(!confirmPassVisible)}
              ></i>
              {formErrors.confirmPassword && <p className="auth-login__error">{formErrors.confirmPassword}</p>}
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-map-pin-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <select
                className="auth-login__input"
                id="register-province"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option value="" disabled>Chọn Tỉnh/Thành</option>
                {Object.keys(districts).map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
              <label htmlFor="register-province" className="auth-login__label">Tỉnh/Thành</label>
              {formErrors.province && <p className="auth-login__error">{formErrors.province}</p>}
            </div>
          </div>

          <div className="auth-login__box">
            <i className="ri-map-pin-line auth-login__icon"></i>
            <div className="auth-login__box-input">
              <select
                className="auth-login__input"
                id="register-district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                <option value="" disabled>Chọn Quận/Huyện</option>
                {selectedProvince &&
                  districts[selectedProvince]?.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
              </select>
              <label htmlFor="register-district" className="auth-login__label">Quận/Huyện</label>
              {formErrors.district && <p className="auth-login__error">{formErrors.district}</p>}
            </div>
          </div>
        </div>

        <button type="submit" className="auth-login__button" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng Ký"}
        </button>

        <p className="auth-login__register">
          Đã có tài khoản?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); setShowRegister(false); }}>
            Đăng Nhập
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;


// import React, { useState, useContext } from 'react';
// import 'remixicon/fonts/remixicon.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../components/AuthContext';
// import { FaPhone, FaLock} from 'react-icons/fa'

// const districts = {
//   "Hà Nội": [
//     "Ba Đình", "Hoàn Kiếm", "Đống Đa", "Hai Bà Trưng", "Thanh Xuân",
//     "Cầu Giấy", "Hoàng Mai", "Long Biên", "Tây Hồ", "Bắc Từ Liêm",
//     "Nam Từ Liêm", "Hà Đông", "Sơn Tây", "Đông Anh", "Gia Lâm",
//     "Thanh Trì", "Thường Tín", "Thanh Oai", "Mê Linh"
//   ],
//   "TP Hồ Chí Minh": [
//     "Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7",
//     "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh",
//     "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Thủ Đức",
//     "Bình Tân", "Cần Giờ", "Củ Chi", "Hóc Môn", "Nhà Bè"
//   ],
// };

// const Login = () => {
//   const [showRegister, setShowRegister] = useState(false);
//   const [loginPassVisible, setLoginPassVisible] = useState(false);
//   const [registerPassVisible, setRegisterPassVisible] = useState(false);
//   const [confirmPassVisible, setConfirmPassVisible] = useState(false);
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const handleProvinceChange = (e) => {
//     setSelectedProvince(e.target.value);
//     setSelectedDistrict('');
//   };

//   const handleDistrictChange = (e) => {
//     setSelectedDistrict(e.target.value);
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id.replace('register-', '')]: value });
//     setFormErrors({ ...formErrors, [id.replace('register-', '')]: '' });
//   };

//   const validateForm = () => {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10,11}$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!formData.username) errors.username = 'Họ và tên là bắt buộc.';
//     if (!formData.email) {
//       errors.email = 'Email là bắt buộc.';
//     } else if (!emailRegex.test(formData.email)) {
//       errors.email = 'Email không hợp lệ.';
//     }
//     if (!formData.phoneNumber) {
//       errors.phoneNumber = 'Số điện thoại là bắt buộc.';
//     } else if (!phoneRegex.test(formData.phoneNumber)) {
//       errors.phoneNumber = 'Số điện thoại không hợp lệ. Phải có 10-11 chữ số.';
//     }
//     if (!formData.password) {
//       errors.password = 'Mật khẩu là bắt buộc.';
//     } else if (!passwordRegex.test(formData.password)) {
//       errors.password =
//         'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';
//     }
//     if (!formData.confirmPassword) {
//       errors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc.';
//     } else if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không khớp.';
//     }
//     if (!selectedProvince) errors.province = 'Vui lòng chọn tỉnh/thành.';
//     if (!selectedDistrict) errors.district = 'Vui lòng chọn quận/huyện.';

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     const phoneNumber = e.target.querySelector('#login-email').value;
//     const password = e.target.querySelector('#login-pass').value;

//     console.log("Sending login request:", { phoneNumber, password });

//     try {
//       const response = await axios.post('http://localhost:3002/login', {
//         phoneNumber,
//         password,
//       });

//       console.log("Login response:", response.data);

//       const user = response.data;
//       localStorage.setItem('user', JSON.stringify(user));
//       setUser(user);

//       if (user.role === 'admin' || user.role === 'guide') {
//         navigate('/dashboard');
//       } else if (user.role === 'customer') {
//         try {
//           const homeResponse = await axios.get(`http://localhost:3002/home?phoneNumber=${phoneNumber}`);
//           console.log("Home API response in backend_Tour:", homeResponse.data);
//           console.log('Redirecting to WebTour with phoneNumber:', phoneNumber);
//           // Reload lai trang va chuyen sang home
//           window.location.href = `/home`;
//         } catch (homeError) {
//           console.error('Home API error in backend_Tour:', homeError.response?.data || homeError);
//           setError(homeError.response?.data?.message || 'Không thể truy cập trang Home');
//           localStorage.removeItem('user');
//           setUser(null);
//         }
//       } else {
//         setError('Vai trò không hợp lệ');
//         localStorage.removeItem('user');
//         setUser(null);
//       }
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err);
//       setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra kết nối đến backend.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3002/register', {
//         username: formData.username,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         province: selectedProvince,
//         district: selectedDistrict,
//       });

//       setSuccess(response.data.message);
//       setTimeout(() => {
//         setShowRegister(false);
//         setFormData({
//           username: '',
//           email: '',
//           phoneNumber: '',
//           password: '',
//           confirmPassword: '',
//         });
//         setSelectedProvince('');
//         setSelectedDistrict('');
//         setSuccess('');
//       }, 2000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <img
//         src="/imgs/bali2.jpg"
//         alt="hình nền đăng nhập"
//         className="login-page__img"
//         onError={() => console.log("Không thể tải hình ảnh nền")}
//       />

//       <form
//         className="login-container"
//         id="login-form"
//         style={{ display: showRegister ? 'none' : 'grid' }}
//         onSubmit={handleLogin}
//       >
//         <h1 className="login-page__title">Đăng Nhập</h1>

//         {error && <p className="login-page__error">{error}</p>}

//         <div className="login-page__content">
//           <div className="login-page__box">
//           <FaPhone className="login-page__icon" />
//             <div className="login-page__box-input">
//               <input
//                 type="text"
//                 required
//                 className="login-page__input"
//                 id="login-email"
//                 placeholder=" "
//               />
//               <label htmlFor="login-email" className="login-page__label">Số Điện Thoại</label>
//             </div>
//           </div>

//           <div className="login-page__box">
//           <FaLock className="login-page__icon" />
//             <div className="login-page__box-input">
//               <input
//                 type={loginPassVisible ? "text" : "password"}
//                 required
//                 className="login-page__input"
//                 id="login-pass"
//                 placeholder=" "
//               />
//               <label htmlFor="login-pass" className="login-page__label">Mật Khẩu</label>
//               <i
//                 className={`login-page__eye ${loginPassVisible ? 'ri-eye-line' : 'ri-eye-off-line'}`}
//                 onClick={() => setLoginPassVisible(!loginPassVisible)}
//               ></i>
//             </div>
//           </div>
//         </div>

//         <div className="login-page__check">
//           <div className="login-page__check-group">
//             <input type="checkbox" className="login-page__check-input" id="login-check" />
//             <label htmlFor="login-check" className="login-page__check-label">Ghi nhớ tôi</label>
//           </div>
//           <a href="#" className="login-page__forgot">Quên mật khẩu?</a>
//         </div>

//         <button type="submit" className="login-page__button" disabled={loading}>
//           {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
//         </button>

//         <p className="login-page__register">
//           Chưa có tài khoản?{' '}
//           <a href="#" onClick={(e) => { e.preventDefault(); setShowRegister(true); }}>
//             Đăng Ký
//           </a>
//         </p>
//       </form>

//       <form
//         className="register-container"
//         id="register-form"
//         style={{ display: showRegister ? 'grid' : 'none' }}
//         onSubmit={handleRegister}
//       >
//         <h1 className="login-page__title">Đăng Ký</h1>

//         {error && <p className="login-page__error">{error}</p>}
//         {success && <p className="login-page__success">{success}</p>}

//         <div className="login-page__content">
//           <div className="login-page__box">
//             <i className="ri-user-3-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <input
//                 type="text"
//                 className="login-page__input"
//                 id="register-username"
//                 placeholder=" "
//                 value={formData.username}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="register-username" className="login-page__label">Họ và Tên</label>
//               {formErrors.username && <p className="login-page__error">{formErrors.username}</p>}
//             </div>
//           </div>

//           <div className="login-page__box">
//             <i className="ri-mail-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <input
//                 type="email"
//                 className="login-page__input"
//                 id="register-email"
//                 placeholder=" "
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="register-email" className="login-page__label">Email</label>
//               {formErrors.email && <p className="login-page__error">{formErrors.email}</p>}
//             </div>
//           </div>

//           <div className="login-page__box">
//             <i className="ri-phone-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <input
//                 type="tel"
//                 className="login-page__input"
//                 id="register-phoneNumber"
//                 placeholder=" "
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="register-phoneNumber" className="login-page__label">Số Điện Thoại</label>
//               {formErrors.phoneNumber && <p className="login-page__error">{formErrors.phoneNumber}</p>}
//             </div>
//           </div>

//           <div className="login-page__box">
//             <i className="ri-lock-2-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <input
//                 type={registerPassVisible ? "text" : "password"}
//                 className="login-page__input"
//                 id="register-password"
//                 placeholder=" "
//                 value={formData.password}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="register-password" className="login-page__label">Mật Khẩu</label>
//               <i
//                 className={`login-page__eye ${registerPassVisible ? 'ri-eye-line' : 'ri-eye-off-line'}`}
//                 onClick={() => setRegisterPassVisible(!registerPassVisible)}
//               ></i>
//               {formErrors.password && <p className="login-page__error">{formErrors.password}</p>}
//             </div>
//           </div>

//           <div className="login-page__box">
//             <i className="ri-lock-2-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <input
//                 type={confirmPassVisible ? "text" : "password"}
//                 className="login-page__input"
//                 id="register-confirmPassword"
//                 placeholder=" "
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="register-confirmPassword" className="login-page__label">Xác Nhận Mật Khẩu</label>
//               <i
//                 className={`login-page__eye ${confirmPassVisible ? 'ri-eye-line' : 'ri-eye-off-line'}`}
//                 onClick={() => setConfirmPassVisible(!confirmPassVisible)}
//               ></i>
//               {formErrors.confirmPassword && <p className="login-page__error">{formErrors.confirmPassword}</p>}
//             </div>
//           </div>

//           <div className="login-page__box">
//             <i className="ri-map-pin-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <select
//                 className="login-page__input"
//                 id="register-province"
//                 value={selectedProvince}
//                 onChange={handleProvinceChange}
//               >
//                 <option value="" disabled>Chọn Tỉnh/Thành</option>
//                 {Object.keys(districts).map(province => (
//                   <option key={province} value={province}>{province}</option>
//                 ))}
//               </select>
//               <label htmlFor="register-province" className="login-page__label">Tỉnh/Thành</label>
//               {formErrors.province && <p className="login-page__error">{formErrors.province}</p>}
//             </div>
//           </div>

//           <div className="login-page__box">
//             <i className="ri-map-pin-line login-page__icon"></i>
//             <div className="login-page__box-input">
//               <select
//                 className="login-page__input"
//                 id="register-district"
//                 value={selectedDistrict}
//                 onChange={handleDistrictChange}
//               >
//                 <option value="" disabled>Chọn Quận/Huyện</option>
//                 {selectedProvince && districts[selectedProvince]?.map(district => (
//                   <option key={district} value={district}>{district}</option>
//                 ))}
//               </select>
//               <label htmlFor="register-district" className="login-page__label">Quận/Huyện</label>
//               {formErrors.district && <p className="login-page__error">{formErrors.district}</p>}
//             </div>
//           </div>
//         </div>

//         <button type="submit" className="login-page__button" disabled={loading}>
//           {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
//         </button>

//         <p className="login-page__register">
//           Đã có tài khoản?{' '}
//           <a href="#" onClick={(e) => { e.preventDefault(); setShowRegister(false); }}>
//             Đăng Nhập
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;