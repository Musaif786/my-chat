import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  // apiKey:process.env.REACT_APP_API_KEY,
  // authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId:process.env.REACT_APP_PROJECT_ID,
  // storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId:process.env.REACT_APP_MESSANGING_SENDER_ID,
  // appId:process.env.REACT_APP_APP_ID,

  apiKey: "AIzaSyDWSEuWP28auYBRg5J_tUzGE8rRP83bTjg",
  authDomain: "chatweb-a9a7c.firebaseapp.com",
  databaseURL: "https://chatweb-a9a7c-default-rtdb.firebaseio.com",
  projectId: "chatweb-a9a7c",
  storageBucket: "chatweb-a9a7c.appspot.com",
  messagingSenderId: "851080075579",
  appId: "1:851080075579:web:43b3dfe8de239388d73f1e"
};

// Initialize Firebase
const fireDb= firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();

export const db = getFirestore(fireDb);
export const auth = getAuth(fireDb);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(fireDb);