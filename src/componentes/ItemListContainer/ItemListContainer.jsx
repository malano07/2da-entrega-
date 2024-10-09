import React from 'react'
import './ItemListContainer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import {db} from "../../services/config"
import { collection,getDocs,where,query, updateDoc } from 'firebase/firestore'


function ItemListContainer() {

  const [ productos,setProductos] = useState([])
  const [loading, setLoading] = useState (false)
  const {categoria}= useParams()
  useEffect(()=>{
    const misproductos = categoria 
    ? query(collection(db, "productos"), where("categoria", "==", Number(categoria)))
    : collection(db, "productos");
    setLoading(true)
    getDocs(misproductos)
    .then(res=>{      
      const nuevosProductos = res.docs.map(doc=>{
        const data = doc.data()
        return{id:doc.id,...data}
      })
      setProductos(nuevosProductos)
    })
    .catch(error=>console.log(error))
    .finally(()=>{
      setLoading(false)
    })
  },[categoria])
 

  return (
    <div className='div-cont'>    
    {productos ? <ItemList productos={productos}/> : <div className="loader"></div>}
    
    </div>
  )
}

export default ItemListContainer