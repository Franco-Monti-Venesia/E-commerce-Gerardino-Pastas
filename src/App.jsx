import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext.jsx';
import Cart from "./components/Cart/Cart.jsx";
import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from "./components/Navbar/Navbar";
import ItemDetail from './components/ItemDetail/ItemDetail';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import NotFound from './components/NotFound/NotFound';
import Checkout from './components/Checkout/Checkout.jsx';
import Footer from './components/Footer/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import Busqueda from './components/Busqueda/Busqueda';
import 'react-toastify/dist/ReactToastify.css';
import ComboDetail from './components/ComboDetail/ComboDetail';
import PagoExitoso from './components/PagoExitoso/PagoExitoso';
import PagoError from './components/PagoError/PagoError';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        toastClassName="toast-custom"
        bodyClassName="toast-body"
      />
      <CartProvider>
        <div className="app-wrapper">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/categoria/:categoria" element={<ItemListContainer />} />
              <Route path="/detalle/:id" element={<ItemDetailContainer />} />
              <Route path="/combo/:comboId" element={<ComboDetail />} />
              <Route path="/buscar/:termino" element={<Busqueda />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/pago-exitoso" element={<PagoExitoso />} />
              <Route path="/pago-error" element={<PagoError />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
