import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Camera from "../svg/Camera";
import "../PagesCss/Profile.css";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {doc,updateDoc, getDoc} from "firebase/firestore";

const Profile = () => {
    const [ img, setImg] = useState("");
    const [user , setUser] = useState();
    
        const fakeimg = "https://source.unsplash.com/200x200/?anima";
    useEffect(()=>{
  
        getDoc(doc(db, "users", auth.currentUser.uid)).then( docSnap =>{
            if(docSnap.exists){
               setUser(docSnap.data());
            }
        });

        if(img){
            const uploadimg = async ()=>{
                const imgRef = ref(storage,`avatar/${new Date().getTime}- ${img.name}`);
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

    },[img])
  return user ? (
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
  ) :null;
};

export default Profile;
