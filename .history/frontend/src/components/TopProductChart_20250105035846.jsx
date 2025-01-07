import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register all chart types

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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Customize colors
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '50%', margin: 'auto', display: 'flex', flexDirection: 'column'}}>
     
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {topProducts.map((product, index) => (
          <div key={index} style={{ textAlign: 'center', margin: '0 10px' }}>
            <img
              src={`http://localhost:8800${product.image_url}`}
              alt={product.name}
              style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            />
            <p style={{ fontSize: '12px' }}>{product.name}</p>
        
          </div>
          
        ))}
           
      </div>
      
    </div>
  );
};

export default TopProductsChart;
