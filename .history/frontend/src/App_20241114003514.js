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
import Add from "./components/Add"
import Update from "./components/Update"
import Shoes from "./components/Shoes"
import Stores from "./components/Stores"
import SearchCravings from './components/SearchCravings';
import StartSelling from './components/StartSelling';
import AboutUs from './components/AboutUs';



function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Header />
     <Routes>
         
          <Route path="/" element= {<Home />}></Route>

        
          <Route path="/stores" element= {<Stores />}></Route>
          <Route path="/search-cravings" element= {<SearchCravings />}></Route>
          <Route path="/start-selling" element= {<StartSelling />}></Route>
          <Route path="/about-us" element= {<AboutUs />}></Route>
          <Route path="/register" element= {<Register />}></Route>


     </Routes>
   
   
   </BrowserRouter>
    

    </div>
  );
}

export default App;
