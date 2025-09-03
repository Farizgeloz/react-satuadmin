import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Button from './Button';
import { IoNotificationsOutline,IoPersonCircleOutline } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "./features/authSlice";

const Nav = (props) => {
    const username = props.username;
    const usernick = props.usernick;
    const userrole = props.userrole;

    const navigate =useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
      
      dispatch(LogOut());
      dispatch(reset());
      navigate("/Login");
     
    };
  


    let Links =[
      {name:"HOME",link:"add"},
      {name:"SERVICE",link:"/"},
      {name:"ABOUT",link:"/"},
      {name:"BLOG'S",link:"/"},
      {name:"CONTACT",link:"/"},
    ];
    let [open,setOpen]=useState(false);
  return (
    <div className='bg-blue-700 drop-shadow-lg w-full top-0 left-0 font-[Poppins]  height1 min-[680px]:hidden max-[640px]:fixed z-10'>
      <div className='md:flex items-center justify-between  py-2 md:px-10 px-7  height1'>
        <div className='w-70 font-bold cursor-pointer flex items-center font-[Poppins] '>
          <img src="/assetku/logo-kab-probolinggo.png" className=" img-30 cursor-pointer duration-500 mr-2" />
          <p className='md:mt-3 text-white textsize10'>SATU ADMIN</p>
          <p className='ml-2 md:mt-3 max-[640px]:hiddenku text-gray-50'>KAB. PROBOLINGGO</p>
        </div>
      
        <div onClick={()=>setOpen(!open)} className='text-green-600 text-3xl absolute right-8 top-2 cursor-pointer md:hidden'>
        <ion-icon name={open ? 'close':'menu'}></ion-icon>
        </div>

        <ul className={`md:flex flex-row-reverse md:items-center md:pb-0 pb-3 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-4 transition-all duration-500 ease-in  max-[680px]:bg-white ${open ? 'top-10 ':'top-[-490px]'}`} >
          <li className='md:ml-6 text-sm md:my-0 my-2 p-2'>
           
            <Menu as="div" className="relative inline-block text-left md:mt-5">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-gray-400 hover:text-gray-600">
                  
                  <IoPersonCircleOutline  aria-hidden="true" className="-mr-1 size-7" />
                </MenuButton>
              </div>

              <MenuItems transition className="absolute bg-white right-0 md:z-auto z-[-1] mt-2 w-56 origin-top-right rounded-md ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">
                  <MenuItem>
                      
                      <div className='px-4'>
                        <p className='text-green mb-0'>Selamat Datang</p>
                        <p>{username}</p>
                        </div>
                  </MenuItem>
                  
                    <MenuItem>
                      <button
                         onClick={logout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </li>
          {
            Links.map((link)=>(
              <li key={link.name} className='md:ml-6 text-sm md:my-0 my-4 p-2 text-white font-medium rounded hover:bg-white hover:text-purple-600 min-[641px]:hidden'>
                <NavLink to={link.link} className='duration-500'>{link.name}</NavLink>
              </li>
            ))
          }
              
            
          
          
        </ul>
      </div>
    </div>
  )
}

export default Nav
