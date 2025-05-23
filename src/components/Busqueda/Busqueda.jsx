import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './Busqueda.css';

function Busqueda() {
    const { termino } = useParams();
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerResultados = async () => {
        setLoading(true);
        try {
            const productosRef = collection(db, 'productos');
            const snapshot = await getDocs(productosRef);
            const productos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            const filtrados = productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(termino.toLowerCase())
            );

            setResultados(filtrados);
        } catch (error) {
            console.error('Error al buscar productos:', error);
        } finally {
            setLoading(false);
        }
        };

        obtenerResultados();
    }, [termino]);

    return (
        <div className="busqueda-container">
        <h2 className="busqueda-titulo">Resultados para: "{termino}"</h2>

        {loading ? (
            <p className="busqueda-cargando">Cargando productos...</p>
        ) : resultados.length > 0 ? (
            <section className="productos">
            {resultados.map((producto) => (
                <article key={producto.id} className="productos__cartas">
                <img
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    className="cartas__imagen"
                />
                <h3 className="productos__titulo">{producto.nombre}</h3>
                <p className="productos__subtitulo">${producto.precio}</p>
                <button
                    className="cartas__boton"
                    onClick={() => navigate(`/detalle/${producto.id}`)}
                >
                    COMPRAR
                </button>
                </article>
            ))}
            </section>
        ) : (
            <p className="busqueda-sin">No se encontraron productos.</p>
        )}
        </div>
    );
}

export default Busqueda;
