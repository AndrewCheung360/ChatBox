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
  apiKey: "AIzaSyCUFIfqnzJWhtvskd4UflOPJakfhpbHL0o",
  authDomain: "chatbox-5dc93.firebaseapp.com",
  projectId: "chatbox-5dc93",
  storageBucket: "chatbox-5dc93.appspot.com",
  messagingSenderId: "255439623443",
  appId: "1:255439623443:web:e50634987431d12670b6e6"
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