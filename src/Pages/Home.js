import React, { useContext,useState, useEffect } from 'react';
import {Global} from '../App';
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {doc,updateDoc, getDoc} from "firebase/firestore";
import "../PagesCss/Home.css";

function Home() {
  const user = useContext(Global);
  const [users , setUsers] = useState();
  const [dates, setDates] = useState("");
  const [ img, setImg] = useState("");
  const fakeimg = "https://source.unsplash.com/400x300/?cartoon/doremon";
  
  let num = 0;
const updates = ()=>{
   let hours = new Date().getHours();
  
  if(num<12){
    setDates("Good morning");
  } else if(num >=12 && num< 16){
    setDates("Good AfterNoon")
  
} else if(num >=16 && num< 18){
  setDates("Good Evening")
}
  else{
    setDates("Good Night");
  }

}


  setInterval(updates,5000);
  useEffect(()=>{
    
    
    getDoc(doc(db, "users", auth.currentUser.uid)).then( docSnap =>{
      if(docSnap.exists){
         setUsers(docSnap.data());
      }
  });

  if(img){
      const uploadimg = async ()=>{
          const imgRef = ref(storage,`avatar/${new Date().getTime} - ${img.name}`);
          try {
              
              const snap = await uploadBytes(imgRef,img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, "users", auth.currentUser.uid),{
              avatar: url,
              avatarPath: snap.ref.fullPath,
          } );
          setImg("");
          // console.log(snap.ref.fullPath);
          // console.log(url);

          } catch (err) {
              console.log(err.message)
              
          }
          
      };
      uploadimg();
  }

 
  

},[img]);
  return users  ? ( <>
      <div onLoad={updates} className="home-container">
          <h1>Welcome To Musaif web</h1>
            
        

          <h2> {dates} <span className='text-danger fs-3'> @{!(users.name==null) ? users.name : "Mr"} </span>  welcome to Musaif React-app</h2>
      </div>
  </>):null;
}
export default Home;
