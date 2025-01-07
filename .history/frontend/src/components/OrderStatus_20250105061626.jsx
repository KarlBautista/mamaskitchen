import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const OrderStatus = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/orders/${userId}`);
        if (response.data.success) {
          setOrders(response.data.orders);
          filterOrders(response.data.orders, "Pending");
        } else {
          console.error("Failed to fetch orders:", response.data.message);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  // Filter orders by status
  const filterOrders = (ordersList, status) => {
    const filtered = ordersList.filter((order) => order.status === status);
    setFilteredOrders(filtered);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    filterOrders(orders, newStatus);
  };

  return (
    <div className="order-status">
      <h1>Order Status</h1>

      {/* Navigation buttons */}
      <div className="status-buttons">
        {["Pending", "Shipped", "Received"].map((stat) => (
          <button
            key={stat}
            className={status === stat ? "active" : ""}
            onClick={() => handleStatusChange(stat)}
          >
            {stat}
          </button>
        ))}
      </div>

      {/* Order list */}
      <div className="orders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <h2>Order #{order.id}</h2>
                <p>Total: ₱{order.total_price.toFixed(2)}</p>
                <p>Date: {moment(order.order_date).format("MMMM Do YYYY, h:mm a")}</p>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-detail">
                    <img src={`http://localhost:8800${item.image_url}`} alt={item.food_name} />
                    <div>
                      <p>{item.food_name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₱{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No {status.toLowerCase()} orders found.</p>
        )}
      </div>

      <style jsx>{`
        .order-status {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .status-buttons {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .status-buttons button {
          padding: 10px 20px;
          cursor: pointer;
          background-color: #ddd;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .status-buttons button.active {
          background-color: #007bff;
          color: white;
        }

        .order-item {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .order-items {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .order-item-detail {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .order-item-detail img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default OrderStatus;
