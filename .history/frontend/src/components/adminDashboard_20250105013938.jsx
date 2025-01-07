import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin-dashboard.css";
import SalesGraph from './SalesGraph';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8800/admin/orders");
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching admin orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
     
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Customer Name</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.user_id}</td>
                <td>{`${order.first_name} ${order.last_name}`}</td>
                <td>₱{order.total_price}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.food_id}>
                        {item.food_name} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
