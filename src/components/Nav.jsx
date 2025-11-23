import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from './Button';
import { IoNotificationsOutline,IoPersonCircleOutline } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "./features/authSlice";
import { MdAccountCircle, MdDashboard, MdDataset } from 'react-icons/md';
import { FaClone, FaGg, FaPeopleLine } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';
import { api_url_satuadmin } from '../api/axiosConfig';

const portal = "Portal Satu Admin";

const Nav = (props) => {
    const username = props.username;
    const usernick = props.usernick;
    const userrole = props.userrole;

    const [collapsed_satuportal, setCollapsed_SatuPortal] = useState(true);
    const [collapsed_opendata, setCollapsed_OpenData] = useState(true);
    const [collapsed_satupeta, setCollapsed_SatuPeta] = useState(true);
  
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
  
    const toggleCollapse_SatuPortal = () => {
      setCollapsed_SatuPortal(!collapsed_satuportal);
    };
    const toggleCollapse_OpenData = () => {
      setCollapsed_OpenData(!collapsed_opendata);
    };
    const toggleCollapse_SatuPeta = () => {
      setCollapsed_SatuPeta(!collapsed_satupeta);
    };

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

    useEffect(() => {
      getMenu();
    }, []);

    const getMenu = async () => {
      try {
        

        const response_image = await api_url_satuadmin.get('api/open-item/images_item', {
          params: {
            portal:portal
          }
        });
        const data_image = response_image.data.image_logo;
        setImage1(data_image.presignedUrl1);
        setImage2(data_image.presignedUrl3);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };


    const rolelogin = localStorage.getItem('role');
      const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
      const usernicklogin = userlogin.nick || '';
    
      // ✅ Fungsi Logout dengan konfirmasi SweetAlert
      const handleLogout = () => {
        Swal.fire({
          title: 'Keluar dari aplikasi?',
          text: 'Kamu akan logout dari akun ini.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Ya, Logout',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            // Hapus localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
    
            // Tampilkan pesan sukses lalu redirect
            Swal.fire({
              icon: 'success',
              title: 'Berhasil Logout!',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            }).then(() => {
              navigate('/Login');
            });
          }
        });
      };

  return (
    <div className='bg-blue-800 drop-shadow-lg w-full top-0 left-0 font-[Poppins] min-[680px]:hidden max-[640px]:fixed z-10' style={{height:'8vh'}}>
      <div className='md:flex items-center justify-between  py-2 md:px-10 px-7  height1'>
        <div className='w-100 font-bold cursor-pointer flex items-center font-[Poppins] '>
          <img src={image1} className=" w-50 cursor-pointer duration-500 mr-2" />
        </div>
      
        <div onClick={()=>setOpen(!open)} className='text-white text-3xl absolute right-8 top-2 cursor-pointer md:hidden'>
        <ion-icon name={open ? 'close':'menu'}></ion-icon>
        </div>

        <ul className={`md:flex flex-row-reverse md:items-center md:pb-0 pb-3 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-4 transition-all duration-500 ease-in  max-[680px]:bg-white ${open ? 'top-10 ':'top-[-490px]'} overflow-yy-auto`} style={{maxHeight:'65vh'}} >
          
          <li className={`-right-20 mb-3`}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="bg-blue d-flex mt-2 textsize10">
                {rolelogin} {usernicklogin}
                <MdAccountCircle className="mt-1 mx-2 textsize12" />
              </Dropdown.Toggle>
    
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <p className={`text-sage-light  textsize12 duration-200 mb-2  ${ !open && "hidden" }`}>Navigasi</p>
          <li className={`-right-20 `}>
            {/* button */}
            <Link
              to={`/Dashboard`}
              className="side-li flex tsize-100 text-silver-a"
            >
                <MdDashboard  className="mt-1 text-orange-500 tsize-150"  />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Dashboard</span>
            </Link>
          </li>
          <li className={`-right-20 mt-2`}>
            {/* button */}
            <Link
              to={`/Data-User`}
              className="side-li flex tsize-100 text-silver-a"
            >
                <FaPeopleLine className="mt-1 text-teal-500 tsize-150"  />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Data Pengguna</span>
            </Link>
          </li>


          <li className={`-right-20 mt-2`}>
          {/* tombol utama */}
          <button
            onClick={toggleCollapse_SatuPortal}
            className="side-li flex tsize-100 w-full items-center justify-between"
            type="button"
          >
            <div className="flex items-center">
              <FaGg className="mt-1 text-red-500 tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-silver-a`}>
                Satu Portal
              </span>
            </div>
            {/* icon panah collapse */}
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 text-white ${
                collapsed_satuportal ? "" : "rotate-90"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* isi collapse */}
          <ul
            className={`pl-2 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
              collapsed_satuportal ? "max-h-0" : "max-h-50"
            }`}
          >
            <li>
              <a
                href="/Satuportal/Motto"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaGg className="mt-1 text-red-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Satu Portal Motto
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satuportal/Iklan"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaGg className="mt-1 text-red-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Satu Portal Iklan
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satuportal/Visitor"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaGg className="mt-1 text-red-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal Visitor
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satuportal/List"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaGg className="mt-1 text-red-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal List
                </span>
                
              </a>
            </li>
            <li className='mb-3'>
              <a
                href="/Satuportal/Color"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaGg className="mt-1 text-red-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal Color
                </span>
                
              </a>
            </li>
          </ul>
        </li>


        <li className={`-right-20`}>
          {/* tombol utama */}
          <button
            onClick={toggleCollapse_OpenData}
            className="side-li flex tsize-100 w-full items-center justify-between"
            type="button"
          >
            <div className="flex items-center">
              <FaClone className="mt-1 text-sky-500 tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-silver-a`}>
                Open Data
              </span>
            </div>
            {/* icon panah collapse */}
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 text-white ${
                collapsed_opendata ? "" : "rotate-90"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* isi collapse */}
          <ul
            className={`pl-2 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
              collapsed_opendata ? "max-h-0" : "max-h-40"
            }`}
          >
            <li>
              <a
                href="/Opendata/Iklan"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaClone className="mt-1 text-sky-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Iklan
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Opendata/Artikel"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaClone className="mt-1 text-sky-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Artikel
                </span>
                
              </a>
            </li>
            <li className='mb-3'>
              <a
                href="/Opendata/Color"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaClone className="mt-1 text-sky-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Color
                </span>
                
              </a>
            </li>
            {/* <li>
              <a
                href="/Opendata/Dataset"
                className="tsize-100 block py-1 text-silver-a flex"
              >
                <FaClone className="mt-1 text-white tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Open Data Dataset
                </span>
                
              </a>
            </li> */}
          </ul>
        </li>


        <li className={`-right-20`}>
          {/* tombol utama */}
          <button
            onClick={toggleCollapse_SatuPeta}
            className="side-li flex tsize-100 w-full items-center justify-between"
            type="button"
          >
            <div className="flex items-center">
              <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-silver-a`}>
                Satu Peta
              </span>
            </div>
            {/* icon panah collapse */}
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-300 text-white ${
                collapsed_satupeta ? "" : "rotate-90"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* isi collapse */}
          <ul
            className={`pl-2 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
              collapsed_satupeta ? "max-h-0" : "max-h-50"
            }`}
          >
            <li>
              <a
                href="/Satupeta/Lokasi-Peta"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Lokasi Peta
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satupeta/Koleksi-Peta"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Koleksi Peta
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satupeta/Titik-Lokasi-Peta"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Titik Lokasi Peta
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satupeta/Iklan"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-silver-a`}>
                  Iklan
                </span>
                
              </a>
            </li>
            <li>
              <a
                href="/Satupeta/Artikel"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Artikel
                </span>
                
              </a>
            </li>
            <li className='mb-3'>
              <a
                href="/Satupeta/Color"
                className="tsize-100 block py-1 btn-silver-a flex"
              >
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                  Color
                </span>
                
              </a>
            </li>
          </ul>
        </li>


          
          
          
        


        <p className={`text-sage-light  textsize12 duration-200 mb-2 mt-3  ${ !open && "hidden" }`}>Data Item</p>
        <li className={`-right-20 mb-5`}>
          {/* button */}
          
          <Link
            to={`/Komponen-Statik`}
            className="side-li flex tsize-100 text-silver-a"
          >
              <MdDataset className="mt-1 text-red-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Komponen Statik</span>
          </Link>
        </li>
              
            
          
          
        </ul>
      </div>
    </div>
  )
}

export default Nav
