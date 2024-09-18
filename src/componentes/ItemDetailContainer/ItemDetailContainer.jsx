import React, { useEffect, useState } from 'react'
import { getUnProducto } from '../../Asynmock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import "./ItemDetailContainer.css"

function ItemDetailContainer() {
  const [producto, setProducto] = useState(null)
  const { iditem } = useParams() // Obtenemos el id del producto desde la URL

  useEffect(() => {
    getUnProducto(iditem) // Buscamos el producto por ID
      .then((data) => setProducto(data))
  }, [iditem])

  return (
    <div>
      {producto ? <ItemDetail {...producto} /> : <p>Cargando producto...</p>}
    </div>
  )
}

export default ItemDetailContainer