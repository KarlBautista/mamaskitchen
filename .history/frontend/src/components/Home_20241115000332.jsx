import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import "../styles/home.css";
import { motion } from "framer-motion";
import Foodly from "../images/Foodly.png";  // Sample image; add more images as needed.

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of images for the slider (replace with your actual images)
    const images = [
        Foodly,
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className='home-container'>
            <div className="slider">
                <button onClick={prevSlide} className="slider-button">◀</button>

                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="slide-image"
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '300px',  // Adjust as needed
                        width: '100%',    // Adjust as needed
                    }}
                ></motion.div>

                <button onClick={nextSlide} className="slider-button">▶</button>
            </div>
        </div>
    );
}

export default Home;