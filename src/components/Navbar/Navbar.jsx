import React, { useContext, useState } from "react";
const STATIC_USER_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { UserInfoContext } from "../Context/UserInfoContext";
import { useEffect } from "react";
export default function Navbar() {
  const [isOpen, seIisOpen] = useState(false);
  let navigate = useNavigate();
  let { token, clearUserToken } = useContext(AuthContext);

  let { data } = useContext(UserInfoContext);

  function handleToggle() {
    seIisOpen(!isOpen);
  }
  useEffect(() => {
    seIisOpen(false);
  }, [token,data]); 

  function logout() {
    localStorage.removeItem("token");
    clearUserToken();
    navigate("/");
  }
  return (
    <>
      <nav className=" border-gray-200 bg-gray-50 dark:bg-slate-800 text-slate-800 fixed top-0 left-0 w-full shadow-sm z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="text-slate-800 flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-700 dark:text-white">
              Social App
            </span>
          </Link>
          <div className="text-slate-800 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-7 justify-center">
       
            {token && (
              <>
                     <Link
            to="home"
            className="text-slate-800 dark:text-white flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-[16px] font-semibold whitespace-nowrap ">
             ALL Posts
            </span>
          </Link>
                <button
                  type="button"
                  className="text-slate-800 flex text-sm relative bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.src = STATIC_USER_IMAGE;
                    }}
                    src={data?.photo}
                    alt=""
                  />
                </button>
                {isOpen && (
                  <div
                    className="z-50 absolute right-[5%] top-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {data?.name}
                      </span>

                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-50">
                        {data?.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          to="/profile"
                          className="text-slate-800 block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                        >
                          profile
                        </Link>
                      </li>
                       <li>
                        <Link
                          to="/updateProfile"
                          className="text-slate-800 block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                        >
                          Update Profile
                        </Link>
                      </li>
                      <li>
                        <span
                          onClick={logout}
                          className="block px-4 py-2 cursor-pointer text-sm text-slate-800  hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white dark:hover:text-white"
                        >
                          log out
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}

            {!token && (
              <>
                <ul className="flex gap-3 text-slate-800 dark:text-white ml-5">
                 
                  <li>
                    <Link to="/">Login</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
