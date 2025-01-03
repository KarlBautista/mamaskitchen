import "../styles/start-selling.css";
import React, { useState } from "react";

const StartSelling = () => {
  const [logoPreview, setLogoPreview] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [food, setFood] = useState([]); // Array to store food items
  const [foodImage, setFoodImage] = useState(null);
  const [foodImagePreview, setFoodImagePreview] = useState(null);

  // Function to handle food image upload
  const handleFoodImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
      setFoodImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundPreview(URL.createObjectURL(file));
    }
  };



  const addFood = (prev) =>{
    const  foodName = document.getElementById("food-name").value;
    const foodDescription = document.getElementById("food-desc").value;
    const foodPrice = document.getElementById("food-price").value;

    if(!foodName || !foodDescription || !foodPrice || !foodImage){
        alert("")
    }
  }
  return (
    <div className="start-selling-container">
      <div className="start-selling-left"></div>

      <div className="start-selling">
        {/* Step 1 */}
        <div className="step-1-container">
          <div className="step-1">
            <p className="step-1-title">Step 1: Register your owner account to start selling your food.</p>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <label>Business Name</label>
              <input type="text" placeholder="Name of your store" />
            </div>
            <div className="form-group">
              <label>Business Logo</label>
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </div>
            <div className="form-group">
              <label>Business Background</label>
              <input type="file" accept="image/*" onChange={handleBackgroundChange} />
            </div>
          </div>

          <div className="display-images">
            {logoPreview && (
              <div className="image-preview">
                <p>Logo Preview:</p>
                <img src={logoPreview} alt="logo preview" className="start-selling-logo-image" />
              </div>
            )}
            {backgroundPreview && (
              <div className="image-preview">
                <p>Background Preview:</p>
                <img src={backgroundPreview} alt="background preview" className="start-selling-background-image" />
              </div>
            )}
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-2-container">
          <div className="step-2">
            <p className="step-2-title">Step 2: Add your food items to your store.</p>
            <div className="form-group">
              <label>Food Name</label>
              <input type="text" placeholder="Name of the food" id="food-name"/>
            </div>
            <div className="form-group">
              <label>Food Description</label>
              <input type="text" placeholder="Description of the food" id="food-desc" />
            </div>
            <div className="form-group">
              <label>Food Price</label>
              <input type="text" placeholder="Price of the food" id="food-price"/>
            </div>
            <div className="form-group">
              <label>Food Image</label>
              <input type="file" accept="image/*" onChange={handleFoodImageChange} />
            </div>
            <button className="add-food-btn" onClick={addFood}>
              Add Food
            </button>
          </div>

          {/* Food Items Table */}
          <div className="step-2-preview">
            <p className="table-title">Food Items</p>
            <table className="food-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {food.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.image} alt={item.name} className="food-table-image" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="start-selling-right"></div>
    </div>
  );
};

export default StartSelling;
