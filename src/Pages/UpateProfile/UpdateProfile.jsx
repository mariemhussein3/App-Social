import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function UpdateProfile() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
const uploadPhoto=useRef()
  const queryClient = useQueryClient();
  let { mutate, isPending } = useMutation({
    mutationFn: handleUploadPhoto,
    onSuccess: () => {
      toast.success("upload photo is successfully");
      queryClient.invalidateQueries("userInfo");
      setIsOpen(false)
        setIsDisabled(true); 
    },
    onError:()=>{
      toast.success(err);
        setIsOpen(false)
        setIsDisabled(true); 
    }
  });
     async function handleUploadPhoto() {
    const formdata = new FormData();
    if (uploadPhoto.current.files?.[0]) {
      formdata.append("photo", uploadPhoto.current.files[0]);
     
    }

     return await axios.put(
      `https://linked-posts.routemisr.com/users/upload-photo`,
      formdata,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
}
 function handleFileChange() {
    if (uploadPhoto.current.files?.[0]) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  return <>
  <div className="w-full mx-auto text-center  mt-20">
  

  <button onClick={()=>setIsOpen(!isOpen)}  className='mb-7 px-2 btn bg-blue-600 cursor-pointer  py-2 text-white'>Upload Photo</button>
  </div>
  
{isOpen && (
    <div className="bg-white dark:bg-slate-800 p-6 dark:text-white rounded-lg shadow-lg w-[40%]  fixed  z-50 top-[30%] left-1/2 -translate-x-1/2 flexitems-center justify-center">
      <div className="flex items-center justify-between w-full border-b border-gray-200 pb-2">
    <h2> Upload Photo</h2>
        <button
        onClick={() => setIsOpen(false)}
        className=" text-white "
      >
       <i
                  className="fa-solid fa-x cursor-pointer text-[12px]  text-slate-700 dark:text-white"
                ></i>
      </button>
      
      </div>


<div className="flex items-center justify-center w-full">
  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
      </svg>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
    </div>
    <input id="dropzone-file" ref={uploadPhoto} onChange={handleFileChange} type="file" className="hidden" />
  </label>
</div>


  <button onClick={mutate} disabled={isDisabled} className='disabled:bg-blue-300 my-4 btn bg-blue-600 cursor-pointer w-full py-2 text-white'>{isPending?<i className="fas fa-spinner fa-spin"></i>:"Confirm Upload Photo"}</button>
    </div>
)}
  </>
}
