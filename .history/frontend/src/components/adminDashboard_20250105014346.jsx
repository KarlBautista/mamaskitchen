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
        const ordersResponse = await axios.get("http://localhost:8800/admin/orders");
        const salesResponse = await axios.get("http://localhost:8800/admin/monthly_sales");
  
        if (ordersResponse.data.success) {
          setOrders(ordersResponse.data.orders);
        }
  
        if (salesResponse.data.success) {
          setMonthlySales(salesResponse.data.salesData);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setOrders([]);
        setMonthlySales([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

 
export default AdminDashboard;
