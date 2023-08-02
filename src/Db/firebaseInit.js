import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBUjgZ_7OALtMkyNrqYh1q1eYcgwJqz9Ms",
  authDomain: "patang-92c9a.firebaseapp.com",
  databaseURL:
    "https://patang-92c9a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patang-92c9a",
  storageBucket: "patang-92c9a.appspot.com",
  messagingSenderId: "1015702420145",
  appId: "1:1015702420145:web:19b7f12e0a132f44ff4090",
  measurementId: "G-9D7ZW879F0",
};

// Initialize Firebase
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;
