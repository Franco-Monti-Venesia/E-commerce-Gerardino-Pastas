import React, { useState, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
    const { cart, total, clearCart } = useContext(CartContext);
    const [orderId, setOrderId] = useState('');
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

        const order = {
        buyer: formData,
        items: cart,
        total,
        date: new Date().toISOString()
        };

        try {
        const docRef = await addDoc(collection(db, "orders"), order);
        setOrderId(docRef.id);
        clearCart();
        } catch (error) {
        console.error("Error al generar la orden:", error);
        }
    };

    const handleVolverInicio = () => {
        navigate('/');
    };

    if (orderId) {
        return (
        <div className="checkout-success">
            <h2>¡Gracias por tu compra, {formData.nombre}!</h2>
            <p>Tu orden fue registrada exitosamente. 😄</p>
            <p><strong>Código de seguimiento:</strong> <span>{orderId}</span></p>
            <p>Te enviaremos un email a <strong>{formData.email}</strong> con los detalles.</p>
            <button onClick={handleVolverInicio} className="volver-btn">
            Volver al inicio
            </button>
        </div>
        );
    }

    return (
        <div className="checkout-container">
        <h2>Finalizar Compra</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
            <label> Nombre
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
            <button type="submit">Confirmar compra</button>
        </form>
        </div>
    );
}

export default Checkout;
