import React, { useState, useEffect } from "react";
import axios from "axios";


const OrderStatus = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/orders/${userId}`);
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setError(response.data.message || "No orders found.");
        }
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div className="order-status-loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="order-status-error">{error}</div>;
  }

  return (
    <div className="order-status-container">
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h2>Order ID: {order.id}</h2>
          <p>
            <strong>Date:</strong> {new Date(order.order_date).toLocaleString()}
          </p>
          <p>
            <strong>Total Price:</strong> ${order.total_price.toFixed(2)}
          </p>
          <p>
            <strong>Revenue (10%):</strong> ${order.total_revenue.toFixed(2)}
          </p>
          <div className="order-items">
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index} className="order-item">
                  <img
                    src={`http://localhost:8800${item.image_url}`}
                    alt={item.food_name}
                    className="order-item-image"
                  />
                  <p>
                    <strong>{item.food_name}</strong>
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
