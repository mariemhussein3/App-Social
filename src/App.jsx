import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.css";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthContextProvider from "./components/Context/AuthContext";
import Routes from "./Routing/Routing"
import { Toaster } from "react-hot-toast";
import UserInfoContextProvider from "./components/Context/UserInfoContext";
export default function App() {
  const query=new QueryClient();

  return (
        <QueryClientProvider client={query}>
          <ReactQueryDevtools/>
      <AuthContextProvider>
        <UserInfoContextProvider>
          
              <RouterProvider router={Routes}></RouterProvider>
               <Toaster/>
        </UserInfoContextProvider>
       
      </AuthContextProvider>
        </QueryClientProvider>
  );
}
