import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cart.css";

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/cart`, {
          params: { user_id: userId }, // Sending user_id as a query parameter
        });

        if (response.data.success && response.data.cart.length > 0) {
          setCart(response.data.cart); // Ensure the response structure matches
        } else {
          setCart([]); // Set cart as empty if no items are returned
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]); // Handle errors by clearing cart
      } finally {
        setLoading(false); // Loading finished
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading your cart...</p>
      ) : cart.length > 0 ? (
        <ul className="cart-items">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <img src={item.image_url} alt={item.food_name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.food_name}</p>
                <p className="cart-item-price">₱{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
