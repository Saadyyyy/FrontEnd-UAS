import { 
    View, 
    Text, 
    TextInput, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView,
    ToastAndroid 
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
// import Logo from '../assets/Logo.png'
import ProfileP from '../assets/Profile.jpeg'

const Account = () => {
    const [nim, setNim] = useState('')
    const [nama, setNama] = useState('')
    const [passwordLama, setPasswordLama] = useState('')
    const [passwordBaru, setPasswordBaru] = useState('')
    const [konfirmasiSandi, setKonfirmasiSandi] = useState("");
    const navigation = useNavigation();

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
                    nama: name,
                    password: password,
                    name: name
                })
                setNim(nim)
                setNama(name)
            }
        } catch (e) {
            // error reading value
        }
    }

    const resetPassword = async (value) => {
        console.log('value', value);
        try {
            const response = await axios.put('http://192.168.43.148:3800/mahasiswa', {
                nim: value.nim,
                nama : value.nama,
                password: value.passwordLama,
                passwordBaru: value.passwordBaru,
            })
            if (response.data.status == 200) {
                console.log('response', response)
                ToastAndroid.show("Password berhasil diubah", ToastAndroid.SHORT)
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show("Cek kembali nim dan password", ToastAndroid.SHORT)
        }
    }

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('nim')
          await AsyncStorage.removeItem('password')
          await AsyncStorage.removeItem('name')
          navigation.navigate('Login')
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }

    return (
        <View style={styles.container}>
        <View style={styles.navbar}>
        {/* <Image source={Logo} style={styles.logo}/> */}
        </View>
        <ScrollView>
        <View style={styles.body}>
            <Image source={ProfileP} style={styles.profilePicture} />
        </View>
        <View style={styles.form}>
            {/* <Text>{data.nim}</Text>
            <Text>{data.password}</Text>
            <Text>{data.name}</Text> */}
            <View style={styles.formText}>
            <Text style={styles.Text}>Nim</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="nim"
                placeholderTextColor="#b8b8b8"
                onChangeText={(nim) => setNim(nim)}
                value={nim}
                editable = {false}
            />
            <View style={styles.formText}>
            <Text style={styles.Text}>Nama</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="nama"
                placeholderTextColor="#b8b8b8"
                onChangeText={(nama) => setNama(nama)}
                value={nama}
            />
            <View style={styles.formText}>
            <Text style={styles.Text}>Password Lama</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Masukkan Password Lama"
                placeholderTextColor="#a1a1a1"
                secureTextEntry={true}
                onChangeText={(password) => setPasswordLama(password)}
                value={passwordLama}
            />
            <View style={styles.formText}>
            <Text style={styles.Text}>Password Baru</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Masukkan Password Baru"
                placeholderTextColor="#a1a1a1"
                secureTextEntry={true}
                onChangeText={(password) => setPasswordBaru(password)}
                value={passwordBaru}
            />
            <View style={styles.formText}>
            <Text style={styles.Text}>Konfirmasi Password</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Konfirmasi Password"
                placeholderTextColor="#a1a1a1"
                secureTextEntry={true}
                onChangeText={(password) => setKonfirmasiSandi(password)}
                value={konfirmasiSandi}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    if (nim == "" || passwordLama == "" || passwordBaru == "" || konfirmasiSandi == "") {
                        ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                    } else if (nim !== data.nim || passwordLama !== data.password) {
                        ToastAndroid.show('nim atau Password Salah', ToastAndroid.SHORT);
                    } else if (passwordBaru !== konfirmasiSandi) {
                        ToastAndroid.show('Password Baru dan Konfirmasi Password Tidak Sama', ToastAndroid.SHORT);
                    } else {
                        resetPassword({ nim: nim, nama: nama, passwordLama: passwordLama, passwordBaru: passwordBaru })
                    }
                }}>
                <Text style={styles.textButton}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogout} onPress={async() => await removeValue()}>
                <Text style={styles.textLogout}>Logout</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  body : {
    alignItems : 'center',
    marginVertical : 10
  },
  profilePicture : {
    width : 100,
    height : 100,
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
  form : {
    marginHorizontal : 45,
    marginTop : 5
  },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#eb8d2f',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 20
    },
    textButton: {
        color: '#FFF',
        fontSize: 18,
        fontWeight : '700'
    },
    formText : {
        marginTop : 5,
        marginBottom : 4
    },
    Text : {
        color : '#323333',
        fontWeight : '600',
        fontSize : 16,
    },
    btnLogout: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        borderColor : '#a1a1a1',
        borderWidth : 2, 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 20,
        marginBottom : 40,
    },
    textLogout: {
        color: '#323333',
        fontSize: 15,
    },
})

export default Account