import React, { Suspense, useState } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'

import Login from './views/pages/login/Login'
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'))

  return (
    <HashRouter>
      <Suspense fallback={<div className="pt-3 text-center"><CSpinner color="primary" variant="grow" /></div>}>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="*" 
            element={isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
export default App