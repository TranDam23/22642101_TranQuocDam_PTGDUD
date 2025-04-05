import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Modal } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"

const PaymentOptions = ({ onCompletePayment }) => {
  const [chonPT, setChonPT] = useState("Tiền mặt")
  const [showQRModal, setShowQRModal] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [countdown, setCountdown] = useState(10)

  const handleChonPT= (method) => {
    setChonPT(method)
  }

  const handleCompletePayment = () => {
    if (chonPT === "Tiền mặt") {
      setPaymentConfirmed(true)
      onCompletePayment(chonPT, "pending")
    } else {
      setShowQRModal(true)
      setCountdown(10)
    }
  }

  const handleQRScan = () => {
    setShowQRModal(false)
    onCompletePayment(chonPT, "completed")
  };

  useEffect(() => {
    let timer
    if (showQRModal && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else if (showQRModal && countdown === 0) {
      handleQRScan();
    }
    return () => clearInterval(timer)
  }, [showQRModal, countdown])

  const paymentMethods = [
    {
      name: "Tiền mặt",
      description: "Quý khách vui lòng thanh toán tại bất kỳ văn phòng WebTour.",
      icon: <img src="/imgs/tienmat.jpg" alt="Tiền mặt" style={{ height: "20px", marginLeft: "10px" }} />,
    }
  ]

  return (
    <Card className="p-4 mb-4">
      <h4>CÁC HÌNH THỨC THANH TOÁN</h4>
      <div className="d-flex flex-column">
        {paymentMethods.map((method) => (
          <div key={method.name}>
            <Button variant={chonPT === method.name ? "success" : "outline-success"}
              className="d-flex justify-content-between align-items-center mb-3 w-100"
              onClick={() => handleChonPT(method.name)}
            >
              <span>
                {method.name}
                {method.icon && method.icon}
              </span>
              {chonPT === method.name && <FaCheck />}
            </Button>
            {chonPT === method.name && (
              <div className="p-3 border rounded mb-3">
                <p>{method.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {paymentConfirmed && chonPT === "Tiền mặt" && (
        <Alert variant="warning"> Vui lòng thanh toán tại văn phòng WebTour trong vòng 24 giờ để xác nhận tour. Nếu không, đặt tour sẽ bị hủy.</Alert>
      )}
      <Button variant="primary" onClick={handleCompletePayment} className="mt-3">Xác nhận thanh toán</Button>

      <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quét mã QR để thanh toán qua {chonPT}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Vui lòng quét mã QR dưới đây để hoàn tất thanh toán.</p>
          <div className="text-center">
            <img src={chonPT?.qrCode || "/imgs/QR.jpg"} alt="QR Code" style={{ width: "200px", height: "200px" }}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQRModal(false)}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}

export default PaymentOptions;