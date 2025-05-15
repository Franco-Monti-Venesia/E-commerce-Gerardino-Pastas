import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose();
        }, 3000); // Se cierra después de 3 segundos

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="notification">
            {message}
        </div>
    );
};

export default Notification;
