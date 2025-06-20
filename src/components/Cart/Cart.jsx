// src/components/Cart/Cart.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.css"; // Asegurate de tener este archivo creado

const Cart = () => {
  const { cart, removeItem, clearCart } = useContext(CartContext);

  // Calcula el total usando la propiedad "precio" si existe o "price"
  const total = cart.reduce(
    (acc, item) => acc + ((item.precio || item.price) * item.quantity),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn-return">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.imageUrl} alt={item.nombre} />
            </div>
            <div className="cart-item-details">
              <h4>{item.nombre}</h4>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: ${item.precio}</p>
              <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total a pagar: ${total.toFixed(2)}</h3>
        <button onClick={clearCart} className="btn-clear">
          Vaciar carrito
        </button>
        <Link to="/checkout">
          <button className="btn-checkout">Finalizar compra</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
