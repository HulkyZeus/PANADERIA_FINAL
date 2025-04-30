// src/context/CarritoContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CarritoContext = createContext();

// Función para cargar el carrito desde localStorage de forma segura
const loadCartFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("carrito");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Error al cargar carrito desde localStorage:", err);
    return [];
  }
};

// Función para guardar el carrito en localStorage de forma segura
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("carrito", JSON.stringify(cart));
  } catch (err) {
    console.error("Error al guardar carrito en localStorage:", err);
  }
};

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  // Inicializa el carrito leyendo lo que haya en localStorage
  const [carrito, setCarrito] = useState(() => loadCartFromLocalStorage());

  // Cada vez que cambie el carrito, lo guardamos en localStorage
  useEffect(() => {
    saveCartToLocalStorage(carrito);
  }, [carrito]);

  // Función para agregar un producto
  const agregarProducto = (producto) => {
    const productoExistente = carrito.find(
      (item) =>
        item.Producto === producto.Producto && item.Tamaño === producto.Tamaño
    );

    let nuevoCarrito;
    if (productoExistente) {
      nuevoCarrito = carrito.map((item) =>
        item.Producto === producto.Producto && item.Tamaño === producto.Tamaño
          ? {
              ...item,
              Cantidad: item.Cantidad + producto.Cantidad,
              Subtotal: (item.Cantidad + producto.Cantidad) * item.Precio,
            }
          : item
      );
    } else {
      nuevoCarrito = [
        ...carrito,
        {
          ...producto,
          Subtotal: producto.Cantidad * producto.Precio,
        },
      ];
    }

    setCarrito(nuevoCarrito);
  };

  // Función para vaciar el carrito (y borrar de localStorage)
  const vaciarCarrito = () => {
    setCarrito([]);
    try {
      localStorage.removeItem("carrito");
    } catch (err) {
      console.error("Error al eliminar carrito de localStorage:", err);
    }
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, agregarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
