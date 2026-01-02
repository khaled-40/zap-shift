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
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payments/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payments/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payments/PaymentCancelled";
import MyPayments from "../Pages/Dashboard/MyPayments/MyPayments";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import RiderDetails from "../Pages/Dashboard/ApproveRiders/RiderDetails";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";


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
        path: 'coverage',
        loader: () => fetch('/warehouses.json').then(res => res.json()),
        Component: Coverage
      },
      {
        path: 'beARider',
        loader: () => fetch('/warehouses.json').then(res => res.json()),
        element: <PrivateRoute><BeARider></BeARider></PrivateRoute>
      },
      {
        path: 'send-parcel',
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
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'my-payments',
        Component: MyPayments
      },
      {
        path: 'approve-riders',
        element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },
      {
        path: 'rider-details/:id',
        loader: ({params}) => fetch(`http://localhost:3000/riders/${params.id}`).then(res => res.json()),
        Component: RiderDetails
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      }
    ]
  }
]);