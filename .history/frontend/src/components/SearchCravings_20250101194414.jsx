import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useUserContext } from "../contexts/UserContext";
import "../styles/search-cravings.css";

const foodItems = [
  { id: 1, name: "Adobo", price: 120, image: "/images/adobo.jpg", category: "Filipino" },
  { id: 2, name: "Sinigang", price: 150, image: "/images/sinigang.jpg", category: "Filipino" },
  { id: 3, name: "Lechon", price: 300, image: "/images/lechon.jpg", category: "Filipino" },
];

const SearchCravings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { addToCart } = useUserContext();

  const filteredFoods = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="stores-container">
      <div className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li onClick={() => setSelectedCategory("All")}>All</li>
          <li onClick={() => setSelectedCategory("Filipino")}>Filipino</li>
        </ul>
      </div>
      <div className="main-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TransitionGroup className="foods">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <CSSTransition key={food.id} timeout={300} classNames="card">
                <div className="card-foods">
                  <img src={food.image} alt={food.name} />
                  <div className="card-details">
                    <p className="dish-name">{food.name}</p>
                    <p className="dish-price">₱{food.price}</p>
                    <button className="add-to-cart" onClick={() => addToCart(food)}>
                      Add to Cart
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
