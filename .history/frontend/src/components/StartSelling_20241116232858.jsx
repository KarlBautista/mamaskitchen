
import "../styles/start-selling.css";
import React, {useState} from 'react';

const StartSelling = () => {


    const [logoPreview, setLogoPreview] = useState("");
    const [backgroundPreview, setBackgroundPreview] = useState("");
  
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
    return (
        <div className="start-selling-container">
            <div className="start-selling-left">

            </div>
                <div className="start-selling"> 
                    <div className="step-1">
                        <p  className="step-1-title">Step 1: Register your owner account to start selling your food.</p>
                        <p>Email</p>
                        <input type="email" placeholder=" Your Email" />
                        <p>Business Name</p>
                        <input type="text" placeholder="Name of your store" />
                        <p>Business Logo</p>
                        <input type="file" accept="image/*" onChange={handleLogoChange} />
                       
                        
                        <p>Business Background</p>
                        <input type="file" accept="image/*" onChange={handleBackgroundChange} />
                        {logoPreview && <img src={logoPreview} alt="logo preview" />}
                        {backgroundPreview && <img src={backgroundPreview} alt="background preview"  className="start-selling-background-image" />}
                    </div>

                </div>
            <div className="start-selling-right">

            </div>
            
        </div>
    );
}

export default StartSelling;