// src/context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agrega un producto al carrito
    const addItem = (item, quantity) => {
        const exists = cart.find(prod => prod.id === item.id);
        if (exists) {
            setCart(cart.map(prod =>
                prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
            ));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    // Remueve un producto del carrito
    const removeItem = (id) => {
        setCart(cart.filter(prod => prod.id !== id));
    };

    // Vacía el carrito
    const clearCart = () => {
        setCart([]);
    };

    // Calcula la cantidad total de productos
    const totalQuantity = cart.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

    // Calcula el precio total de la compra usando la propiedad 'precio'
    const total = cart.reduce((acc, item) => {
        const price = typeof item.precio === 'number' ? item.precio : Number(item.precio);
        const qty = typeof item.quantity === 'number' ? item.quantity : Number(item.quantity);
        return acc + price * qty;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addItem,
                removeItem,
                clearCart,
                totalQuantity,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
