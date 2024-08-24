import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const CustomKeyboard = ({children,inchat}) => {
    const ios=Platform.OS=='ios';
    let kavConfig={};
    let scrollconfif={};
    if(inchat){
      kavConfig={keyboardVerticalOffset:90,enableScrollToTextInput: true};
      scrollconfif={contentContainerStyle:{flex:1}};
    }
  return (
   <KeyboardAvoidingView
    behavior={ios? 'padding':'height'}
    style={{flex:1}}
    {...kavConfig}
   >
    <ScrollView style={{flex:1}} bounces={false} showsVerticalScrollIndicator={false} {...scrollconfif} >
    {
        children
    }
    </ScrollView>
   </KeyboardAvoidingView>
  )
}

export default CustomKeyboard