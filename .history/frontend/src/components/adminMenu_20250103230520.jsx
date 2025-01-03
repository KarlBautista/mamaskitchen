import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";
import "../styles/search-cravings.css";
import Swal from "sweetalert2";

// Example food items (replace this with your API or state)
const foodItems = [
  { id: 1, name: "Sisig", price: 120, category: "Meal", image: "sisig.webp" },
  { id: 2, name: "Bulalo", price: 250, category: "Meal", image: "bulalo.webp" },
  // Add more items as needed
];

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState(foodItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Add Menu function (Example implementation)
  const handleAddMenu = () => {
    Swal.fire({
      title: "Add Menu Item",
      html: `
        <input id="name" class="swal2-input" placeholder="Name">
        <input id="price" type="number" class="swal2-input" placeholder="Price">
        <input id="category" class="swal2-input" placeholder="Category">
        <input id="image" class="swal2-input" placeholder="Image URL">
      `,
      showCancelButton: true,
      confirmButtonText: "Add",
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const category = document.getElementById("category").value;
        const image = document.getElementById("image").value;

        if (!name || !price || !category || !image) {
          Swal.showValidationMessage("All fields are required!");
          return null;
        }
        return { name, price: parseFloat(price), category, image };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newMenuItem = { id: Date.now(), ...result.value };
        setMenuItems([...menuItems, newMenuItem]);
        Swal.fire("Success", "Menu item added!", "success");
      }
    });
  };

  // Delete Menu function
  const handleDelete = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    Swal.fire("Deleted!", "The menu item has been deleted.", "success");
  };

  // Update Menu function
  const handleUpdate = (item) => {
    Swal.fire({
      title: "Update Menu Item",
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${item.name}">
        <input id="price" type="number" class="swal2-input" placeholder="Price" value="${item.price}">
        <input id="category" class="swal2-input" placeholder="Category" value="${item.category}">
        <input id="image" class="swal2-input" placeholder="Image URL" value="${item.image}">
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const category = document.getElementById("category").value;
        const image = document.getElementById("image").value;

        if (!name || !price || !category || !image) {
          Swal.showValidationMessage("All fields are required!");
          return null;
        }
        return { name, price: parseFloat(price), category, image };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setMenuItems(
          menuItems.map((menuItem) =>
            menuItem.id === item.id ? { ...menuItem, ...result.value } : menuItem
          )
        );
        Swal.fire("Success", "Menu item updated!", "success");
      }
    });
  };

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
          <button className="add-menu-btn" onClick={handleAddMenu}>
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
                  <img src={food.image} alt={food.name} />
                  <div className="card-details">
                    <p className="dish-name">{food.name}</p>
                    <p className="dish-price">₱{food.price}</p>
                    <button
                      className="delete-menu-btn"
                      onClick={() => handleDelete(food.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="update-menu-btn"
                      onClick={() => handleUpdate(food)}
                    >
                      Update
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

export default AdminMenu;
c