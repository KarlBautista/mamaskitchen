import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import "../styles/search-cravings.css";
import LandingVideo from "../videos/Landing-Video.mp4";
import Swal from "sweetalert2";

const SearchCravings = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [userId, setUserId] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Retrieve userId dynamically (e.g., from localStorage)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id) {
            setUserId(storedUser.id);
        }
    }, []);

    // Fetch food items from the database
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await axios.get("http://localhost:8800/foods");
                setFoodItems(response.data); // Assuming your backend returns an array of food items
                setLoading(false);
            } catch (error) {
                console.error("Error fetching food items:", error);
                setLoading(false);
            }
        };

        fetchFoodItems();
    }, []);

    const addToCart = async (food) => {
        if (!userId) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to log in to add items to your cart!",
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8800/add_to_cart", {
                user_id: userId,
                food_name: food.name,
                price: food.price,
                image_url: food.image_url,
            });

            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Added to Cart!",
                    text: `${food.name} has been added to your cart.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: "Failed to add item to cart.",
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while adding the item to the cart.",
            });
        }
    };

    const filteredFoods = foodItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                        img
                        <video className="videos" autoPlay loop muted>
                            <source src={LandingVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div className="search-stores">
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
                                                onClick={() => addToCart(food)}
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
        </div>
    );
};

export default SearchCravings;
