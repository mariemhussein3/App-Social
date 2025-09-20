import React from "react";
import HeaderPost from "../../components/HeaderPost/HeaderPost";

export default function Comment({comment}) {
  
  let { commentCreator, content, createdAt,_id } = comment;
  console.log("commentCreator",commentCreator);
    
  return (
    <>
    <HeaderPost currentContent={content}  idToDeleteCart={_id} postUserId={commentCreator._id} photo={commentCreator.photo} name={commentCreator.name} createdAt={createdAt} />
    <p>{content}</p>
    </>
  );
}
