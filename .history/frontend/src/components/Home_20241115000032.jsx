import React, { useEffect } from 'react';
import Foodly from "../images/Foodly.png";
import Swal from 'sweetalert2';
import 'animate.css';
import "../styles/home.css";

import { motion } from "framer-motion";

function Home() {
    useEffect(() => {
        Swal.fire({
            title: "Welcome to Foodly! A world of flavors awaits!",
            imageUrl: Foodly,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Foodly logo",
            showClass: {
                popup: `animate__animated animate__fadeInUp animate__faster custom-popup`
            },
            hideClass: {
                popup: `animate__animated animate__fadeOutDown animate__faster custom-popup`
            }
        });
    }, []);

    return (
        <div className='home-container'>
            {/* Scroll animation example */}
            <motion.div
                className="animated-section"
                initial={{ opacity: 0, y: 50 }} // Start off-screen
                animate={{ opacity: 1, y: 0 }} // Animate to visible
                transition={{ duration: 0.5 }} // Animation duration
            >
                <h2>Discover Delicious Foods with Foodly</h2>
                <p>Browse our extensive menu and explore flavors from around the world.</p>
            </motion.div>

            <div className="slider">
                {/* Add your slider content here */}
            </div>
        </div>
    );
}

export default Home;
