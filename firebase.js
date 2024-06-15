import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNajcTxImQ6a6Z9MvdlGOKp8OVv3Fasug",
  authDomain: "taskapp-86e9e.firebaseapp.com",
  projectId: "taskapp-86e9e",
  storageBucket: "taskapp-86e9e.appspot.com",
  messagingSenderId: "543063745634",
  appId: "1:543063745634:web:02d888325a2bfd42e01d3b",
  measurementId: "G-W3GM2K601K",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
