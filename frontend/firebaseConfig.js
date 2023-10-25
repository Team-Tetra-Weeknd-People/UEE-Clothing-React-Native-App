import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4MOFdxcteM-JLPK0tGX_nHMpL0oklk7w",
  authDomain: "material-inspector-d2b53.firebaseapp.com",
  projectId: "material-inspector-d2b53",
  storageBucket: "material-inspector-d2b53.appspot.com",
  messagingSenderId: "170579677131",
  appId: "1:170579677131:web:419574cb69235ea7da304e"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};