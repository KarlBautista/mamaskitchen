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
   
  );
};

export default OrderHistory;
