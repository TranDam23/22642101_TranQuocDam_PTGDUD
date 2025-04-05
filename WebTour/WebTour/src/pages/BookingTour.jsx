import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import StepTT from "../componentsBooking/StepTT";
import ContactForm from "../componentsBooking/ContactForm";
import PassengerNumber from "../componentsBooking/PassengerNumber";
import Note from "../componentsBooking/Note";
import PaymentOptions from "../componentsBooking/PaymentOptions";
import TotalTour from "../componentsBooking/TotalTour";
import BookingSuccess from "../componentsBooking/BookingSuccess";
import ImageSlider from "./../components/ImageSlider";
import RelatedTours from "./../components/RelatedTours";

const API_BASE_URL = "http://localhost:3002";
const BookingTour = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [tour, setTour] = useState(null);
  const [img, setImg] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    dateBirth: "",
    gender: "",
    email: "",
    notes: "",
  });

  const [passengers, setPassengers] = useState({
    adults: 1,
    teens: 0,
    childrens: 0,
    babies: 0,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Gọi API lấy thông tin tour
    const fetchTour = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-tour/${id}`);
        const data = await response.json();
        setTour(data);

        // Gọi API lấy hình ảnh tour
        const imgResponse = await fetch(`${API_BASE_URL}/get-tour-image/${id}`);
        const imgData = await imgResponse.json();
        setImg(imgData.images || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tour:", error);
      }
    };

    fetchTour();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassengersChange = (type, action) => {
    setPassengers((prev) => {
      let newValue;
      if (type === "adults" && action === "decrease") {
        newValue = Math.max(1, prev[type] - 1);
      } else {
        newValue = action === "increase" ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      }
      return { ...prev, [type]: newValue };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Họ và tên là bắt buộc!";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ!";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ!";
    }
    if (!formData.dateBirth) newErrors.dateBirth = "Ngày sinh là bắt buộc!";
    if (!formData.gender) newErrors.gender = "Giới tính là bắt buộc!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getNumericPrice = (priceString) => {
    return parseInt(priceString.replace(/\D/g, ""));
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleCompletePayment = async (paymentMethod, paymentStatus) => {
    const price = getNumericPrice(tour?.price || "0");
    const totalPrice =
      passengers.adults * price +
      passengers.teens * price * 0.8 +
      passengers.childrens * price * 0.5;
    console.log("BôkoingL:" + bookings[bookings.length - 1])
    const response = await fetch(`${API_BASE_URL}/get-all-booking`);
    const data = await response.json();
    const bookingID = (data.length || 0) + 1;

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userID : null;
    const status = "confirmed";

    const newBooking = {
      bookingID,
      userID: userId,
      tourId: tour.tourID,
      bookingDate: new Date().toISOString().split("T")[0],
      status,
      totalPrice,
      travelerName: formData.name,
      numPeople: passengers.adults + passengers.teens + passengers.childrens + passengers.babies,
      departureTime: tour.startDate,
      returnTime: addDuration(tour.startDate, tour.duration),
      transportation: tour.transport,
      hotel: [],
    };
    const newBooking1 = {
      bookingID,
      customer: { ...formData },
      passengers: { ...passengers },
      totalPrice,
      tour: { ...tour },
      paymentMethod,
      createdAt: new Date(),
    }

    await fetch(`${API_BASE_URL}/save-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    });

    setBookings((prev) => [...prev, newBooking1]);
    setStep(3);
  };

  function addDuration(startDate, durationStr) {
    let date = new Date(startDate);
    const match = durationStr.match(/(\d+)\s+ngày\s+(\d+)\s+đêm/);
    if (match) {
      const days = parseInt(match[1]);
      date.setDate(date.getDate() + days);
    } else {
      throw new Error("Định dạng chuỗi không hợp lệ!");
    }
    return date.toISOString().split("T")[0];
  }

  if (!tour) return <p className="text-center">Đang tải dữ liệu...</p>;

  return (
    <Container>
      <h1 className="text-center text-primary mt-5">Đặt Tour</h1>
      <h3 className="text-center text-success">Tour du lịch {tour.name}</h3>
      <hr />
      <StepTT step={step} setStep={setStep} />
      <Row>
        <Col md={8} className={step === 3 ? "mx-auto" : ""}>
          {step === 1 && (
            <>
              <ContactForm formData={formData} errors={errors} handleInputChange={handleInputChange} />
              <PassengerNumber passengers={passengers} handlePassengersChange={handlePassengersChange} />
              <Note formData={formData} handleInputChange={handleInputChange} />
            </>
          )}
          {step === 2 && <PaymentOptions onCompletePayment={handleCompletePayment} />}
          {step === 3 && <BookingSuccess booking={bookings[bookings.length - 1]} />}
        </Col>
        {step !== 3 && (
          <Col>
            <TotalTour
              tour={tour}
              img={img}
              passengers={passengers}
              price={getNumericPrice(tour.price)}
              formatDate={(date) => new Date(date).toLocaleDateString("vi-VN")}
              handleNextStep={handleNextStep}
              step={step}
            />
            <hr />
            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              Cần hỗ trợ?
            </Link>{" "}
            Hãy nhắn cho{" "}
            <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              TheAnhOXY
            </Link>
          </Col>
        )}
      </Row>
      <Row className="mb-5">
        <h3 className="text-primary text-center">Hình ảnh nổi bật về tour</h3>
        <ImageSlider images={img} />
      </Row>
      <Row className="mb-5">
        <h3 className="mb-3 text-primary">Các tour liên quan</h3>
        <RelatedTours currentTour={tour} />
      </Row>
    </Container>
  );
};

export default BookingTour;
