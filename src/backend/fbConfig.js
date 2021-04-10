import firebase from 'firebase';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD45mrmHFDYLPzOGICbNRsASYVKTBSgXFk",
    authDomain: "hosteldui.firebaseapp.com",
    projectId: "hosteldui",
    storageBucket: "hosteldui.appspot.com",
    messagingSenderId: "460677677818",
    appId: "1:460677677818:web:a60491133c7696cab73f43",
    measurementId: "G-Y88RSD8LY4"
})

