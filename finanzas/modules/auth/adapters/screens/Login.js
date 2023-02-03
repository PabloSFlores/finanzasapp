import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Input, Button, Image, Icon } from '@rneui/base';
import React, { useState } from 'react'
import { isEmpty } from 'lodash';

export default function Login(props) {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = () => {
    if (!(isEmpty(email) || isEmpty(password))) {
      console.log('Listos para iniciar sesión');
    } else {
      setError('Campo obligatorio')
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require('../../../../assets/presupuesto.png')}
          resizeMode='contain'
          style={styles.logotype}
        />
        <Input
          placeholder='Correo electrónico'
          keyboardType='email-address'
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          errorMessage={error}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  logotype: {
    width: '100%',
    height: 150,
    marginTop: 16,
    marginBottom: 16
  },
})