import { 
  View, 
  Text,
  Image,
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native'
import React, { useState, useEffect } from 'react'
// import CheckBox from '@react-native-community/checkbox';
// // import Illustration from '../assets/main.png'
// import Logo from '../assets/Logo.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [cari, setCari] = useState('')  
  const [list, setList] = useState([]);
  const [selesai, setSelesai] = useState([]);
  const [data, setData] = useState({
    nim: '',
    password: '',
    name: ''
})

console.log('nim', data.nim)
console.log('password', data.password);
console.log('name', data.name);

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
            readData(nim)
        }
    } catch (e) {
        // error reading value
    }
}

  const searchList = async(value) => {
    console.log('value', value);

    try {
      const responseAktif = await axios.post(`http://192.168.43.148:3800/list/searchAktif?nim=${data.nim}`,{
          cari: value.cari,
      })
      const responseSelesai = await axios.post(`http://192.168.43.148:3800/list/searchSelesai?nim=${data.nim}`,{
          cari: value.cari,
      })
      if(responseAktif.data.status == 200){
        // console.log('response', response.data);
        setList(responseAktif.data.data)
        setSelesai(responseSelesai.data.data)
        
        ToastAndroid.show(responseAktif.data.metadata, ToastAndroid.SHORT)
        // DevSettings.reload()
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Gagal mencari data", ToastAndroid.SHORT)
    }

  }

  const readData = async(value) => {
    console.log('value', value);
    try {
      const aktif = await axios.get(`http://192.168.43.148:3800/list/aktif?nim=${value}`,{
      })
      const selesai = await axios.get(`http://192.168.43.148:3800/list/selesai?nim=${value}`,{
      })
      if(aktif.data.status == 200){
        console.log('response', aktif.data);
        ToastAndroid.show(aktif.data.metadata, ToastAndroid.SHORT)
        setList(aktif.data.data)
        setSelesai(selesai.data.data)
        // DevSettings.reload()
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Gagal menampilkan list", ToastAndroid.SHORT)
    }

  }

  
  // console.log("ini data list", list);
      const listDone = async(value) => {
        console.log('value', value);
  
        try {
          const response = await axios.put(`http://192.168.43.148:3800/list/done?id=${value}`,{
          })
          const aktif = await axios.get(`http://192.168.43.148:3800/list/aktif?nim=${data.nim}`,{
          })
          const selesai = await axios.get(`http://192.168.43.148:3800/list/selesai?nim=${data.nim}`,{
          })
          if(response.data.status == 200){
            console.log('response', response.data);
            ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
            setList(aktif.data.data)
            setSelesai(selesai.data.data)
            // DevSettings.reload()
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("Gagal mengubah list", ToastAndroid.SHORT)
        }
      }

      const DeleteList = async(value) => {
        console.log('value', value);
        try {
          const response = await axios.delete(`http://192.168.43.148:3800/list?id=${value}`,{
          })
          const aktif = await axios.get(`http://192.168.43.148:3800/list/aktif?nim=${data.nim}`,{
          })
          const selesai = await axios.get(`http://192.168.43.148:3800/list/selesai?nim=${data.nim}`,{
          })
          if(response.data.status == 200){
            console.log('response', response.data);
            ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
            setList(aktif.data.data)
            setSelesai(selesai.data.data)
            // DevSettings.reload()
          }
        } catch (error) {
          console.log(error);
          ToastAndroid.show("Gagal menghapus list", ToastAndroid.SHORT)
        }
  
      }

    // const removeValue = async () => {
    //   try {
    //     await AsyncStorage.removeItem('nim')
    //     await AsyncStorage.removeItem('password')
    //     await AsyncStorage.removeItem('name')
    //     navigation.navigate('Login')
    //   } catch(e) {
    //     // remove error
    //   }
    
    //   console.log('Done.')
    // }

  return (
    
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.navbar}>
      {/* <Image source={Logo} style={styles.logo}/> */}
      </View>
      <View style={styles.header}>
      <Text style={styles.title}>Welcome, {data.name}</Text>
      <Text style={{marginTop:10}}>Yuk selesaikan list hari ini!</Text>
      <View style={styles.searchArea}>
      <TextInput
        style={styles.input}
        placeholder="Cari List"
        placeholderTextColor="grey"
        onChangeText={(cari) => setCari(cari)}
        value={cari}
      />
      <TouchableOpacity style={styles.button} 
      onPress={async () => {
        searchList({ cari: cari })
      }}>
        <Icon name="magnify" color={'white'} size={25} />
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.todoList}>
      <Text style ={styles.listStatus}>To do List Aktif</Text>
      {
        
        list.map((item, index)=>{
          return(
        <View style={styles.Listcard}>
        <View style={styles.listCheck}>
            <TouchableOpacity style={styles.btnCheck} onPress={
              async() => await listDone(item.id)}>
            <Icon name="check-bold" color={'white'} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.listName}>
            <Text style={styles.listText}>{item.kegiatan}</Text>
            <Text style={styles.listDate}>{item.tanggal}</Text>
          </View>
          <View style={styles.listEdit}>
            <TouchableOpacity style={styles.btnEdit} 
            onPress={()=>{
              navigation.navigate('EditList',
              {
                list_id :item.id,
                kegiatan : item.kegiatan,
              })
              }}>
            <Icon name="pencil" color={'#323333'} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.listEdit}>
            <TouchableOpacity style={styles.btnEdit} onPress={
              async() => await DeleteList(item.id)}>
            <Icon name="trash-can" color={'#323333'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
          )
        })  
      }
      <Text style ={styles.listStatusSelesai}>To do List Selesai</Text>
      {
        
        selesai.map((item, index)=>{
          return(
        <View style={styles.Donecard}>
          <View style={styles.DoneName}>
          <Text style={styles.DoneText}>{item.kegiatan}</Text>
          <Text style={styles.DoneDate}>{item.tanggal}</Text>
          </View>
          <View style={styles.DoneEdit}>
            <TouchableOpacity style={styles.btnEdit} 
             onPress={()=>{
              navigation.navigate('EditList',
              {
                list_id :item.id,
                kegiatan : item.kegiatan,
              })
              }}>
            <Icon name="pencil" color={'grey'} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.DoneEdit}>
            <TouchableOpacity style={styles.btnEdit} onPress={
              async() => await DeleteList(item.id)}>
            <Icon name="trash-can" color={'grey'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
          )
        })  
      }
      {/* <TouchableOpacity style={styles.btnLogout} onPress={async() => await removeValue()}>
        <Text>Logout</Text>
      </TouchableOpacity> */}
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: '#f2f2f2',
  },
  navbar : {
    backgroundColor : '#eb8d2f',
    height : 50,
    // alignItems : 'center',
    paddingLeft : 20,
    justifyContent : 'center',
  },
  header : {
    paddingLeft : 20,
    paddingTop : 20,

  },
  logo : {
    width : 120,
    height : 40
  },
  title : {
    color : 'black',
    fontWeight : '700',
    fontSize : 27, 
  },
  todoList : {
    paddingHorizontal : 20,
    // paddingTop : 20,
  },
  todoSelesai : {
    marginTop : 40
  },
  listText : {
    color : '#323333',
    fontWeight : '600',
    fontSize : 17,
  },
  listDate : {
    color : '#323333',
    fontSize : 10
  },
  Listcard : {
    height : 60,
    paddingLeft : 10,
    paddingVertical : 10,
    marginBottom : 10,
    borderRadius : 10,
    flexDirection : 'row',
    backgroundColor : 'white',

  },
  listName : {
    width : 220,
  },
  listCheck : {
    borderColor : '#323333',
    borderWidth : 2,
    borderRadius : 20,
    height : 27,
    width : 27,
    marginRight : 15,
    marginTop : 6
  },
  btnCheck : {
    // backgroundColor : 'red'
  },
  listEdit : {
    borderColor : 'white',
    borderWidth : 2,
    height : 27,
    width : 27,
  },

  DoneDate : {
    color : 'grey',
    fontSize : 10
  },
  Donecard : {
    height : 60,
    paddingLeft : 10,
    paddingVertical : 10,
    marginBottom : 10,
    borderRadius : 10,
    flexDirection : 'row',
    backgroundColor : '#dbdbdb'
  },
  DoneName : {
    width : 265,
  },

  btnCheck : {
    // backgroundColor : 'red'
  },
  DoneEdit : {
    borderColor : '#dbdbdb',
    borderWidth : 2,
    height : 27,
    width : 27,
    marginLeft : 5
  },

  btnLogout : {
    width : 100,
    alignItems : 'center',
    justifyContent : 'center',
    height : 40,
    backgroundColor : 'red',
    borderRadius : 20,
    padding : 5,
  },
  listStatus : {
    marginBottom : 20
  },
  listStatusSelesai : {
    marginVertical : 20
  },
  searchArea : {
    flexDirection : 'row',
    paddingVertical : 20
  },
  input: {
    width: 280,
    height: 50,
    backgroundColor: '#dbdbd9',
    borderRadius: 10,
    paddingHorizontal: 20,
},
button: {
  width: 60,
  height: 50,
  backgroundColor: '#eb8d2f',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft : 10,
},
})



export default HomeScreen


