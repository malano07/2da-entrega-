import React from 'react'
import "./Navbar.css"
import CartWidget from '../CartWidget/CartWidget'
import { GiBasketballBasket, GiHoodie } from "react-icons/gi"
import { IoMdBasketball } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link,NavLink } from 'react-router-dom';


const Navbar = () => {


  return (    
    <header>
        <Link to="/"><img src="/public/img/logo mm7 fondo transparente.ico" alt="logo" /></Link>
        <nav>
            <ul>
              <NavLink to="/categoria/3"><li><GiBasketballBasket /> Remeras</li></NavLink>
              <NavLink to="/categoria/2"><li><IoMdBasketball /> Gorras</li></NavLink>
              <NavLink to="/categoria/1"><li><GiHoodie /> Buzos</li></NavLink>
              <NavLink to="/faq"><li><FaQuestion /> Faq</li></NavLink>
              <NavLink to="/contacto"><li><MdOutlineAlternateEmail />Contacto</li></NavLink>
            </ul>
        </nav>
        <CartWidget/>        
    </header>
  )
}

export default Navbar