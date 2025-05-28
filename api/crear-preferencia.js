// api/crear-preferencia.js
import mercadopago from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  mercadopago.configure({
    access_token: 'TEST-9368175a-82a0-4b43-9218-32805dd8f967' // ✅ Token de test vendedor
  });

  const { carrito, comprador } = req.body;

  console.log('👉 Carrito recibido:', carrito);
  console.log('👉 Comprador recibido:', comprador);

  const items = carrito.map(item => ({
    title: item.nombre || item.title || 'Producto sin nombre',
    unit_price: Number(item.precio || item.price) || 0,
    quantity: item.quantity || 1,
    currency_id: 'ARS'
  }));

  try {
    const preference = await mercadopago.preferences.create({
      items,
      payer: {
        name: comprador.nombre,
        email: comprador.email,
        phone: {
          area_code: '11',
          number: comprador.telefono
        },
        address: {
          street_name: comprador.direccion,
          street_number: 1,
          zip_code: '0000'
        }
      },
      back_urls: {
        success: 'http://localhost:5173/pago-exitoso',
        failure: 'http://localhost:5173/pago-error',
        pending: 'http://localhost:5173/pago-error'
      },
      auto_return: 'approved'
    });

    console.log('✅ Preferencia creada con ID:', preference.body.id);
    return res.status(200).json({ id: preference.body.id });
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error.message);
    return res.status(500).json({ message: 'Error al crear preferencia', error });
  }
}
