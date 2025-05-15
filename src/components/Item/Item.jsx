import { Link } from 'react-router-dom';
import './Item.css';

function Item({ id, nombre, precio, imageUrl }) {

    function agregarAlCarrito() {
        console.log("Vas a agregar:", nombre);
    };

    return (
        <div className="card">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={nombre}
                    className="imagen-producto"
                />
            )}
            <h2>{nombre || "NO HAY STOCK"}</h2>
            <h3>Precio: ${precio || "SIN PRECIO"}</h3>
            <Link to={`/detalle/${id}`}>
                <button disabled={!nombre} className="card-btn">
                    Ver detalle
                </button>
            </Link>
        </div>
    );
};

export default Item;