import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import CustomerDashBoard from './components/customerDashBoard';

function App() {
    const [user, setUser] = useState(null);

    // Load user from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Header user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/customer-dashboard" element={<CustomerDashBoard user={user} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
