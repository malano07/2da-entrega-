import React from 'react'
import './App.css'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import  Contacto  from './componentes/Contacto/Contacto'
import Faq  from './componentes/FAQ/Faq'
import Navbar from './componentes/Navbar/NavBar'



function App() {
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<ItemListContainer/>} path='/'/>
        <Route element={<ItemListContainer/>} path='/categoria/:categoria'/>
        <Route element={<ItemDetailContainer/>} path='/detalle/:iditem'/>   
        <Route element={<Contacto/>} path='/contacto'/>
        <Route element={<Faq/>} path='/faq'/>
      </Routes>
    </BrowserRouter>  
  )
}

export default App
