// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU5dnrVbtJ-jKldCwkZ_cvwYy-kejjGQ8",
  authDomain: "bikini-site.firebaseapp.com",
  projectId: "bikini-site",
  storageBucket: "bikini-site.firebasestorage.app",
  messagingSenderId: "1022355229235",
  appId: "1:1022355229235:web:4c0ee0fce84f34f71df146",
  measurementId: "G-R1K05YBBW6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
