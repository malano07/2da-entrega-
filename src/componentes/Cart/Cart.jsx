import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import "./Cart.css"
import CartItem from "../CartItem/CartItem"

const Cart = () => {
 const {carrito, total, cantidadTotal, vaciarCarrito} = useContext(CartContext)

 if (cantidadTotal === 0) {
    return (
        <div className="carrito-vacio">
            <img src="/img/logo mm7 fondo transparente.ico" alt="logo mm7" />
            <h2>Su Carrito esta vacio</h2>
            <Link to="/">
            <button className="button_vacio">Tienda</button>
            </Link>
        </div>
    )
 }

  return (
  
  <div className="carrito-gral">
        {
            carrito.map(producto => <CartItem key={producto.item.id} {...producto}/>)
        }
        <div>
        <h3>Total: ${total}</h3>
        <h3>Cantidad Total Items: {cantidadTotal}</h3>
        </div>       
        <div >            
            <button className="botones-cart" onClick={()=> vaciarCarrito()}> Vaciar Carrito </button>
            <Link to='/'><button className="botones-cart">Seguir comprando</button></Link>
            <Link to="/checkout"><button className="botones-cart">Finalizar Compra</button></Link>
        </div>

    </div>
  )
}

export default Cart