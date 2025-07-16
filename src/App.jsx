import React, { useEffect, useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

import { jwtDecode } from "jwt-decode";
import Layout from "./Layout/Layout";

import Home from "./Home/Home";
import Rigester from "./Rigester/Rigester";
import Login from "./Login/Login";
import ProductDetails from "./Product-Details/ProductDetails";
import Error from "./Error/Error";
import CategoryDetails from "./CategoryDetails/CategoryDetails";
import CategoryProvider from "./CategoryContext/CategoryContext";
import Profile from "./Profile/Profile";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import CardContextProvider from "./CardContext/CardContext";
import ShoppingCardProvider from "./ShoppingContext/ShoppingCardContext";
import CartsDetails from "./CartsDetails/CartsDetails";
import CheckOut from "./CheckOut/Checkout";

function App() {
  // user data from Token
  const [userData, setUserdata] = useState(null);
  function saveUserData() {
    let Encoded = localStorage.getItem("userToken");
    let DecodedToken = jwtDecode(Encoded);
    // console.log(DecodedToken);
    setUserdata(DecodedToken);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  // routers:
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout setUserData={setUserdata} userData={userData} />,
      children: [
        { index: true, element: <Rigester /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },

        {
          path: "home",
          element: (
            <ProtectedRoute userData={userData}>
              {" "}
              <Home />
            </ProtectedRoute>
          ),
        },

        {
          path: "cardsDetails",
          element: (
            <ProtectedRoute userData={userData}>
              {" "}
              <CartsDetails />
            </ProtectedRoute>
          ),
        },

        {
          path: "checkout",
          element: (
            <ProtectedRoute userData={userData}>
              {" "}
              <CheckOut />
            </ProtectedRoute>
          ),
        },

        {
          path: "/product/:id",
          element: (
            <ProtectedRoute userData={userData}>
              {" "}
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        { path: "category/:categoryId", element: <CategoryDetails /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute userData={userData}>
              {" "}
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <CategoryProvider>
      <ShoppingCardProvider>
        <CardContextProvider>
          <RouterProvider router={routers} />
        </CardContextProvider>
      </ShoppingCardProvider>
    </CategoryProvider>
  );
}
export default App;
