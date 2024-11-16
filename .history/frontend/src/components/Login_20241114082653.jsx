import "../styles/register.css";
import Foodly from "../images/Foodly.png";
import React, {useState} from 'react';

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import 'animate.css';



function Login() {

   
    const [customer, setCustomer] = useState([
        id: "",
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        image: "",
    );



    

  

    const handleChange = (e) => {
        setCustomer((prev) => ({...prev, [e.target.name]: e.target.value}));
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
                image: "",
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Welcome to Foodly, ${customer.first_name}! Let the eating begin!`,
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  title: 'custom-title',  // Custom class for the title
                }
              });

         
         
  

           
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="main-container">
            <div className="left-container">
                <img src={Foodly} alt="Foodly Logo" />
            </div>
            <div className="right-container">
                <div className="register-form">
                   <p className="register-title">Login Account</p>
                    <form className="registration"> 
                       
                        
                        <input type="email" placeholder="Email" onChange={handleChange} name="email" value={customer.email} />
                        <input type="password" placeholder="Password" onChange={handleChange} name="password" value={customer.password}/>
                       
                     
                        <button type="button" onClick={handleClick}>Register</button>
                        <p>No account yet?<span> Register now</span></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login ;
