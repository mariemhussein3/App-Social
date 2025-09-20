import React from 'react'
import {FadeLoader} from './../../../node_modules/react-spinners';
export default function Loader() {
  return (
     <div className="flex justify-center items-center h-screen">
    <FadeLoader color='#0086ff' size={100}/>
  </div>
  )
}
