import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext"; // Ensure this context is properly implemented
import "../styles/cart.css";

const Cart = () => {
  const { userId } = useUserContext(); // Assuming userId is stored in the context
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cart data from the backend
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/cart?user_id=${userId}`);
        if (response.data.success) {
          setCart(response.data.cart); // Ensure your API sends cart items in `response.data.cart`
        } else {
          console.error("Failed to fetch cart data.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
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
