import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from '../components/Layout/Layout';
import Home from './../Pages/Home/Home';
import Profile from './../Pages/Profile/Profile';
import PostDetails from './../Pages/PostDetails/PostDetails';
import ProtectedRouting from './../components/ProtectedRouting/ProtectedRouting';
import Login from './../Pages/Auth/Login/Login';
import Register from './../Pages/Auth/Register/Register';
import Notfound from './../components/Notfound/Notfound';
import UpdateProfile from './../Pages/UpateProfile/UpdateProfile';


      const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element:<ProtectedRouting> <Home /></ProtectedRouting>
         },
        { path: "profile", element: <ProtectedRouting><Profile /></ProtectedRouting> },
        { path: "UpdateProfile", element: <ProtectedRouting><UpdateProfile /></ProtectedRouting> },
        { path: "/postdetails/:id", element: <ProtectedRouting><PostDetails /></ProtectedRouting> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
export default  routes

