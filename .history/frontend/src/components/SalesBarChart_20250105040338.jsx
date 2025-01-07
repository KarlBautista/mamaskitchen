import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesBarChart = ({ monthlySales }) => {
  const allMonths = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  // Create an array of sales for each month, setting missing months to 0
  const salesData = allMonths.map((month, index) => {
    const sale = monthlySales.find(sale => sale.month - 1 === index); // Find the sale for the month
    return sale ? parseFloat(sale.total_sales) : 0; // Return sales if found, otherwise 0
  });

  const data = {
    labels: allMonths, // Use all months as labels
    datasets: [
      {
        label: "Total Sales (₱)",
        data: salesData,
        backgroundColor: "#4CAF50", // Green color for the bars
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesBarChart;
