
import "../styles/start-selling.css";

const StartSelling = () => {
    return (
        <div className="start-selling-container">
            <div className="start-selling-left">

            </div>
            <div className="start-selling"> 
                <div className="step-1">
                    <p>Step 1: Register your owner account to start selling your food.</p>
                    <p>Email</p>
                    <input type="email" placeholder=" Your Email" />
                    <p>Store Name</p>
                    <input type="text" placeholder="Name of your store" />

                    <input type="file" placeholder="Your Store Logo" />
                    <input type="file" placeholder="Your Store Background" />
                    
                </div>

            </div>
            <div className="start-selling-right">

            </div>
            
        </div>
    );
}

export default StartSelling;