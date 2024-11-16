import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'animate.css';
import "../styles/home.css";
import { motion } from "framer-motion";
import Foodly from "../images/Foodly.png";
import Chicken from "../images/chicken.jpg";
import OrderNow from "../images/order-now.jpg";
import StartSelling from "../images/start-selling.jpg";


function Home() {
    const images = [Foodly, Chicken]; // Add more images if needed
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Function to handle image change
    const changeImage = (newIndex) => {
        setDirection(newIndex > currentImageIndex ? 1 : -1);
        setCurrentImageIndex(newIndex);
    };

    const nextImage = () => changeImage((currentImageIndex + 1) % images.length);
    const prevImage = () => changeImage((currentImageIndex - 1 + images.length) % images.length);

    // Animation variants for sliding
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
            },
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="home-container">
            <div className='line-1'></div>
            <div className="front-page-picture">
                <motion.div
                    key={currentImageIndex}
                    className="image-slider"
                    variants={slideVariants}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                >
                    <img src={images[currentImageIndex]} alt="Slider" className="slider-image" />
                </motion.div>

                {/* Navigation Buttons */}
                <button onClick={prevImage} className="slider-button prev-button">❮</button>
                <button onClick={nextImage} className="slider-button next-button">❯</button>
                
                {/* Navigation Circles */}
                <div className="navigation-dots">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentImageIndex === index ? "active" : ""}`}
                            onClick={() => changeImage(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="order-now-container">
                <div className="order-now">
                    <div className="order-message">
                        
                        <p className="order-message-1">
                        Everything you 
                        </p>
                        <p className="order-message-1">crave, delivered.</p>
                        
                        <div className="order-message-2">
                        <p id='order-message-3'>Your favorite local restaurants</p>
                        <p>Get a slice of pizza or the whole pie delivered, or pick up house lo mein from the Chinese takeout spot you've been meaning to try.</p>
                        <button>find restaurants</button>
                        </div>

                      
                      
                    </div>

                

                    <div className="order-img">
                        <img src={OrderNow} alt="Foodly" />
                    </div>
                </div>
                
            </div>

            <div className="start-selling-container">
    <div className="start-selling">
        <div className="start-selling-img">
            <img src={StartSelling} alt="Start Selling" />
        </div>

        <div className="start-selling-message">
            <div className="start-selling-message-1">
                <p>Grow your</p>
                <p>business with</p>
                <p>foodly</p>
            </div>


            <div className="start-selling-message-2">
                p
                <button>Start selling</button>
            </div>
        </div>
    </div>
</div>


            <div className='food-classification'>
                    <div className="food-container">
                        <div className="food-container-img">
                            <img src={Chicken} alt="Chicken" />
                        </div>
                        <div className="food-title">
                            <h2>CHic</h2>
                        </div>

                    </div>

                    <div className="food-container">
                        

                    </div>


                     <div className="food-container">
                        

                    </div>

                    <div className="food-container">
                        

                        </div>
        
    



            </div>
        </div>
    );
}

export default Home;
