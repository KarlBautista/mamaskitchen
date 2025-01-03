import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import "../styles/search-cravings.css";
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
    { name: "Sisig", price: 120, category: "Meal", image: sisig },
    { name: "Bulalo", price: 250, category: "Meal", image: bulalo },
    { name: "Bicol Express", price: 150, category: "Meal", image: bicolExpress },
    { name: "Chicken Adobo", price: 150, category: "Meal", image: ChickenAdobo },
    { name: "Dinuguan", price: 200, category: "Meal", image: Dinuguan },
    { name: "Kare Kare", price: 300, category: "Meal", image: KareKare },
    { name: "Laing", price: 120, category: "Meal", image: Laing },
    { name: "Lechon", price: 500, category: "Meal", image: Lechon },
    { name: "Lumpiang Shanghai", price: 120, category: "Meal", image: lumpiangShanghai },
    { name: "Pansit", price: 150, category: "Meal", image: Pansit },
    { name: "Pinakbet", price: 120, category: "Meal", image: Pinakbet },
    { name: "Sinigang", price: 250, category: "Meal", image: Sinigang },
    { name: "Spaghetti", price: 150, category: "Meal", image: Spaghetti },
    { name: "Tinolang Manok", price: 200, category: "Meal", image: TinolangManok },
    { name: "Torta", price: 120, category: "Meal", image: Torta },
    { name: "Ube Halaya", price: 150, category: "Desserts", image: UbeHalaya },
    { name: "Leche Flan", price: 200, category: "Desserts", image: LecheFlan },
];

const SearchCravings = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [userId, setUserId] = useState(null);

    // Retrieve userId dynamically (e.g., from localStorage)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id) {
            setUserId(storedUser.id);
        }
    }, []);

    const addToCart = async (food) => {
        if (!userId) {
            alert("User is not logged in.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8800/add_to_cart", {
                user_id: userId,
                food_name: food.name,
                price: food.price,
                image_url: food.image,
            });
            if (response.data.success) {
                alert(`${food.name} has been added to the cart!`);
            } else {
                alert("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding the item to the cart.");
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

                <TransitionGroup className="foods">
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map((food, index) => (
                            <CSSTransition key={index} timeout={300} classNames="card">
                                <div className="card-foods">
                                    <img src={food.image} alt={food.name} />
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
                    ) : (
                        <p>No results found for "{searchQuery}"</p>
                    )}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default SearchCravings;
