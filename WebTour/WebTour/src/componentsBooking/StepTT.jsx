import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUser, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const StepTT = ({ step, setStep }) => {
  const handleBack = () => step > 1 && setStep(step - 1);

  const steps = [
    { label: "Nhập thông tin", step: 1, icon: <FaUser /> },
    { label: "Thanh toán", step: 2, icon: <FaCreditCard /> },
    { label: "Hoàn tất", step: 3, icon: <FaCheckCircle /> },
  ];

  return (
    <div className="mb-4 mt-4">
      {step !== 3 && (
        step === 1 ? (
          <Link to="/">
            <FaArrowAltCircleLeft className="back" /> Quay lại
          </Link>
        ) : (
          <div onClick={handleBack} className="back-button">
            <FaArrowAltCircleLeft /> Quay lại
          </div>
        )
      )}
      <div className="step-container">
        {steps.map((s, index) => (
          <div key={s.step} className="step-item">
            <div className={`step-label ${step === s.step ? "active" : "inactive"}`}>
              {s.icon}
              <span className="ms-2">{s.label}</span>
            </div>
            {index < steps.length - 1 && (
              <FaArrowAltCircleRight className="text-primary mx-4 fs-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTT;