import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import "../styles/search-cravings.css";
import Swal from "sweetalert2";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch food items from the backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8800/foods");
        setMenuItems(response.data);
      } catch (err) {
        console.error("Error fetching food items:", err);
      }
    };

    fetchFoods();
  }, []);

  // Filtered menu items
  const filteredFoods = menuItems.filter((item) => {
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
        <div className="add-menu">
          <button className="add-menu-btn">
            Add Menu
          </button>
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
            filteredFoods.map((food) => (
              <CSSTransition key={food.id} timeout={300} classNames="card">
                <div className="card-foods">
                <img 
  src={`http://localhost:8800${food.image_url}`} 
  alt={food.name} 
  onError={(e) => { e.target.src = "/placeholder-image.jpg"; }} // Fallback for missing images
/>

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
