import React from 'react'
import { CFooter, CImage } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4 d-flex align-items-center justify-content-between">
      {/* Espacio para tu imagen/logo */}
      <div>
        <CImage 
          src="frontend/images/mymenuqrlogo.png" 
          height={30} 
          alt="MyMenuQR Logo" 
        />
      </div>

      {/* Información de autoría */}
      <div className="ms-auto text-end">
        <span className="me-1">Creado por</span>
        <a href="https://mymenuqr.com" target="_blank" rel="noopener noreferrer">
          MyMenuQR.com
        </a>
        <span className="ms-2">&copy; 2026 Pollos Los Doraditos.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)