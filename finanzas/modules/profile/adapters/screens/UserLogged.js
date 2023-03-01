import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from '@rneui/base'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'

export default function UserLogged(props) {
    const { setReload, user } = props
    console.log('Sesión', user);
    const [show, setShow] = useState(false)
    const removeValue = async () => {
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
                        onPress={()=>console.log('Hola')}
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
            <Loading show={show} text='Cerrando sesión' />
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
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5
    },
})