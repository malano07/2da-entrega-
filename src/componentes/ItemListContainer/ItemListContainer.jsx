import React from 'react'
import './ItemListContainer.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { getProductos,ProductosPorCategoria } from '../../Asynmock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'


function ItemListContainer() {

  

 

  const [ productos,setProductos] = useState([])

  const { categoria } = useParams(); // Captura la categoría de la URL

  useEffect(() => {
  const funcionProductos = categoria ? ProductosPorCategoria : getProductos;
  
  funcionProductos(categoria)
    .then((res) => setProductos(res));
  }, [categoria]);
 

  return (
    <div className='div-cont'>
    
    <ItemList productos={productos}/>
    </div>
  )
}

export default ItemListContainer