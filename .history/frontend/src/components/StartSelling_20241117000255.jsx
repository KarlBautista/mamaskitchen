
import "../styles/start-selling.css";
import React, {useState} from 'react';

const StartSelling = () => {


    const [logoPreview, setLogoPreview] = useState("");
    const [backgroundPreview, setBackgroundPreview] = useState("");
    const [food, setFood] = useState([]);
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

      const addFood = () => {

      }
    };
    return (
        <div className="start-selling-container">
            <div className="start-selling-left">

            </div>
                <div className="start-selling"> 
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

                 
                       
                  
                       
<div className="step-2-container">
  <div className="step-2">
    <p className="step-2-title">Step 2: Add your food items to your store.</p>
    <div className="form-group">
      <label>Food Name</label>
      <input type="text" placeholder="Name of the food" />
    </div>
    <div className="form-group">
      <label>Food Description</label>
      <input type="text" placeholder="Description of the food" />
    </div>
    <div className="form-group">
      <label>Food Price</label>
      <input type="text" placeholder="Price of the food" />
    </div>
    <div className="form-group">
      <label>Food Image</label>
      <input type="file" accept="image/*" onChange={handleFoodImageChange} />
    </div>
    <button className="add-food-btn" onClick={addFood}>Add Food</button>
  </div>

  <div className="step-2-preview">
    {foodImagePreview && (
      <div className="image-preview">
        <p>Food Image Preview:</p>
        <img src={foodImagePreview} alt="Food preview" className="food-image-preview" />
      </div>
    )}
  </div>
</div>


                </div>
            <div className="start-selling-right">

            </div>
            
        </div>
    );
}

export default StartSelling;