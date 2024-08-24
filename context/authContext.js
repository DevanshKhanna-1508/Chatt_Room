
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc,getDoc,setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";


export  const AuthContext= createContext();

export const AuthContextProvider= ({children})=>{
    const [user,setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(undefined);

    useEffect(()=>{
            const unsub=onAuthStateChanged(auth,(user)=>{
                
                if(user){
                    setIsAuth(true);
                    setUser(user);
                    updateUserData(user.uid)
                }else{
                    setIsAuth(false);
                    setUser(null);
                }
            });
            return unsub;
    },[]);

    const updateUserData=async(userId)=>{
        const docRef=doc(db,'users',userId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists())
        {
            let data=docSnap.data();
            setUser({...user,username:data.username,profileUrl:data.profileUrl,userId:data.userId});
        }
    }

    const login= async(email,password)=>{
        try {
            const response= await signInWithEmailAndPassword(auth,email,password);
            return{success:true};
        } catch (error) {
            let msg=error.message;
            if(msg.includes('(auth/invalid-email)')) msg="Invalid email"
            if(msg.includes('(auth/invalid-credential)')) msg="Email not registered"

            return{success:false, msg};
        }
    }

    const logout= async()=>{
        try {
            await signOut(auth);
            return {success:true};
        } catch (error) {
            return{success:false,msg:error.message,error:error}
        }
    }

    const register= async(email,password,username,profileUrl)=>{
        try {

            const response=await createUserWithEmailAndPassword(auth,email,password);
            
            
            
          

           await setDoc(doc(db,"users",response?.user?.uid),{
            username,
            profileUrl,
            userId:response?.user?.uid
           });
           return {success: true, data:response?.user};
            
        } catch (error) {
            let msg=error.message;
            if(msg.includes('(auth/invalid-email)')) msg="Invalid email"
            if(msg.includes('(auth/weak-password)')) msg="Minimum  6 characters required for password"

            if(msg.includes('(auth/email-already-in-use)')) msg="This email is already in use"
            
            return{success:false, msg};
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuth, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    const value= useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}