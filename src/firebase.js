import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByFJk4QL_tvIFRea3vSmi4OyFiGmHrd4w",
    authDomain: "lyfe-14ae2.firebaseapp.com",
    projectId: "lyfe-14ae2",
    storageBucket: "lyfe-14ae2.appspot.com",
    messagingSenderId: "131409686663",
    appId: "1:131409686663:web:04c0f927cb5642e2c20822"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebase = getFirestore(firebaseApp);

export {firebase};
