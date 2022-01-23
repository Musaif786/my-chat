import React from "react";
import './App.css';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//react-dom-router
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";



function App() {
  return (
  <>
  <BrowserRouter>
  <ToastContainer position='top-center'/>
   <na className="container">
     <Link className="mx-3 text-dark" to="/">Home</Link>
     <Link to="/about">About</Link>
   </na>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    </Routes>
  </BrowserRouter>
   
  </>
  );
}

export default App;
