import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8800/users");
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {users.length > 0 ? (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            <strong>Name:</strong> {user.first_name} {user.last_name}<br />
                            <strong>Email:</strong> {user.email}<br />
                            <strong>User Type:</strong> {user.user_type}<br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default Profile;
