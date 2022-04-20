import { initializeApp } from 'firebase/app';
import { getFirestore, doc, addDoc, getDocs, setDoc, collection, updateDoc, deleteDoc, deleteField } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIVVWRAvATw-HunS5LMOX3HkDeMBaOvaM",
  authDomain: "react-journal-app-curso-efea6.firebaseapp.com",
  projectId: "react-journal-app-curso-efea6",
  storageBucket: "react-journal-app-curso-efea6.appspot.com",
  messagingSenderId: "852792480265",
  appId: "1:852792480265:web:a8a69a4f87c09d69be9ed8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export { app, db, googleAuthProvider, auth, doc, addDoc, getDocs, collection, updateDoc, setDoc, deleteDoc, deleteField };
