import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/admin-dashboard.css';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8800/admin/orders')
      .then(response => {
        setOrders(response.data.orders);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  };

  const handleShipOrder = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to mark this order as shipped?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF914D', // Custom orange theme color
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ship it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:8800/admin/orders/ship/${orderId}`)
          .then(response => {
            if (response.data.success) {
              setOrders(orders.map(order => 
                order.order_id === orderId ? { ...order, status: 'Shipped' } : order
              ));
              Swal.fire(
                'Shipped!',
                'The order has been marked as shipped.',
                'success'
              );
            }
          })
          .catch(error => {
            console.error("Error shipping order:", error);
            Swal.fire(
              'Error!',
              'There was an error shipping the order.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="navigation-buttons">
        <button>Dashboard</button>
        <button>Orders</button>
        <button>Products</button>
        <button>Users</button>
        <button>Reports</button>
      </div>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Items</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
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
                  <td className={`status ${order.status ? order.status.toLowerCase() : "pending"}`}>{order.status || "Pending"}</td>
                  <td>
                    {order.status !== "Shipped" && (
                      <button onClick={() => handleShipOrder(order.order_id)}>
                        Ship Order
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )
      )}
    </div>
  );
}

export default AdminDashboard;