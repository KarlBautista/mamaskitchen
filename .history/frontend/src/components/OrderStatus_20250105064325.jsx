import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
    

const OrderStatus = () => {
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
    <div className="order-status">
      <h2>Order Status</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>₱{order.total_price}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
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

export default OrderStatus;