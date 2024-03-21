import React from 'react'
import { createBrowserRouter, } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import ProductList from '../pages/shop/ProductList';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
import AddtoCart from '../pages/shop/AddtoCart';
import DashboardLayout from '../layout/DashboardLayout';
import User from '../pages/dashboard/admin/User';
import Dashboard from '../pages/dashboard/admin/Dashboard';
import AdminRouter from '../PrivateRouter/AdminRouter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (<PrivateRouter><ProductList /></PrivateRouter>)
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      },
      {
        path: "/AddtoCart",
        element: <AddtoCart />,
      }
    ]
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/Dashboard",
    element:
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>,
    children: [
      { 
        path: "users",
        element: <User />
      },

      {
        path: "",
        element: <Dashboard />
      },
    ]
  },

]);


export default router