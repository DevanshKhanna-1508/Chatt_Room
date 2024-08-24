import {View, Text, TextInput, TouchableOpacity, Alert, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboard from '../../components/CustomKeyboard';
import { useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useRef } from 'react';

const ChatRoom = () => {
  const router = useRouter ();
  const item = useLocalSearchParams (); //second user
  const {user} = useAuth (); //logged in ueser

  const [Message, setMessage] = useState ([]);

  const textRef= useRef();
  const inputRef=useRef(null);
  const ScrollViewRef=useRef(null);

    useEffect(() => {
      createRoomIfNotExixt();

      let roomId= getRoomId(user?.userId,item?.userId);
      const docRef=doc(db,'rooms',roomId);
      const messageRef=collection(docRef,'messages');
      const q=query(messageRef,orderBy('createdAt','asc'));

      let unsub=onSnapshot(q,(snapshot)=>{
        let allmessage=snapshot.docs.map(doc=>{
            return doc.data();
        })
        setMessage([...allmessage]);
      })

      const keyBoardShoeListener= Keyboard.addListener(
        'keyboardDidShow',UpdateScrollView
      )

      

    return ()=>{
            unsub();
            keyBoardShoeListener.remove();
    }
     
    }, []);

    useEffect(()=>{
        UpdateScrollView();
    },[Message])

    const UpdateScrollView=()=>{
        setTimeout(()=>{
        ScrollViewRef?.current?.scrollToEnd({animated:true})    // check Animated
        },100)
    }

  

    const createRoomIfNotExixt= async()=>{
        //room id
            let roomId=getRoomId(user?.userId,item?.userId);
            await setDoc(doc(db, "rooms", roomId), {
                roomId,
                createdAt: Timestamp.fromDate(new Date())
            });

    }

    const handleSendMessage=async()=>{
        let message = textRef.current.trim();
        if(!message) return;

        try {
            let roomId= getRoomId(user?.userId,item?.userId);
            const docRef=doc(db,'rooms',roomId);
            const messageRef=collection(docRef,'messages');

            textRef.current="";
            if(inputRef) inputRef?.current?.clear();

            const newDoc=await addDoc(messageRef,{
                userId:user?.userId,
                text:message,
                profileUrl:user?.profileUrl,
                senderName:item?.userId,
                createdAt: Timestamp.fromDate(new Date())
            });

        } catch (e) {
            Alert.alert('Message',e.message);
        }

    }
    

  return (
    <CustomKeyboard inchat={true}>
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View
        style={{
          height: 6,
          borderBottomWidth: 1,
          borderBottomColor: '#E3E3E3',
        //   elevation: 6,
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          overflow: 'visible',
          backgroundColor: '#EAEAEA',
        }}
      >
        <View style={{flex: 1}}>
          <MessageList ScrollViewRef={ScrollViewRef} message={Message}  currentUser={user} />
        </View>
        <View style={{paddingTop: 5, marginBottom: hp (2.5)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: wp (2),
              backgroundColor:'white',
              padding:6,
              paddingLeft:10,
              borderWidth:1,
              borderColor:'#737373',
              borderRadius:20
            }}
          >
            <TextInput ref={inputRef} onChangeText={value=> textRef.current = value} placeholder='Type message...' style={{fontSize:hp(2),flex:1,marginRight:4}} />

            <TouchableOpacity onPress={handleSendMessage} style={{backgroundColor:'#eaeaea', padding:5,
                marginRight:2,borderRadius:20
            }}>
                <Feather name='send' size={hp(2.7)} color="#737373"/>

            </TouchableOpacity>

          </View>

        </View>
      </View>
    </View>
    </CustomKeyboard>
  );
};

export default ChatRoom;
