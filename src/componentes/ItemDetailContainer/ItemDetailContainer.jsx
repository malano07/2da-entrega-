import React, { useEffect, useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import "./ItemDetailContainer.css"
import { db } from '../../services/config'
import { getDoc,doc } from 'firebase/firestore'

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null)
  const { iditem } = useParams() 
  const [loading, setLoading] = useState(true) 

  useEffect(() => {

    const nuevoDoc= doc(db,"productos", iditem)
    setLoading(true)

    getDoc(nuevoDoc)
    .then(res=>{
      const data=res.data()
      const nuevosProducto = {id:res.id,...data}
      setProducto(nuevosProducto)
    }) 
    .catch(error=>console.log(error))
    .finally(() => {
      setLoading(false) 
    })
    },[iditem]
  )



  return (
    <div className='contenedor_principal_detalles'>
      {producto ? <ItemDetail {...producto} /> : <div className="loader"></div>}
    </div>
  )
}

export default ItemDetailContainer