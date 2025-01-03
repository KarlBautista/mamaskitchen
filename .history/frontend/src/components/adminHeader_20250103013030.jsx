import "../styles/header.css";
import { Link } from "react-router-dom";

function AdminHeader() {
    return (
        <div className="header-container">
            <div className="header-logo">
                <Link to="/dashboard">
                    <img
                        src="/path-to-your-admin-logo.png" // Replace with the admin logo path
                        alt="Admin Logo"
                        className="header-logo-image"
                    />
                </Link>
            </div>
            <div className="header-links">
                <Link to="/dashboard" className="active">
                    Dashboard
                </Link>
                <Link to="/menu">Menu</Link>
                <Link to="/notifications">Notifications</Link>
            </div>
        </div>
    );
}

export default AdminHeader;
