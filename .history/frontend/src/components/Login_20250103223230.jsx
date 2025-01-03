import "../styles/register.css";
import Foodly from "../images/Foodly.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../contexts/UserContext";

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
                if(user.user_type === "admin"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Welcome back, ${user.first_name}!`,
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    login(user);


                }

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Welcome back, ${user.first_name}!`,
                    showConfirmButton: false,
                    timer: 2000,
                });

                

                // Save logged-in user info in context and localStorage
                login(user);

                // Redirect user to the profile page
                navigate("/profile");
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
                title: "Server error. Please try again.",
                showConfirmButton: false,
                timer: 2000,
            });
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            <div className="left-container">
                <img src={Foodly} alt="Foodly Logo" />
            </div>
            <div className="right-container">
                <div className="register-form">
                    <p className="register-title">Login Account</p>
                    <form className="registration">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            name="email"
                            value={customer.email}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            name="password"
                            value={customer.password}
                        />
                        <button type="button" onClick={handleClick}>
                            Login
                        </button>
                        <p>
                            No account yet? <span>Register now</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
