import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, signOut,signInWithRedirect,signInWithPopup} from "firebase/auth";
import {auth, provider,db} from "../firebase";
import { updateDoc, doc, } from "firebase/firestore";
//react-dom navigator
import { useNavigate } from "react-router-dom";

import React ,{useState,useEffect} from 'react';
import { toast } from 'react-toastify';
import Hero from './Hero';
import Logins from './Logins';
import Headers from "../components/Header";


function FirebaseApp() {
    const [user, setUser] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailerror,setEmailerror] = useState("");
    const [passworderror,setPassworderror] = useState("");
    const [hasaccount,setHasaccount] = useState(false);
  const clearInput =()=>{
      setEmail("");
      setPassword("");
  }
  const clearError = ()=>{
      setEmailerror("");
      setPassworderror("");
  }
    const login =async ()=>{
        clearError();
     const logs = await signInWithEmailAndPassword(auth,email,password)
        .catch(err=>{toast.error("error"+err); switch(err.code){
            case "auth/invalid-email":
                case "auth/user-disable":
                    case "auth/user-not-found":
                        setEmailerror(err.message);
                        break;
            case "auth/wrong-password":
                setPassworderror(err.message);
                break;
        }})


    }

    const signup =async ()=>{
        clearError();
       
        
        const logs = await createUserWithEmailAndPassword(auth,email,password)
        .catch(err=>{toast.error("error"+err); switch(err.code){
            case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailerror(err.message);
                        break;
            case "auth/weak-password":
                setPassworderror(err.message);
                break;
        }})

    }

    const logout=()=>{
  signOut(auth);

    }
    
    const authListtener = ()=>{
        onAuthStateChanged(auth, (user) =>{

            setUser(user);
        
        //     if(user){
        //         clearInput();
        //         setUser(user);
        //     }else{
        //         setUser("");
        //     }
        // 
    })
    }


    useEffect(()=>{
       authListtener();
    },[]);

    // sign with google

    const signinwithgoogle = ()=>{
           signInWithPopup(auth, provider)
        //    signInWithRedirect(auth, provider)
       
      }
  return <>
      <div>
     {user ? (<>
              <Headers/> 
      <Hero logout={logout} authListtener={authListtener} user={user}/>
              </>
     ):(

     
      <Logins email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login} signup={signup} hasaccount={hasaccount} setHasaccount={setHasaccount} emailerror={emailerror} passworderror={passworderror} signinwithgoogle={signinwithgoogle}/>
      )}
     
      </div>
  </>;
}

export default FirebaseApp;
