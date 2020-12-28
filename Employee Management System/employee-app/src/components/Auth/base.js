import * as firebase from 'firebase/app';
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDXOmiSvWk7Vi_cjqifaJ47MFjjYimhBfQ",
    authDomain: "react-da-auth.firebaseapp.com",
    databaseURL: "https://react-da-auth.firebaseio.com",
    projectId: "react-da-auth",
    storageBucket: "react-da-auth.appspot.com",
    messagingSenderId: 356821681437
})

export default app;