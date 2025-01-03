import axios from "axios";
import "../styles/start-selling.css";
import React, { useState } from "react";

const StartSelling = () => {
  const [logoPreview, setLogoPreview] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [foodList, setFoodList] = useState([]); // Array to store food items
  const [foodImage, setFoodImage] = useState(null);
  const [foodImagePreview, setFoodImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [storeInfo, setStoreInfo] = useState({
    email: "",
    password: "",
    businessName: "",
    businessCategory: "",
    business_logo: "",
    business_background: "",
  });

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setStoreInfo((prev) => ({
        ...prev,
        [fieldName]: file,
      }));

      if (fieldName === "business_logo") {
        setLogoPreview(URL.createObjectURL(file));
      } else if (fieldName === "business_background") {
        setBackgroundPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleFoodImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
      setFoodImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setStoreInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addFood = () => {
    const foodName = document.getElementById("food-name").value;
    const foodPrice = document.getElementById("food-price").value;

    if (!foodName || !selectedCategory || !foodPrice || !foodImagePreview) {
      alert("Please complete all the fields to add a food item.");
      return;
    }

    setFoodList((prev) => [
      ...prev,
      {
        name: foodName,
        category: selectedCategory,
        price: foodPrice,
        image: foodImagePreview,
      },
    ]);

    // Reset food input fields
    document.getElementById("food-name").value = "";
    document.getElementById("food-price").value = "";
    setFoodImage(null);
    setFoodImagePreview(null);
    setSelectedCategory("");
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!storeInfo.email || !storeInfo.password || !storeInfo.businessName || !storeInfo.businessCategory) {
      alert("Please complete all store information fields.");
      return;
    }

    if (foodList.length === 0) {
      alert("Please add at least one food item.");
      return;
    }

    const formData = new FormData();
    formData.append("businessName", storeInfo.businessName);
    formData.append("password", storeInfo.password);
    formData.append("email", storeInfo.email);
    formData.append("businessCategory", storeInfo.businessCategory);
    formData.append("business_logo", storeInfo.business_logo);
    formData.append("business_background", storeInfo.business_background);

    try {
      const response = await axios.post("http://localhost:8800/stores_account", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const storeId = response.data.storeId;

      // Add food items to the store's table
      for (const food of foodList) {
        const foodFormData = new FormData();
        foodFormData.append("name", food.name);
        foodFormData.append("category", food.category);
        foodFormData.append("price", food.price);
        foodFormData.append("image", foodImage);

        await axios.post(`http://localhost:8800/add_food/${storeId}`, foodFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Store and food items deployed successfully.");
    } catch (err) {
      console.error(err);
      alert("An error occurred while deploying the store and food items.");
    }
  };

  return (
    <div className="start-selling-container-2">
      <div className="start-selling-left"></div>

      <div className="start-selling-2">
        {/* Step 1 */}
        <div className="step-1-container">
          <div className="step-1">
            <p className="step-1-title">Step 1: Register your owner account to start selling your food.</p>
            {/* Store Information */}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email" onChange={handleChange} name="email" value={storeInfo.email} />
            </div>
            {/* Other Inputs */}
            {/* Logo and Background */}
          </div>
        </div>

        {/* Step 2 */}
        <div className="step-2-container">
          {/* Food Inputs */}
        </div>
      </div>
    </div>
  );
};

export default StartSelling;
