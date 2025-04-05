import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../CSS/Stats.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const RevenueStats = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    fetchRevenueData();
  }, [startDate, endDate]);

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/stats/revenue', {
        params: { startDate, endDate },
      });
      setRevenueData(response.data);
    } catch (error) {
      console.error('Error fetching revenue stats:', error);
    }
  };

  // Tạo gradient cho đường biểu đồ
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#4A90E2');
    gradient.addColorStop(1, '#50C878');
    return gradient;
  };

  const chartData = {
    labels: revenueData.map((stat) => stat.month),
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: revenueData.map((stat) => stat.totalRevenue),
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4A90E2',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4A90E2',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointStyle: 'circle',
        pointBorderWidth: 2,
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
        text: 'Thống kê Doanh thu Theo Tháng',
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
          text: 'Doanh thu (VNĐ)',
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
      {revenueData.length > 0 ? (
        <div className="chart-wrapper">
          <Line ref={chartRef} data={chartData} options={options} />
        </div>
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </motion.div>
  );
};

export default RevenueStats;