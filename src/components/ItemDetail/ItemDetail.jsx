import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import './ItemDetail.css';

function ItemDetail({ producto }) {
    const { addItem } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(1);

    const handleCantidadChange = (tipo) => {
        setCantidad((prev) => {
        if (tipo === 'incrementar') return prev + 1;
        if (tipo === 'decrementar' && prev > 1) return prev - 1;
        return prev;
        });
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

            <button
                className="detalle__boton"
                onClick={() => addItem(producto, cantidad)}
            >
                Agregar al carrito
            </button>
            </div>
        </article>
        </section>
    );
}

export default ItemDetail;
