import React, { useState, useEffect } from 'react'
import { supabase } from '/src/supabaseClient.js' // Ruta absoluta desde la raíz
import { 
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, 
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CModal, 
  CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormInput, 
  CFormTextarea, CFormLabel, CImage, CFormSelect 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'

const Modificar = () => {
  const [items, setItems] = useState([])
  const [categorias, setCategorias] = useState([])
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState({})
  const [preview, setPreview] = useState(null)

  useEffect(() => { 
    fetchItems()
    fetchCategorias()
  }, [])

  const fetchItems = async () => {
    const { data } = await supabase.from('menu_doraditos').select('*')
    setItems(data || [])
  }

  const fetchCategorias = async () => {
    // Obtenemos categorías únicas de la base de datos
    const { data } = await supabase.from('menu_doraditos').select('categoria').not('categoria', 'is', null)
    if (data) {
      const unique = [...new Set(data.map(item => item.categoria))]
      setCategorias(unique)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro de eliminar este artículo?')) {
      await supabase.from('menu_doraditos').delete().eq('id', id)
      fetchItems()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      // Aquí mantienes tu lógica de subida intacta
    }
  }

  const handleUpdate = async () => {
    await supabase.from('menu_doraditos').update(current).eq('id', current.id)
    setVisible(false)
    fetchItems()
    fetchCategorias() // Actualizamos categorías por si el usuario agregó una nueva
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader><strong>Gestión de Inventario</strong></CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Categoría</CTableHeaderCell>
                  <CTableHeaderCell>Precio</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {items.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.nombre}</CTableDataCell>
                    <CTableDataCell>{item.categoria || 'Sin categoría'}</CTableDataCell>
                    <CTableDataCell>₡{item.precio}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" onClick={() => { setCurrent(item); setPreview(item.imagen_url); setVisible(true); }}><CIcon icon={cilPencil} /></CButton>
                      <CButton color="danger" className="ms-2" onClick={() => handleDelete(item.id)}><CIcon icon={cilTrash} /></CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal Edición */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader><CModalTitle>Editar Artículo</CModalTitle></CModalHeader>
        <CModalBody>
          <CFormLabel>Nombre</CFormLabel>
          <CFormInput value={current.nombre || ''} onChange={e => setCurrent({...current, nombre: e.target.value})} className="mb-3"/>
          
          <CFormLabel>Categoría</CFormLabel>
          <CFormSelect value={current.categoria || ''} onChange={e => setCurrent({...current, categoria: e.target.value})} className="mb-3">
            <option value="">Selecciona una categoría...</option>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </CFormSelect>

          <CFormLabel>Precio</CFormLabel>
          <CFormInput type="number" value={current.precio || ''} onChange={e => setCurrent({...current, precio: e.target.value})} className="mb-3"/>
          
          <CFormLabel>Descripción</CFormLabel>
          <CFormTextarea value={current.descripcion || ''} onChange={e => setCurrent({...current, descripcion: e.target.value})} className="mb-3"/>
          
          <CFormLabel>Actualizar Imagen</CFormLabel>
          <CFormInput type="file" accept="image/*" onChange={handleFileChange} className="mb-3"/>
          {preview && <CImage rounded thumbnail src={preview} width={150} className="mb-3" />}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={handleUpdate}>Guardar Cambios</CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}
export default Modificar