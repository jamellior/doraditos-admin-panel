// Importa tu cliente de Supabase (asumiendo que está en la raíz del proyecto)
import { supabase } from '../../src/supabaseClient.js';
import { procesarPedido } from '../../src/utils/api_whatsapp.js';

let carrito = [];

// 1. Cargar el menú dinámicamente desde Supabase
async function cargarMenu() {
    const { data } = await supabase.from('menu_doraditos').select('*');
    const contenedor = document.getElementById('menu-container'); // ID en tu HTML
    
    contenedor.innerHTML = data.map(plato => `
        <div class="plato-card">
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>
            <span>$${plato.precio}</span>
            <button onclick="agregarAlCarrito(${JSON.stringify(plato).replace(/"/g, '&quot;')})">
                Añadir al pedido
            </button>
        </div>
    `).join('');
}

// 2. Lógica simple de carrito
window.agregarAlCarrito = (plato) => {
    carrito.push(plato);
    alert(`${plato.nombre} añadido al pedido`);
};

// 3. Finalizar Pedido (Conexión con api_whatsapp.js)
window.finalizarPedido = async () => {
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    await procesarPedido(carrito, total);
};