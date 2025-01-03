// CartPage.jsx
import React from "react";
import "./cart.css";
import ".."

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Lechon Kawali", price: 10.99, quantity: 1, image: "/images/lechon.jpg" },
    { id: 2, name: "Pancit Canton", price: 8.49, quantity: 2, image: "/images/pancit.jpg" },
    { id: 3, name: "Halo-Halo", price: 6.99, quantity: 1, image: "/images/halo-halo.jpg" },
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
              <p className="cart-item-quantity">
                Quantity: <span>{item.quantity}</span>
              </p>
            </div>
            <button className="cart-item-remove">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${calculateTotal()}</h2>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
