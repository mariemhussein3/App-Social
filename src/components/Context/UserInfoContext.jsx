import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext } from 'react'
export const UserInfoContext=createContext();
export default function UserInfoContextProvider({children}) {
   async function getInfoUser(){
       return await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
            headers:{
                token:localStorage.getItem("token"),
            }
        })
    }
  let {data,refetch} = useQuery({
        queryKey:["userInfo"],
        queryFn:getInfoUser,
        select:(data)=>data?.data?.user
    })
    
    
  
  return<UserInfoContext.Provider value={{data}}>{children}</UserInfoContext.Provider>
}
