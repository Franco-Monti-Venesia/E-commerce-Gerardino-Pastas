// src/components/ComboSugerido/ComboSugerido.jsx
import React from 'react';
import './ComboSugerido.css';
import { useNavigate, useParams } from 'react-router-dom';

const combos = [
  {
    id: 7,
    nombre: 'Combo Tallarines',
    productos: [
      '2 x Tallarines',
      '1 x Crema',
      '1 x Salsa',
      '2 x Gaseosas',
    ],
    precio: 17500,
    imagen: 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1748059459/ChatGPT_Image_23_may_2025_09_28_38_p.m._b323ex.png'
  },
  {
    id: 8,
    nombre: 'Combo Ravioles',
    productos: [
      '2 x Ravioles',
      '1 x Crema',
      '1 x Salsa',
      '2 x Gaseosas',
    ],
    precio: 25500,
    imagen: 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1748059993/ChatGPT_Image_23_may_2025_09_31_13_p.m._doqm55.png'
  },
  {
    id: 9,
    nombre: 'Combo Ñoquis',
    productos: [
      '2 x Ñoquis',
      '1 x Crema',
      '1 x Salsa',
      '2 x Gaseosas',
    ],
    precio: 18000,
    imagen: 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1748060049/ChatGPT_Image_23_may_2025_09_43_38_p.m._soaqtj.png'
  },
];

const ComboSugerido = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 obtenemos el id del combo actual

  const combosFiltrados = combos.filter(combo => combo.id !== parseInt(id));

  return (
    <section className="combo">
      <h2 className="combo__titulo">Opciones de combos</h2>
      <div className="combo__contenedor">
        {combosFiltrados.map((combo) => (
          <div key={combo.id} className="combo__card">
            <img src={combo.imagen} alt={combo.nombre} className="combo__imagen" />
            <h3>{combo.nombre}</h3>
            <ul>
              {combo.productos.map((p, index) => (
                <li key={index}>{p}</li>
              ))}
            </ul>
            <p className="combo__precio">Total: ${combo.precio}</p>
            <button
              className="combo__boton"
              onClick={() => navigate(`/detalle/${combo.id}`)}
            >
              COMPRAR
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComboSugerido;
