// src/components/ItemDetailContainer/ItemDetailContainer.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ItemDetail from '../ItemDetail/ItemDetail';
import Loader from '../Loader/Loader';

function ItemDetailContainer() {
    const { id } = useParams();
    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setDetalle({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.error("No se encontró el producto");
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerProducto();
    }, [id]);

    return loading ? <Loader /> : <ItemDetail detalle={detalle} />;
}

export default ItemDetailContainer;
