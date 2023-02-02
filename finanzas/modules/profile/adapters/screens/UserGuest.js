import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Image, Button } from '@rneui/base'
import React from 'react'

export default function UserGuest() {
    return (
        <View style={styles.container}>
            <ScrollView
            style={styles.mx}
            centerContent={true}
            >

            </ScrollView>
            <Text>UserGuest</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        height:'100%'
    },
    mx:{
        marginLeft:32,
        marginRight:32
    }
})