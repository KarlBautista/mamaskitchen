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
import Stores from "./components/Stores"
import  





function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Header />
     <Routes>
         
          <Route path="/" element= {<Home />}></Route>
          <Route path="/stores" element= {<Register />}></Route>
          <Route path="/register" element= {<Register />}></Route>
          <Route path="/register" element= {<Register />}></Route>
          <Route path="/register" element= {<Register />}></Route>
          <Route path="/register" element= {<Register />}></Route>


     </Routes>
   
   
   </BrowserRouter>
    

    </div>
  );
}

export default App;
