// src/components/Navbar/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import { CartContext } from '../../context/CartContext';
import logo from '../../assets/logoPastaPng.webp';
import './Navbar.css';

function Navbar() {
    const { totalQuantity } = useContext(CartContext);
    const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (busqueda.trim() !== '') {
            navigate(`/buscar/${busqueda.toLowerCase()}`);
            setBusqueda('');
            const checkbox = document.getElementById('nav__check');
            if (checkbox) checkbox.checked = false;
        }
    };

    return (
        <header>
            <nav className="nav">
                <input type="checkbox" id="nav__check" className="nav__check" />
                <label htmlFor="nav__check" className="nav__checkbtn">
                    &#9776;
                </label>

                <div className="nav__logo-container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="nav__logo" />
                    </Link>
                </div>

                <ul className="nav__ul">
                    <li className="nav__search-mobile">
                        <form onSubmit={handleSearch} className="nav__search-form">
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="nav__search-input"
                            />
                        </form>
                    </li>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/categoria/Pastas">Pastas</Link></li>
                    <li><Link to="/categoria/Bebida">Bebidas</Link></li>
                    <li><Link to="/categoria/Agregados">Agregados</Link></li>
                    <li><Link to="/categoria/Combo">Combos</Link></li>
                </ul>

                {/* Carrito antes que el buscador */}
                <div className="nav__cart-container">
                    <Link to="/cart" className="nav__cart-link">
                        <IoMdCart className="nav__cart-icon" />
                        {totalQuantity > 0 && (
                            <span className="nav__cart-count">{totalQuantity}</span>
                        )}
                    </Link>
                </div>

                {/* Buscador a la derecha del carrito */}
                <form onSubmit={handleSearch} className="nav__search-desktop">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="nav__search-input"
                    />
                </form>
            </nav>
        </header>
    );
}

export default Navbar;
