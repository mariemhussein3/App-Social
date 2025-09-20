import React from 'react'
import style from "./ProtectedRouting.module.css"
import { Children } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouting(props) {
  // props ده home
  if(localStorage.getItem("token")){
    // هيروح لل home or profile
    return props.children;
  }
  else
    // مينفعش استخدم useNavigate عشان هي function وهو عايز jsx 
    // عشان ميكتبش فوق اسم component children
  return <Navigate to="/"/>
  // return <Login/>
 }
