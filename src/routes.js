import React from 'react'

// Lazy loading de tus componentes
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Agregar = React.lazy(() => import('./views/menu/Agregar'))
const Modificar = React.lazy(() => import('./views/menu/Modificar'))
const Pedidos = React.lazy(() => import('./views/pedidos/Pedidos'))

const routes = [
  { path: '/dashboard', name: 'Inicio', element: Dashboard },
  { path: '/menu/agregar', name: 'Agregar Artículo', element: Agregar },
  { path: '/menu/editar', name: 'Editar/Eliminar Artículo', element: Modificar },
  { path: '/pedidos', name: 'Gestión de Pedidos', element: Pedidos },
]

// Exportamos por defecto y también como nombre 'routes' para satisfacer a AppBreadcrumb
export { routes }
export default routes