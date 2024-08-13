import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientNav from '../Component/ClientNav'
import '../assets/Style/client_style/index.css'

function ClientLayout() {
  return (
    <div>
   <div className="headder">
      <div className="offer">
         <h1>black friday big offer</h1>
      </div>
   </div>
<ClientNav />
        <Outlet /> 
       
    </div>
  )
}

export default ClientLayout