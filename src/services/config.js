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




// Initialize Firebase
/*
import {collection, doc, writeBatch} from "firebase/firestore"
const subirProductos = async () => {
    const batch = writeBatch(db)
    const productosRef = collection(db, "inventrio")
    misProductos.forEach((producto)=>{
        const nuevoDoc = doc(productosRef) 
        batch.set(nuevoDoc, producto)
    })
    try {
        await batch.commit();
        console.log("Productos subidos exitosamente")
    } catch(error) {
        console.log("Error subiendo productos:", error)
    }
}
subirProductos()*/