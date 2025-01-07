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
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Only parse if storedUser exists
            }
        } catch (error) {
            console.error("Error parsing data from localStorage:", error);
            // Optionally, handle any fallback behavior if data is invalid
        }

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Other functions remain the same...
};
