// src/components/PagoError/PagoError.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PagoError.css';

function PagoError() {
  const navigate = useNavigate();

  return (
    <section className="pago-error">
      <div className="pago-error__caja">
        <h2>¡Ups! Algo salió mal ❌</h2>
        <p>No pudimos procesar tu pago correctamente.</p>
        <p>Podés intentar nuevamente o volver a la tienda.</p>
        <button className="pago-error__volver" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </section>
  );
}

export default PagoError;
