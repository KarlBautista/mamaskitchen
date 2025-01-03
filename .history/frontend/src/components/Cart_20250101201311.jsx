import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cart.css";

const Cart = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/cart/${userId}`);
        if (response.data.success) {
          setCart(response.data.items); // Access the `items` array from the response
        } else {
          setCart([]); // If no items, set cart to an empty array
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]); // Clear cart on error
      } finally {
        setLoading(false); // Loading complete
      }
    };

    if (userId) fetchCart(); // Only fetch if userId is available
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
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
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
