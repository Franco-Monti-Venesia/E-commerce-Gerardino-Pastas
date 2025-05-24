import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './ComboDetail.css';

const combos = {
  'combo-tallarines': {
    id: 'combo-tallarines',
    nombre: 'Combo Tallarines',
    descripcion: '2 x Tallarines, 1 x Crema, 1 x Salsa, 2 x Gaseosas',
    precio: 17500,
    imageUrl: 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1748059459/ChatGPT_Image_23_may_2025_09_28_38_p.m._b323ex.png',
  },
  'combo-ravioles': {
    id: 'combo-ravioles',
    nombre: 'Combo Ravioles',
    descripcion: '2 x Ravioles, 1 x Crema, 1 x Salsa, 2 x Gaseosas',
    precio: 25500,
    imageUrl: 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1748059993/ChatGPT_Image_23_may_2025_09_31_13_p.m._doqm55.png',
  },
  'combo-noquis': {
    id: 'combo-noquis',
    nombre: 'Combo Ñoquis',
    descripcion: '2 x Ñoquis, 1 x Crema, 1 x Salsa, 2 x Gaseosas',
    precio: 18000,
    imageUrl: 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1748060049/ChatGPT_Image_23_may_2025_09_43_38_p.m._soaqtj.png',
  },
};

function ComboDetail() {
  const { comboId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const combo = combos[comboId];

  if (!combo) return <p>Combo no encontrado</p>;

  const handleAgregarAlCarrito = () => {
    addItem(combo, cantidad);
    toast.success(`${combo.nombre} agregado al carrito`);
  };

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
        <img src={combo.imageUrl} alt={combo.nombre} className="detalle__imagen" />
        <div className="detalle__contenido">
          <h2 className="detalle__titulo">{combo.nombre}</h2>
          <p className="detalle__descripcion">{combo.descripcion}</p>
          <p className="detalle__precio">${combo.precio}</p>

          <div className="detalle__cantidad">
            <button onClick={() => handleCantidadChange('decrementar')}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => handleCantidadChange('incrementar')}>+</button>
          </div>

          <button className="detalle__boton" onClick={handleAgregarAlCarrito}>
            Agregar al carrito
          </button>

          <button className="detalle__boton detalle__volver" onClick={() => navigate(-1)}>
            Volver al listado
          </button>
        </div>
      </article>
    </section>
  );
}

export default ComboDetail;
