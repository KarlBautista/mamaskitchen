import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    axios.get('http://localhost:8800/admin/notifications')
      .then(response => {
        setNotifications(response.data.notifications);
      })
      .catch(error => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  return (
    <div className="admin-notifications">
      <h1>Admin Notifications</h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item">
            <div className="notification-header">
              <img 
                src={notification.profile_picture} 
                alt={`${notification.first_name} ${notification.last_name}`} 
                className="profile-picture" 
              />
              <p><strong>{notification.first_name} {notification.last_name}</strong></p>
            </div>
            <p>{notification.message}</p>
            <small>{new Date(notification.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminNotifications;
