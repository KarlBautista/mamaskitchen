import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin-dashboard.css";
import SalesGraph from './SalesGraph';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]); // State for top products
  const [users, setUsers] = useState([]); // State for users

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

    const fetchMonthlySales = async () => {
      try {
        const response = await axios.get("http://localhost:8800/monthly_sales");
        if (response.data.success) {
          setMonthlySales(response.data.salesData || []);
        } else {
          setMonthlySales([]);
        }
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
        setMonthlySales([]);
      }
    };

    const fetchTopProducts = async () => {  // Fetch top products
      try {
        const response = await axios.get("http://localhost:8800/admin/top_products");
        if (response.data.success) {
          setTopProducts(response.data.topProducts);
        } else {
          setTopProducts([]);
        }
      } catch (error) {
        console.error("Error fetching top products:", error);
        setTopProducts([]);
      }
    };

    const fetchUsers = async () => { // Fetch users data
      try {
        const response = await axios.get("http://localhost:8800/users");
        if (response.data) {
          setUsers(response.data); // Set the users data
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrders();
    fetchMonthlySales();
    fetchTopProducts();  // Fetch top products
    fetchUsers(); // Fetch users

  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Monthly Sales */}
      <div id="total-sales">
        <h3>Total Sales by Month</h3>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Total Sales (₱)</th>
              <th>Total Revenue (₱)</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(monthlySales) && monthlySales.length > 0 ? (
              monthlySales.map((sale, index) => (
                <tr key={index}>
                  <td>{monthNames[sale.month - 1]}</td>
                  <td>{sale.year}</td>
                  <td>₱{parseFloat(sale.total_sales).toFixed(2)}</td>
                  <td>₱{parseFloat(sale.total_revenue).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No sales data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div id="top-products">
        <h3>Top Products</h3>
        {topProducts.length > 0 ? (
          <ul>
            {topProducts.map((product, index) => (
              <li key={index}>
                {product.food_name} - Sold Quantity: {product.total_quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No top products available.</p>
        )}
      </div>

      {/* Users Table */}
      <div id="users">
        <h3>All Users</h3>
        <div className="scrollable-table">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birthdate</th>
                <th>Gender</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.birthdate}</td>
                    <td>{user.gender}</td>
                    <td>{user.user_type}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="7">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders */}
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
