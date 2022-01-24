import React,{createContext,useState,useEffect} from "react";
import './App.css';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//react-dom-router
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Login  from "./Pages/Login";
import Navbar from "./Components/Navbar";




// testing

import {onAuthStateChanged} from "firebase/auth";
import { auth} from "./firebase"
import Loading from "./Components/Loading";


export const Global = createContext();

function App() {
  
  //user hai to bahar faikdo uska code
  const [user, setUser] = useState(null);
  const [ loading, setLoading]= useState(true);

  const authListtener = ()=>{
      onAuthStateChanged(auth, (user) =>{

          setUser(user);
          setLoading(false);
      

  })
  }


  useEffect(()=>{
     authListtener();
  },[]);

   if(loading){
       return <Loading/>;
   }

  return (
  <>

      <Global.Provider value={user}>
    <BrowserRouter>
  {/* toast  */}
  <ToastContainer position='top-center'/>
   <Navbar/>



    <Routes>
    {!user && ( <>
      <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>

   
    </>
    )}
{ user && (
  <>
  <Route path="/" element={<Home/>}/>   
    <Route path="/profile" element={<Profile/>}/>
    </>
)}
    <Route path="*" element={ <Login/>}/> 
    </Routes>
  </BrowserRouter>
  </Global.Provider>
  

  </>
  );
}

export default App;
