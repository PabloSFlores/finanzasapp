import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Input, Button, Image, Icon } from "@rneui/base";
import React, { useState } from "react";
import { isEmpty } from "lodash";

export default function Login(props) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true)
  const login = () => {
    if (!(isEmpty(email) || isEmpty(password))) {
      console.log("Listos para iniciar sesión");
    } else {
      setError("Campo obligatorio");
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require("../../../../assets/presupuesto.png")}
          resizeMode="contain"
          style={styles.logotype}
        />
        <Input
          placeholder="Correo electrónico"
          keyboardType="email-address"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          errorMessage={error}
        />
        <Input
          placeholder="Contraseña"
          containerStyle={styles.input}
          onChange={(event) => setPassword(event.nativeEvent.text)}
          secureTextEntry={showPassword}
          rightIcon={
            <Icon type="material-community"
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              color="#007bff"
              onPress={() => setShowPassword(!showPassword)}>
            </Icon>}
          errorMessage={error}
        />
        <Button
          title="Iniciar sesión"
          icon={
            <Icon
              type="material-community"
              name="login"
              size={22}
              color="#fff"
            />
          }
          buttonStyle={styles.btnSuccess}
          containerStyle={styles.btnContainer}
          onPress={login}
        />
        <Text
          style={styles.createAccount}
          onPress={() => console.log("Vamos a loquear")}>
          Crear cuenta
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  logotype: {
    width: "100%",
    height: 150,
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    width: '100%',
  },
  btnSuccess: {
    color: '#FFF',
    backgroundColor: '#28a745'
  },
  btnContainer: {
    margin: 16
  },
  createAccount:{
    color:'#007bff'
  },
});
