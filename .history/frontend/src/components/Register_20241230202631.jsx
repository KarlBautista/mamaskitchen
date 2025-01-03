import "../styles/register.css";
import Foodly from "../images/Foodly.png";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";

function Register() {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone_number: "",
    birthdate: "",
    gender: "",
    profile_picture: "",
    e_money: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/registered_account", customer);

      // Reset the input fields after successful registration
      setCustomer({
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        phone_number: "",
        birthdate: "",
        gender: "",
        profile_picture: "",
        e_money: 0.0,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Welcome to Foodly, ${customer.first_name}! Let the eating begin!`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
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
          <p className="register-title">Register Account</p>
          <form className="registration">
            <input
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              name="first_name"
              value={customer.first_name}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              name="last_name"
              value={customer.last_name}
            />
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
            <input
              type="text"
              placeholder="Phone Number"
              onChange={handleChange}
              name="phone_number"
              value={customer.phone_number}
            />
            <input
              type="date"
              placeholder="Birthdate"
              onChange={handleChange}
              name="birthdate"
              value={customer.birthdate}
            />
            <select
              name="gender"
              onChange={handleChange}
              value={customer.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
           
            <input
              type="number"
              placeholder="E-Money Balance (optional)"
              onChange={handleChange}
              name="e_money"
              value={customer.e_money}
            />
            <button type="button" onClick={handleClick}>
              Register
            </button>
            <p>
              Already have an account? <span>Login now</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
