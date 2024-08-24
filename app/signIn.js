import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StatusBar} from 'expo-status-bar';
import {Octicons} from '@expo/vector-icons';
import {router, useRouter} from 'expo-router';
import LottieView from 'lottie-react-native';
import Loading from '../components/loading';
import CustomKeyboard from '../components/CustomKeyboard';
import { useAuth } from '../context/authContext';

const SignIn = () => {
  const router = useRouter ();
  const [loading, setLoading] = useState(false)

  const {login}=useAuth();


  const emailRef = useRef ("");
  const passwordRef = useRef ("");

  const handleLogin = async () => {
    const email = emailRef.current;
    const password = passwordRef.current;
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert ('Sign In', 'Please fill all the Fields');
      return;
    }


    setLoading (true);

    let response=await login(emailRef.current,passwordRef.current);
    setLoading(false);

    if(!response.success){
      Alert.alert ('Sign In',response.msg);
    }
  };

  return (
    <CustomKeyboard>
       
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          gap: 15,
        //   paddingTop: hp (12),
          paddingHorizontal: wp (5),
          backgroundColor: '#ffffff',
        }}
      >
        
        {/* SignIn Image */}
        <LottieView
            style={{height: hp (35)}}
            resizeMode="contain"
            source={require ('../assets/images/signup.json')}
            autoPlay
            loop
          />

        <View style={{gap: 20}}>
          <Text
            style={{fontSize: hp (4), fontWeight: 'bold', textAlign: 'center'}}
          >
            Sign In
          </Text>
          {/* inputs */}
          <View
            style={{
              height: hp (7),
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
              borderRadius: 15,
              backgroundColor: '#F5F5F5',
              paddingHorizontal: 10,
            }}
          >
            <Octicons name="mail" size={hp (2.7)} color="gray" />
            <TextInput
              onChangeText={value => emailRef.current = value}
              style={{
                fontSize: hp (2),
                flex: 1,
                fontWeight: 'semibold',
                color: '#464646',
              }}
              placeholder="Email Address"
              placeholderTextColor={'#464646'}
            />
          </View>

          <View style={{gap: 6}}>
            <View
              style={{
                height: hp (7),
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: '#F5F5F5',
                paddingHorizontal: 10,
              }}
              >
              <Octicons name="lock" size={hp (2.7)} color="gray" />
              <TextInput
              onChangeText={value => passwordRef.current = value}
                secureTextEntry={true}
                style={{
                  fontSize: hp (2),
                  flex: 1,
                  fontWeight: 'semibold',
                  color: '#464646',
                }}
                placeholder="Password"
                placeholderTextColor={'#464646'}
              />
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#464646',
                    fontSize: hp (2),
                    textAlign: 'right',
                    fontWeight: '700',
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* submit Button */}

            <View>
              {
               loading?(
                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Loading size={hp(20)}/>

                    </View>

               ):(
                    <TouchableOpacity
                  style={{
                    backgroundColor: '#1565C0',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp (6.5),
                    marginTop: 10,
                  }}
                  onPress={handleLogin}
                >
                  <Text
                    style={{
                      fontSize: hp (3),
                      color: 'white',
                      fontWeight: 'bold',
                      letterSpacing: 1,
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

               )
              }
            </View>

            

            {/* SignUp text */}

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: hp (1.8), fontWeight: 'semibold'}}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push ('signUp')}>
                <Text
                  style={{
                    color: '#1565C0',
                    fontWeight: 'bold',
                    fontSize: hp (1.8),
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </CustomKeyboard>
  );
};

export default SignIn;
