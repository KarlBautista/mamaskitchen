import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Login() {
    const { login } = useUserContext();
    const [customer, setCustomer] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8800/login", customer);

            if (response.data.success) {
                const user = response.data.user; // Logged-in user's data
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Welcome back, ${user.first_name}!`,
                    showConfirmButton: false,
                    timer: 2000,
                });

                login(user);

                if (user.user_type === "admin") {
                    // Redirect admin to the admin dashboard
                    navigate("/adminDashboard");
                } else {
                    // Redirect regular user to the profile page
                    navigate("/profile");
                }
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Invalid email or password.",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleClick}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={customer.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;