import {View, Text, Platform} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItem';
import { AntDesign, Feather } from '@expo/vector-icons';
const ios = Platform.OS == 'ios';
const Homeheader = () => {

    const {logout}=useAuth();
    const {user}=useAuth();

  const {top} = useSafeAreaInsets ();

    const handleProfile=()=>{
        console.log('profile clicked');
    }
    const handleLogout=async()=>{
        await logout();
    }

    

  return (
    <View
      style={{
        paddingTop: ios ? top : top +20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: '#A2A0F3',
        paddingBottom:20,
        borderRadius:25,
        elevation:5
      }}
    >
        <View >
        <Text style={{fontSize:hp(3),color:'white',fontWeight:'medium'}}>Chats</Text>

        </View>
        
        <View>
            <Menu>
                <MenuTrigger customStyles={{
                
                }}>
                    <View>
                     <Image
                        style={{height:hp(4.3),aspectRatio:1,borderRadius:100}}
                        source={user?.profileUrl}
                        placeholder={blurhash}
                        transition={500}
                        />
                  </View>
                </MenuTrigger>
                  <MenuOptions customStyles={{optionsContainer:{
                    borderRadius:10,
                    borderCurve:'continuous',
                    marginTop:30,
                    marginLeft:-30,
                    elevation:3,
                    width:160
                  }}}>
                   <MenuItem text="Profile"
                   action={handleProfile}
                   value={null}
                   icon={<Feather name='user' size={hp(2.5)} color="#737373"/>}/>
                    <Divider/>
                   <MenuItem text="Sign Out"
                   action={handleLogout}
                   value={null}
                   icon={<AntDesign name='logout' size={hp(2.5)} color="#737373"/>}/>
                 </MenuOptions>
            </Menu>
        </View>

       

    </View>
  );
};

export default Homeheader;


const Divider=()=>{
    return(
        <View style={{padding:1,backgroundColor:'#EAEAEA'}}/>
    )
}