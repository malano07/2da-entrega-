import { useState, createContext, useEffect } from 'react';
import Swal from 'sweetalert2';

const carritoStorageRaw = JSON.parse(localStorage.getItem('carrito')) || [];
const carritoStorage = carritoStorageRaw.filter(prod => prod.item && prod.item.id);
const TotalStorage = JSON.parse(localStorage.getItem('total')) || 0;
const cantidadEnStorage = JSON.parse(localStorage.getItem('cantidad')) || 0;

export const CartContext = createContext({
  carrito: [],
  total: 0,
  cantidadTotal: 0
});

export const ProveedorCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoStorage);
  const [total, setTotal] = useState(TotalStorage);
  const [cantidadTotal, setCantidadTotal] = useState(cantidadEnStorage);

  console.log(carrito);

  const agregarAlCarrito = (item, cantidad) => {
    const existeProducto = carrito.find(prod => prod.item.id === item.id);

    const nuevoCarrito = existeProducto
      ? carrito.map(prod =>
          prod.item.id === item.id
            ? { ...prod, cantidad: prod.cantidad + cantidad }
            : prod
        )
      : [...carrito, { item, cantidad }];

    setCarrito(nuevoCarrito);
    setCantidadTotal(prev => prev + cantidad);
    setTotal(prev => prev + item.precio * cantidad);
  };

  const eliminarDelCarrito = (id, cantidadAEliminar) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "El producto será eliminado del carrito.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const productoEnCarrito = carrito.find(prod => prod.item.id === id);
  
        if (productoEnCarrito) {
          if (productoEnCarrito.cantidad <= cantidadAEliminar) {
            const nuevoCarrito = carrito.filter(prod => prod.item.id !== id);
            setCarrito(nuevoCarrito);
            setCantidadTotal(prev => prev - productoEnCarrito.cantidad);
            setTotal(prev => prev - productoEnCarrito.item.precio * productoEnCarrito.cantidad);
          } else {
            const nuevoCarrito = carrito.map(prod =>
              prod.item.id === id
                ? { ...prod, cantidad: prod.cantidad - cantidadAEliminar }
                : prod
            );
            setCarrito(nuevoCarrito);
            setCantidadTotal(prev => prev - cantidadAEliminar);
            setTotal(prev => prev - productoEnCarrito.item.precio * cantidadAEliminar);
          }
        }

        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado del carrito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const vaciarCarrito2 = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
      }
  

  const vaciarCarrito = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Vas a vaciar todo el carrito.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);

        Swal.fire({
          title: '¡Carrito vaciado!',
          text: 'El carrito ha sido vaciado correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', JSON.stringify(total));
    localStorage.setItem('cantidad', JSON.stringify(cantidadTotal));
  }, [carrito, total, cantidadTotal]);

  return (
    <CartContext.Provider value={{ carrito, total, cantidadTotal, agregarAlCarrito, vaciarCarrito, eliminarDelCarrito,vaciarCarrito2 }}>
      {children}
    </CartContext.Provider>
  );
};




