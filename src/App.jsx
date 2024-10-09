import React from 'react'
import './App.css'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import  Contacto  from './componentes/Contacto/Contacto'
import Navbar from './componentes/Navbar/NavBar'
import Footer from './componentes/footer/Footer'
import { ProveedorCarrito } from './context/CartContext' 
import FAQ from './componentes/Faq/Faq'
import CheckOut from './componentes/CheckOut/CheckOut'
import Cart from './componentes/Cart/Cart'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
      <BrowserRouter>
        <ProveedorCarrito>
          <Navbar/>
          <Routes>
            <Route element={<ItemListContainer/>} path='/'/>
            <Route element={<ItemListContainer/>} path='/categoria/:categoria'/>
            <Route element={<ItemDetailContainer/>} path='/detalle/:iditem'/>   
            <Route element={<Contacto/>} path='/contacto'/>
            <Route element= {<FAQ/>} path='/faq'/>
            <Route element= {<CheckOut/>} path='/CheckOut'/>
            <Route element= {<Cart/>} path='/cart'/>
          </Routes>
          <Footer/> 
          <ToastContainer />
          </ProveedorCarrito>       
      </BrowserRouter>
  )
}

export default App
