import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import 'animate.css';

function Login({ setUser }) {
    const [customer, setCustomer] = useState({
        email: "",
        password: ""
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
                const { first_name, user_type } = response.data;

                // Save user to localStorage
                localStorage.setItem('user', JSON.stringify(response.data));

                // Set user in the app state
                setUser(response.data);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Welcome back, ${first_name}!`,
                    showConfirmButton: false,
                    timer: 2000,
                });

                // Redirect based on user type
                if (user_type === "Store Owner") {
                    navigate("/store-dashboard");
                } else {
                    navigate("/customer-dashboard");
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
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid Password or Email",
                showConfirmButton: false,
                timer: 2000,
            });
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            {/* Login form content */}
        </div>
    );
}

export default Login;
