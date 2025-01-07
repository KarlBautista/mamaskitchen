import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin-dashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8800/all_orders");
        if (response.data.success) {
          setOrders(response.data.orders);

          // Calculate total sales
          const sales = response.data.orders.reduce((sum, order) => sum + order.total_price, 0);
          setTotalSales(sales);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="metrics-overview">
        <h2>Total Sales: ₱{totalSales.toLocaleString()}</h2>
      </div>

      <div className="order-history-section">
        <h2>Order History</h2>
        {loading ? (
          <p>Loading order data...</p>
        ) : orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-top">
                  <h3>Order #{order.id}</h3>
                  <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> ₱{order.total_price}</p>
                </div>
                <h4>Items:</h4>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img
                        src={`http://localhost:8800${item.image_url}`}
                        alt={item.food_name}
                        className="food-image"
                      />
                      <p>{item.food_name} (x{item.quantity}) - ₱{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
