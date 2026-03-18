import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";
import App from "../App";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import Conversion from "../pages/Convertion/Convertion";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/Users",
        element: <Users />,
        index: true,
      },
      {
        path: "/Deposit",
        element: <Deposit />,
        index: true,
      },
      {
        path: "/Withdraw",
        element: <Withdraw />,
        index: true,
      },
      {
        path: "/Conversion",
        element: <Conversion />,
        index: true,
      },
    ],
  },
]);

export default routes;
