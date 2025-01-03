import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        // Retrieve logged-in user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setEditData(storedUser); // Pre-fill edit data
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(editData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (profilePicture) {
            formData.append("profile_picture", profilePicture);
        }

        try {
            const response = await axios.post("http://localhost:8800/update_user", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                const updatedUser = response.data.user;
                setUser(updatedUser); // Update user data in state
                localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
                setIsEditing(false); // Exit edit mode
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("An error occurred. Please try again.");
        }
    };

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile Information</h1>
            {!isEditing ? (
                <div className="profile-info">
                    {user.profile_picture && (
                        <div className="profile-picture">
                            <img
                                src={`http://localhost:8800${user.profile_picture}`}
                                alt="Profile"
                                style={{ maxWidth: "150px", borderRadius: "50%" }}
                            />
                        </div>
                    )}
                    <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User Type:</strong> {user.user_type}</p>
                    <p><strong>Phone Number:</strong> {user.phone_number}</p>
                    <p><strong>Birthdate:</strong> {user.birthdate}</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                    <p><strong>E-Money Balance:</strong> ₱{user.e_money.toFixed(2)}</p>

                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form className="edit-form" onSubmit={handleEditSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={editData.first_name || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={editData.last_name || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={editData.email || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phone_number"
                            value={editData.phone_number || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Birthdate:
                        <input
                            type="date"
                            name="birthdate"
                            value={editData.birthdate ? editData.birthdate.split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={editData.gender || ""}
                            onChange={handleInputChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Profile Picture:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit" className="save-button">Save Changes</button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}

export default Profile;
