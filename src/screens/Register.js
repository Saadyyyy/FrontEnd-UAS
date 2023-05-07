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
// // import Illustration from '../assets/main.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'


const Register = () => {
  const navigation = useNavigation();
  const [nim,setNim] = React.useState('');
  const [nama,setNama] = React.useState('');
  const [password,setPassword] = React.useState('');

  const handleRegis = async(value) => {
    console.log('value', value);

    try {
      const response = await axios.post('http://192.168.43.148:3800/mahasiswa/',{
        nim : value.nim,
        nama : value.nama,
        password : value.password
      })
      if(response.data.status == 200){
        console.log('response', response.data);
        navigation.navigate('Login')
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
        ToastAndroid.show("Sign Up Success", ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Cek kembali data pendaftaran", ToastAndroid.SHORT)
    }

  }


  return (
    <View style={styles.container}>
      <View style={styles.body}>
          <Text style={styles.title1}>Make an new account</Text>
          {/* <Image source={Illustration} style={styles.Illustration}/> */}
      </View>
      <View style={styles.form}>
      <Text style={styles.formText}>Nama</Text>
        <TextInput
        style={styles.input}
        placeholder ="Nama"
        placeholderTextColor="#58565e"
        onChangeText={(nama) => setNama(nama)}
        value={nama}
        />
        <Text style={styles.formText}>nim</Text>
        <TextInput
        style={styles.input}
        placeholder ="nim"
        placeholderTextColor="#58565e"
        onChangeText={(nim) => setNim(nim)}
        value={nim}
        />
        <Text style={styles.formText}>Password</Text>
        <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder ="Password"
        placeholderTextColor="#58565e"
        onChangeText={(password) => setPassword(password)}
        value={password}
        />

      </View>
      <View style={styles.footer}>
        <TouchableOpacity style = {styles.button} 
          onPress={async() => await handleRegis({nim, nama, password})}>
            <Text style = {styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style = {styles.lowerText}>
          Already have an account? 
          <Text style ={{fontWeight : 'bold',color:'#9E6F21'}} 
          onPress={() => navigation.navigate('Login')}
          >
           Sign In here
        </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: 'white',
  },
  topBar : {
    backgroundColor : '#443C68',
    alignItems : 'center',
    justifyContent : 'center',
    width : 400,
    height : 60,
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
    width : 170,
    height : 180,
  },
  title1 : {
    fontSize : 27,
    fontWeight : '700',
    color : '#323333',
    marginTop: 90
  },
  form : {
    marginTop : 30,
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
      color : '#323333',
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
      borderRadius : 50,
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

export default Register