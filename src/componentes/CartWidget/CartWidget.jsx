import React from 'react';
import './CartWidget.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

function CartWidget() {
  const { cantidadTotal } = useContext(CartContext);
  
  return (
    <div className='div-cartwidget'>
      <Link to="/cart"><IoCartOutline className='i-cart'/></Link>
      {cantidadTotal > 0 && <span>{cantidadTotal}</span>}
    </div>
  );
}

export default CartWidget;
