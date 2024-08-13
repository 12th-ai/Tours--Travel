import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthLayout from '../pages/server/AuthLayout'
import '../assets/Style/client_style/dash.css'

function DashboardLayout() {
  return (
    <div>
     
      <Outlet />

    </div>
  )
}

export default DashboardLayout  