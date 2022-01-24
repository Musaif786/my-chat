import React,{useEffect, useState} from 'react';
import {db,auth} from "../firebase";
import { collection, query, where, onSnapshot, doc,getDoc, getDocs } from "firebase/firestore";
import User from '../Components/User';
import "../PagesCss/Messaging.css";
import { async } from '@firebase/util';


function Messaging() {


    const [users, setUsers] = useState({});

    const defaulsImg = "https://source.unsplash.com/50x50/?nature,water";


    useEffect( async ()=>{

        const userRef = collection(db, "users");

        //creating query object
        const q = query(userRef, where("uid", "not-in",[auth.currentUser.uid]));

        //execute query
        // const unsub = await onSnapshot(q, (querySnapshot) =>{
        //     let users = [];
        //     querySnapshot.forEach((doc) =>{
        //      users.push(doc.data())
        //     });
        // getDocs
        const unsub = await onSnapshot(q);
        let users = [];
        unsub.forEach((doc) => {
    users.push(doc.data())
            setUsers(users);
        });
        return ()=>{ unsub(); }


    },[]);
    console.log(users)
    
  return <>
    <div>
        <div className='message-container'>
         <div className='user-container'>
        helllooo im uers
        {/* {users[0].name} */}
        {
            Object.keys(users).map((x) =>{
               return ( <div> 
               
               {/* users left side */}
<div className='user-wrapper'>

<div className="user-info">
  <div className="user-details">
    <img src={users[x].avatar  || defaulsImg} alt=""className='user-avatar' />
    <h2>user name: {users[x].name}</h2>
    
  
  </div>
</div>
</div>
               
            {/* <User key={users.uid} user={abc} /> */}
            </div> )
            })
        }
         </div>
        </div>
    </div>
      </>;
}

export default Messaging;
