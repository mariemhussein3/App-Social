import React from "react";
import Comment from "../../Pages/Comment/Comment";
import HeaderPost from "../HeaderPost/HeaderPost";
import { Link } from "react-router-dom";
import CreateComment from "../CreateComment/CreateComment";

export default function PostCard({ post,isSinglePage=false }) {
let firstComment=  post?.comments?.[0];
const allCommentsReverse=structuredClone(post).comments.reverse();
  return (
    <>
    <div className="my-10 " >
       <div className="bg-gray-50 dark:bg-slate-800 dark:text-white p-4 rounded-md shadow-sm  text-slate-700">
       <HeaderPost currentBody={post.body} idToDeleteCart={post.id}  isPostPart photo={post?.user?.photo} name={post?.user?.name} createdAt={post?.createdAt} postUserId={post?.user?._id}/>
      {post?.body && <h2 className="my-3 text-slate-900 dark:text-white">{post.body}</h2>}
      {post?.image && <img src={post?.image} className="w-full" alt="" />}
<CreateComment  post={post}/>

     {!isSinglePage&& <Link to={`/postdetails/${post.id}`} className="block my-3 text-center dark:text-white text-slate-700 hover:underline">See Post Details.......</Link>}
     {!isSinglePage&&firstComment&&<Comment comment={firstComment} />}
    {isSinglePage&& allCommentsReverse.map((comment)=><Comment comment={comment} />)}
     </div>
    </div>
    </>
  );
}
