import "../styles/register.css";
import Foodly from "../images/Foodly.png";
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
                        <button type="button" onClick={handleClick}>Login</button>
                        <p>No account yet? <span>Register now</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
