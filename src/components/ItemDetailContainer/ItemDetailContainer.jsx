import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';

function ItemDetailContainer() {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const docRef = doc(db, 'productos', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                setProducto({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error('Error obteniendo el producto:', error);
            } finally {
                setLoading(false);
            }
        };

    fetchProducto();
    }, [id]);

    return loading ? <Loader /> : <ItemDetail producto={producto} />;
}

export default ItemDetailContainer;
