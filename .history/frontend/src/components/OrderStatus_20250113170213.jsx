import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/order-status.css";

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("Pending");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8800/orders/status/${filter}`);
                setOrders(response.data.orders);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [filter]);

    const handleMarkAsReceived = async (orderId) => {
        try {
            await axios.put(`http://localhost:8800/orders/${orderId}/status`, { status: "Received" });
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Error marking order as received:", error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:8800/orders/${orderId}/cancel`);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    return (
        <div className="order-status">
            <h2>Order Status</h2>
            <div className="order-status-buttons">
                <button className={filter === "Pending" ? "active" : ""} onClick={() => setFilter("Pending")}>Pending</button>
                <button className={filter === "Shipped" ? "active" : ""} onClick={() => setFilter("Shipped")}>Shipped</button>
                <button className={filter === "Received" ? "active" : ""} onClick={() => setFilter("Received")}>Received</button>
                <button className={filter === "Cancelled" ? "active" : ""} onClick={() => setFilter("Cancelled")}>Cancelled</button>
            </div>
            {loading ? (
                <p className="loading-message">Loading orders...</p>
            ) : orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Items</th>
                            {filter === "Shipped" && <th>Action</th>}
                            {filter === "Pending" && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>₱{order.total_price}</td>
                                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                <td className={`order-status ${order.status.toLowerCase()}`}>{order.status}</td>
                                <td>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                {item.food_name} - Quantity: {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                {filter === "Shipped" && (
                                    <td>
                                        <button onClick={() => handleMarkAsReceived(order.id)}>Mark as Received</button>
                                    </td>
                                )}
                                {filter === "Pending" && (
                                    <td>
                                        <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-orders-message">No {filter.toLowerCase()} orders found.</p>
            )}
        </div>
    );
};

export default OrderStatus;