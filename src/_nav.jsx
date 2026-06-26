import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilFastfood, cilCart } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Inicio', // Nombre corregido
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administración Los Pollos Doraditos',
  },
  {
    component: CNavGroup,
    name: 'Gestión de Menú',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Agregar Artículo',
        to: '/menu/agregar',
      },
      {
        component: CNavItem,
        name: 'Editar/Eliminar Artículo',
        to: '/menu/editar',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Gestión de Pedidos',
    to: '/pedidos',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
]

export default _nav