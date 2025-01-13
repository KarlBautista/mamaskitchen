import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext"; // Import the context
import headerlogo from "../images/Header-Logo.png";
import headerLogoScroll from "../images/Header-Logo-Scroll.png";

function Header() {
    const { user, logout } = useContext(UserContext); // Use context to get user data
    const [activeLink, setActiveLink] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowHeader(false);
            } else if (currentScrollY < lastScrollY) {
                setShowHeader(true);
            }
            setIsScrolled(currentScrollY > 50);
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setIsDropdownOpen(false);
        setIsBurgerOpen(false);
    };

    const handleBurgerClick = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    return (
        <header className={`header-container ${isScrolled ? 'scrolled' : ''} ${showHeader ? 'visible' : 'hidden'}`}>
            <div className="header-logo">
                <Link to="/">
                    <img src={isScrolled ? headerLogoScroll : headerlogo} alt="Logo" />
                </Link>
            </div>
            <nav className={`header-links ${isBurgerOpen ? 'open' : ''}`}>
                <Link to="/" className={activeLink === '/' ? 'active' : ''} onClick={() => handleLinkClick('/')}>Home</Link>
                <Link to="/about" className={activeLink === '/about' ? 'active' : ''} onClick={() => handleLinkClick('/about')}>About</Link>
                <Link to="/services" className={activeLink === '/services' ? 'active' : ''} onClick={() => handleLinkClick('/services')}>Services</Link>
                <Link to="/contact" className={activeLink === '/contact' ? 'active' : ''} onClick={() => handleLinkClick('/contact')}>Contact</Link>
            </nav>
            <div className="header-last">
                <div className="cart-icon">
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                    </Link>
                </div>
                <div className="user-dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <i className="fas fa-user"></i>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <Link to="/profile" className="dropdown-item">Profile</Link>
                            <Link to="/orders" className="dropdown-item">Orders</Link>
                            <div className="dropdown-item" onClick={logout}>Logout</div>
                        </div>
                    )}
                </div>
                <div className="burger-menu" onClick={handleBurgerClick}>
                    <i className={`fas ${isBurgerOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            </div>
        </header>
    );
}

export default Header;