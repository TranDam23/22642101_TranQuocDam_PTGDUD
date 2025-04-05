import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../CSS/Stats.css';

ChartJS.register(BarElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const BookingStats = () => {
  const [bookingData, setBookingData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    fetchBookingData();
  }, [startDate, endDate]);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/stats/bookings', {
        params: { startDate, endDate },
      });
      setBookingData(response.data);
    } catch (error) {
      console.error('Error fetching booking stats:', error);
    }
  };

  // Tạo gradient cho cột
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#50C878');
    gradient.addColorStop(1, '#4A90E2');
    return gradient;
  };

  const chartData = {
    labels: bookingData.map((stat) => stat.month),
    datasets: [
      {
        label: 'Số lượng Booking',
        data: bookingData.map((stat) => stat.totalBookings),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
        borderColor: '#50C878',
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: '#4A90E2',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, family: 'Roboto, sans-serif' },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Thống kê Số lượng Booking Theo Tháng',
        font: { size: 18, family: 'Roboto, sans-serif', weight: 'bold' },
        color: '#333',
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: { size: 14, family: 'Roboto, sans-serif' },
        bodyFont: { size: 12, family: 'Roboto, sans-serif' },
        padding: 10,
        cornerRadius: 5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số lượng Booking',
          font: { size: 14, family: 'Roboto, sans-serif' },
          color: '#333',
        },
        ticks: {
          font: { size: 12, family: 'Roboto, sans-serif' },
          color: '#666',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tháng/Năm',
          font: { size: 14, family: 'Roboto, sans-serif' },
          color: '#333',
        },
        ticks: {
          font: { size: 12, family: 'Roboto, sans-serif' },
          color: '#666',
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <motion.div
      className="stats-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="filter-container">
        <label>Từ ngày:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="dd/mm/yyyy"
        />
        <label>Đến ngày:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="dd/mm/yyyy"
        />
      </div>
      {bookingData.length > 0 ? (
        <div className="chart-wrapper">
          <Bar ref={chartRef} data={chartData} options={options} />
        </div>
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </motion.div>
  );
};

export default BookingStats;