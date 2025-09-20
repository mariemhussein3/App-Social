import React, { useContext, useEffect } from "react";
import style from "./Home.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import CreatePost from "../../components/CreatePost/CreatePost";
export default function Home() {
      let [pageNumber,setPageNumber]=useState("1");
  
  async function getAllPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/posts?&page=${pageNumber}&sort=-createdAt`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  let { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["allPosts",pageNumber],
    queryFn: getAllPosts,
    select: (data) => data?.data?.posts,
  });
  if (isLoading) {
    return <Loader/>
  }
  if (isError) {
    return <h2>ERROR....</h2>;
  }
  return (
    <>
      <div  className="w-full md:w-[70%] lg:w-[30%] mx-auto my-7">
        <CreatePost pageNumber={pageNumber}/>

        {data.map((post) => (
          <PostCard post={post} key={post.id} isSinglePage={false} />
        ))}
        <Pagination setPageNumber={setPageNumber} />
      </div>
    </>
  );
}
