import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

function Item({id,titulo,precio,img,}) {
  return (
    <div className='item-cont'>
        <img src={img} alt={titulo} />
        <div className='div-derecho'>
        <h3>nombre: {titulo}</h3>
        <p>precio: ${precio}</p>
        <p>id: {id}</p>
        <Link to={`/detalle/${id}`}><button>ver detalles</button></Link>
        
        </div>
    </div>
  )
}

export default Item