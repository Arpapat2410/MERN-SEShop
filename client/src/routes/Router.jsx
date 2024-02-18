import React from 'react'
import { createBrowserRouter, } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/home';
import ProductList from '../pages/shop/ProductList';
import SignUp from '../components/SignUp';

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
        element : <ProductList/>
      }
    ]
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/SignIn",
    element: <SignUp />,
  }
]);


export default router