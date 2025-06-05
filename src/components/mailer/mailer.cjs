const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const enviarEmailCompra = async ({ nombre, email, carrito, orderId }) => {
  const itemsHtml = carrito.map(item => `
    <tr>
      <td><img src="${item.imageUrl}" width="80"/></td>
      <td>${item.nombre}</td>
      <td>${item.quantity}</td>
      <td>$${item.precio}</td>
    </tr>
  `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif;">
      <img src="https://i.ibb.co/qDHTp4n/logo-gerardino.png" alt="Logo" style="width: 150px;" />
      <h2>¡Hola ${nombre}, gracias por tu compra!</h2>
      <p><strong>Orden #${orderId}</strong></p>
      <p><strong>Medio de pago:</strong> Mercado Pago</p>

      <h3>Datos para el pago:</h3>
      <ul>
        <li><strong>Titular:</strong> Franco Monti Venesia</li>
        <li><strong>CVU:</strong> 0000003100005434479693</li>
        <li><strong>Alias:</strong> franco.venesia</li>
        <li><strong>CUIT/CUIL:</strong> 23463069069</li>
        <li><strong>Banco:</strong> Mercado Pago</li>
      </ul>

      <p>📲 Una vez efectuado el pago, por favor enviá el comprobante vía WhatsApp al 03467440655.</p>

      <h3>🧾 Detalle de la orden:</h3>
      <table border="1" cellspacing="0" cellpadding="10">
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
        ${itemsHtml}
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: `Gerardino Pastas <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Detalles de tu compra - Gerardino Pastas',
    html: htmlContent
  });
};

module.exports = { enviarEmailCompra };
