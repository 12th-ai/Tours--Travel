import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthLayout from '../pages/server/AuthLayout'
function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Outlet />

    </div>
  )
}

export default DashboardLayout  