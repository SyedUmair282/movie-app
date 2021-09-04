import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDHzufNRGQPlcOr2z4X3LzowMorPgqJjkw",
    authDomain: "assignment1-5cb47.firebaseapp.com",
    projectId: "assignment1-5cb47",
    storageBucket: "assignment1-5cb47.appspot.com",
    messagingSenderId: "148750088356",
    appId: "1:148750088356:web:d97050842c68d4aed24e31",
    measurementId: "G-RMJEMBNHSS"
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;