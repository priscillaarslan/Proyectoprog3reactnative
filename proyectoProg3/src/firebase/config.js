import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBjagc8QkTMB1-O7gOAMUuBcPDY0vSc1HY",
  authDomain: "proyecto-react-native-3c3d4.firebaseapp.com",
  projectId: "proyecto-react-native-3c3d4",
  storageBucket: "proyecto-react-native-3c3d4.appspot.com",
  messagingSenderId: "1059218389648",
  appId: "1:1059218389648:web:d103fc1089e97df2e8b615"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();