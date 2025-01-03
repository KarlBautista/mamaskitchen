import "../styles/header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ user, setUser }) {
    const [activeLink, setActiveLink] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.header-last')) {
                setIsDropdownOpen(false);
            }
        };

        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleLogout = () => {
        setUser(null); // Clear user data
        localStorage.removeItem('user'); // Clear localStorage if used
    };

    return (
        <div
            className={`header-container ${isScrolled ? 'scrolled' : ''} ${
                showHeader ? 'visible' : 'hidden'
            }`}
        >
            <div className="header-logo">
                <p>foodly</p>
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

                {user ? (
                    <div className="user-info">
                        <span>Welcome, {user.first_name}!</span>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="user-dropdown">
                        <i className="fas fa-user" onClick={toggleDropdown}></i>
                        {isDropdownOpen && (
                            <div className="dropdown-content">
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
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
