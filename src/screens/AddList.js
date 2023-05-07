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
// import Cover from '../assets/Main2.jpg'
// import Logo from '../assets/Logo.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DatePicker from 'react-native-date-picker'
import { StackActions } from '@react-navigation/native';


const AddList = () => {

    const navigation = useNavigation();
    const [kegiatan,setKegiatan] = React.useState('');
    const [date, setDate] = useState(new Date())
  
    const [data, setData] = useState({ 
      nim: '',
      password: '',
      name: ''
    })


    useEffect(() => {
      getData()
      return () => { };
    }, []);


    const getData = async () => {
      try {
        let nim = await AsyncStorage.getItem('nim')
        let password = await AsyncStorage.getItem('password')
        let name = await AsyncStorage.getItem('name')
          if (nim !== null) {
            
              // value previously stored
              setData({
                nim: nim,
                password: password,
                name: name
              })
          }
      } catch (e) {
          // error reading value
      }
  }


    const InsertList = async(value) => {
      console.log('value', value);
  
      try {
        const response = await axios.post('http://192.168.43.148:3800/list/',{
          nim : data.nim,
          kegiatan : value.kegiatan,
          tanggal : date
        })
        if(response.data.status == 200){
          console.log('response', response.data);
          navigation.dispatch(
            StackActions.replace('Home')
          );
          ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
          ToastAndroid.show("Success adding new data", ToastAndroid.SHORT)
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Input Error", ToastAndroid.SHORT)
      }
  
    }

  return (
    <View style={styles.container}>
    {/* <ImageBackground source={Cover} resizeMode="cover"> */}
    <View style={styles.navbar}>
      {/* <Image source={Logo} style={styles.logo}/> */}
      </View>
     <View style={styles.body}>
         <Text style={styles.title1}>Tambah List Baru</Text>
         {/* <Image source={Illustration} style={styles.Illustration}/> */}
     </View>
     <View style={styles.form}>
     <Text style={styles.formText}>Kegiatan</Text>
       <TextInput
       style={styles.input}
       placeholder ="Kegiatan"

       onChangeText={(kegiatan) => setKegiatan(kegiatan)}
       value={kegiatan}
       />
       <Text style={styles.formText}>Tanggal</Text>
       {/* <TextInput
       style={styles.input}
       placeholder ="tanggal"
       placeholderTextColor="#58565e"
       onChangeText={(tanggal) => setTanggal(tanggal)}
       value={tanggal}
       /> */}
       <DatePicker date={date} onDateChange={setDate} mode='datetime' style={{marginVertical:20}}/>
     </View>
     <View style={styles.footer}>
       <TouchableOpacity style = {styles.button} 
         onPress={
          async() => await InsertList({kegiatan})}
          >
           <Text style = {styles.buttonText}>Tambah</Text>
       </TouchableOpacity>
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
  navbar : {
    backgroundColor : '#eb8d2f',
    height : 50,
    // alignItems : 'center',
    paddingLeft : 20,
    justifyContent : 'center',
  },
  logo : {
    width : 120,
    height : 40
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
    color : 'black',
    marginTop: 60
  },
  form : {
    marginTop : 30,
    marginHorizontal: 50,
  },
  formText : {
    fontSize : 18,
    fontWeight : '600',
    color : 'black',

  },
  input : {
      width :300,
      height : 50,
      borderWidth : 1,
      backgroundColor : '#e0e0e0',
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
      backgroundColor : '#f0a04b',
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
    color : 'white',
    fontSize : 16,
    marginTop : 20,
  }

})

export default AddList