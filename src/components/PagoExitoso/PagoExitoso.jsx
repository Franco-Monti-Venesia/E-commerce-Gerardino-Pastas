// src/components/PagoExitoso/PagoExitoso.jsx
import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './PagoExitoso.css';

function PagoExitoso() {
  const { cart, total, clearCart, buyerData } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const guardarOrden = async () => {
      if (cart.length === 0 || !buyerData) return;

      const order = {
        buyer: buyerData,
        items: cart,
        total,
        date: new Date().toISOString(),
        payment_status: 'approved', // simulación
      };

      try {
        await addDoc(collection(db, 'orders'), order);
        clearCart();
      } catch (err) {
        console.error('Error al guardar la orden:', err);
      }
    };

    guardarOrden();
  }, [cart, buyerData, total, clearCart]);

  return (
    <section className="pago-exitoso">
      <div className="pago-exitoso__caja">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pago fue procesado correctamente ✅</p>
        <p>En breve recibirás un email con los detalles del pedido.</p>
        <button className="pago-exitoso__volver" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </section>
  );
}

export default PagoExitoso;
