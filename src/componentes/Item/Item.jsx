import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

function Item({id,titulo,precio,img,stock}) {
  return (
    <div className='item-cont'>
        <div className='img-producto'>
          <img src={img} alt={titulo} className='imgProductoItem'/>
        </div>
        <div className='div-derecho'>
          <h3> {titulo}</h3>
          <p>precio: ${precio}</p>
          <p>id: {id}</p>
          <p>Productos restantes: {stock}</p>
          <Link to={`/detalle/${id}`}><button>ver detalles</button></Link>
        </div>
    </div>
  )
}

export default Item