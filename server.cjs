const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mercadopago.configure({
  access_token: 'APP_USR-36372447-869b-4688-9813-5252710a150b',
});

app.post('/api/crear-preferencia', async (req, res) => {
  console.log('📦 Recibida solicitud de preferencia desde frontend');

  const { carrito, comprador } = req.body;

  console.log('🛒 Carrito:', carrito);
  console.log('👤 Comprador:', comprador);

  const items = carrito.map(item => ({
    title: item.nombre,
    unit_price: Number(item.precio),
    quantity: Number(item.quantity),
    currency_id: 'ARS'
  }));

  console.log('🔎 Items:', items);

  try {
    const preference = await mercadopago.preferences.create({
      items,
      payer: {
        name: comprador.nombre,
        email: comprador.email,
        phone: {
          number: Number(comprador.telefono),
        },
        address: {
          street_name: comprador.direccion || "Sin dirección",
        },
      },
      back_urls: {
        success: "http://localhost:5173/pago-exitoso",
        failure: "http://localhost:5173/pago-error",
        pending: "http://localhost:5173/pago-error",
      },
      auto_return: "approved", // 👈 Esto debe estar después de back_urls
    });


    console.log('✅ Preferencia creada:', preference.body.id);
    return res.status(200).json({ id: preference.body.id });
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error.message);
    return res.status(500).json({ message: 'Error al crear preferencia' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
