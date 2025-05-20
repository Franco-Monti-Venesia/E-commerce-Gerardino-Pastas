// src/components/ItemDetailContainer/ItemDetailContainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Loader from '../Loader/Loader';
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const productosRef = collection(db, 'productos');
        const q = query(productosRef, where('id', '==', parseInt(id)));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No se encontró el producto');
          setProducto(null);
        }
      } catch (error) {
        console.error('Error al obtener producto:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (loading) return <Loader />;
  if (!producto) return <p>No se encontró el producto.</p>;

  return <ItemDetail producto={producto} />;
}

export default ItemDetailContainer;
