import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../components/PostCard/PostCard";
import Loader from "../../components/Loader/Loader";
export default function PostDetails() {
  let { id } = useParams();

  async function handlePostDetails() {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  let { data, isLoading, isError } = useQuery({
    queryKey: ["PostDetails", id],
    queryFn: handlePostDetails,
    select: (data) => data?.data?.post,
  });
  if (isLoading) {
     return <Loader/>;
  }
  if (isError) {
    return <h2>isError....</h2>;
  }
  return (
    <>
      <div className="w-full md:w-[70%] lg:w-[30%] mx-auto my-7 ">
        {data&&  <PostCard post={data} isSinglePage/>}{/*isSinglePage==true*/ }
      </div>
    </>
  );
}
