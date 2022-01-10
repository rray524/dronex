// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2_GZBF4y7jN8YQ90GLd-BAMziCUIZAh4",
    authDomain: "dronex-ecommerce.firebaseapp.com",
    projectId: "dronex-ecommerce",
    storageBucket: "dronex-ecommerce.appspot.com",
    messagingSenderId: "985333987419",
    appId: "1:985333987419:web:999a03eac50c00a5e0677e"
};


// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

