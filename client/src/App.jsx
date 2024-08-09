import React from 'react'
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";


// layout routers 
import DashboardLayout from './Layout/DashboardLayout';
import ClientLayout from './Layout/ClientLayout';
import Pnf from './Layout/Pnf';
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],

  },


  { path: "/dashboard", element: <DashboardLayout /> },
  { path: "*", element: <Pnf /> }, // Default route
])
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App