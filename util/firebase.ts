import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import withFirebaseAuth from "react-with-firebase-auth"

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyB-jQ3AtQRv8EawvNgEmy9jNacXh-gmu4A",

  authDomain: "chatbox-b.firebaseapp.com",

  projectId: "chatbox-b",

  storageBucket: "chatbox-b.appspot.com",

  messagingSenderId: "1053096077824",

  appId: "1:1053096077824:web:021b7394b782fccc9006e5"

};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

const providers = {
  googleProvider: new GoogleAuthProvider(),
}

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider)
}

const signOutFirebase = () => {
  signOut(auth)
}

export {
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
}