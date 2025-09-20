import React from 'react'
import style from "./Profile.module.css"
import { useContext } from 'react'
import { UserInfoContext } from './../../components/Context/UserInfoContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../components/Context/AuthContext';
import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';
import CreatePost from '../../components/CreatePost/CreatePost';
import UpdateProfile from '../UpateProfile/UpdateProfile';

export default function Profile() {
let {userId}=  useContext(AuthContext);
 function userPost(){
  return axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
 }
let{data,isLoading,isError}=useQuery({
  queryKey:["userPosts",userId],
  queryFn:userPost,
  // هنا عشان ميعملش  for userId=null
  enabled:!!userId,
})

if(isLoading){
  return <Loader/>
}
if(isError){
  return <h2>errorrrr..</h2>
}
  return <>
<div className="absolute top-5   right-10">
  <UpdateProfile />
</div>

   <div className="lg:w-[30%] w-full mx-auto mt-10">

     <CreatePost/>
   </div>
<div className="w-full md:w-[70%] lg:w-[30%] mx-auto flex flex-col gap-4 ">
  {data?.data?.posts.map((post)=><PostCard post={post} />)}
</div>
  </>
}
