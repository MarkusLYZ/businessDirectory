// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "petadoption-b29d0.firebaseapp.com",
  projectId: "petadoption-b29d0",
  storageBucket: "petadoption-b29d0.appspot.com",
  messagingSenderId: "538153831599",
  appId: "1:538153831599:web:4079671abb037ff3b0185a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)