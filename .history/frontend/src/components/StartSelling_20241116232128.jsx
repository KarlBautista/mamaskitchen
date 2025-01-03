
import "../styles/start-selling.css";

const StartSelling = () => {
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
                        <input type="file" placeholder="Your Store Logo" />
                        <img src="" alt="" />
                        <p>Business Background</p>
                        <input type="file" placeholder="Your Store Background" />
                        
                    </div>

                </div>
            <div className="start-selling-right">

            </div>
            
        </div>
    );
}

export default StartSelling;