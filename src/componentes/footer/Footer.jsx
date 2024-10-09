import React, { useRef } from 'react';
import "./Footer.css";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoIosMail, IoIosSend } from "react-icons/io";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/config';
import { toast } from 'react-toastify';

const Footer = () => {
  const emailRef = useRef();

  const suscribirse = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (email.trim() === "") {
      toast.error("Por favor ingrese un correo", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {await addDoc(collection(db, "Suscripciones"), { email });

      toast.success("Te acabas de suscribir", {
        position: "top-center",
        autoClose: 5000,
      });

      emailRef.current.value = "";
    } catch (error) {
      toast.error("Error al suscribirte", {
        position: "top-center",
        autoClose: 5000,
      });
      console.error("Error al suscribirse: ", error);
    }
  };

  return (
    <div>
      <footer>
        <div className='suscripcion-div'>
          <img src="/img/logo mm7 fondo transparente.ico" alt="Logo MM7" className='img-footer' />
          <h3 className='h3-suscribir'>Suscribite a nuestro Newsletter y recibí todas nuestras promociones exclusivas.</h3>
          <div className='div-botonsuscribir'>
            <input type="email" placeholder="Ingresa tu email" ref={emailRef} />
            <button onClick={suscribirse}><IoIosSend /></button>
          </div>
        </div>
        <div className='parrafos-div'>
          <h4>Todos los derechos reservados MM7-Tienda Urbana</h4>
          <h5>Copyright 2024</h5>
        </div>
        <div className='div-logos'>
          <a href="https://www.instagram.com/" target='_blank'><button><IoLogoInstagram /></button></a>
          <a href="https://www.facebook.com" target='_blank'><button><FaFacebook /></button></a>
          <a href="https://wa.me/+542254604396" target='_blank'><button><IoLogoWhatsapp /></button></a>
          <a href="mailto:maximalano@gmail.com"><button><IoIosMail /></button></a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
