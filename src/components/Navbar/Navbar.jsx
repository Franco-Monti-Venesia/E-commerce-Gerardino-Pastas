import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import { CartContext } from '../../context/CartContext';
import logo from '../../assets/logoPastaPng.webp';  // tu logo original
import './Navbar.css';

function Navbar() {
    const { totalQuantity } = useContext(CartContext);

    return (
        <header>
        <nav className="nav">
            {/* Hamburguesa móvil */}
            <input type="checkbox" id="nav__check" className="nav__check" />
            <label htmlFor="nav__check" className="nav__checkbtn">
            &#9776;
            </label>

            {/* Logo siempre centrado */}
            <div className="nav__logo-container">
            <Link to="/">
                <img src={logo} alt="Logo" className="nav__logo" />
            </Link>
            </div>

            {/* Carrito */}
            <div className="nav__cart-container">
            <Link to="/cart" className="nav__cart-link">
                <IoMdCart className="nav__cart-icon" />
                {totalQuantity > 0 && (
                <span className="nav__cart-count">{totalQuantity}</span>
                )}
            </Link>
            </div>

            {/* Links de navegación */}
            <ul className="nav__ul">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categoria/Pastas">Pastas</Link></li>
            <li><Link to="/categoria/Bebida">Bebidas</Link></li>
            <li><Link to="/categoria/Agregados">Agregados</Link></li>
            </ul>
        </nav>
        </header>
    );
}

export default Navbar;
