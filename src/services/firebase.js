// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsXk0pOMQimyIWPJbASESOg-gUfnojtcc",
    authDomain: "photos-52fd9.firebaseapp.com",
    projectId: "photos-52fd9",
    storageBucket: "photos-52fd9.appspot.com",
    messagingSenderId: "910394614521",
    appId: "1:910394614521:web:1d0c002c98c0d8eb5f3828"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };