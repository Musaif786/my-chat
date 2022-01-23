import React from 'react';
import { toast } from 'react-toastify';
 
function About() {
    const hi =()=>{
        toast("hello")
    }
  return <>
      <h1 onClick={hi}>about</h1>
  </>;
}

export default About;
