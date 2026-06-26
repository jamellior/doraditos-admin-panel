import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient' // Ajusta los ../ según tu ruta
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton, CSpinner } from '@coreui/react'

const Menu = () => {
  const [platos, setPlatos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('menu_doraditos').select('*')
    if (error) console.error('Error al cargar menú:', error)
    else setPlatos(data || [])
    setLoading(false)
  }

  if (loading) return <div className="text-center"><CSpinner /></div>

  return (
    <CRow>
      {platos.map((plato) => (
        <CCol xs={12} md={4} key={plato.id} className="mb-4">
          <CCard>
            <CCardBody>
              <CCardTitle>{plato.nombre}</CCardTitle>
              <CCardText>{plato.descripcion}</CCardText>
              <h4 className="text-primary">${plato.precio}</h4>
              <CButton color="success">Añadir al Carrito</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default Menu