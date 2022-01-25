import React,{useContext, useEffect, useState} from 'react';
import {db,auth} from "../firebase";
import { collection, query, where, doc,getDoc, getDocs, onSnapshot, limit, orderBy } from "firebase/firestore";
import User from '../Components/User';
import Chat from "../Components/Chat";
import "../PagesCss/Messaging.css";
import { async } from '@firebase/util';
import { Global } from '../App';
import { toast } from 'react-toastify';

function Messaging() {

    const globaluser = useContext(Global);


    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [ loading , setLoading] = useState(true);

    const defaulsImg = "https://source.unsplash.com/50x50/?nature,water";


    useEffect( async ()=>{

        // const userRef = collection(db, "users");

        //creating query object
        const q = query(collection(db, "users"), where("uid","not-in",[auth.currentUser.uid]));

        //execute query
        // const unsub = await onSnapshot(q, (querySnapshot) =>{
        //     let users = [];
        //     querySnapshot.forEach((doc) =>{
        //      users.push(doc.data())
        //     });
        // getDocs
        
        const unsub =  onSnapshot(q,(querySnapshot)=>{
                 let users = [];
                 querySnapshot.forEach((doc) =>{
                  users.push(doc.data())
                 setUsers(users);
                 });
                  console.log(users)
                },(error)=>{
                  console.log(error.message)
                });
        
        return ()=>{ unsub(); }
    },[]);



    
    const selectuser = (user)=>{
        console.log(user.value);
        setChat(users);
    
    }

    const handleSubmit = async (e)=>{
      e.preventDefault()
  }

    
    
  return (<>
    <div>
        <div className='message-container'>
         <div className='user-container'>
     
        {/* not working */}
        {/* {users[0].name} */}
        <small>
        {globaluser.name}
          {auth.currentUser.email}
        </small>

        
 {
  globaluser ? ( Object.keys(users).map(function(x){
        return ( <div key={x.uid} onClick={selectuser } > 
        {/*  working in console 
        {console.log("allusers data here : "+ users[x].name)} */}
       <p>{users[x].name} </p>
        {/* users left side */}
 <div  className='user-wrapper' onClick={()=>{selectuser(users[x].name)}}>

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
     }) ) : null
 }
      

      <div>
    {/* { still testing
      Object.keys(users).map((a)=>{
            
            <User key={users.uid} user={users[a]}></User>
      })
    } */}
      </div>

        {/* loading ==false &&  */}
       {/* { Map is not working
        loading ==false && (this.users.map((store)=>   {
               return <>
                   <User key={store.uid} store={store}></User>
               </>
         } ))
       } */}

       

         </div>
         <div className='message-container'>
{
  chat ? ( <> <div>
    <Chat handleSubmit={handleSubmit}/>
    <p className='p-5'>selected user to chat</p>
  </div>
  </>): "Select user to start conversation"
}
</div>
        </div>
    </div>
      </>);
}

export default Messaging;

