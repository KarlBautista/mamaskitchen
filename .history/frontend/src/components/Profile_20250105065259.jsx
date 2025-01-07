import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import OrderStatus from "./OrderStatus"; // Import OrderStatus component

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setEditData(storedUser);
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
        <div className="profile">
            <h1>Profile</h1>
            {user && (
                <>
                    <div className="profile-info">
                        <p>Name: {user.first_name} {user.last_name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone_number}</p>
                        <p>Birthdate: {user.birthdate}</p>
                        <p>Gender: {user.gender}</p>
                    </div>
                   
                </>
            )}
        </div>
    );
}

export default Profile;