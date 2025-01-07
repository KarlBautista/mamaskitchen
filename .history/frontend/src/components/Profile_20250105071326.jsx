import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css"; // Ensure this path is correct
import OrderStatus from "./OrderStatus"; // Import OrderStatus component

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setUser(storedUser);
                setEditData(storedUser);
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Add only necessary fields to formData
        const allowedFields = ["first_name", "last_name", "email", "phone_number", "birthdate", "gender"];
        allowedFields.forEach((field) => {
            if (editData[field]) {
                formData.append(field, editData[field]);
            }
        });

        if (profilePicture) {
            formData.append("profile_picture", profilePicture);
        }

        try {
            const response = await axios.post("http://localhost:8800/update_user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                setUser(response.data.user);
                setIsEditing(false);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } else {
                console.error("Failed to update user:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile</h1>
            {user && (
                <>
                    <div className="profile-info">
                        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone_number}</p>
                        <p><strong>Birthdate:</strong> {new Date(user.birthdate).toISOString().split('T')[0]}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                    </div>
                    <div className="profile-picture">
                        <img src={user.profile_picture} alt="Profile" className="profile-image" />
                    </div>
                    {isEditing ? (
                        <form onSubmit={handleEditSubmit} className="edit-form">
                            <label>
                                First Name
                                <input
                                    type="text"
                                    name="first_name"
                                    value={editData.first_name}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                />
                            </label>
                            <label>
                                Last Name
                                <input
                                    type="text"
                                    name="last_name"
                                    value={editData.last_name}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                />
                            </label>
                            <label>
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                            </label>
                            <label>
                                Phone Number
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={editData.phone_number}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                />
                            </label>
                            <label>
                                Birthdate
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={editData.birthdate.split('T')[0]}
                                    onChange={handleInputChange}
                                    placeholder="Birthdate"
                                />
                            </label>
                            <label>
                                Gender
                                <select
                                    name="gender"
                                    value={editData.gender}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                          
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                   
                </>
            )}
        </div>
    );
}

export default Profile;