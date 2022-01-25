import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

function Box() {
    const [ state, setState ]= useState([
        {
            name:"Musaif",
            age:20,
        },
        {
            name:"manohar",
            age:202,
        },
        {
            name:"khan",
            age:201,
        },
    ])

    const logout = ()=>{
        const a = signOut(auth);
 if(a){
     toast.success("logouted");
 }else{
     toast.error("fail")
 }
    }
  return (<>
      <div>
      <div className='container  d-flex justify-content-end mt-2 '>
      <button className='btn btn-danger' onClick={logout}>logout</button>
      </div>
          {
              state.map(e=>{
                  return (<>
                      <p>{e.name}</p>
                     
                  </>)
              })
          }
      </div>
  </>);
}

export default Box;
