const finalizarPedido = async () => {
  // 1. Guardar en Supabase
  const { error } = await supabase.from('pedidos_doraditos').insert([
    { 
      items: cart, // El contenido de tu carrito
      total: total,
      estado: 'pendiente'
    }
  ])

  if (error) {
    alert('Error al registrar el pedido, manao. Inténtalo de nuevo.')
    return
  }

  // 2. Armar el mensaje para WhatsApp
  const mensaje = `Hola, quiero este pedido: ${JSON.stringify(cart)}`
  const url = `https://wa.me/50688888888?text=${encodeURIComponent(mensaje)}`
  
  // 3. Abrir WhatsApp
  window.open(url, '_blank')
}