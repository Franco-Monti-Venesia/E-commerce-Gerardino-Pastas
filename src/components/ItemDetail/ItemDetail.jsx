import './ItemDetail.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Contador from '../Contador/Contador';
import { CartContext } from '../../context/CartContext';
import Notification from '../Notification/Notification';

function ItemDetail({ detalle }) {
    const [selectedCount, setSelectedCount] = useState(1);
    const [showNotification, setShowNotification] = useState(false);
    const { addItem } = useContext(CartContext);

    const handleCountChange = (newCount) => setSelectedCount(newCount);

    const agregarAlCarrito = () => {
        addItem(detalle, selectedCount);
        setShowNotification(true);
    };

    return (
        <div className="card-detail">
            <h2>{detalle.nombre || "NO DISPONIBLE"}</h2>
            <h3>Precio: ${detalle.precio || "SIN PRECIO"}</h3>
            <p>Descripción: {detalle.descripcion}</p>
            {detalle.stock > 0 ? (
                <p>Quedan {detalle.stock} unidades</p>
            ) : (
                <p>Producto agotado!</p>
            )}
            {detalle.oferta && <p><b>PRODUCTO EN OFERTA</b></p>}

            <Contador initial={1} stock={detalle.stock} onCountChange={handleCountChange} />
            <button 
                disabled={detalle.stock === 0} 
                className="card-detail-btn" 
                onClick={agregarAlCarrito}
            >
                Agregar al carrito
            </button>
            <Link to="/">
                <button className="card-detail-btn">Volver al inicio</button>
            </Link>

            {showNotification && (
                <Notification 
                    message="Producto agregado al carrito" 
                    onClose={() => setShowNotification(false)} 
                />
            )}
        </div>
    );
}

export default ItemDetail;