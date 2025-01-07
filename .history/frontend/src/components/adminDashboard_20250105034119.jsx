import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin-dashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("sales"); // Default to "sales"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8800/admin/orders");
        setOrders(response.data.success ? response.data.orders : []);
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
        setMonthlySales(response.data.success ? response.data.salesData || [] : []);
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
        setMonthlySales([]);
      }
    };

    const fetchTopProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8800/admin/top_products");
        setTopProducts(response.data.success ? response.data.topProducts : []);
      } catch (error) {
        console.error("Error fetching top products:", error);
        setTopProducts([]);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/users");
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOrders();
    fetchMonthlySales();
    fetchTopProducts();
    fetchUsers();
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "sales":
        return (
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
                {monthlySales.length > 0 ? (
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
        );
      case "products":
        return (
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
        );
      case "users":
        return (
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
        );
      case "orders":
        return (
          loading ? (
            <p>Loading orders...</p>
          ) : (
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
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-nav">
        <button onClick={() => setActiveSection("sales")}>View All Sales</button>
        <button onClick={() => setActiveSection("products")}>View Top Products</button>
        <button onClick={() => setActiveSection("users")}>View All Users</button>
        <button onClick={() => setActiveSection("orders")}>View All Orders</button>
      </div>
      {renderSection()}
    </div>
  );
};

export default AdminDashboard;
