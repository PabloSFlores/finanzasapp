import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    const [reload, setReload] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('@session')
                setSession(JSON.parse(value))
                // console.log("Session", value);
                if (value !== null) {
                    setUser(true)
                } else {
                    setUser(false)
                }
            } catch (e) {
                console.error("Error -> Profile", e)
            }
        })()
        setReload(false)
    }, [reload])
    if (user == null) return <Loading />
    return user ? <UserLogged setReload={setReload} user={session}/> : <UserGuest />
}

const styles = StyleSheet.create({})