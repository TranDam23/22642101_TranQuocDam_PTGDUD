import React, { useState } from "react"
import { FaHeadset, FaFacebook, FaRobot } from "react-icons/fa"
import { SiZalo } from "react-icons/si"
import { motion } from "framer-motion"
import Chatbot from "./ChatBot"
import "../App.css"

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="floating-container">
      {isOpen && (
        <>
          <motion.div className="option-btn fb" whileHover={{ scale: 1.1 }}
            onClick={() => window.open("https://www.facebook.com/theahnoyxgoku", "_blank")}
          >
            <FaFacebook />
          </motion.div>

          <motion.div className="option-btn zalo" whileHover={{ scale: 1.1 }}
            onClick={() => window.open("https://zalo.me", "_blank")}
          >
            <SiZalo />
          </motion.div>

          <motion.div className="option-btn chatbot" whileHover={{ scale: 1.1 }} 
            onClick={() => setShowChat(!showChat)}
          >
            <FaRobot />
          </motion.div>
        </>
      )}

      <motion.div
        className="floating-btn"
        whileHover={{ scale: 1.4 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaHeadset className="headset-icon" />
        <span className="status-dot"></span>
      </motion.div>

      <Chatbot show={showChat} handleClose={() => setShowChat(false)} />
    </div>
    
  );
};

export default FloatingButton;