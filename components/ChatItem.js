import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Image} from 'expo-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { blurhash, formateDate, getRoomId } from '../utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatItem = ({noBorder,router,item,index,currentUser}) => {

    const[lastmessage,setlastmessage]=useState(undefined);

    const renderTime=()=>{
        if(lastmessage){
            let date=lastmessage?.createdAt;
            return formateDate(new Date(date?.seconds*1000));
        }
            
    }
    const getLastmessage= ()=>{

        if(typeof lastmessage==undefined) return 'Loading...';
        if(lastmessage){
            if(currentUser?.userId ==lastmessage?.userId) return "You: "+lastmessage?.text;
            return lastmessage.text;

        }else{
            return 'Say Hi👋...'
        }
    }

    useEffect(() => {
        
  
        let roomId= getRoomId(currentUser?.userId,item?.userId);
        const docRef=doc(db,'rooms',roomId);
        const messageRef=collection(docRef,'messages');
        const q=query(messageRef,orderBy('createdAt','desc'));
  
        let unsub=onSnapshot(q,(snapshot)=>{
          let allmessage=snapshot.docs.map(doc=>{
              return doc.data();
          })
          setlastmessage(allmessage[0]?allmessage[0]:null);
        })
  
      return unsub;
       
      }, []);
      
    
    const openChatRoom=()=>{
        router.push({pathname:'/chatRoom',params:item});
    }
    
  return (
    <TouchableOpacity
    onPress={openChatRoom}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        alignItems: 'center',
        gap:10,
        borderBottomColor:"#eaeaea",
        marginBottom:15,
        paddingBottom:10,
        borderBottomWidth:noBorder?0:2,
        

      }}
    >
      <Image
        source={{
            uri:item?.profileUrl
        }}
        style={{height: hp (6), aspectRatio: 1,borderRadius:25}}
        placeholder={blurhash}
        transition={500}
      />

      <View style={{flex:1,gap:4}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
            <Text style={{fontSize:hp(2.3),fontWeight:'500',color:'#2F2F2F'}}>{item?.username}</Text>
            <Text style={{fontSize:hp(1.6),fontWeight:'medium',color:'#C4C0C0'}}>{renderTime()}</Text>
        </View>
        <Text style={{fontSize:hp(1.6),fontWeight:'medium',color:'#C4C0C0'}}>{getLastmessage()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
