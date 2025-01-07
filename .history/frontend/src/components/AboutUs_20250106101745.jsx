import React from 'react';
import "../styles/about-us.css"; // Ensure this path is correct
import MamasKitheHouuse from "../images/MamasKitchenHouse.avif"; // Ensure this path is correct

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>About Us</h1>
                <p>Discover the story behind Mama's Kitchen</p>
            </div>
            <div className="about-us-content">
                <div className="about-us-image">
                    
                </div>
                <div className="about-us-text">
                    <h2>Our Journey</h2>
                    <p>
                        Mama's Kitchen was founded with a passion for bringing the rich flavors of Filipino cuisine to your doorstep. Our mission is to celebrate the essence of Filipino culture through food, connecting food lovers with authentic Pinoy dishes crafted with love and tradition.
                    </p>
                    <h2>What We Do</h2>
                    <p>
                        We offer a wide variety of traditional and modern Filipino dishes that bring the warmth and love of home straight to your table. From savory classics to sweet delights, we make every meal feel like home.
                    </p>
                    <h2>Our Values</h2>
                    <p>
                        At Mama's Kitchen, we believe in preserving the essence of Filipino culture through food. Our platform supports local cooks and food enthusiasts, bringing you closer to the comfort and joy of home-cooked meals.
                    </p>
                    <h2>Join Us</h2>
                    <p>
                        Whether you're a food lover looking to savor the taste of home or a cook wanting to share your culinary creations, Mama's Kitchen is the place for you. Join us in celebrating the rich flavors of Filipino cuisine.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;