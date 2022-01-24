// not Working in my case but direclty wokring this code in nav bar

import { createContext, useEffect,useState} from "react";

import {onAuthStateChanged} from "firebase/auth";
import { auth} from "../firebase";
import Loading from "../Components/Loading";



//  const AuthContext = createContext();
export const Authparent= createContext();

const AuthProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [ loading, setLoading]= useState(true);

    const authListtener = ()=>{
        onAuthStateChanged(auth, (user) =>{

            setUser(user);
            setLoading(false);
        
 
    })
    }


    useEffect(()=>{
       authListtener();
    },[]);

     if(loading){
         return <Loading/>;
     }
    return(<>
        <Authparent.Provider value={user}>
            {props.children}
        </Authparent.Provider>
    </>)
}
export default AuthProvider;
// export {AuthContext};
