import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({message,ScrollViewRef,currentUser}) {
  return (
    <ScrollView ref={ScrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
        {
          message.map((message,index)=>{
            return(
                <MessageItem message={message} key={index} currentUser={currentUser}/>
            )
          })
        }
    </ScrollView>
    
  )
}