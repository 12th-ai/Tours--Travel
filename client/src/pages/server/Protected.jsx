import React from 'react'
import { Outlet } from 'react-router-dom'
import Topnav from '../../Component/Dashboard/WIdget/Topnav'
import Sidebar from '../../Component/Dashboard/WIdget/Sidebar'

function DashLayout() {
  return (
    <div>
      <Topnav />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DashLayout
