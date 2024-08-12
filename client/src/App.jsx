// import React from 'react'
// import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";


// // layout routers 
// import DashboardLayout from './Layout/DashboardLayout';
// import ClientLayout from './Layout/ClientLayout';
// import Pnf from './Layout/Pnf';
// import Home from './pages/Home';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <ClientLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//     ],

//   },


//   { path: "/dashboard", element: <DashboardLayout /> },
//   { path: "*", element: <Pnf /> }, // Default route
// ])
// function App() {
//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Component/testing/Register';
import Login from './Component/testing/Login';
import AdminDashboard from './Component/testing/AdminDashboard';
import Home from './Component/testing/Home'; // Assuming you have a Home component
// import DestinationFormUP from './Component/testing/Update';
import DestinationForm from './Component/testing/Add';
import DestinationTable from './Component/testing/DestinationTable';

const App = () => {
  const isAuthenticated = !!document.cookie.split(';').find(c => c.trim().startsWith('jwt='));

  return (
    <Router>
      <Routes>
      <Route path="/" element={<DestinationTable />} />
                <Route path="/edit-destination/:id" element={<DestinationForm />} />
                <Route path="/add-destination" element={<DestinationForm />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />} 
        />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown route to Home */}
      </Routes>
    </Router>
  );
};

export default App;


