import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ItemDetail.css';
import ComboSugerido from '../ComboSugerido/ComboSugerido';

function ItemDetail({ producto }) {
    const { addItem } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate(); // ✅ NECESARIO PARA USAR navigate()

    const handleCantidadChange = (tipo) => {
        setCantidad((prev) => {
            if (tipo === 'incrementar') return prev + 1;
            if (tipo === 'decrementar' && prev > 1) return prev - 1;
            return prev;
        });
    };

    const handleAgregarAlCarrito = () => {
        addItem(producto, cantidad);
        toast.success(`${producto.nombre} agregado al carrito`);
    };

    return (
        <section className="detalle">
            <article className="detalle__carta">
                <img src={producto.imageUrl} alt={producto.nombre} className="detalle__imagen" />
                <div className="detalle__contenido">
                    <h2 className="detalle__titulo">{producto.nombre}</h2>
                    <p className="detalle__descripcion">{producto.descripcion}</p>
                    <p className="detalle__precio">${producto.precio}</p>

                    <div className="detalle__cantidad">
                        <button onClick={() => handleCantidadChange('decrementar')}>-</button>
                        <span>{cantidad}</span>
                        <button onClick={() => handleCantidadChange('incrementar')}>+</button>
                    </div>

                    <button className="detalle__boton" onClick={handleAgregarAlCarrito}>
                        Agregar al carrito
                    </button>
                    
                    <button
                        className="detalle__boton detalle__volver"
                        onClick={() => navigate(-1)}
                    >
                        Volver al listado
                    </button>
                </div>
            </article>
            <ComboSugerido />
        </section>
    );
}

export default ItemDetail;
