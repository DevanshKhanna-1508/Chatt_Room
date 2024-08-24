import { View, Text, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { StatusBar } from 'expo-status-bar';

import ChatList from '../../components/ChatList';
import Loading from '../../components/loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersref } from '../../firebaseConfig';

const Home = () => {
  const {logout,user}= useAuth();
  const [users, setusers] = useState([])

  useEffect(()=>{
    if(user?.uid)
      getUsers();

  },[])
  const getUsers=async()=>{
    //fetch user
    const q=query(usersref,where('userId','!=',user?.uid));
    const querySnapshot = await getDocs(q);
    let data=[];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });
    setusers(data);
  }
 
  return (
    <View style={{backgroundColor:'white', flex:1}}>
     <StatusBar style='dark' />
      {
        users.length>0?(
         <ChatList currentUser={user} users={users}/>

        ):(
           <View style={{alignItems:'center'}}>
              <Loading/>
            </View>
        )
      }

    </View>
  )
}

export default Home