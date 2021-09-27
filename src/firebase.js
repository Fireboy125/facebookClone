import firebase from "firebase";
import "firebase/firestore"
const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyCINc16rLUNp7xnu3QMiGRcJc_SHjYc7VE",
  authDomain: "fbclone-8e31f.firebaseapp.com",
  projectId: "fbclone-8e31f",
  storageBucket: "fbclone-8e31f.appspot.com",
  messagingSenderId: "41122120315",
  appId: "1:41122120315:web:5eda04f6c7c848c19518de",
  measurementId: "G-XZ590EQNJS"

});
const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};