import React, { useState } from 'react';
import { AiFillPlusCircle } from "react-icons/ai";
import { MdRemoveCircle } from "react-icons/md";
import './Contador.css'

const Contador = ({ stock,funcionAgregar,inicial }) => {
  const [cantidad, setCantidad] = useState(inicial);

  const sumar = () => {   
    if (cantidad < stock) {
      setCantidad(cantidad + 1);   
    }
  };
  const restar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    } 
  };

  return (
    <div className='contador_conteiner'>      
      <button className='button-contador' onClick={restar}><MdRemoveCircle /></button>
      <p className='p_contador'>{cantidad}</p>
      <button className='button-contador' onClick={sumar}><AiFillPlusCircle /></button>
      <button className='button-agregar' onClick={()=>funcionAgregar(cantidad)}> Agregar al carrito</button>      
    </div>
  );
}

export default Contador;
