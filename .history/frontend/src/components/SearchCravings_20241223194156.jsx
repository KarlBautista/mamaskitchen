import React, { useState } from 'react';
import "../styles/search-cravings.css";
import Jollibee1 from "../videos/jollibee-1.mp4";
import LandingVideo from "../videos/Landing-Video.mp4";
import sisig from "../Menu/Sisig.webp";
import bulalo from "../Menu/Bulalo.webp";
import bicolExpress from "../Menu/Bicol-Express.webp";
import ChickenAdobo from "../Menu/Chicken-Adobo.webp";
import Dinuguan from "../Menu/Dinuguan.webp";
import KareKare from "../Menu/Kare-Kare.webp";
import Laing from "../Menu/Laing.webp";
import Lechon from "../Menu/Lechon.webp";
import lumpiangShanghai from "../Menu/Lumpiang-Shanghai.webp";
import Pansit from "../Menu/Pansit.webp";
import Pinakbet from "../Menu/Pinakbet.webp";
import Sinigang from "../Menu/Sinigang.webp";
import Spaghetti from "../Menu/Spaghetti.webp";
import TinolangManok from "../Menu/Tinolang-Manok.webp";
import Torta from "../Menu/Torta.webp";
import UbeHalaya from "../Menu/Ube-Halaya.webp";
import LecheFlan from "../Menu/Leche-Flan.webp";

const foodItems = [
    { name: "Sisig", price: 120, image: sisig },
    { name: "Bulalo", price: 250, image: bulalo },
    { name: "Bicol Express", price: 150, image: bicolExpress },
    { name: "Chicken Adobo", price: 150, image: ChickenAdobo },
    { name: "Dinuguan", price: 200, image: Dinuguan },
    { name: "Kare Kare", price: 300, image: KareKare },
    { name: "Laing", price: 120, image: Laing },
    { name: "Lechon", price: 500, image: Lechon },
    { name: "Lumpiang Shanghai", price: 120, image: lumpiangShanghai },
    { name: "Pansit", price: 150, image: Pansit },
    { name: "Pinakbet", price: 120, image: Pinakbet },
    { name: "Sinigang", price: 250, image: Sinigang },
    { name: "Spaghetti", price: 150, image: Spaghetti },
    { name: "Tinolang Manok", price: 200, image: TinolangManok },
    { name: "Torta", price: 120, image: Torta },
    { name: "Ube Halaya", price: 150, image: UbeHalaya },
    { name: "Leche Flan", price: 200, image: LecheFlan },
];

const SearchCravings = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFoods = foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="stores-container">
            {/* Sidebar */}
            <div className="sidebar">
                

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
            <div className="search-stores">
                    <input
                        type="text"
                        placeholder="Search Food..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="video-platform-container">
                    <div className="video-platform">
                        <video className="videos" autoPlay loop muted>
                            <source src={LandingVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div className="foods">
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map((food, index) => (
                            <div key={index} className="card-foods">
                                <img src={food.image} alt={food.name} />
                                <div className="card-details">
                                    <p className="dish-name">{food.name}</p>
                                    <p className="dish-price">₱{food.price}</p>
                                    <button className="add-to-cart">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No results found for "{searchQuery}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchCravings;
