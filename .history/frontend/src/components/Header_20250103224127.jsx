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
                        alt="Mama's Kitchen Logo"
                        className="header-logo-image"
                    />
                </Link>
            </div>

            <div className="header-links">
                {user?.user_type === "admin" ? (
                    <>
                        <Link
                            to="/adminDashboard"
                            className={activeLink === "/adminDashboard" ? "active" : ""}
                            onClick={() => handleLinkClick("/adminDashboard")}
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
                    </>
                ) : (
                    <>
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
                        <Link
                            to="/cart"
                            className={activeLink === "/cart" ? "active" : ""}
                            onClick={() => handleLinkClick("/cart")}
                        >
                            <i className="fa-solid fa-cart-shopping bayong"></i>
                        </Link>
                    </>
                )}
            </div>
            <div className="header-last">
    <div className="icons-container">
        <Link
            to="/cart"
            className={activeLink === "/cart" ? "active cart-icon" : "cart-icon"}
            onClick={() => handleLinkClick("/cart")}
        >
            <i className="fa-solid fa-cart-shopping"></i>
        </Link>
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

        </div>
    );
}

export default Header;
