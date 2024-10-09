// CheckOut.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../services/config';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import './CheckOut.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const CheckOut = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [altura, setAltura] = useState("");
    const [dpto, setDpto] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");
    const [formaDePago, setFormaDePago] = useState("");
    const [ordenData, setOrdenData] = useState(null); 

    const { carrito, total, vaciarCarrito2 } = useContext(CartContext);

    const manejadorCheckOut = async (e) => {
        e.preventDefault();
        setError(""); 
        if (
            nombre.trim() === "" || apellido.trim() === "" || telefono.trim() === "" ||
            email.trim() === "" || direccion.trim() === ""
        ) {
            setError("Por favor, completa todos los campos");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los emails no coinciden");
            return;
        }

        if (formaDePago.trim() === "") {
            setError("Por favor, selecciona una forma de pago");
            return;
        }

        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.titulo,
                cantidad: producto.cantidad,
                precio: producto.item.precio
            })),
            total: total,
            fecha: new Date(), 
            nombre,
            apellido,
            telefono,
            email,
            direccion,
            altura,
            dpto,
            codigoPostal,
            ciudad,
            formaDePago
        };

        try {
        
            const actualizarStockPromises = orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, "productos", productoOrden.id);
                const productoDoc = await getDoc(productoRef);
                if (productoDoc.exists()) {
                    const stockActual = productoDoc.data().stock;
                    if (stockActual >= productoOrden.cantidad) {
                        await updateDoc(productoRef, {
                            stock: stockActual - productoOrden.cantidad
                        });
                    } else {
                        throw new Error(`No hay suficiente stock para el producto "${productoOrden.nombre}"`);
                    }
                } else {
                    throw new Error(`El producto con ID "${productoOrden.id}" no existe`);
                }
            });

            await Promise.all(actualizarStockPromises); 

            const docRef = await addDoc(collection(db, "ordenes"), orden); 
            setOrdenId(docRef.id);
            setOrdenData({ ...orden, fecha: orden.fecha.toLocaleString() }); 
            vaciarCarrito2();
            setNombre("");
            setApellido("");
            setEmail("");
            setEmailConfirmacion("");
            setTelefono("");
            setDireccion("");
            setAltura("");
            setDpto("");
            setCodigoPostal("");
            setCiudad("");
            setFormaDePago("");
            setError("");

            toast.success(`Compra exitosa. Tu ID de pedido es: ${docRef.id}`, {
                position: "top-right",
                autoClose: 5000,
            });

        } catch (error) {
            console.error("Error al procesar la orden de compra", error);
            setError(error.message || "Se produjo un error al crear la orden");
            toast.error(error.message || "Se produjo un error al crear la orden", {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }

    return (
        <div>
            <h1>Checkout</h1>
            <h3>Resumen de compra:</h3>
            <form onSubmit={manejadorCheckOut} className='form-checkout'>
                {carrito.map(producto => (
                    <div className="div-prod-check1" key={producto.item.id}>
                        <img src={producto.item.img} alt="Imagen del producto" />
                        <h2>{producto.item.titulo}</h2>
                        <p>Precio por unidad: ${producto.item.precio}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Total: ${producto.item.precio * producto.cantidad}</p>
                    </div>
                ))}
                <div className='p-check'>
                    <h3>Completa tus datos y forma de pago para preparar el envío:</h3>
                </div>
                <div className='div-inputs'>

                    <div className='div-inputs-2'>
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            onChange={(e) => setNombre(e.target.value)}
                            value={nombre}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            id="apellido"
                            onChange={(e) => setApellido(e.target.value)}
                            value={apellido}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="text"
                            id="telefono"
                            onChange={(e) => setTelefono(e.target.value)}
                            value={telefono}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="emailConfirmacion">Confirmar E-mail</label>
                        <input
                            type="email"
                            id="emailConfirmacion"
                            onChange={(e) => setEmailConfirmacion(e.target.value)}
                            value={emailConfirmacion}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            onChange={(e) => setDireccion(e.target.value)}
                            value={direccion}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="altura">Altura</label>
                        <input
                            type="text"
                            id="altura"
                            onChange={(e) => setAltura(e.target.value)}
                            value={altura}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="dpto">Dpto - Piso</label>
                        <input
                            type="text"
                            id="dpto"
                            onChange={(e) => setDpto(e.target.value)}
                            value={dpto}
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="codigoPostal">Código Postal</label>
                        <input
                            type="text"
                            id="codigoPostal"
                            onChange={(e) => setCodigoPostal(e.target.value)}
                            value={codigoPostal}
                            required
                        />
                    </div>
                    <div className='div-inputs-2'>
                        <label htmlFor="ciudad">Ciudad</label>
                        <input
                            type="text"
                            id="ciudad"
                            onChange={(e) => setCiudad(e.target.value)}
                            value={ciudad}
                            required
                        />
                    </div>
                    <h2>Formas de Pago:</h2>
                    <div className='div-radios'>
                        <div className='radios'>
                            <label className='p-check' htmlFor="transferencia">Transferencia</label>
                            <input
                                type="radio"
                                id="transferencia"
                                name="formaDePago"
                                onChange={() => setFormaDePago("Transferencia")}
                                checked={formaDePago === "Transferencia"}
                                required
                            />
                        </div>
                        <div className='radios'>
                            <label className='p-check' htmlFor="tarjetaCredito">Tarjeta de Crédito</label>
                            <input
                                type="radio"
                                id="tarjetaCredito"
                                name="formaDePago"
                                onChange={() => setFormaDePago("Tarjeta de Crédito")}
                                checked={formaDePago === "Tarjeta de Crédito"}
                            />
                        </div>
                        <div className='radios'>
                            <label className='p-check' htmlFor="mercadoPago">Mercado Pago</label>
                            <input
                                type="radio"
                                id="mercadoPago"
                                name="formaDePago"
                                onChange={() => setFormaDePago("Mercado Pago")}
                                checked={formaDePago === "Mercado Pago"}
                            />
                        </div>
                    </div>

                </div>

                {
                    error && <p className="error">{error}</p>
                }
                <div className='botones-checkout2'>
                    <button type='submit'>Confirmar Compra</button>
                    <Link to='/Cart'><button type='button'>Volver atrás</button></Link>
                </div>


                {
                    ordenId && ordenData && (
                        <div className='div-orden'>
                            <img src="\img\logo mm7 fondo transparente.ico" alt="Logo MM7" />
                            <h2>¡Orden de compra exitosa!</h2>
                            <div>
                                <h3>Resumen del Pedido:</h3>

                                <p><strong>ID del Pedido:</strong> {ordenId}</p>
                                <p><strong>Nombre:</strong> {ordenData.nombre} <strong>Apellido:</strong> {ordenData.apellido}</p>
                                <p><strong>Teléfono:</strong> {ordenData.telefono} <strong>Email:</strong> {ordenData.email}</p>
                                <p><strong>Dirección:</strong> {ordenData.direccion} <strong>Dpto - Piso:</strong> {ordenData.dpto}</p>
                                <p><strong>Código Postal:</strong> {ordenData.codigoPostal} <strong>Ciudad:</strong> {ordenData.ciudad}</p>
                                <p><strong>Fecha:</strong> {ordenData.fecha} <strong>Forma de Pago:</strong> {ordenData.formaDePago}</p>
                                
                                <h3>Productos:</h3>
                                {ordenData.items.map(producto => (
                                    <div className="div-prod-check" key={producto.id}>
                                        <p>Producto: {producto.nombre}</p>
                                        <p>Precio por unidad: ${producto.precio}</p>
                                        <p>Cantidad: {producto.cantidad}</p>
                                        <p>Total: ${producto.precio * producto.cantidad}</p>
                                    </div>
                                ))}

                                <p><strong>Total Compra:</strong> ${ordenData.total}</p>
                            </div>
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default CheckOut;
