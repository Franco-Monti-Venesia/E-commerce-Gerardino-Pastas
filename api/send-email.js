// /api/send-email.js (versión para Vercel Serverless Functions)

const nodemailer = require('nodemailer');

const logoUrl = 'https://res.cloudinary.com/dkm4b6ejr/image/upload/v1749165743/logopasta_j7pwih.jpg';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nombre, email, carrito, orderId, total } = req.body;

  try {
    const itemsHtml = carrito.map(item => `
      <tr>
        <td><img src="${item.imageUrl}" alt="${item.nombre}" style="width: 80px;" /></td>
        <td>${item.nombre}</td>
        <td>${item.quantity}</td>
        <td>$${item.precio}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif;">
        <img src="${logoUrl}" alt="Logo Gerardino" style="width: 150px;" />
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

        <h3>Total a pagar: <strong>$${total}</strong></h3>
      </div>
    `;

    await transporter.sendMail({
      from: `Gerardino Pastas <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Detalles de tu compra - Gerardino Pastas',
      html: htmlContent
    });

    console.log('✅ Email enviado con éxito a', email);
    res.status(200).json({ message: 'Email enviado correctamente' });

  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    res.status(500).json({ message: 'Error al enviar email' });
  }
};
