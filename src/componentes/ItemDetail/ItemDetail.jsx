import React from 'react'
import "./ItemDetail.css"

function ItemDetail({id,img,precio,descripcion,titulo}) {
  return (

    <div className='div2'>
       
        <div className='div1'>
            <img src={img} alt={titulo} />
            <h2>{titulo}</h2>
            <p>id: {id}</p>
            <p>Precio de lista: ${precio}</p>
            <p>detalles: {descripcion}</p>
            <button>Comprar</button>
        </div>
    </div>

  )
}

export default ItemDetail