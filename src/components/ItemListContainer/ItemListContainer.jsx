// src/components/ItemListContainer/ItemListContainer.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Loader from '../Loader/Loader';
import { CartContext } from '../../context/CartContext';
import './ItemListContainer.css';

function ItemListContainer() {
    const [misProductos, setMisProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoria } = useParams();
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        const obtenerProductos = async () => {
        setLoading(true);
        try {
            const productosRef = collection(db, 'productos');
            const consulta = categoria
            ? query(productosRef, where('categoria', '==', categoria))
            : productosRef;
            const snapshot = await getDocs(consulta);
            const productosFirebase = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMisProductos(productosFirebase);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
        };
        obtenerProductos();
    }, [categoria]);

    return (
        <section className="productos">
        {loading ? (
            <Loader />
        ) : (
            misProductos.map(producto => (
            <article key={producto.id} className="productos__cartas">
                <Link to={`/detalle/${producto.id}`}>
                <img
                    src={producto.imageUrl}
                    alt={producto.nombre}
                    className="cartas__imagen"
                />
                <h3 className="productos__titulo">{producto.nombre}</h3>
                <p className="productos__subtitulo">${producto.precio}</p>
                </Link>
                <button
                className="cartas__boton"
                onClick={() => addItem(producto, 1)}
                >
                Agregar al carrito
                </button>
            </article>
            ))
        )}
        </section>
    );
}

export default ItemListContainer;