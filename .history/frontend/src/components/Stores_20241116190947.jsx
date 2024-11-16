import React from 'react';
import "../styles/stores.css";
import Jollibee1 from "../videos/jollibee-1.mp4";

const Stores = () => {
    return (
        <div className="stores-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="search-stores">
                    <input type="text" placeholder='Search stores...'/>


                   
                </div>

                <div className="food-classifications">
  
    <div className="food-class-container">
    <p className="store-categories">Store Categories</p>
        <ul className="food-class">
            <li>Filipino Restaurant</li>
            <li>Fast Food</li>
            <li>Italian Restaurant</li>
            <li>Japanese Restaurant</li>
            <li>Mexican Restaurant</li>
            <li>Buffet</li>
            <li>Coffee Shops</li>
            <li>Breakfast Spots</li>
            <li>Vegetarian Restaurant</li>
        </ul>
    </div>
</div>

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

                <div className="stores">
                    <div className="card-stores">
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Stores;
