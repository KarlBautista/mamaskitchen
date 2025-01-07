import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin-notifications.css';

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    // Fetch notifications from the backend
    axios.get('http://localhost:8800/admin/notifications')
      .then(response => {
        setNotifications(response.data.notifications);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  };

  const handleRemoveNotification = (id) => {
    axios.delete(`http://localhost:8800/admin/notifications/${id}`)
      .then(response => {
        if (response.data.success) {
          setNotifications(notifications.filter(notification => notification.id !== id));
        }
      })
      .catch(error => {
        console.error("Error deleting notification:", error);
      });
  };

  const handleClearAllNotifications = () => {
    axios.delete('http://localhost:8800/admin/notifications')
      .then(response => {
        if (response.data.success) {
          setNotifications([]);
        }
      })
      .catch(error => {
        console.error("Error deleting all notifications:", error);
      });
  };

  return (
    <div className="admin-notifications">
      <h1>Admin Notifications</h1>
      <button className="clear-all-button" onClick={handleClearAllNotifications}>Clear All Notifications</button>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <div className="notification-header">
              <img 
                src={notification.profile_picture} 
                alt={`${notification.first_name} ${notification.last_name}`} 
                className="profile-picture2" 
              />
              <p><strong>{notification.first_name} {notification.last_name}</strong></p>
            </div>
            <p>{notification.message}</p>
            <small>{new Date(notification.created_at).toLocaleString()}</small>
            <button className="remove-button" onClick={() => handleRemoveNotification(notification.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminNotifications;