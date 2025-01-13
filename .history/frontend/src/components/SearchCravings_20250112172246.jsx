import React, { useState } from "react";
import "../styles/search-cravings.css"; // Ensure this path is correct
import LandingVideo from "../videos/landing-video.mp4"; // Ensure this path is correct
import { CSSTransition, TransitionGroup } from "react-transition-group";

const SearchCravings = ({ foodItems }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const filteredFoods = foodItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToCart = (dish) => {
        setSelectedDish(dish);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleConfirmAddToCart = () => {
        // Add the selected dish with the specified quantity to the cart
        console.log(`Added ${quantity} of ${selectedDish.name} to the cart.`);
        setSelectedDish(null);
        setQuantity(1);
    };

    return (
        <div className="stores-container">
            <div className="sidebar">
                <div className="food-classifications">
                    <div className="food-class-container">
                        <p className="store-categories">Choose Your Choice</p>
                        <ul className="food-class">
                            {["All", "Meal", "Desserts", "Drinks"].map((category) => (
                                <li
                                    key={category}
                                    className={selectedCategory === category ? "active" : ""}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main-container">
                <div className="video-platform-container">
                    <div className="video-platform">
                        <video className="videos" autoPlay loop muted>
                            <source src={LandingVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Food..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p>Loading food items...</p>
                ) : (
                    <TransitionGroup className="foods">
                        {filteredFoods.length === 0 ? (
                            <p>No results found for "{searchQuery}"</p>
                        ) : (
                            filteredFoods.map((food, index) => (
                                <CSSTransition key={index} timeout={300} classNames="card">
                                    <div className="card-foods">
                                        <img src={`http://localhost:8800${food.image_url}`} alt={food.name} />
                                        <div className="card-details">
                                            <p className="dish-name">{food.name}</p>
                                            <p className="dish-price">₱{food.price}</p>
                                            <button
                                                className="add-to-cart"
                                                onClick={() => handleAddToCart(food)}
                                            >
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </button>
                                        </div>
                                    </div>
                                </CSSTransition>
                            ))
                        )}
                    </TransitionGroup>
                )}
            </div>
            {selectedDish && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedDish.name}</h2>
                        <p>{selectedDish.description}</p>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </label>
                        <button onClick={handleConfirmAddToCart}>Confirm</button>
                        <button onClick={() => setSelectedDish(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchCravings;