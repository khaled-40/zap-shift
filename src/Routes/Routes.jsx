import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import BeARider from "../Pages/BeARider/BeARider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage',
        loader: () => fetch('/warehouses.json').then(res => res.json()),
        Component: Coverage
      },
      {
        path: '/beARider',
        element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
      },
      {
        path: '/send-parcel',
        loader: () => fetch('/warehouses.json').then(res => res.json()),
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      }
    ]
  },
  {
    path: '/', 
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);