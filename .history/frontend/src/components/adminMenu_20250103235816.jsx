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

  // Add a new dish to the menu
  const addDish = async (name, price, category, image_url) => {
    try {
      const response = await axios.post("http://localhost:8800/add_food", {
        name,
        price,
        category,
        image_url,
      });

      if (response.data.success) {
        setMenuItems((prevMenuItems) => [...prevMenuItems, response.data.newDish]);
        Swal.fire({
          icon: "success",
          title: "Dish Added!",
          text: "The new dish has been added successfully to the menu.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "An error occurred while adding the dish.",
        });
      }
    } catch (error) {
      console.error("Error adding dish:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding the dish.",
      });
    }
  };

  // Delete a dish
  const deleteDish = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you cannot recover this dish!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8800/delete_food/${id}`);
          if (response.data.success) {
            setMenuItems(menuItems.filter((item) => item.id !== id));
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The dish has been deleted.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while deleting the dish.",
            });
          }
        } catch (error) {
          console.error("Error deleting dish:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while deleting the dish.",
          });
        }
      }
    });
  };

  // Update a dish
  const updateDish = async (id, name, price, category, image_url) => {
    try {
      const response = await axios.put(`http://localhost:8800/update_food/${id}`, {
        name,
        price,
        category,
        image_url,
      });

      if (response.data.success) {
        setMenuItems(menuItems.map((item) => (item.id === id ? response.data.updatedDish : item)));
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "The dish has been updated.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating the dish.",
        });
      }
    } catch (error) {
      console.error("Error updating dish:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the dish.",
      });
    }
  };

  // Trigger the SweetAlert form to add a new dish
  const handleAddMenu = () => {
    Swal.fire({
      title: "Add New Dish",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Dish Name">
        <input type="number" id="price" class="swal2-input" placeholder="Price">
        <input type="text" id="category" class="swal2-input" placeholder="Category (e.g., Meal, Dessert)">
        <input type="text" id="image_url" class="swal2-input" placeholder="Image URL">
      `,
      confirmButtonText: "Add Dish",
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const price = parseFloat(document.getElementById("price").value);
        const category = document.getElementById("category").value;
        const image_url = document.getElementById("image_url").value;

        // Check for missing fields
        if (!name || !price || !category || !image_url) {
          Swal.showValidationMessage("Please fill in all fields.");
          return false;
        }

        // Add the new dish
        addDish(name, price, category, image_url);
      },
    });
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
                  <img src={`http://localhost:8800${food.image_url}`} alt={food.name} />
                  <div className="card-details">
                    <p className="dish-name">{food.name}</p>
                    <p className="dish-price">₱{food.price}</p>
                    <div className="dish-actions">
                      <button className="update-btn" onClick={() => handleUpdate(food)}>
                        Update
                      </button>
                      <button className="delete-btn" onClick={() => deleteDish(food.id)}>
                        Delete
                      </button>
                    </div>
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
