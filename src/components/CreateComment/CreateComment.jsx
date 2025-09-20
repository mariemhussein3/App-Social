import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoSendSharp } from "react-icons/io5";
import z from "zod";

export default function CreateComment({ post }) {

  let { register, handleSubmit,reset} = useForm({
    defaultValues: {
      content: "",
      post: post.id,
    },
  });

  const queryClient = useQueryClient();

  async function handleCreateComment(values) {
    return await axios.post(
      `https://linked-posts.routemisr.com/comments`,
      values,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  let { mutate, isPending } = useMutation({
    mutationFn: handleCreateComment,
    onSuccess: () => {
      toast.success("comment added");
      queryClient.invalidateQueries(["PostDetails", post.id]);
      reset({ content: "", post: post.id });
    },
    onError:(err)=>{
      toast.error(err)
reset({ content: "", post: post.id });

    }
  });
  return (
    <>
      <form onSubmit={handleSubmit(mutate)}>
        <label
          hymlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900  dark:text-white sr-only "
        >
          Search
        </label>
        <div className="relative">
          <input
            {...register("content")}
            type="text"
            
            id="default-search"
            className="block w-full p-3 my-4  text-sm text-gray-900  dark:placeholder:text-white  dark:text-white border border-gray-300 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-blue-500 focus:border-blue-500     "
            placeholder="Add Your Comment"
            required
          />
          <input
            {...register("post")}
            type="text"
            hidden
            
            id="default-search"
            className="block w-full p-4 my-4  text-sm text-gray-900 dark:text-white dark:placeholder:text-white  border border-gray-300 rounded-lg bg-gray-50 dark:bg-slate-800 focus:ring-blue-500 focus:border-blue-500     "
            placeholder="Add Your Comment"
            required
          />
          <button
             disabled={isPending}
            type="submit"
            className="text-white cursor-pointer absolute end-2 bottom-1  bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-4 py-2 "
          >
            {isPending ? <i className="fas fa-spinner fa-spin disabled:bg-gray-700 text-blue-700 dark:text-white"></i> :<IoSendSharp className="ms-1 text-[20px] text-blue-700 dark:text-white"/>}
          </button>
        </div>
      </form>
    </>
  );
}
