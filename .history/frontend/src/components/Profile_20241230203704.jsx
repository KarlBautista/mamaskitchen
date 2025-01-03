import React, { useEffect, useState } from "react";
import "./profile.css"; // Import the CSS file

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get logged-in user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile Information</h1>
            <div className="profile-info">
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User Type:</strong> {user.user_type}</p>
                <p><strong>Phone Number:</strong> {user.phone_number}</p>
                <p><strong>Birthdate:</strong> {user.birthdate}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>E-Money Balance:</strong> {user.e_money}</p>
                {user.profile_picture && (
                    <div className="profile-picture">
                        <strong>Profile Picture:</strong>
                        <img src={user.profile_picture} alt="Profile" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
