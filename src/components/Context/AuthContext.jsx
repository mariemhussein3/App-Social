import React, { Children, createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    let myToken = localStorage.getItem("token");
    if (myToken != null) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    if (token) {
     const userId= jwtDecode(token).user
     setUserId(userId);
     
    }
  }, [token]);
  function insertUserToken(userToken) {
    setToken(userToken);
  }
  function clearUserToken() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, insertUserToken, setToken, clearUserToken,userId}}>
      {children}
    </AuthContext.Provider>
  );
}
