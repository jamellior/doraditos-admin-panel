import { supabase } from '../supabaseClient.js';

export const procesarPedido = async (carrito, total) => {
  // 1. Guardar en Supabase
  const { error } = await supabase.from('pedidos_doraditos').insert([
    { 
      items: carrito, 
      total: total,
      estado: 'pendiente'
    }
  ]);

  if (error) {
    console.error('Error Supabase:', error);
    alert('Error al registrar el pedido. Inténtalo de nuevo.');
    return;
  }

  // 2. Armar el mensaje para WhatsApp (formato más limpio)
  const listaItems = carrito.map(i => `• ${i.nombre} (₡${i.precio})`).join('%0A');
  const mensaje = `¡Hola! Quiero hacer un pedido:%0A%0A${listaItems}%0A%0A*Total a pagar: ₡${total}*`;
  const url = `https://wa.me/50660861586?text=${mensaje}`;
  
  // 3. Abrir WhatsApp
  window.open(url, '_blank');
};