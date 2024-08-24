import { View, Text } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const MessageItem = ({message,currentUser}) => {


    if(currentUser?.userId==message?.userId){
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:8,marginRight:10}}>
                <View style={{width:wp(70)}}>
                    <View style={{alignSelf:'flex-end',padding:10,borderRadius:15,backgroundColor:'white',borderWidth:0.5,borderColor:'#737373'}}>
                        <Text style={{fontSize:hp(2)}}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    else{
        return(
            <View style={{flexDirection:'row',justifyContent:'flex-start',marginBottom:8,marginLeft:6}}>
                <View style={{width:wp(70)}}>
                    <View style={{alignSelf:'flex-start',padding:10,borderRadius:15,backgroundColor:'#C8E8FF',borderWidth:0.5,borderColor:'#A4D1F1'}}>
                        <Text style={{fontSize:hp(1.5)}}>
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

  
}

export default MessageItem