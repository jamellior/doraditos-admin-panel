import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // IMPORTANTE: Esto sí funciona aquí

export default function Menu() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: items, error } = await supabase.from('tu_tabla').select('*');
      if (items) setData(items);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Pollos Los Doraditos</h1>
      {data.map(item => <p key={item.id}>{item.nombre}</p>)}
    </div>
  );
}