
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import keys from "../keys";
const firebaseConfig = {
    apiKey:keys.apiKey,
    authDomain: "photos-52fd9.firebaseapp.com",
    projectId: "photos-52fd9",
    storageBucket: "photos-52fd9.appspot.com",
    messagingSenderId: "910394614521",
    appId: "1:910394614521:web:1d0c002c98c0d8eb5f3828"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };