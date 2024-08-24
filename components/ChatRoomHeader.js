import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';
import {Entypo, Ionicons} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';

const ChatRoomHeader = ({user,router}) => {
  return (
    <Stack.Screen
      options={{
        title:'',
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity onPress={()=>router.back()}>
              <Entypo name="chevron-left" size={hp (4.5)} color="#737373" />
            </TouchableOpacity>
            
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <Image
                source={user?.profileUrl}
                style={{height:hp(4),aspectRatio:1,borderRadius:100}}
                placeholder={blurhash}
                transition={500}/>
                <Text style={{fontSize:hp(2.5),color:'#232222',fontWeight:'heavy'}}>{user?.username}</Text>

            </View>
          </View>
       ),
       headerRight:()=>(
        <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
            <Ionicons name="call" size={hp(2.8)} color="#737373"/>
            <Ionicons name="videocam" size={hp(2.8)} color="#737373"/>
        </View>
       )
      }}
    />
  );
};

export default ChatRoomHeader;
