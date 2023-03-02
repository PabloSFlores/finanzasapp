import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from '@rneui/base'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
//import { getAuth, updateProfile } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function UserLogged(props) {
    const { setReload, user } = props
    console.log('Sesión', user);
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const removeValue = async () => {
        setText('Cerrando sesión')
        try {
            setShow(true)
            await AsyncStorage.removeItem('@session')
            setShow(false)
            setReload(true)
        } catch (e) {
            setShow(false)
            console.log('Error - UserLogged(12)', e);
        }
    }

    const uploadImage = async (uri) => {
        setText('Cambiando avatar')
        setShow(true)
        const response = await fetch(uri) //genera un blob
        console.log('Uri response', response);
        const { _bodyBlob } = response
        const storage = getStorage()
        const storageRef = ref(storage, `avatar/${user.uid}`)
        return uploadBytes(storageRef, _bodyBlob)
    }

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA)
        if (resultPermission.permissions.camera.status !== 'denied') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1
            })
            if (!result.canceled) {
                uploadImage(result.assets[0].uri).then((response) => {
                    console.log('Imagen actualizada')
                    uploadPhotoProfile()
                }).catch((err) => {
                    console.log('Error', err)
                })
            } else {
                console.log('Imagen no seleccionada');
                setShow(false)
            }
        }
    }

    const uploadPhotoProfile = () => {
        const storage = getStorage()
        getDownloadURL(ref(storage, `avatar/${user.uid}`))
            .then(async (url) => {
                const db = getFirestore()
                //obtener doc antes
                const response = await setDoc(doc(db, "person", `${user.uid}`), {
                    displayName:'',
                    photo: url
                })
                console.log('respuesta - firestore',response);
            }).catch((err) => {
                setShow(false)
                console.log('Error obtener Imagen', err);
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Avatar
                    size='xlarge'
                    rounded
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/finanzas-cab04.appspot.com/o/avatar%2FllMqQCspyvfnEEc08MojLJHc5Di1.jpg?alt=media&token=05f25976-9f03-4f7b-838e-57029ff8bc00' }}
                    containerStyle={styles.avatar}
                >
                    <Avatar.Accessory
                        size={50}
                        onPress={changeAvatar}
                    />
                </Avatar>
                <View>
                    <Text style={styles.displayName}>
                        {user.providerData[0].displayName ? user.providerData[0].displayName : 'Anónimo'}
                    </Text>
                    <Text>
                        {user.providerData[0].email}
                    </Text>
                </View>
            </View>
            <Button
                title='Cerrar sesión'
                buttonStyle={styles.btn}
                onPress={removeValue}
            />
            <Loading show={show} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        backgroundColor: '#FFF'
    },
    btn: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: 'tomato',
        paddingVertical: 10
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 30
    },
    avatar: {
        marginRight: 16
    },
    displayName: {
        fontWeight: 'bold',
        paddingBottom: 5
    },
})