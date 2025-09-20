import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import imgSignin from "../../../assets/signin-image.jpg";
import { useForm } from "react-hook-form";
import z from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../components/Context/AuthContext";
import toast from "react-hot-toast";
export default function Login() {
  
    const [loading, setLoading] = useState(false)
  let{insertUserToken}=useContext(AuthContext)
  const navigate=useNavigate();
  // step6 validation
  const schema = z
    .object({
      email: z.email("not correct email"),
      password: z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "not correct passowrd"
      ),
    })
    // step 1
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    
    },
    resolver:zodResolver(schema), 
  });
  let { register, handleSubmit,formState } = form;
  let handleLogin = (data) => { 

   setLoading(true);
   axios.post(`https://linked-posts.routemisr.com/users/signin`,data)
    .then((res)=>{
      console.log(res);
      setLoading(false);
      if(res.data.message==="success")
      { 
        localStorage.setItem("token",res.data.token);
        insertUserToken(res.data.token)
         navigate("/")
      }
    })
    .catch((err)=>{
      setLoading(false);
       toast.error(err.response?.data?.error);
      console.log(err.response.data.error);
      
    })
  }

  return (
    <>
        <div className="">
      <div className="lg:w-[55%] w-full mx-auto my-20 bg-[#fff] shadow-2xl rounded-2xl py-20">
        <div className="flex lg:gap-10 gap-15 items-center justify-center  flex-col lg:flex-row">
<div className=" lg:w-1/2 flex flex-col justify-center items-center">
        <form
        className=" lg:mt-5 w-full mx-17 px-10 flex flex-col "
        onSubmit={handleSubmit(handleLogin)}> 
    
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"

            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" Enter Your Email"
          />
     
     
          {formState.errors.email&&formState.touchedFields.email?<p className="text-red-400 text-center">{formState.errors.email.message}</p>:""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            placeholder=" Enter Your password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
           
          />
    
          {formState.errors.password&&formState.touchedFields.password
          ?<p className="text-red-400 text-center">{formState.errors.password.message}</p>:""}

        </div>
       
        <button
         disabled={!formState.isValid}
          type="submit"
          className="text-white disabled:bg-blue-300 bg-blue-500 hover:bg-blue-600 focus:ring-0 focus:outline-none focus:ring-transparent font-medium rounded-none w-full text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-transparent"
        >
          {loading?<i className="fas fa-spinner fa-spin"></i>:"submit"}
        </button>
      </form>
    <Link to="/register">  <p className="my-3 underline underline-offset-8 text-slate-600 hover:text-blue-600">Create new account</p></Link>
</div>
         <div className="img-register lg:w-1/2 w-full px-10">
            <img src={imgSignin} className="w-full" alt="" />
          </div>
          </div>
          </div>
          </div>
    </>
  );
}
