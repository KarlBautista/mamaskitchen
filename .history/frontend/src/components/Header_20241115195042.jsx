import "../styles/header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
    const [activeLink, setActiveLink] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    // Function to handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Trigger change when scrolled 50px
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div>
            <div className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-logo">
                    <p>Foodly</p>
                </div>
                <div className="header-links">
                    <Link 
                        to="/" 
                        className={activeLink === '/' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/')}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/stores" 
                        className={activeLink === '/stores' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/stores')}
                    >
                        Stores
                    </Link>
                    <Link 
                        to="/search-cravings" 
                        className={activeLink === '/search-cravings' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/search-cravings')}
                    >
                        Search Cravings
                    </Link>
                    <Link 
                        to="/start-selling" 
                        className={activeLink === '/start-selling' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/start-selling')}
                    >
                        Start Selling
                    </Link>
                    <Link 
                        to="/about-us" 
                        className={activeLink === '/about-us' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/about-us')}
                    >
                        About Us
                    </Link>
                </div>
                <div className="header-last">
                    <Link 
                        to="/login" 
                        className={activeLink === '/login' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/login')}
                    >
                        Login
                    </Link>
                    <Link 
                        to="/register" 
                        className={activeLink === '/register' ? 'active' : ''} 
                        onClick={() => handleLinkClick('/register')}
                    >
                        Register
                    </Link>
                    <div className="bayong-container">
                        <i className="fa-solid fa-cart-shopping bayong"></i>
                    </div>
                </div>
            </div>
      
    );
}

export default Header;
