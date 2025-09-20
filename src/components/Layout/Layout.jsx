
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  return<>
  <Navbar/>
  <div className=" min-h-screen  p-5 pt-20 dark:bg-slate-900">
    <Outlet/>
  </div>
  </>
}
