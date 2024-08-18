import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// layout routers
import DashboardLayout from "./Layout/DashboardLayout";
import ClientLayout from "./Layout/ClientLayout";
import Pnf from "./Layout/Pnf";
import Home from "./pages/Client/Home";
import AuthLayout from "./pages/server/AuthLayout";
import DashLayout from "./pages/server/Protected";
import Login from "./Component/Dashboard/Auth/Login";
import Register from "./Component/Dashboard/Auth/Register";
import Summary from "./Component/Dashboard/WIdget/Summary";
import DestinationLayout from "./Component/Dashboard/Destination/DestinationLayout";
import Gallary from "./Component/Dashboard/Gallery/Gallary";
import Package from "./Component/Dashboard/Tour_package/Package";
import ViewDestination from "./Component/Dashboard/Destination/ViewDestination";
import AddDestination from "./Component/Dashboard/Destination/AddDestination";
import Updatedestination from "./Component/Dashboard/Destination/Updatedestination";
import ViewGallery from "./Component/Dashboard/Gallery/ViewGallery";
import AddGallery from "./Component/Dashboard/Gallery/AddGallery";
import UpdateGallery from "./Component/Dashboard/Gallery/UpdateGallery";
import ViewPackage from "./Component/Dashboard/Tour_package/ViewPackage";
import AddPackage from "./Component/Dashboard/Tour_package/AddPackage";
import UpadatePackage from "./Component/Dashboard/Tour_package/UpadatePackage";
import Testmonial from "./Component/Dashboard/Testmonials/Testmonial";
import AddTestimonial from "./Component/Dashboard/Testmonials/AddTestimonial";
import UpdateTestmonial from "./Component/Dashboard/Testmonials/UpdateTestmonial";
import ViewTestimonial from "./Component/Dashboard/Testmonials/ViewTestimonial";
import ForgotPassword from "./Component/Dashboard/Auth/Forgotpassword";
import ResetPassword from "./Component/Dashboard/Auth/Resetpassword";
import TableSummary from "./Component/Dashboard/WIdget/TableSummary";
import ViewPackageDetails from "./Component/Dashboard/Tour_package/ViewSinglePackage";
import TextEditor from "./pages/Client/About";
import ViewUsers from "./Component/Dashboard/Auth/ViewUser";
import AddNewUser from "./Component/Dashboard/Auth/AddNewUser";
import Setting from "./Component/Dashboard/Auth/Settings";
import TourDetail from "./Component/TourDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <TextEditor />,
      },

      {
        path:'packagedetails',
        element:<TourDetail />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot",
            element: <ForgotPassword />,
          },
          {
            path: "reset",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "protected",
        element: <DashLayout />,

        children: [
          {
            index: true,
            element: <Summary />,
          },
          {
            path: "summary",
            element: <TableSummary />,
          },
          {
            path: "users",
            element: <ViewUsers />,
          },
          {
            path: "addnewuser",
            element: <AddNewUser />,
          },
          {
            path: "setting",
            element: <Setting />,
          },

          {
            path: "destination",
            element: <DestinationLayout />,

            children: [
              {
                index: true,
                element: <ViewDestination />,
              },
              {
                path: "add",
                element: <AddDestination />,
              },
              {
                path: "update:id",
                element: <Updatedestination />,
              },
            ],
          },

          {
            path: "gallery",
            element: <Gallary />,

            children: [
              {
                index: true,
                element: <ViewGallery />,
              },
              {
                path: "addgallery",
                element: <AddGallery />,
              },
              {
                path: "update:id",
                element: <UpdateGallery />,
              },
            ],
          },

          {
            path: "testimonial",
            element: <Testmonial />,
            children: [
              {
                index: true,
                element: <ViewTestimonial />,
              },
              {
                path: "addtest",
                element: <AddTestimonial />,
              },

              {
                path: "updatetest",
                element: <UpdateTestmonial />,
              },
            ],
          },

          {
            path: "package",

            element: <Package />,

            children: [
              {
                index: true,
                element: <ViewPackage />,
              },

              {
                path: "addpackage",
                element: <AddPackage />,
              },
              {
                path: "update/:id",
                element: <UpadatePackage />,
              },
              {
                path: "viewdetail/:id",
                element: <ViewPackageDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <Pnf /> }, // Default route
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
