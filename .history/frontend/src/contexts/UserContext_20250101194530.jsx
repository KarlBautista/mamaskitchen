import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Check localStorage for user data and cart data on initial load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (storedUser) {
            setUser(storedUser);
        }
        setCart(storedCart);
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

    const addToCart = (item) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, item];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, cart, addToCart, clearCart }}>
            {children}
        </UserContext.Provider>
    );
};