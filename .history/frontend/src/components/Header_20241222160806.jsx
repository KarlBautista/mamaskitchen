import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
    const [activeLink, setActiveLink] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }

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
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleAccountSettings = () => {
        setIsDropdownOpen(false);
        navigate("/account-settings");
    };

    const handleLogout = () => {
        setIsDropdownOpen(false);
        localStorage.removeItem("user"); // Clear user data from local storage
        setUser(null); // Update state
        navigate("/"); // Redirect to homepage
    };

    return (
        <div className={`header-container ${isScrolled ? 'scrolled' : ''} ${showHeader ? 'visible' : 'hidden'}`}>
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
                    to="/search-cravings"
                    className={activeLink === '/search-cravings' ? 'active' : ''}
                    onClick={() => handleLinkClick('/search-cravings')}
                >
                    Search Cravings
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
                <div className="bayong-container">
                    <i className="fa-solid fa-cart-shopping bayong"></i>
                </div>
                <div className="user-dropdown">
                    <i className="fas fa-user" onClick={toggleDropdown}></i>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            {user ? (
                                <>
                                    <span onClick={handleAccountSettings} className="dropdown-item">Account Settings</span>
                                    <span onClick={handleLogout} className="dropdown-item">Logout</span>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => handleLinkClick('/login')} className="dropdown-item">Login</Link>
                                    <Link to="/register" onClick={() => handleLinkClick('/register')} className="dropdown-item">Register</Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
