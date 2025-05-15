import './CartWidget.css';
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from "../../context/CartContext";

function CartWidget() {
    const { totalQuantity } = useContext(CartContext);

    return (
        <Link to="/cart" className="cart-widget-link">
        <div className="cart-widget-container">
            <IoMdCart className="nav-cart" />
            {totalQuantity > 0 && (
            <span className="cart-widget-counter">{totalQuantity}</span>
            )}
        </div>
        </Link>
    );
    };

export default CartWidget;
