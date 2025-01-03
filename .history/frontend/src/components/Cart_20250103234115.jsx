import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cart.css";
import { useUserContext } from "../contexts/UserContext";

const Cart = () => {
    const { user, cart, setCart } = useUserContext();
    const [loading, setLoading] = useState(true);

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Function to remove item from cart
    const removeFromCart = async (itemId) => {
        if (!user || !user.id) return;

        try {
            // Send request to backend to remove the item
            const response = await axios.delete(`http://localhost:8800/cart/${user.id}/item/${itemId}`);
            if (response.data.success) {
                // Update the cart state
                setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
            } else {
                console.error("Failed to remove item from cart:", response.data.message);
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            if (!user || !user.id) return;

            try {
                const response = await axios.get(`http://localhost:8800/cart/${user.id}`);
                if (response.data.success) {
                    setCart(response.data.items);
                } else {
                    setCart([]);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                setCart([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user, setCart]);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {loading ? (
                <p>Loading your cart...</p>
            ) : cart.length > 0 ? (
                <>
                    <ul className="cart-items">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                             

                    <img src={`http://localhost:8800${item.image_url}`} alt={item.name}   className="cart-item-image" />
                                <div className="cart-item-details">
                                    <p className="cart-item-name">{item.food_name}</p>
                                    <p className="cart-item-price">₱{item.price}</p>
                                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                    <button
                                        className="remove-item-button"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <p className="total-price">
                            <strong>Total Price: </strong>₱{totalPrice.toFixed(2)}
                        </p>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
