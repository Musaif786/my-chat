import React, { useState } from 'react';
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';
import { toast } from 'react-toastify';


function Reset() {
    const [email, setEmail] = useState("");


//reset pass 
const reset = ()=>{
    
    sendPasswordResetEmail(auth, email)
      .then(() => {
       toast.success("Reset link send to your gmail");
      })
      .catch((err) => {
        toast.error(err.message);
      });
      }

  return <>
      <div>
      <div style={{height:"90vh", backgroundColor:" #D8D3D1"}} className='d-flex justify-content-center align-items-center flex-column '>

          <form style={{maxHeigh:"50vh", minWidth:"300px"}} className=' bg-white p-2 py-5'>
          <h5 className='text-center mb-2'>Enter your email address</h5>
          <label htmlFor="email">Gmail</label>
              <input type="email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='your email..' />
          </form>
          <div className='text-center' style={{maxHeigh:"50vh", minWidth:"300px"}}>
          <button onClick={reset} style={{maxHeigh:"50vh", minWidth:"300px"}}  className='btn-sm btn-success mt-2 px-3'>sumbit</button>

          </div>
      </div>
      </div>
  </>;
}

export default Reset;
