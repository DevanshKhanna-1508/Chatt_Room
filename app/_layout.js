import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from 'react-native-popup-menu';


const MainLayout=()=>{
  const{isAuth}=useAuth();
  const segments= useSegments();
  const router=useRouter();

  useEffect(() => {
    
  
    //chech if the user is authenticated or not

    if(typeof isAuth=='undefined') return;
    const inApp=segments[0]=='(app)';
    if(isAuth && !inApp){
      // return to home
      router.replace('home');
    }
    else if(isAuth==false){
      // redirect to SignIn 
      router.replace('signIn');
    }
  }, [isAuth])

  return <Slot/>
  
}

export default function RootLayout() {
  return (
    // <Stack screenOptions={{headerShown:false}}>
    //   <Stack.Screen name="index" />
    // </Stack>

   <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
   </MenuProvider>
  );
}
