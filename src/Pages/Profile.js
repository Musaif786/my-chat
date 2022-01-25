import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Camera from "../svg/Camera";
import "../PagesCss/Profile.css";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL,uploadBytes, deleteObject } from "firebase/storage";
import {doc,updateDoc, getDoc} from "firebase/firestore";
import Delete from "../svg/Delete";
import { async } from "@firebase/util";
import {useNavigate, Link} from "react-router-dom";


const Profile = () => {
    const [ img, setImg] = useState("");
    const [user , setUser] = useState();

    const navigate = useNavigate();
    
        const fakeimg = "https://source.unsplash.com/200x200/?science/technology";
    useEffect(()=>{
  
        getDoc(doc(db, "users", auth.currentUser.uid)).then( docSnap =>{
            if(docSnap.exists){
               setUser(docSnap.data());
            }
        });

        if(img){
            const uploadimg = async ()=>{
                const imgRef = ref(storage,`avatar/${new Date().getTime} - ${img.name}`);
                try {
                  if(user.avatarPath){
                    await deleteObject(ref(storage, user.avatarPath));
                  }
                    
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

    const deleteimg = async ()=>{
      try{
       const confirm = window.confirm("want to delete dp ?")
       if(confirm){
         await deleteObject(ref(storage, user.avatarPath))
         await updateDoc(doc(db, "users", auth.currentUser.uid),{
           avatar: "",
           avatarPath:"",
         });
         navigate("/")
       }
      }catch(err){
        toast.error("Error : "+err.message);
      }
    }
  return user && auth.currentUser.uid ? (
    <>
      <div>
        <section>
          <div className="profile-container">
            <div className="img-box">
              <img
                src={user.avatar || fakeimg}
                alt="img/auto"
              />
              <div className="overlayer">
              <div>
                  <label htmlFor="photo">
                      <Camera/>
                  </label>
                  {user.avatar ? < Delete   deleteimg={deleteimg} /> :(<><small className="fs-6">update</small></>)}
                  <input type="file" accept="image" style={{display:"none"}} id="photo" onChange={(e)=>{setImg(e.target.files[0])}} />
              </div> </div>
            </div>
            <div className="profile-textbox">
             <h3>Username: <small> {user.name}</small> </h3>
             <p>Email ID: {user.email} </p>
             <hr />
             <small>Joined on : {user.createdAt.toDate().toDateString()}</small>
            </div>
          </div>
        </section>
      </div>
    </>
  ) : (<><div> <p> To access this you need to Fill the Sign-up form</p>
  <p>Click below button to Redirect to logout page</p>
  <Link to="/box"><button className="btn-sm btn-dark">Click me</button></Link>
  </div></>);
};

export default Profile;
