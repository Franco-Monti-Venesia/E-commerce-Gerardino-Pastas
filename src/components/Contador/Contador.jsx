import React, { useState } from 'react';
import './Contador.css';

const Contador = ({ initial, stock, onCountChange }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount);
    } else {
      alert("Stock máximo alcanzado");
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <div className="contador">
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default Contador;
