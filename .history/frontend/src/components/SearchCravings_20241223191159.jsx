import React from 'react';
import "../styles/search-cravings.css";
import Jollibee1 from "../videos/jollibee-1.mp4";
import LandingVideo from "../videos/Landing-Video.mp4";
import sisig from "../Menu/Sisig.webp";
import bulalo from "../Menu/Bulalo.webp";

const SearchCravings= () => {
    return (
        <div className="stores-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="search-stores">
                    <input type="text" placeholder='Search stores...'/>


                   
                </div>

                <div className="food-classifications">
  
    <div className="food-class-container">
    <p className="store-categories">Choose Your Choice</p>
        <ul className="food-class">
            <li>Top Selling</li>
            <li>Meal</li>
            <li>Desserts</li>
            <li>Drinks</li>
           
        </ul>
    </div>
</div>

            </div>

            {/* Main Content */}
            <div className="main-container">
                <div className="video-platform-container">
                    <div className="video-platform">
                        <video className="videos" autoPlay loop muted>
                            <source src={LandingVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div className="foods">
                <div className="card-foods">
                            <img src={sisig} alt="Adobo" />
                            <div className="card-details">
                                <p className="dish-name">Adobo</p>
                                <p className="dish-price">₱120</p>
                                <button className="add-to-cart"><i className="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        </div>


                        <div className="card-foods">
                            <img src={bulalo} alt="Bulalo" />
                            <div className="card-details">
                                <p className="dish-name">Bulalo</p>
                                <p className="dish-price">₱120</p>
                                <button className="add-to-cart"><i className="fa-solid fa-cart-shopping"></i></button>
                            </div>
                        </div>
                    <div className="card-foods">
                        
                    </div>

                    
                    <div className="card-foods">
                        
                    </div>

                    
                    <div className="card-foods">
                        
                    </div>

                    
                    <div className="card-foods">
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchCravings;
