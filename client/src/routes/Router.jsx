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
import Dashboard from '../layout/Dashboard';

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
        path : "/shop",
        element : (<PrivateRouter><ProductList/></PrivateRouter>)
      },
      {
        path : "/update-profile",
        element : <UpdateProfile/>
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
    element: <Dashboard />,
  },
  
]);


export default router