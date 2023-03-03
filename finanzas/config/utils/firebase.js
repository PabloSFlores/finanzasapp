import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native'

const firebaseConfig = {
    apiKey: "AIzaSyCKlXbAL7XJ0RcF0qCRzL3S9DAQQp0mvFw",
    authDomain: "finanzas-cab04.firebaseapp.com",
    projectId: "finanzas-cab04",
    storageBucket: "finanzas-cab04.appspot.com",
    messagingSenderId: "302188883059",
    appId: "1:302188883059:web:1e35b2c9eaa1e02575ce06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})