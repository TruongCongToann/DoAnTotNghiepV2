// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmirCmmrHEXL6mXlI8GnwUcNrgQcMZPNQ",
  authDomain: "login-api-gg.firebaseapp.com",
  projectId: "login-api-gg",
  storageBucket: "login-api-gg.appspot.com",
  messagingSenderId: "82246165511",
  appId: "1:82246165511:web:16a5686a55b3059bbff6a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;