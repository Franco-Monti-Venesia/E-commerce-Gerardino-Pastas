// src/components/Checkout/Checkout.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import axios from 'axios';

function Checkout() {
  const { cart, total } = useContext(CartContext);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('conectando con backend');

    try {
      const response = await axios.post('http://localhost:4000/api/crear-preferencia', {
        carrito: cart,
        comprador: formData
      });

      console.log('respuesta recibida:', response.data);

      const preferenceId = response.data.id;

      if (preferenceId) {
        // ✅ Redirección al sandbox de Mercado Pago
        window.location.href = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
      } else {
        console.error('No se recibió un preferenceId');
        navigate('/pago-error');
      }
    } catch (error) {
      console.error('❌ Error al crear preferencia:', error.message);
      navigate('/pago-error');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Nombre
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>Email
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>Teléfono
          <input
            type="tel"
            name="telefono"
            placeholder="Número de celular"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </label>
        <label>Dirección
          <input
            type="text"
            name="direccion"
            placeholder="Calle y número"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Pagar con Mercado Pago</button>
      </form>
    </div>
  );
}

export default Checkout;
