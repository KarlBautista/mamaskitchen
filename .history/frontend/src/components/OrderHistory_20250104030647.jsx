import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import "../styles/order-history.css";

const OrderHistory = () => {
  const { user } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/orders/${user.id}`);
          if (response.data.success) {
            setOrders(response.data.orders);
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
    }
  }, [user]);

  return (
    <div className="order-history-container">
    <h2 className="order-history-title">Order History</h2>
    {loading ? (
      <p>Loading your order history...</p>
    ) : orders.length > 0 ? (
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-top">
              <h3 className="order-id">Order #{order.id}</h3>
              <p><strong><span></span></strong> {new Date(order.order_date).toLocaleDateString()}</p>
              <p><strong>Total Price:</strong> ₱{order.total_price}</p>
            </div>
  
            <h4 className="order-items-title">Items:</h4>
            <div className="order-middle">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img
                    src={`http://localhost:8800${item.image_url}`}
                    alt={item.food_name}
                    className="food-image"
                  />
                  <div className="order-item-details">
                    <p>{item.food_name} (x{item.quantity}) - ₱{item.price * item.quantity}</p>
                  </div>
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
  
  );
};

export default OrderHistory;
