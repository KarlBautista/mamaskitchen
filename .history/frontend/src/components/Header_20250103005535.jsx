import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import headerlogo from "../images/Header-Logo.png";
import headerLogoScroll from "../images/Header-Logo-Scroll.png";

function Header() {
    const { user, login, logout } = useContext(UserContext);
    const [activeLink, setActiveLink] = useState('/');
    const [isScrolled, setIsScrolled] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    useEffect(() => {
        if (user) {
            setIsDropdownOpen(false);
        }
    }, [user]);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setActiveLink("user");
        setIsDropdownOpen((prev) => !prev);
    };

    const handleAccountSettings = () => {
        setIsDropdownOpen(false);
        navigate("/profile");
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/");
    };

    const renderAdminHeader = () => (
        <div className="header-links">
            <Link
                to="/dashboard"
                className={activeLink === "/dashboard" ? "active" : ""}
                onClick={() => handleLinkClick("/dashboard")}
            >
                Dashboard
            </Link>
            <Link
                to="/menu"
                className={activeLink === "/menu" ? "active" : ""}
                onClick={() => handleLinkClick("/menu")}
            >
                Menu
            </Link>
            <Link
                to="/notifications"
                className={activeLink === "/notifications" ? "active" : ""}
                onClick={() => handleLinkClick("/notifications")}
            >
                Notifications
            </Link>
        </div>
    );

    const renderUserHeader = () => (
        <div className="header-links">
            <Link
                to="/"
                className={activeLink === "/" ? "active" : ""}
                onClick={() => handleLinkClick("/")}
            >
                Home
            </Link>
            <Link
                to="/search-cravings"
                className={activeLink === "/search-cravings" ? "active" : ""}
                onClick={() => handleLinkClick("/search-cravings")}
            >
                Search Cravings
            </Link>
            <Link
                to="/about-us"
                className={activeLink === "/about-us" ? "active" : ""}
                onClick={() => handleLinkClick("/about-us")}
            >
                About Us
            </Link>
        </div>
    );

    return (
        <div
            className={`header-container ${
                isScrolled ? "scrolled" : ""
            } ${showHeader ? "visible" : "hidden"}`}
        >
            <div className="header-logo">
                <Link to="/">
                    <img
                        src={isScrolled ? headerLogoScroll : headerlogo}
                        alt="Pinoy Bites Logo"
                        className="header-logo-image"
                    />
                </Link>
            </div>

            {/* Conditionally render header based on user role */}
            {user?.role === "admin" ? renderAdminHeader() : renderUserHeader()}

            <div className="header-last">
                <div
                    className={`user-dropdown ${
                        activeLink === "user" ? "active" : ""
                    }`}
                >
                    <i className="fas fa-user" onClick={toggleDropdown}></i>
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            {user ? (
                                <>
                                    <span
                                        onClick={handleAccountSettings}
                                        className="dropdown-item"
                                    >
                                        Account Settings
                                    </span>
                                    <span
                                        onClick={handleLogout}
                                        className="dropdown-item"
                                    >
                                        Logout
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => handleLinkClick("/login")}
                                        className="dropdown-item"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() =>
                                            handleLinkClick("/register")
                                        }
                                        className="dropdown-item"
                                    >
                                        Register
                                    </Link>
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
