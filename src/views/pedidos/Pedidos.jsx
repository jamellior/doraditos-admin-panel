import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
  CBadge, CButton // 1. Importamos CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react' // 2. Importamos CIcon
import { cilCheckCircle } from '@coreui/icons' // 3. Importamos el icono de check

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    fetchPedidos()
  }, [])

  const fetchPedidos = async () => {
    const { data, error } = await supabase
      .from('pedidos_doraditos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error al traer pedidos:', error)
    else setPedidos(data || [])
  }

  // 4. Nueva función para actualizar el estado
  const marcarCompletado = async (id) => {
    const { error } = await supabase
      .from('pedidos_doraditos')
      .update({ estado: 'completado' })
      .eq('id', id)

    if (error) {
      alert('Error al actualizar: ' + error.message)
    } else {
      fetchPedidos() // Refrescamos la tabla
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader><strong>Pedidos Recibidos</strong></CCardHeader>
          <CCardBody>
            <CTable hover responsive align="middle">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Detalle</CTableHeaderCell>
                  <CTableHeaderCell>Total</CTableHeaderCell>
                  <CTableHeaderCell>Estado</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell> {/* Nueva columna */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pedidos.map((pedido) => (
                  <CTableRow key={pedido.id}>
                    <CTableDataCell>{new Date(pedido.created_at).toLocaleString()}</CTableDataCell>
                    <CTableDataCell>
                      <ul className="list-unstyled mb-0">
                        {Array.isArray(pedido.items) ? pedido.items.map((i, idx) => (
                          <li key={idx}>• {i.nombre}</li>
                        )) : 'Sin detalles'}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell><strong>₡{pedido.total}</strong></CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={pedido.estado === 'pendiente' ? 'warning' : 'success'}>
                        {pedido.estado.toUpperCase()}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      {/* 5. El botón solo aparece si el pedido está pendiente */}
                      {pedido.estado === 'pendiente' && (
                        <CButton 
                          color="success" 
                          size="sm" 
                          onClick={() => marcarCompletado(pedido.id)}
                          title="Marcar como completado"
                        >
                          <CIcon icon={cilCheckCircle} />
                        </CButton>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Pedidos