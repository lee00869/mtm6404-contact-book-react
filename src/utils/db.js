import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlZpvUr3x6FiJQ_y6SCqP6L95FQHMNsWs",
  authDomain: "mtm6404-final-23865.firebaseapp.com",
  projectId: "mtm6404-final-23865",
  storageBucket: "mtm6404-final-23865.firebasestorage.app",
  messagingSenderId: "923372767153",
  appId: "1:923372767153:web:2db1a2767fc512c0455f90",
  measurementId: "G-R9M4E5N6B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;