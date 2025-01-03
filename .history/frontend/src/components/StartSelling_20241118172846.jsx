import "../styles/start-selling.css";
import React, { useState } from "react";

const StartSelling = () => {
  const [logoPreview, setLogoPreview] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [food, setFood] = useState([]); // Array to store food items
  const [foodImage, setFoodImage] = useState(null);
  const [foodImagePreview, setFoodImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
   
    const foodPrice = document.getElementById("food-price").value;

    if(!foodName || !selectedCategory || !foodPrice || !foodImagePreview){
        alert("Please complete all the fields");
    }

    setFood((prev) => [
        ...prev, 
        {
            name: foodName,
            description: selectedCategory,
            price: foodPrice,
            image: foodImagePreview,
        }
    
    ]
)

  }

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  }
  return (
    <div className="start-selling-container-2">
      <div className="start-selling-left"></div>

      <div className="start-selling-2">
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
              <label htmlFor="">Business Category</label>
              <select name="business-category" id="buisness-category">
                <option value="Filipino-restaurant">Filipino Restaurant</option>
                <option value="Fast-Food">Fast Food</option>
                <option value="Italian-restaurant"> Restaurant</option>
                <option value="Filipino-restaurant">Filipino Restaurant</option>
                <option value="Filipino-restaurant">Filipino Restaurant</option>
                <option value="Filipino-restaurant">Filipino Restaurant</option>
                <option value="Filipino-restaurant">Filipino Restaurant</option>
                <option value="Filipino-restaurant">Filipino Restaurant</option>
                <option value="Filipino-restaurant">Filipino Restaurant</option>





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
              <label for="food-category">Food Category</label>
                <select name="category" id="food-category" className="food-category" onChange={handleSelectedCategory} value={selectedCategory}>
                    <option value="Chicken">Chicken</option>
                    <option value="Pork">Pork</option>
                    <option value="Beef">Beef</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Salads">Salads</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Soups">Soups</option>
                    <option value="Grilled Foods">Grilled Foods</option>
                    <option value="Coffee">Coffee</option>

                 


                    
                    


                </select>
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
