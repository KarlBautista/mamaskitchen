import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home"
import Register from "./components/Register"
import Header from "./components/Header"

import SearchCravings from './components/SearchCravings';
import StartSelling from './components/StartSelling';
import AboutUs from './components/AboutUs';
import Login from "./components/Login"
import CustomerDashBoard from './components/customerDashBoard';




function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Header />
     <Routes>
         
          <Route path="/" element= {<Home />}></Route>
        
          <Route path="/search-cravings" element= {<SearchCravings />}></Route>
          <Route path="/start-selling" element= {<StartSelling />}></Route>
          <Route path="/about-us" element= {<AboutUs />}></Route>
          <Route path="/login" element= {<Login />}></Route>
          <Route path="/register" element= {<Register />}></Route>
         
          <Route path="/customer-dashboard" element= {<CustomerDashBoard />}></Route>
         
         



     </Routes>
   
   
   </BrowserRouter>
    

    </div>
  );
}

export default App;
