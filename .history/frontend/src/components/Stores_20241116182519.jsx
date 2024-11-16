import React from 'react';
import "../styles/stores.css";


const Stores = () => {
    return (
        <div className="stores-container">
             <div className="sidebar">
             
            </div>

            <div className="main-container">
            <div className="video-platform-container">
             
             <div className="video-platform">
                 <video className="videos" autoPlay loop muted>
                     <source src={Jollibee1} type="video/mp4" />
                     Your browser does not support the video tag.
                 </video>
             </div>
         </div>

            </div>
           
        </div>
    );
}

export default Stores;