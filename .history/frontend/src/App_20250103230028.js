import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"; // Import the context provider

import Home from "./components/Home";
import Register from "./components/Register";
import Header from "./components/Header";
import SearchCravings from "./components/SearchCravings";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Profile from "./components/Profile"; // Import the Profile component
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";
import AdminMenu from "./components/adminMenu"
function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search-cravings" element={<SearchCravings />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/adminDashboard" element={<AdminDashboard />} />
                    <Route path="/adminMenu" element={<AdminDashboard />} />

                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
