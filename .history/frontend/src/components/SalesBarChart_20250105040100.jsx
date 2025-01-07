import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesBarChart = ({ monthlySales }) => {
  const months = monthlySales.map((sale) => `${sale.year} - ${sale.month}`);
  const totalSales = monthlySales.map((sale) => parseFloat(sale.total_sales));

  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Sales (₱)",
        data: totalSales,
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
