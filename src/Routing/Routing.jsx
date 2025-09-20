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
import ProtectedAuthRouting from './../components/ProtectedAuthRouting/ProtectedAuthRouting';


      const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element:<ProtectedAuthRouting> <Login /></ProtectedAuthRouting>
         },
        { path: "profile", element: <ProtectedRouting><Profile /></ProtectedRouting> },
        { path: "UpdateProfile", element: <ProtectedRouting><UpdateProfile /></ProtectedRouting> },
        { path: "/postdetails/:id", element: <ProtectedRouting><PostDetails /></ProtectedRouting> },
        { path: "home", element: <Home /> },
        { path: "register", element: <ProtectedAuthRouting><Register /> </ProtectedAuthRouting>},
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);
export default  routes

