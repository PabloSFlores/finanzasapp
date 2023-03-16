import { StyleSheet, Text, View } from 'react-native'
import { getAuth, updateProfile } from 'firebase/auth';
import React from 'react'
import { Button, Icon, Input } from '@rneui/base';
import { useState } from 'react';
import Loading from '../../../../../kernel/components/Loading';
import { isEmpty } from 'lodash';

export default function ChangeDisplayName() {
    const auth = getAuth()
    const [displayName, setDisplayName] = useState(auth.currentUser.displayName ? auth.currentUser.displayName : '')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const [error, setError] = useState({ displayName: '' })

    const updateDisplayName = () => {
        setShow(true)
        setText('Actualizando...')
        if (!isEmpty(displayName)) {
            updateProfile(auth.currentUser, {
                displayName: displayName
            })
                .then(() => {
                    setShow(false)
                })
                .catch((err) => {
                    setShow(false)
                    console.log('Fallo', err);
                })
        }else{
            setShow(false)
        }
    }


    return (
        <View>
            <Input
                value={displayName}
                label='Cambiar nombre'
                containerStyle={styles.input}
                onChange={(event) => setDisplayName(event.nativeEvent.text)}
                errorMessage={error.displayName}
                autoCapitalize='none'
            />
            <Button
                title="Actualizar"
                icon={
                    <Icon
                        type="material-community"
                        name="update"
                        size={22}
                        color="#fff"
                    />
                }
                buttonStyle={styles.btnSuccess}
                containerStyle={styles.btnContainer}
                onPress={updateDisplayName}
            />
            <Loading show={show} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    btnSuccess: {
        color: '#FFF',
        backgroundColor: '#28a745'
    },
    btnContainer: {
        margin: 16
    },
    input: {
        width: '100%',
    },
})