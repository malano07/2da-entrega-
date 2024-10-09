import React, { useState } from 'react';
import './Faq.css';
import { TbTruckDelivery } from "react-icons/tb";
import { IoLogoWhatsapp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { LiaExchangeAltSolid } from "react-icons/lia";

const faqData = [
  { id: 1, icon: <TbTruckDelivery />, question: 'Envios', answer: 'Hacemos envios a domicilio o sucursal en todo el país por medio de Andreani.' },
  { id: 2, icon: <MdPayment />, question: 'Pagos', answer: 'Aceptamos todos los métodos de pago: tarjeta de crédito, débito, efectivo y mercado pago.' },
  { id: 2, icon: <LiaExchangeAltSolid />, question: 'Cambios y devoluciones', answer: 'Dentro de los 10 dias se permiten cambios y devoluciones , previo constatacion del estado de las prendas' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); 

  const toggleParagraph = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };

  return (
    <div className='faq-main'>
      <img src="/public/img/logo mm7 fondo transparente.ico" alt="logo mm7" className='faq-img'/>
      <h1>FAQ! ¿Necesitas ayuda?</h1>
      <h3>No te preocupes, podemos Ayudarte!</h3>

      <div className='faq-secondDiv'>
        {faqData.map((item, index) => (
          <div key={item.id} className='faq-item'>
            <button className='faq-button' onClick={() => toggleParagraph(index)}>
              {item.icon} {item.question}
            </button>
            {openIndex === index && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
      <p className='parrafo-faq'>Si esta ayuda no fue suficiente mandanos un whatsapp <IoLogoWhatsapp /> o llena el formulario de contacto <IoIosMail /></p>
    </div>
  );
};

export default FAQ;
