// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOZXsJdDWyhuEJhISK7iBlPFI2qx4B5tU",
  authDomain: "users-management-972cf.firebaseapp.com",
  projectId: "users-management-972cf",
  storageBucket: "users-management-972cf.appspot.com",
  messagingSenderId: "953080513977",
  appId: "1:953080513977:web:3cbaa58cdc8184e20b2268",
  measurementId: "G-P2LXJDN3YD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
