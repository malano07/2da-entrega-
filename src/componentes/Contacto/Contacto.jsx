import React, { useState } from 'react';
import { db } from '../../services/config';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import './Contacto.css';

export const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApeliido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");

  const manejadorFormulario = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Suscripciones"), {
        email: email
      });

      await addDoc(collection(db, "Formulario-Contactos"), {
        titulo: titulo,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email,
        mensaje: mensaje
      });
      Swal.fire({
        title: 'Formulario enviado',
        text: '¡Gracias por contactarnos!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        setNombre("");
        setApeliido("");
        setTelefono("");
        setEmail("");
        setMensaje("");
        setTitulo("");
      });

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className='contenedor_form'>
      <form className='form-contacto' onSubmit={manejadorFormulario}>
        <img src="./public/img/logo mm7 fondo transparente.ico" alt="Logo" />
        <h1>Contacto</h1>
        <label htmlFor="causa">Motivo de su contacto:</label>
        <select id="causa" name="causa" onChange={(e) => setTitulo(e.target.value)} value={titulo}>
          <option value="Devolucion">Devolución</option>
          <option value="Problemas con su compra">Problemas con su compra</option>
          <option value="Prenda dañada">Prenda dañada</option>
          <option value="Reventa">Reventa</option>
        </select>

        <label htmlFor="nombre">Nombre</label>
        <input type="text" id='nombre' onChange={(e) => setNombre(e.target.value)} value={nombre} required />

        <label htmlFor="apellido">Apellido</label>
        <input type="text" id='apellido' onChange={(e) => setApeliido(e.target.value)} value={apellido} required />

        <label htmlFor="telefono">Teléfono</label>
        <input type="text" id='telefono' onChange={(e) => setTelefono(e.target.value)} value={telefono} required />

        <label htmlFor="email">E-mail</label>
        <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email} required />

        <label htmlFor="textarea">Déjanos tus comentarios</label>
        <textarea name="textarea" id="textareaa" rows="15" cols="50" onChange={(e) => setMensaje(e.target.value)} value={mensaje} required>Deja tu mensaje aquí</textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
