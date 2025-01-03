import axios from "axios";
import "../styles/start-selling.css";
import React, { useState } from "react";

const StartSelling = () => {
  const [businessLogo, setBusinessLogo] = useState(null);
  const [businessBackground, setBusinessBackground] = useState(null);
  const [storeInfo, setStoreInfo] = useState({
    email: "",
    password: "",
    businessName: "",
    businessCategory: "",
  });

  const handleChange = (e) => {
    setStoreInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    setBusinessLogo(e.target.files[0]); // Update file state
  };

  const handleBackgroundChange = (e) => {
    setBusinessBackground(e.target.files[0]); // Update file state
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("businessName", storeInfo.businessName);
    formData.append("password", storeInfo.password);
    formData.append("email", storeInfo.email);
    formData.append("businessCategory", storeInfo.businessCategory);
    formData.append("business_logo", businessLogo); // Add logo file
    formData.append("business_background", businessBackground); // Add background file

    try {
      const response = await axios.post("http://localhost:8800/stores_account", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      alert("Successfully registered");
      setStoreInfo({
        email: "",
        password: "",
        businessName: "",
        businessCategory: "",
      });
      setBusinessLogo(null);
      setBusinessBackground(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="start-selling-container">
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="Your Email" onChange={handleChange} name="email" value={storeInfo.email} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Your Password" onChange={handleChange} name="password" value={storeInfo.password} />
      </div>
      <div className="form-group">
        <label>Business Name</label>
        <input type="text" placeholder="Your Business Name" onChange={handleChange} name="businessName" value={storeInfo.businessName} />
      </div>
      <div className="form-group">
        <label>Business Category</label>
        <select name="businessCategory" onChange={handleChange} value={storeInfo.businessCategory}>
          <option value="">Select a category</option>
          <option value="Filipino-restaurant">Filipino Restaurant</option>
          <option value="Fast-Food">Fast Food</option>
          <option value="Coffee-shop">Coffee Shop</option>
        </select>
      </div>
      <div className="form-group">
        <label>Business Logo</label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
      </div>
      <div className="form-group">
        <label>Business Background</label>
        <input type="file" accept="image/*" onChange={handleBackgroundChange} />
      </div>
      <button onClick={handleClick}>Register Store</button>
    </div>
  );
};

export default StartSelling;
