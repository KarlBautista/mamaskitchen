import "../styles/header.css";
import Cart from "../images/cart.png";

import { Link } from "react-router-dom";
import { useState } from 'react'; // Don't forget to import useState

function Header() {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div>
            <div className="header-container">
                <div className="header-logo">
                    <p>Foodly</p>
                </div>
                <div className="header-links">
                    <Link to="/" 
                        className={activeLink === '/' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/')}
                    >
                        Home
                    </Link>
                    <Link to="/stores" 
                        className={activeLink === '/stores' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/stores')}
                    >
                        Stores
                    </Link>
                    <Link to="/search-cravings" 
                        className={activeLink === '/search-cravings' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/search-cravings')}
                    >
                        Search Cravings
                    </Link>
                    <Link to="/start-selling" 
                        className={activeLink === '/start-selling' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/start-selling')}
                    >
                        Start Selling
                    </Link>
                    <Link to="/about-us" 
                        className={activeLink === '/about-us' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/about-us')}
                    >
                        About Us
                    </Link>
                </div>
                <div className="header-last">
                    <a href="#">Login</a>
                    <Link to="/register"><a>Register</a></Link>
                    <div className="bayong-container">
                        <img className= src={Cart} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
