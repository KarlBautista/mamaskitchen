import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css"; // Ensure this path is correct
import OrderStatus from "./OrderStatus"; // Import OrderStatus component
import Swal from "sweetalert2"; // Import SweetAlert2 for confirmation dialogs

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setEditData(parsedUser);
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }, []); // Empty array ensures this runs only once when component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Add only necessary fields to formData
        const allowedFields = ["id", "first_name", "last_name", "email", "phone_number", "birthdate", "gender"];
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

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            console.error("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8800/change_password", {
                userId: user.id,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            if (response.data.success) {
                setIsChangingPassword(false);
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
                console.log("Password changed successfully.");
            } else {
                console.error("Failed to change password:", response.data.message);
            }
        } catch (error) {
            console.error("Error changing password:", error);
        }
    };

    const handleDeleteAccount = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8800/delete_user/${user.id}`);
                if (response.data.success) {
                    Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
                    localStorage.removeItem("user");
                    window.location.href = "/"; // Redirect to home page or login page
                } else {
                    console.error("Failed to delete account:", response.data.message);
                }
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile</h1>
            {user && (
                <>
                    <div className="profile-info">
                        <img src={`http://localhost:8800${user.profile_picture}`} alt="Profile" className="profile-image3" />
                        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone_number}</p>
                        <p><strong>Birthdate:</strong> {new Date(user.birthdate).toISOString().split('T')[0]}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
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
                            <label>
                                Profile Picture
                                <input
                                    type="file"
                                    name="profile_picture"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                    {isChangingPassword ? (
                        <form onSubmit={handleChangePasswordSubmit} className="edit-form">
                            <label>
                                Current Password
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Current Password"
                                />
                            </label>
                            <label>
                                New Password
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="New Password"
                                />
                            </label>
                            <label>
                                Confirm New Password
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm New Password"
                                />
                            </label>
                            <button type="submit">Change Password</button>
                            <button type="button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                        </form>
                    ) : (
                        <button className="edit-button" onClick={() => setIsChangingPassword(true)}>Change Password</button>
                    )}
                    <button className="delete-button" onClick={handleDeleteAccount}>Delete Account</button>
                </>
            )}
        </div>
    );
}

export default Profile;