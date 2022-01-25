import React, { useState } from "react";
import "../PagesCss/Register.css";
//firebase
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { auth, db,provider } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

//toast
import { toast } from "react-toastify";
//react-dom navigator
import { useNavigate,Link } from "react-router-dom";

function Register() {
  // navigator
  const navigator = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    pass: "",
    error: "",
    loading: false,
  });
  const { name, email, pass, error, loading } = data;
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (name || email || pass) {
      // toast.error("Plz fill each input field");
      setData({ ...data, error: "all field are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      toast.success("successfully account created");
      setTimeout(navigator("/"),1500);
   
      //below code to save data into firedata base
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({ name: "", email: "", pass: "", error: null, loading: false });
      // old method and above is new method firebase.firestore.collection("users").doc(id).set({})
    } catch (err) {
      // toast.error("error : "+err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const signinwithgoogle = ()=>{
 const signin =   signInWithPopup(auth, provider)
 //    signInWithRedirect(auth, provider)

  if(signin){
    navigator("/")
  }else{
    navigator("/login")
  }
}
  return (
    <>
      <section id="register" className="container ">
        <h3>Create Account</h3>
        <form
          onSubmit={submitHandle}
          style={{ maxWidth: "300px", maxHeight: "800px" }}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name "
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email "
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
              placeholder="password"
              value={pass}
              onChange={handleChange}
            />
          </div>
          {error ? <p id="register-error">{error}</p> : null}
          <div>
            <button className="submit btn btn-primary" disabled={loading}>{loading ? "Creating ac...":"Signup"}</button>

            <div>
              <button onClick={signinwithgoogle}  className=" btn btn-success ">Sign-up with Google</button>
              <p>Alread have an account ? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </form>
        {/* <p>{data.name}</p> */}
      </section>
    </>
  );
}

export default Register;
