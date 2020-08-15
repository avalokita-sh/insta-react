import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
   apiKey: "AIzaSyAxvZMxmR2anDa5IPwWLHlXKHKfrwWSvtQ",
  authDomain: "instagram-clone-react-ebc1d.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-ebc1d.firebaseio.com",
  projectId: "instagram-clone-react-ebc1d",
  storageBucket: "instagram-clone-react-ebc1d.appspot.com",
  messagingSenderId: "813200578854",
  appId: "1:813200578854:web:b23286c22fc827328dc9e7",
  measurementId: "G-H5L38RHJJK"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();


export { db, auth, storage };