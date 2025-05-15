import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
        <p className="footer__parrafo">
            ©2024 PASTA | Desarrollado por Franco Venesia | Todos los derechos reservados.
        </p>
        <p className="footer__parrafo">
            Dirección: Av. San Martín 1002, Cruz Alta, Córdoba, Argentina
        </p>
        <p className="footer__parrafo">
            Correo Electrónico: <a className="footer__correo" href="mailto:contacto@empresa.com">contacto@empresa.com</a>
        </p>
        <p className="footer__parrafo">Teléfono: 402731</p>
        </footer>
    );
};

export default Footer;
