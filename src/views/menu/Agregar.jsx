import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow, CImage, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave } from '@coreui/icons'

const Agregar = () => {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '', imagen_url: '', categoria: '' })
  const [categorias, setCategorias] = useState([])
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data, error } = await supabase
        .from('menu_doraditos')
        .select('categoria')
        .not('categoria', 'is', null)
      
      if (!error && data) {
        const unique = [...new Set(data.map(item => item.categoria))]
        setCategorias(unique)
      }
    }
    fetchCategorias()
  }, [])

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      // Aquí se implementará la subida a Supabase Storage
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('menu_doraditos').insert([formData])
    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      alert('¡Plato guardado con éxito!')
      setFormData({ nombre: '', descripcion: '', precio: '', imagen_url: '', categoria: '' })
      setPreview(null)
    }
  }

  return (
    <CRow className="justify-content-center">
      <CCol xs={12} lg={8}>
        <CCard className="mb-4 border-top-primary border-top-3">
          <CCardHeader><strong>Agregar Nuevo Artículo</strong></CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormInput id="nombre" label="Nombre del Plato *" required onChange={handleInputChange} className="mb-3"/>
              
              <CFormSelect id="categoria" label="Categoría *" required onChange={handleInputChange} className="mb-3" value={formData.categoria}>
                <option value="">Selecciona una categoría...</option>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </CFormSelect>

              <CFormInput type="number" id="precio" label="Precio *" required onChange={handleInputChange} className="mb-3"/>
              <CFormTextarea id="descripcion" label="Descripción" onChange={handleInputChange} className="mb-3"/>
              
              <div className="mb-3">
                <CFormLabel htmlFor="imagen">Imagen del Plato</CFormLabel>
                <CFormInput type="file" id="imagen" accept="image/*" onChange={handleFileChange} />
                {preview && <CImage rounded thumbnail src={preview} width={200} className="mt-2" />}
              </div>

              <CButton color="primary" type="submit"><CIcon icon={cilSave} /> Guardar Artículo</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default Agregar