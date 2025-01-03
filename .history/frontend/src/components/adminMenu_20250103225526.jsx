import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import "../styles/search-cravings.css";
import LandingVideo from "../videos/Landing-Video.mp4";
import Swal from "sweetalert2";

const adminFoodItems = [
    { name: "Sisig", price: 120, category: "Meal", image: require("../Menu/Sisig.webp") },
    { name: "Bulalo", price: 250, category: "Meal", image: require("../Menu/Bulalo.webp") },
    { name: "Bicol Express", price: 150, category: "Meal", image: require("../Menu/Bicol-Express.webp") },
    { name: "Chicken Adobo", price: 150, category: "Meal", image: require("../Menu/Chicken-Adobo.webp") },
    { name: "Dinuguan", price: 200, category: "Meal", image: require("../Menu/Dinuguan.webp") },
    { name: "Kare Kare", price: 300, category: "Meal", image: require("../Menu/Kare-Kare.webp") },
    { name: "Laing", price: 120, category: "Meal", image: require("../Menu/Laing.webp") },
    { name: "Lechon", price: 500, category: "Meal", image: require("../Menu/Lechon.webp") },
];

const AdminMenu = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleAddMenu = () => {
        Swal.fire({
            title: "Add New Menu Item",
            html: `
                <input id="menu-name" class="swal2-input" placeholder="Menu Name"/>
                <input id="menu-price" type="number" class="swal2-input" placeholder="Price"/>
                <input id="menu-category" class="swal2-input" placeholder="Category"/>
            `,
            confirmButtonText: "Add",
            preConfirm: () => {
                const name = document.getElementById("menu-name").value;
                const price = parseFloat(document.getElementById("menu-price").value);
                const category = document.getElementById("menu-category").value;
                return { name, price, category };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, price, category } = result.value;
                if (name && price && category) {
                    // Add new menu item logic
                    Swal.fire("Success!", `${name} has been added.`, "success");
                } else {
                    Swal.fire("Error!", "All fields are required.", "error");
                }
            }
        });
    };

    const filteredFoods = adminFoodItems.filter((item) => {
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
                        <p className="store-categories">Manage Menu</p>
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
                    <button className="add-menu-button" onClick={handleAddMenu}>
                        Add Menu
                    </button>
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

export default AdminMenu;
