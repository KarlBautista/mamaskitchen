import React, { useState } from "react";
import axios from "axios"; // For API calls
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/search-cravings.css";
import LandingVideo from "../videos/Landing-Video.mp4";
import sisig from "../Menu/Sisig.webp";
// (Import all other images)

const foodItems = [
  { name: "Sisig", price: 120, category: "Meal", image: sisig },
  // (Other food items)
];

const SearchCravings = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFoods = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (food) => {
    if (!user || !user.id) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8800/add_to_cart", {
        user_id: user.id,
        food_name: food.name,
        price: food.price,
        image_url: food.image,
      });
      if (response.data.success) {
        alert("Item added to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="stores-container">
      {/* Sidebar */}
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
                      onClick={() => handleAddToCart(food)}
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
