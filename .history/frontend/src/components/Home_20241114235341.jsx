

import React, {useState} from 'react';
import Foodly from "../images/Foodly.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import 'animate.css';
import "../styles/home.css";

import { motion } from "motion/react"



    

function Home(){
    Swal.fire({
        title: "Welcome to Foodly! A world of flavors awaits!",
        imageUrl: {Foodly}, // Path to your Foodly image
        imageWidth: 300,    // Customize the width as needed
        imageHeight: 300,   // Customize the height as needed
        imageAlt: "Foodly logo",  // Alt text for accessibility
        showClass: {
            popup: `
                animate__animated
                animate__fadeInUp   
                animate__faster
                custom-popup
            `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                custom-popup
            `
        }
    });
    return(
        <div className='home-container'>
         
         <div className="slider">
 
         </div>

        </div>
    )

}
export default Home;