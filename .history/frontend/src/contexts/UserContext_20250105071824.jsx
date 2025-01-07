import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a Context for the user
export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Check localStorage for user data and cart data on initial load
    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            if (storedUser) {
                setUser(storedUser);
            }
            setCart(storedCart);
        } catch (error) {
            console.error("Error parsing data from localStorage:", error);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        clearCart();
    };

    const addToCart = async (item) => {
        if (!item.image_url) {
            console.error("Item image_url is missing!");
            return; // Make sure the item has an image_url before proceeding
        }
    
        try {
            const response = await axios.post('http://localhost:8800/add_to_cart', {
                user_id: user.id,
                food_name: item.food_name,
                price: item.price,
                image_url: item.image_url, // Ensure this is passed
            });
    
            if (response.data.success) {
                setCart((prevCart) => {
                    const updatedCart = [...prevCart, item];
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    return updatedCart;
                });
            } else {
                console.error("Failed to add to cart:", response.data.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, cart, setCart, addToCart, clearCart }}>
            {children}
        </UserContext.Provider>
    );
};