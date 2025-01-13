import React, { useState } from "react";
import "../styles/search-cravings.css"; // Ensure this path is correct
import LandingVideo from "../videos/landing-video.mp4"; // Ensure this path is correct

const SearchCravings = ({ foodItems }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDish, setSelectedDish] = useState(null);
    const [quantity, setQuantity] = useState(1);

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
                <div className="food-items">
                    {filteredFoods.map((item) => (
                        <div key={item.id} className="food-item">
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
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