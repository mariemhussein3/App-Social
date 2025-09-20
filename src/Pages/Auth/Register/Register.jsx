import React, { useState } from "react";
import style from "./Register.module.css";
import imgRegister from "../../../assets/signup-image.jpg";
import { useForm } from "react-hook-form";
import z from "zod";

import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate=useNavigate();
 const [apiError, setapiError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
 const schema = z
     .object({
       name: z.string().min(3, "name is required").max(30, "name is large"),
       email: z
         .string()
         .regex(
           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
           "email invalid"
         ),
       password: z
         .string()
         .regex(
           /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
           "password invalid"
         ),
       rePassword: z.string(),
       gender: z.enum(["male", "female"], "choose your gender"),
       dateOfBirth: z
         .string()
         .regex(/^\d{4}-\d{2}\-\d{2}$/, "not correct pattern birth")
         .refine((date) => {
           const userDate = new Date(date).getFullYear();
           const nowDate = new Date().getFullYear();
           // nowDate.setHours(0, 0, 0, 0);
           return (nowDate-userDate)>=16;
         }, "not correct date"),
     })
     .refine((obj) => obj.password == obj.rePassword, {
       message: "rePassowrd not match password",
       path: ["rePassword"],
     });
    // step 1
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver:zodResolver(schema), 
  });
  let { register, handleSubmit,formState } = form;
  let handleRegister = (data) => {
   setIsLoading(true)
   axios.post(`https://linked-posts.routemisr.com/users/signup`,data)
    .then((res)=>{
      if(res.data.message==="success")
      {  navigate("/login")
      }
      setIsLoading(false);
    })
    .catch((err)=>{
      setIsLoading(false);
      setapiError(err.response.data.error);
      toast.error(err.response?.data?.error)
    })
  }

  return (
    <>
    {apiError&&<h1 className="bg-amber-300 py-2 px-7 text-center my-7">{apiError}</h1>}
          <div className="">
        <div className="lg:w-[55%] w-full mx-auto my-20 bg-[#fff] shadow-2xl rounded-2xl py-20">
          <div className="flex lg:gap-10 gap-15 items-center justify-center  flex-col lg:flex-row">
  <div className="flex flex-col  items-center justify-center lg:w-[60%]">
        <form
        className="lg:mt-10  w-full mx-17 px-10 flex flex-col"
        onSubmit={handleSubmit(handleRegister)}>        {/* هتبعتلها الداتا الي user كتبها */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Your Name"
          />

               {/* step8 */}
          {formState.errors.name&&formState.touchedFields.name?<p className="text-red-400 text-center">{formState.errors.name.message}</p>:""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"

            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Your Email"
          />
     
          {formState.errors.email&&formState.touchedFields.email?<p className="text-red-400 text-center">{formState.errors.email.message}</p>:""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Your password"
          />
       
          {formState.errors.password&&formState.touchedFields.password
          ?<p className="text-red-400 text-center">{formState.errors.password.message}</p>:""}

        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Your rePassword"
          />
          {formState.errors.rePassword&&formState.touchedFields.rePassword?<p className="text-red-400 text-center">{formState.errors.rePassword.message}</p>:""}

        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Your Date"
          />

          {formState.errors.dateOfBirth&&formState.touchedFields.dateOfBirth?<p className="text-red-400 text-center">{formState.errors.dateOfBirth.message}</p>:""}

        </div>
        <div className="flex gap-3">
          <div className="flex items-center mb-4">
            <input
              id="male"
              type="radio"
              {...register("gender")}
              value="male"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="male"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              male
            </label>
          

          </div>

          <div className="flex items-center mb-4">
            <input
              id="female"
              type="radio"
              {...register("gender")}
              value="female"
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="female"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              female
            </label>
      

          </div>
              {formState.errors.gender?<p className="text-red-400 text-center">{formState.errors.gender.message}</p>:""}
        </div>
        <button
        
          type="submit"
          // disabled={!formState.isValid}
          className="text-white  disabled:bg-blue-300 bg-blue-500 hover:bg-blue-600 focus:ring-0 focus:outline-none focus:ring-transparent font-medium rounded-none w-full text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-transparent"
        >
          {isLoading?<i className="fas fa-spinner fa-spin"></i>:"submit"}
        </button>
      </form>
    <Link to="/login">  <p className="my-3 underline underline-offset-8 text-slate-600 hover:text-blue-600">Already have an account</p></Link>

  </div>
            <div className="img-register lg:w-[45%] w-full px-10">
                    <img src={imgRegister} className="w-full" alt="" />
                  </div>
                  </div>
                  </div>
                  </div>
    </>
  );
}
