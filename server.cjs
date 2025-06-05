const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { enviarEmailCompra } = require('./src/components/mailer/mailer.cjs');

dotenv.config();
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/enviar-email', async (req, res) => {
  const { nombre, email, carrito, orderId, total } = req.body;

  try {
    console.log('📧 Enviando email a:', email);
    await enviarEmailCompra({ nombre, email, carrito, orderId, total });
    console.log('✅ Email enviado con éxito');
    res.status(200).json({ message: 'Email enviado con éxito' });
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    res.status(500).json({ message: 'Error al enviar email' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
