import React, { useState, useEffect } from "react";

function CustomerDashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user info from localStorage if it's available
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            setUser(storedUser);
        }
    }, []); // Empty dependency array to run this only once after component mounts

    // You can optionally handle user logout here and clear the localStorage
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null); // Reset the user state
        // Redirect to login or home page after logout
    };

    return (
        <div className="customer-dashboard">
            {user ? (
                <div>
                    <h1>Welcome back, {user.first_name}!</h1>
                    {/* Render user-specific content */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h1>Loading user data...</h1>
            )}
        </div>
    );
}

export default CustomerDashboard;
