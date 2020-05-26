import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCD2siALNsJUuTbM4178Qx9vwulJdRWI08",
    authDomain: "login-webapp-29692.firebaseapp.com",
    databaseURL: "https://login-webapp-29692.firebaseio.com",
    projectId: "login-webapp-29692",
    storageBucket: "login-webapp-29692.appspot.com",
    messagingSenderId: "303738220566",
    appId: "1:303738220566:web:09c35e998b9d6d3a4c8537",
    measurementId: "G-DMHTZ4WJYM"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  // firebaseApp.firestore().settings({ timestampsInSnapshots: true })

//export firestore database
export default firebaseApp.firestore()