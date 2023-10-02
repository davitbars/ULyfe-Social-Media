import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByFJk4QL_tvIFRea3vSmi4OyFiGmHrd4w",
  authDomain: "lyfe-14ae2.firebaseapp.com",
  projectId: "lyfe-14ae2",
  storageBucket: "lyfe-14ae2.appspot.com",
  messagingSenderId: "131409686663",
  appId: "1:131409686663:web:04c0f927cb5642e2c20822",
  measurementId: "G-VD3ZZ5K69D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  storage,
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
};
