import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './contexts/UserContext'; // Import the context provider

import Home from './components/Home';
import Register from './components/Register';
import Header from './components/Header';
import SearchCravings from './components/SearchCravings';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import CustomerDashBoard from './components/customerDashBoard';

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
          
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
