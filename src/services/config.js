import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyB806tTzuSsYkwjYd6iqyP1w8pVXQi1ZbA",
  authDomain: "mm7-tienda-urbana.firebaseapp.com",
  projectId: "mm7-tienda-urbana",
  storageBucket: "mm7-tienda-urbana.appspot.com",
  messagingSenderId: "99974164264",
  appId: "1:99974164264:web:8bb75abaeda8e9cbbcea1d"
};


const app = initializeApp(firebaseConfig);

export const db= getFirestore(app)


