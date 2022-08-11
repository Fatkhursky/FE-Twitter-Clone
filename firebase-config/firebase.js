// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu-vr-5g3FHCDlhu80L17NJd3NFFvGQT0",
  authDomain: "twitterclone-f2c50.firebaseapp.com",
  projectId: "twitterclone-f2c50",
  storageBucket: "twitterclone-f2c50.appspot.com",
  messagingSenderId: "1079947508542",
  appId: "1:1079947508542:web:fee813bbf00ab0f4080a6f",
  measurementId: "G-6LJ2L4NJ8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)