import { Dropdown, DropdownItem, FileInput } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const STATIC_USER_IMAGE =
  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";

export default function HeaderPost({
  photo,
  name,
  createdAt,
  postUserId,
  currentBody = "",
  currentContent = "",
  isPostPart = false,
  idToDeleteCart,  
}) {
  let { userId } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  let updateImage=  useRef()
  const queryClient = useQueryClient();
let{register,handleSubmit,setValue}= useForm(
   { defaultValues: {
    body: currentBody,   
      content: currentContent,  
  }},
)
// for shown last comment or post content
 useEffect(() => {
    if (openModal) {
      if (isPostPart) {
        setValue("body", currentBody);
      } else {
        setValue("content", currentContent);
      }
    }
  }, [openModal, currentBody, currentContent, isPostPart, setValue]);


  // deleteeeee
  function handleDelete() {
    return axios.delete(
      `https://linked-posts.routemisr.com/${
        isPostPart ? "posts" : "comments"
      }/${idToDeleteCart}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  
  let { mutate,isPending } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      toast.success("post deleted");
      queryClient.invalidateQueries(["userPosts", userId], ["allPosts"]);
      setOpenModal(false)
    },
  });
  
  let { mutate:updatePost,isPending:reloadUpdatePost } = useMutation({
    mutationFn: handleUpdatePost,
    onSuccess: () => {
      toast.success("post updated");
      queryClient.invalidateQueries(["userPosts", userId], ["allPosts"]);
      setOpenModal(false)
    },
  });
  function handleUpdatePost(values){
    let formdata=new FormData();
    console.log(values.body);
    
    if(values?.body){
      formdata.append("body",values.body);
    }
    if(updateImage?.current?.files[0]){
      formdata.append("image",updateImage.current.files[0]);
    }
    return axios.put(`https://linked-posts.routemisr.com/posts/${idToDeleteCart}`,formdata,{
      headers:{
        token:localStorage.getItem("token")
      }
    })
  }
  let { mutate:updateComment,isPending:reloadUpdateComment } = useMutation({
    mutationFn: handleUpdateComment,
    onSuccess: () => {
      toast.success("comment updated");
      queryClient.invalidateQueries(["userPosts", userId], ["allPosts"]);
      setOpenModal(false)
    },
  });
    function handleUpdateComment(values){
    return axios.put(`https://linked-posts.routemisr.com/comments/${idToDeleteCart}`,
      {content:values.content},
    {  headers:{
        token:localStorage.getItem("token")
      
    }})
  }
  

  return (
    <>
    <div className="header-post flex items-center justify-between my-3">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-3.5">
          <img
            onError={(e) => {
              e.target.src = STATIC_USER_IMAGE;
            }}
            src={photo}
            className="size-[35px] rounded-full"
            alt=""
            />
          <div className="text-slate-700 flex flex-col">
            <h3>{name}</h3>
            <span> {new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* user make post ===if user who log in */}
      {postUserId === userId && (
        <>
       
      <div className="relative inline-block">
  <div
    className="  border-0 text-slate-700 rounded-none px-2 flex items-center justify-center text-center font-medium text-sm 
    hover:bg-gray-100 focus:outline-none focus:ring-0"
    onClick={() => setOpenMenu(!openMenu)}
  >
    <HiOutlineDotsHorizontal />
  </div>

  {openMenu && (
    <div className="flex flex-col bg-gray-50 absolute top-10 left-0 z-10 w-[150px] p-3 rounded-md shadow-lg">
      <div
        onClick={() => { setOpenModal(true); setOpenMenu(false); }}
        className="mb-1  text-slate-800 py-2 w-full cursor-pointer hover:bg-gray-200 px-1"
        >
        Update
      </div>
      <div
        onClick={() => { mutate(); setOpenMenu(false); }}
        className="mb-1  text-slate-800 py-2 w-full cursor-pointer hover:bg-gray-200 px-1"
        >
        Delete
      </div>
    </div>
  )}
</div>

       </>
      )}

            {isPostPart&& 
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalBody>
          <form onSubmit={handleSubmit(updatePost)}>
           
            <div className="space-y-6 bg-white">
              <input
              {...register("body")}
              
            type="text"
            placeholder="what's on your mind?"
            className="cursor-pointer  placeholder:text-slate-500 w-full"
          />
        <label className="cursor-pointer hover:text-red-500">
              <FileInput ref={updateImage} type="file" className="hidden"/>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-image"></i>
                <p>Upload</p>
              </div>
            </label>
          </div>
        <ModalFooter>
          <Button type="submit"  className="bg-red-800 hover:bg-red-800 focus:ring-0 rounded-none cursor-pointer">{reloadUpdatePost ? <i className="fas fa-spinner fa-spin"></i> : "Update"}</Button>
          <Button className="bg-slate-700 rounded-none hover:bg-slate-700 cursor-pointer focus:ring-0 " onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>

          </form>
        </ModalBody>
      </Modal>
}
{!isPostPart&& 
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalBody>
          <form onSubmit={handleSubmit(updateComment)}>
           
            <div className="space-y-6">
              <input
              {...register("content")}
              type="text"
              placeholder="what's on your mind?"
            className=" cursor-pointer bg-transparent  placeholder:text-slate-500 w-full"
            />
          </div>
        <ModalFooter>
          <Button type="submit"> {reloadUpdateComment ? <i className="fas fa-spinner fa-spin"></i> : "update"}</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>

          </form>
        </ModalBody>
      </Modal>
}
    </div>
  
</>
  );
}
// another solution
// function handleDeleteComment() {
//   return axios.delete(
//     `https://linked-posts.routemisr.com/posts/66875b3b006c4ff191a61a89`,
//     { headers: {
//       token:localStorage.getItem("token")
//     } }
//   );
// }
// function handleDelete() {
//   return axios.delete(
//     `https://linked-posts.routemisr.com/posts/${idToDeleteCart}`,
//     { headers: {
//       token:localStorage.getItem("token")
//     } }
//   );
// }