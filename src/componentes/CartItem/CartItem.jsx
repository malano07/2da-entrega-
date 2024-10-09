import React from 'react'
import './CartItem.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const CartItem = ({item, cantidad,}) => {
    const {eliminarDelCarrito} = useContext(CartContext)

  return (
    <div className='div-cartItem'>
        <img className='img-cartItem'  src={item.img} alt={item.titulo} />
        <h4>{item.titulo}</h4>
        <p>Cantidad: {cantidad}</p>
        <p>Precio Unitario: $ {item.precio}</p>
        <p>Precio Total: $ {item.precio*cantidad}</p>
        <button onClick={() => eliminarDelCarrito(item.id, 1)}>Eliminar 1</button>
        <button onClick={() => eliminarDelCarrito(item.id, cantidad)}>Eliminar todos</button>

    </div>
  )
}

export default CartItem