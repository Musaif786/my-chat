    import React, { useState } from "react";
import "../PagesCss/Register.css";
//firebase
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc, } from "firebase/firestore";

//toast
import { toast } from "react-toastify";
//react-dom navigator
import { useNavigate,Link } from "react-router-dom";


function Login() {

  // navigator
  const navigator = useNavigate();
  const [data, setData] = useState({
    email: "",
    pass: "",
    error: "",
    loading: false,
  });
  const { email, pass, error, loading } = data;
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if ( !email || !pass) {
      // toast.error("Plz fill each input field");
      setData({ ...data, error: "all field are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      toast.success("successfully account created");
      setTimeout(navigator("/"),1500);
   
      //below code to save data into firedata base
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({  email: "", pass: "", error: null, loading: false });
      // old method and above is new method firebase.firestore.collection("users").doc(id).set({})
    } catch (err) {
      // toast.error("error : "+err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  
  return (
    <>
      <section id="register" className="container mt-5 ">
        <h3>Login your account</h3>
        <form
          onSubmit={submitHandle}
          style={{ maxWidth: "400px", maxHeight: "500px" }}
        >
      
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email here"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              id="pass"
              placeholder="pass here"
              value={pass}
              onChange={handleChange}
            />
          </div>
          {error ? <p id="register-error">{error}</p> : null}
          <div>
            <button className="submit btn btn-primary" disabled={loading}>{loading ? "logging in...":"Login"}</button>
          </div>
          
        </form>
        <div>
            
              <p className="mt-2">Don't have an account ? <Link to="/register">Sign-up</Link></p>
            </div>
        {/* <p>{data.name}</p> */}
      </section>
  
  </>
  )}

export default Login;
