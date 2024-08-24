// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence,initializeAuth } from "firebase/auth";
import {getFirestore,collection} from "firebase/firestore"

// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyBEiJEFU5lrY5LgV_3bh67_S8vkOx8VFo8",
  authDomain: "chatt-room-d575d.firebaseapp.com",
  projectId: "chatt-room-d575d",
  storageBucket: "chatt-room-d575d.appspot.com",
  messagingSenderId: "402451301089",
  appId: "1:402451301089:web:74791fc70f7b19ce7aeda0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db= getFirestore(app);

export const usersref= collection(db,'users');
export const roomref= collection(db,'rooms');

