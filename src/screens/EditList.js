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
  import { useNavigation } from '@react-navigation/native'
  import axios from 'axios'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import DatePicker from 'react-native-date-picker'
  import { StackActions } from '@react-navigation/native';
  import DropDownPicker from 'react-native-dropdown-picker';
  // import Logo from '../assets/Logo.png'

const EditList = ({route}) => {
    const navigation = useNavigation();
    const list_id = route.params.list_id;
    const list_kegiatan = route.params.kegiatan;

    const [date, setDate] = useState(new Date())
    const [id, setId] = useState('')
    const [kegiatan, setKegiatan] = useState(list_kegiatan)
    const [status, setStatus] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Aktif', value: 'aktif'},
      {label: 'Selesai', value: 'selesai'}
    ]);
  

    const [data, setData] = useState({
        id: '',
        kegiatan: '',
        status: '',
        tanggal: ''
    })


    const UpdateList = async (ferry) => {
        console.log('value', ferry);
        try {
            const response = await axios.put(`http://192.168.43.148:3800/list?id=${list_id}`, {
                kegiatan: ferry.kegiatan,
                status: value,
                tanggal: ferry.tanggal,
            })
            if (response.data.status == 200) {
                console.log('response', response)
                ToastAndroid.show("data berhasil diubah", ToastAndroid.SHORT)
                navigation.dispatch(
                    StackActions.replace('Home')
                );
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show("Cek kembali nim dan password", ToastAndroid.SHORT)
        }
    }


  return (
    <View style={styles.container}>
    <View style={styles.navbar}>
      {/* <Image source={Logo} style={styles.logo}/> */}
      </View>
    <View style={styles.form}>
    <Text style={styles.Text}>Kegiatan</Text>
    <TextInput
        style={styles.input}
        placeholder="kegiatan"
        placeholderTextColor="white"
        onChangeText={(kegiatan) => setKegiatan(kegiatan)}
        value={kegiatan}
    />
    <Text style={styles.Text}>Status Kegiatan</Text>
    {/* <TextInput
        style={styles.input}
        placeholder="Status kegiatan"
        placeholderTextColor="white"
        // secureTextEntry={true}
        onChangeText={(status) => setStatus(status)}
        value={status}
    /> */}
    <DropDownPicker
      open={open}
      value={value}
      onSelectItem={(status) => setStatus(status)}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropDown}
    />
    <Text style={styles.Text}>Tanggal</Text>
    {/* <TextInput
        style={styles.input}
        placeholder="Tanggal Kegiatan"
        placeholderTextColor="white"
        // secureTextEntry={true}
        onChangeText={(tanggal) => setTanggal(tanggal)}
        value={tanggal}
    /> */}
    <DatePicker date={date} onDateChange={setDate} mode='datetime' style={{marginVertical: 20}} />
    {console.log(date)}
    <TouchableOpacity
        style={styles.button}
        onPress={async () => {
                    if (kegiatan == "") {
                        ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                    } else {
                        UpdateList({ id: list_id, kegiatan: kegiatan, status: value, tanggal: date })
                    }
                }}>
        <Text style={styles.textButton}>Ubah</Text>
    </TouchableOpacity>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
      backgroundColor : '#f2f2f2',
    //   alignItems : 'center'
    },
    form : {
        marginHorizontal : 40,
        marginTop : 30
    },
      input: {
          width: 310,
          height: 50,
          backgroundColor: '#dbdbd9',
          borderRadius: 10,
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop : 10,
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
      button: {
          width: 300,
          height: 50,
          backgroundColor: '#eb8d2f',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop : 20,
      },
      textButton: {
        color : '#FFF',
        fontSize :20,
        fontWeight : 'bold',
      },
      dropDown : {
        borderWidth : 0, 
        backgroundColor : '#dbdbd9',
        marginBottom : 20,
        marginTop : 10
      },
      Text : {
        color : '#323333',
        fontWeight : '600',
        fontSize : 16,
    },
  })

export default EditList