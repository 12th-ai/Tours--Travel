import React from 'react'
import { Outlet } from 'react-router-dom'
import ClientNav from '../Component/ClientNav'
import '../assets/Style/client_style/style.css'

function ClientLayout() {
  return (
    <div>
<ClientNav />
        <Outlet /> 
       
    </div>
  )
}

export default ClientLayout