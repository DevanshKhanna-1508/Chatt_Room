import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Homeheader from '../../components/homeHeader'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='home' options={{
        header:()=><Homeheader/>
      }}/>
    </Stack>
  )
}

export default _layout