import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import * as Permission from 'expo-permissions'
import MapView from 'react-native-maps'
import { Dimensions, Alert } from 'react-native'
import { Button, Divider } from '@rneui/base'

const widthScreen = Dimensions.get('window').width

export default function ChangeAddress() {
    const [address, setAddress] = useState(null)

    return (
        <View>
            <Text>ChangeAddress</Text>
        </View>
    )
}

function Map(props) {
    const { isVisibleMap } = props
    const [location, setLocation] = useState(null)
    useEffect(() => {
        (async () => {
            const resultPermission = await Permission.askAsync(Permission.LOCATION)
            if (resultPermission.status !== 'denied') {
                const loc = Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: loc.coords.latitude,
                    longitud: loc.coords.longitud,
                    latitudeDelta: 0.001,
                    longitudDelta: 0.001
                })
            } else {
                //alert
            }
        })()
    }, [])
    return (
        <View>
            {location &&
                (<MapView
                    style={styles.map}
                    initialRegion={location}
                    showsUserLocation={true}
                    onRegionChange={(region) => setLocation(region)}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitud: location.longitud
                        }}
                    />
                </MapView>)}
            <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                <Divider style={styles.divider} />
            </View>
            <View style={styles.containerButtons}>
                <Button
                    title='Cancelar ubicación'
                    containerStyle={styles.btn}
                    buttonStyle={styles.btnDanger}
                    onPress={() => isVisibleMap(false)}
                />
                <Button
                    title='Guardar'
                    containerStyle={styles.btn}
                    buttonStyle={styles.btnSuccess}
                    onPress={save}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({})