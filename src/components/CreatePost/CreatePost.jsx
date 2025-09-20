import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { toast } from 'react-hot-toast';
const img =
  "https://easydigitaldownloads.com/wp-content/uploads/edd/2017/04/upload-file-product-image.png";
export default function CreatePost({pageNumber}) {

  const queryClient = useQueryClient();

      let imageInput = useRef();
  let captionInput = useRef();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isImagePreview, setIsImagePreview] = useState(null);

  const ImagePreview = !!isImagePreview;

  function handleModel() {
    setIsOpenModel(true);
  }
  function handleCloseModel() {
    setIsOpenModel(false);
    handleClearImagePreview();
  }
    function handleClearImagePreview() {
    setIsImagePreview(null);
    imageInput.current.value="";
  }
//   عشان الصوره تظهر
  function handleChangeImage(e) {
    
  const url=  URL.createObjectURL(e.target.files[0])
  setIsImagePreview(url)
  }
 async function handleCreatePost() {
    const formdata = new FormData();
    if (imageInput.current.files?.[0]) {
      formdata.append("image", imageInput.current.files[0]);
    }
  if(captionInput.current?.value){
      formdata.append("body", captionInput.current.value);
  }
     return await axios.post(
      `https://linked-posts.routemisr.com/posts`,
      formdata,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
function resetForm() {
  captionInput.current.value = "";
  handleClearImagePreview();
}
  let { mutate,isPending } = useMutation({
    mutationFn: handleCreatePost,
    onSuccess: () => {
      toast.success("post added");
      queryClient.invalidateQueries(["allPosts",pageNumber]);
       resetForm();
    },
    onError:(err)=> {
      toast.error(err)
       resetForm();
    }
  });
  return (
    <div className="mx-auto p-3 my-3 shadow-sm rounded-md border-slate-600 bg-gray-50 dark:bg-slate-800">
      {!isOpenModel && (
        <div onClick={handleModel} className="toggle bg-gray-50 dark:bg-slate-800 my-2 border-b-1 border-gray-200">
          <input
            type="text"

            placeholder="what's on your mind?"
            className=" cursor-pointer bg-transparent text-slate-700 dark:text-white border-0 border-b border-gray-200 placeholder:text-slate-700 dark:placeholder:text-white w-full"
          />
        </div>
      )}
      {isOpenModel && (
        <div className="flex-col gap-2 flex">
          <input
            type="text"
            ref={captionInput}
            placeholder="what's on your mind?"
            className=" cursor-pointer bg-transparent border-0 border-b text-slate-700 dark:text-white  border-gray-200 placeholder:text-slate-700 dark:placeholder:text-white w-full"
          />
          {isImagePreview && (
            <div className="about-img relative">
              <img src={isImagePreview} className="w-full h-90"  alt="" />
              <div className="absolute top-3 right-3 bg-slate-700  rounded-full p-2 size-7 flex items-center justify-center cursor-pointer">
                <i
                  onClick={handleClearImagePreview}
                  className="fa-solid fa-x cursor-pointer text-[12px]  text-white"
                ></i>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center my-2">
            <label className="cursor-pointer hover:text-red-500 dark:text-white">
              <input type="file" className="hidden" ref={imageInput} onChange={handleChangeImage}/>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-image"></i>
                <p>Upload</p>
              </div>
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleCloseModel}
                type="button"
                className=" cursor-pointer focus:outline-none text-white bg-gray-700 hover:bg-gray-800  focus:ring-gray-300 font-medium rounded-none text-sm px-5 py-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900 focus:ring-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={mutate}
                className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-0 focus:ring-transparent font-medium  text-sm px-6 py-2 mb-2 rounded-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                           {isPending ? <i className="fas fa-spinner fa-spin"></i> : " Post"}

              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
