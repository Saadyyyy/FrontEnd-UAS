import { 
    View, 
    Text,
    Image,
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid
  } from 'react-native'
  import React, { useState, useEffect } from 'react'
  import { useNavigation } from '@react-navigation/native'
  import axios from 'axios'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import Illustration from '../assets/Logo.png'

const Login = () => {
    const navigation = useNavigation();
    const [nim,setNim] = React.useState('');
    const [password,setPassword] = React.useState('');

  //   const [data, setData] = useState({
  //     nim: '',
  //     password: '',
  //     name: ''
  // })
  
  // console.log('nim', data.nim)
  // console.log('password', data.password);
  // console.log('name', data.name);
  
  // useEffect(() => {
  //     getData()
  //     return () => { };
  // }, []);
  
  // const getData = async () => {
  //     try {
  //         let nim = await AsyncStorage.getItem('nim')
  //         let password = await AsyncStorage.getItem('password')
  //         let name = await AsyncStorage.getItem('name')
  //         if (nim !== null) {
            
  //             // value previously stored
  //             setData({
  //                 nim: nim,
  //                 password: password,
  //                 name: name
  //             })
  //             readData(nim)
  //         }
  //     } catch (e) {
  //         // error reading value
  //     }
  //   }

    const handleLogin = async(value) => {
      console.log('value', value);

      try {
        const response = await axios.post('http://192.168.43.148:3800/mahasiswa/login',{
          nim : value.nim,
          password : value.password
        })
        if(response.data.status == 200){
          console.log('response', response.data);
          ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
          // AsyncStorage.setItem
          await AsyncStorage.setItem('password', value.password)
          await AsyncStorage.setItem('nim', value.nim)
          await AsyncStorage.setItem('name', response.data.users.nama)
          navigation.navigate('Home')
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Cek kembali nim dan password", ToastAndroid.SHORT)
      }

    }

  return (
        <View style={styles.container}>
         {/* <ImageBackground source={Main} resizeMode="cover"> */}
          <View style={styles.body}>
              <Text style={styles.title1}>Silahkan Masukkan Akun </Text>
              <Image source={Illustration} style={styles.Illustration}/>
          </View>
          <View style={styles.form}>
            <Text style={styles.formText}>Nim</Text>
            <TextInput
            style={styles.input}
            placeholder ="Nim"
            placeholderTextColor="#323333"
            onChangeText={(nim) => setNim(nim)}
            value={nim}
            />
            <Text style={styles.formText}>Password</Text>
            <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder ="Password"
            placeholderTextColor="#323333"
            onChangeText={(password) => setPassword(password)}
            value={password}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style = {styles.button} 
            // onPress={() => navigation.navigate('Home')}>
            onPress={async() => await handleLogin({nim, password})}>
            
                <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style = {styles.lowerText}>
              Belum punya akun? 
              <Text style ={{fontWeight : 'bold',color:'#9E6F21'}} 
              onPress={() => navigation.navigate('Register')}
              >
               Daftar disini
            </Text>
            </Text>
          </View>
          {/* </ImageBackground> */}
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
        backgroundColor : 'white'
      },
      Logo : {
        width : 110,
        height : 30,
      },
      body : {
        alignItems : 'center',
        marginTop : 20,
      },
      Illustration : {
        marginTop : 25,
        marginBottom : 20,
        width : 240,
        height : 220,
        borderRadius: 10
      },
      title1 : {
        fontSize : 27,
        fontWeight : '700',
        color : '#323333',
        marginTop: 20
      },
      form : {
        // marginTop : 30,
        marginHorizontal: 50,
      },
      formText : {
        fontSize : 18,
        fontWeight : '600',
        color : '#323333',
      },
      input : {
          width :300,
          height : 50,
          borderWidth : 1,
          backgroundColor : '#e0e0e0',
        //   borderColor : '#BABABA',
          borderRadius : 10,
          borderWidth : 0,
          paddingHorizontal : 20,
          fontSize : 17,
          fontWeight : '300',
          marginVertical : 15,
        },
      footer : {
        alignItems : 'center',
      },
      button : {
          width :300,
          height : 50,
          backgroundColor : '#9E6F21',
          borderRadius : 10,
          justifyContent : 'center',
          alignItems : 'center',
          marginTop: 20,
        },
      buttonText :{
        color : '#FFF',
        fontSize :20,
        fontWeight : 'bold', 
      },
      lowerText : {
        color : '#323333',
        fontSize : 16,
        marginTop : 20,
      }
    
    })
    
    export default Login
