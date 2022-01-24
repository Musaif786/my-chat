import React,{useEffect, useState} from 'react';
import {db,auth} from "../firebase";
import { collection, query, where, doc,getDoc, getDocs, onSnapshot, limit, orderBy } from "firebase/firestore";
import User from '../Components/User';
import "../PagesCss/Messaging.css";
import { async } from '@firebase/util';


function Messaging() {


    const [users, setUsers] = useState({});
    const [ loading , setLoading] = useState(true);

    const defaulsImg = "https://source.unsplash.com/50x50/?nature,water";


    useEffect( async ()=>{

        const userRef = collection(db, "users");

        //creating query object
        const q = query(userRef, limit(10), where("uid","not-in",[auth.currentUser.uid]));

        //execute query
        // const unsub = await onSnapshot(q, (querySnapshot) =>{
        //     let users = [];
        //     querySnapshot.forEach((doc) =>{
        //      users.push(doc.data())
        //     });
        // getDocs
        
        const unsub =  onSnapshot(q, (querySnapshot) =>{
                 let users = [];
                 querySnapshot.forEach((doc) =>{
                  users.push(doc.data())
                  setUsers(users);
                 });
                //  console.log(users.name)
        } );
        
        return ()=>{ unsub(); }
    },[]);
    const selectuser = (users)=>{
        console.log(users)
    
    }


    
    
  return <>
    <div>
        <div className='message-container'>
         <div className='user-container'>
     testing
        {/* {users[0].name} */}
        {
           Object.keys(users).map((x) =>{
               return ( <div key={x.uid}> 
               
               {/* users left side */}
<div onClick={ selectuser} className='user-wrapper'>

<div className="user-info" >
  <div className="user-details">
    <img src={users[x].avatar  || defaulsImg} alt=""className='user-avatar' />
    <h2>user name: {users[x].name}</h2>
    <div className={`user-status ${users[x].isOnline ? "online" : "offline"}`}>
    </div>
    
  
  </div>
</div>
</div>
               
            {/* <User key={users.uid} user={abc} /> */}
            </div> )
            })
        }


       {
          loading ==false && (users.map((e)=>(
               <>
                   <h1> {e.name}</h1>
               </>
           )))
       }

       

         </div>
        </div>
    </div>
      </>;
}

export default Messaging;
