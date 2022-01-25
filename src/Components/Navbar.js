import React,{useContext,useEffect,useState} from 'react';
import "../CssComp/Nav.css";
import {Link, useNavigate} from "react-router-dom";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {db,auth} from "../firebase";
import { updateDoc, doc} from "firebase/firestore";
import {toast} from "react-toastify";
import Loading from './Loading';
import {Global} from '../App';

function Navbar() {

  // usecontext using here
 const user = useContext(Global)
  const navigate = useNavigate();

  

  const logout =async ()=>{
    await updateDoc(doc(db,"users",auth.currentUser.uid),{
      isOnline:false,
    })  
    signOut(auth);
    toast.success("Logout successfuly");
    navigate("/login");
  }
  return <>
      <nav className="container">
      <div>
        
     <Link className="mx-3 fs-3 text-dark" to="/">Musaif</Link> 
      </div>
 <ul>

 

 {/* if not work use this auth.currentUser */}
      {user  ? (<>
      <li>
      <Link to="/box">Box</Link>
      </li>
     <li>

     <Link to="/messaging">Chatbox</Link>
     </li>
     <li>
     
     <Link to="/profile">Profile</Link>
     
       <button onClick={logout} className='btn btn-danger btn-sm mx-3'>logout</button>
     </li>
     

      </>):(<> 
      <li>
        
        <Link className="mx-3 text-dark" to="/register">Register</Link>
      </li>
      <li>
     <Link to="/login">Login</Link>
      </li>
      </>) }
</ul>

   </nav>
  </>;
}

export default Navbar;
