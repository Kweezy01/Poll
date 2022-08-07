// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRAC84ijYyu_W3sTRjDYGPvKpYCJwuSeQ",
  authDomain: "poll-d6aeb.firebaseapp.com",
  projectId: "poll-d6aeb",
  storageBucket: "poll-d6aeb.appspot.com",
  messagingSenderId: "783377877150",
  appId: "1:783377877150:web:2cf1f6a44eae98a0b6938f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;