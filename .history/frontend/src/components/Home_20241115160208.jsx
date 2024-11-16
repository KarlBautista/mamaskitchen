import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import "../styles/home.css";
import { motion } from "framer-motion";
import Foodly from "../images/Foodly.png"; // Sample images
import Chicken from "../images/chicken.jpg";

function Home() {
    // Images array for the slider
    const images = [Foodly, Chicken];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to handle next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to handle previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="home-container">
            <div className="front-page-picture">
                <motion.div
                    className="image-slider"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src={images[currentImageIndex]}
                        alt="Slider"
                        className="slider-image"
                    />
                </motion.div>

                {/* Navigation Buttons */}
                <button onClick={prevImage} className="slider-button prev-button">❮</button>
                <button onClick={nextImage} className="slider-button next-button">❯</button>
            </div>
        </div>
    );
}

export default Home;
