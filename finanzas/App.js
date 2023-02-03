import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import { Button } from '@rneui/themed';
//import { initializeApp } from "firebase/app";
import Login from './modules/auth/adapters/screens/Login';
import Navigation from './config/navigation/Navigation';

export default function App() {
  //FIREBASE
  /*const firebaseConfig = {
    apiKey: "AIzaSyDMB99bz4sxu_-xEPPtPgKrUSRJrw07dqk",
    authDomain: "finanzas-679e5.firebaseapp.com",
    projectId: "finanzas-679e5",
    storageBucket: "finanzas-679e5.appspot.com",
    messagingSenderId: "354840202895",
    appId: "1:354840202895:web:cb05177859d4ba32216afa"
  };
  const app = initializeApp(firebaseConfig);*/
  return (
    <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
