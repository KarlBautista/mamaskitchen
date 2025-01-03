import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import "../styles/home.css";
import Foodly from "../images/Foodly.png";
import Chicken from "../images/chicken.jpg";
import OrderNow from "../images/order-now.jpg";
import StartSelling from "../images/start-selling.jpg";
import FoodlyWhite from "../images/FoodlyWhite.png";
import mamasKitchen from "../images/MamasKitchen.png";
import homeSlider2 from "../images/homeSlider2.jpg";


import VideoPlatform from './VideoPlatform'; // Import the video component

function Home() {
    const images = [ mamasKitchen, homeSlider2]; // Add more images if needed
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


    

    // Use `useInView` for scroll animations
    const [orderRef, orderInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [sellingRef, sellingInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [whatWeDoRef, whatWeDoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [classificationRef, classificationInView] = useInView({ triggerOnce: true, threshold: 0.1 });

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

            <div
                className="order-now-container"
                ref={orderRef}
                style={{
                    opacity: orderInView ? 1 : 0,
                    transform: orderInView ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 0.5s ease-out',
                }}
            >
                <div className="order-now">
                    <div className="order-message">
                        <p className="order-message-1">Savor the Taste of Home. </p>
                        <p className="order-message-1">crave, delivered.</p>
                        <div className="order-message-2">
                            <p id='order-message-3'>Your favorite local restaurants</p>
                            <p>Get a slice of pizza or the whole pie delivered, or pick up house lo mein from the Chinese takeout spot you've been meaning to try.</p>
                            <button>find restaurants</button>
                        </div>
                    </div>
                    <div className="order-img">
                        <img src={OrderNow} alt="Order Now" />
                    </div>
                </div>
            </div>

            <div
                className="start-selling-container"
                ref={sellingRef}
                style={{
                    opacity: sellingInView ? 1 : 0,
                    transform: sellingInView ? 'translateX(-100)' : 'translateX(0)',
                    transition: 'all 0.5s ease-out',
                }}
            >
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
                            <p>Businesses large and small partner with foodly to</p>
                            <p>reach new customers, increase order volume, and drive</p>
                            <p>more sales.</p>
                            <button>start selling</button>
                        </div>
                    </div>
                </div>
            </div>
          <div className="food-classification-container">
            <p className="food-classification-title">find your cravings in tap away</p>
       
            <div
                className='food-classification'
                ref={classificationRef}
                style={{
                    opacity: classificationInView ? 1 : 0,
                    transform: classificationInView ? 'translatex(0)' : 'translateY(50px)',
                    transition: 'all 0.5s ease-out',
                }}
                
            >
               
                  
                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>


                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>



                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>



                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>


                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>


                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>


                <div className="food-container">
                 
                    <div className="food-container-img">
                        <img src={Chicken} alt="Chicken" />
                    </div>
                    <div className="food-title">
                      <p>fast food</p>
                    </div>
                </div>


               



            </div>
        </div>


            <div className="what-we-do-container" 
            ref={whatWeDoRef} 
            style={{
                opacity: orderInView ? 1 : 0,
                transform: orderInView ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.5s ease-out',
            }}>
                <div className="what-we-do">    
                    <div className="what-we-do-background">
                        <p className="what-we-do-img-container">
                            <img src={Chicken} alt="" />
                            
                        
                        </p>


                        </div>

                        <div className="what-we-do-title-container">
                           <p className='what-we-do-title'>what we do</p>
                           <div className="line-1"></div>
                           <p className='what-we-do-title-message'>Foodly connects customers to their favorite foods with exclusive special offers and discounts, making every craving just a tap away!</p>
                        </div>

                   
                
                
                    
                </div>

                <div className="what-we-stand-for">

                <div className="what-we-do-background">
                        <p className="what-we-stand-for-img-container">
                            <img src={Chicken} alt="" />
                            
                        
                        </p>


                        </div>

                        <div className="what-we-do-title-container">
                           <p className='what-we-do-title'>what we stand for</p>
                           <div className="line-1"></div>
                           <p className='what-we-do-title-message'>Foodly connects customers to their favorite foods with exclusive special offers and discounts, making every craving just a tap away!</p>
                        </div>


                </div>

            </div>
           
           



    <div className="footer-container">
        <div className="footer">
            <div className="footer-top">
                <div className="footer-img-container">
                    <img src={FoodlyWhite} alt="" />
                </div>

                <div className="footer-order-now-container">
                    <button>order now</button>

                </div>

            </div>


        </div>


    </div>




            </div>
        );
}

export default Home;
