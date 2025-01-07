import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const TopProductsChart = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Fetch top products from backend
    const fetchTopProducts = async () => {
      try {
        const response = await fetch('http://localhost:8800/top_products');
        const data = await response.json();
        if (data.success) {
          setTopProducts(data.topProducts);
        }
      } catch (err) {
        console.error('Error fetching top products:', err);
      }
    };

    fetchTopProducts();
  }, []);

  if (!topProducts.length) return <div>Loading...</div>;

  // Prepare data for the pie chart
  const data = {
    labels: topProducts.map(product => product.name),
    datasets: [
      {
        data: topProducts.map(product => product.total_sold),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 1,
      },
    ],
  };

  // Chart.js custom plugin to draw images
  const plugins = [
    {
      id: 'custom-images',
      afterDraw: (chart) => {
        const { ctx, chartArea, data } = chart;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const radius = Math.min(chartArea.width, chartArea.height) / 2;

        data.labels.forEach((label, index) => {
          const angle = (chart.getDatasetMeta(0).data[index].startAngle + chart.getDatasetMeta(0).data[index].endAngle) / 2;
          const x = centerX + Math.cos(angle) * (radius * 0.7); // Position image towards the slice
          const y = centerY + Math.sin(angle) * (radius * 0.7);

          const img = new Image();
          img.src = `http://localhost:8800${topProducts[index].image_url}`;
          img.onload = () => {
            ctx.drawImage(img, x - 15, y - 15, 30, 30); // Adjust image size and position
          };
        });
      },
    },
  ];

  return (
    <div style={{ position: 'relative', width: '50%', margin: 'auto' }}>
      <h2>Top Products</h2>
      <Pie data={data} plugins={plugins} />
    </div>
  );
};

export default TopProductsChart;
