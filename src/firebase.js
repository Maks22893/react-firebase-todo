import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUr0BMiYpEtN9dk_YA1GyZDtdom72i0KM",
  authDomain: "react-todo-94ff6.firebaseapp.com",
  projectId: "react-todo-94ff6",
  storageBucket: "react-todo-94ff6.firebasestorage.app",
  messagingSenderId: "138526061048",
  appId: "1:138526061048:web:cf5bee415402ac9d9ea60d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);