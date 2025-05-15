import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    return (
    <div className="product-card">
        {/* La imagen se muestra arriba y al hacer click redirige al detalle del producto */}
        <Link to={`/detalle/${product.id}`}>
            <img
            className="product-card__image"
            src={product.image} // Asegurate de que en tu objeto product exista esta propiedad.
            alt={product.nombre || product.title || "Producto"}
            />
        </Link>
        {/* El nombre del producto */}
        <h3 className="product-card__name">
            {product.nombre || product.title || "Nombre del Producto"}
        </h3>
        {/* Precio del producto (opcional) */}
        <p className="product-card__price">
            ${product.precio || product.price || "0"}
        </p>
        </div>
    );
};

export default ProductCard;
