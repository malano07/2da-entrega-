import React, { useContext, useState } from 'react';
import "./ItemDetail.css";
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Contador from '../Contador/Contador';
import { toast} from 'react-toastify';

function ItemDetail({ id, img, precio, descripcion, titulo, stock }) {
  const [agregarCantidad, setAgregarCantidad] = useState(0);
  const { agregarAlCarrito } = useContext(CartContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    console.log("Productos agregados:" + cantidad);
    const item = { id, img, titulo, precio, descripcion };
    agregarAlCarrito(item, cantidad);
    toast.success(`Producto agregado al carrito!`, {
      position: "top-right",
      autoClose: 5000,
  });  
    
  };

  return (
    <div className='contenedor_producto'>
      <div className='contenedor_img'>
        <img src={img} alt={titulo} />
      </div>
      <div className='contenedor_detalles'>
        <h2>{titulo}</h2>
        <p>id: {id}</p>
        <p>Precio de lista: ${precio}</p>
        <p>Detalles: {descripcion}</p>
        <p>Productos restantes: {stock}</p>
        {
          agregarCantidad > 0 ? (
            <div className='div-botones-itemdetail'>
              <button className='button-itemdetail'><Link to="/cart"> Finalizar Compra</Link></button>
              <button className='button-itemdetail'><Link to="/">Seguir Comprando</Link></button>
            </div>
          ) : (
            <div>
              <Contador inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />
            </div>
          )
        }
      </div>

    
    </div>
  );
}

export default ItemDetail;
