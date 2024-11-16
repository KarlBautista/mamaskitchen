import React from 'react';
import "../styles/stores.css";
import Jollibee1 from "../videos/jollibee-1.mp4";

const Stores = () => {
    return (
        <div className="stores-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Stores</li>
                    <li>Contact</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-container">
                <div className="video-platform-container">
                    <div className="video-platform">
                        <video className="videos" autoPlay loop muted>
                            <source src={Jollibee1} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stores;
