import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FaPeopleLine } from "react-icons/fa6";
import {
    IoSearchCircle   

    } from "react-icons/io5";

import "../App.css";
import { MdCategory, MdDashboard, MdDataset } from 'react-icons/md';
import { FaClone, FaGg, FaMapMarkerAlt } from 'react-icons/fa';
import { api_url_satuadmin } from '../api/axiosConfig';

const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const rolelogin = localStorage.getItem('role');
const userloginsatker = userlogin.satker_id || '';
const userloginadmin = userlogin.id || '';

const portal = "Portal Satu Admin";

const Sidebar = (props) => {
  const username = props.username;
  const usernick = props.usernick;
  const userrole = props.userrole;
  const [open, setOpen] = useState(true);
  const [isOpenPenduduk, setIsOpenPenduduk] = React.useState(false);

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

  const toggleAccordion = () => {
      setIsOpenPenduduk(!isOpenPenduduk);
  };

  const style = {
    padding: "0px 0px 0px -30px",
  };

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



  return (
    <div className={` ${ open ? "w-rem16 " : "w-16 " } bg-linear-10 shadow-md border-solid border-2 h-100v  pt-2 relative duration-300 z-8 max-[680px]:hidden  `} >
      {/*<img src="/assetku/control.png" className={`absolute cursor-pointer -right-3 top-9 w-7  border-dark-purple
          border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)} />*/}
      <div className={` ${ open ? "w-46 " : "w-16 " } gap-x-4 items-center py-1 pb-2  garis7  bg-linear-10`}>
        
        <img src={image2} className={` ${ open ? "ml-1 mx-auto d-block " : " mt-1 mx-auto d-block" } img-50 cursor-pointer duration-500 ${ open && "rotate-[360deg]" }`} onClick={() => setOpen(!open)}  />
        <div>
          <p className={`text-white origin-left text-center  textsize12 font_weight600 duration-200 mb-0 ${ !open && "hidden" }`} >
            SATU ADMIN
          </p>
          <p className={`text-white bg-red rad15 text-center textsize11 duration-200 mb-0 px-2 ${ !open && "hidden" }`} >
            KAB. PROBOLINGGO
          </p>
        </div>
      </div>
      <ul className="pt-6 pr-3  h-85v overflow-yy-auto" style={{ margin: "0px 0px 0px -20px"}}>
        <p className={`text-sage-light  textsize12 duration-200 mb-2  ${ !open && "hidden" }`}>Navigasi</p>
        <li className={`-right-20 `}>
          {/* button */}
          <Link
            to={`/Dashboard`}
            className="side-li flex tsize-100 text-white-a"
          >
              <MdDashboard  className="mt-1 text-orange-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Dashboard</span>
          </Link>
         
        </li>
        {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
          <>
          <li className={`-right-20 mt-2`}>
            {/* button */}
            <Link
              to={`/Data-User`}
              className="side-li flex tsize-100 text-white-a"
            >
                <FaPeopleLine className="mt-1 text-teal-500 tsize-150"  />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Data Pengguna</span>
            </Link>
          </li>
          </>
        ) : null
        }
        {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' ? (
          <>
          <li className={`-right-20 mt-2`}>
            {/* tombol utama */}
            <button
              onClick={toggleCollapse_SatuPortal}
              className="side-li flex tsize-100 w-full items-center justify-between"
              type="button"
            >
              <div className="flex items-center">
                <FaGg className="mt-1 text-red-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-white-a`}>
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
                <Link
                  to={`/Satuportal/Motto`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaGg className="mt-1 text-red-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal Motto
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Satuportal/Iklan`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaGg className="mt-1 text-red-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal Iklan
                  </span>
                </Link>
              </li>
              {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
              <>
              <li>
                <Link
                  to={`/Satuportal/Visitor`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaGg className="mt-1 text-red-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal Visitor
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Satuportal/List`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaGg className="mt-1 text-red-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal List
                  </span>
                </Link>
              </li>
              <li className='mb-3'>
                <Link
                  to={`/Satuportal/Color`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaGg className="mt-1 text-red-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Satu Portal Color
                  </span>
                </Link>
              </li>
              </>
              ) : null
              }
            </ul>
          </li>
        </>
        ) : null
        }
        


        

      {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' || rolelogin==='CS' ? (
        <>
          <li className={`-right-20`}>
            {/* tombol utama */}
            <button
              onClick={toggleCollapse_OpenData}
              className="side-li flex tsize-100 w-full items-center justify-between"
              type="button"
            >
              <div className="flex items-center">
                <FaClone className="mt-1 text-sky-500 tsize-150" />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-white-a`}>
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
                collapsed_opendata ? "max-h-0" : ""
              }`}
            >
              {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='CS' ? (
              <>
              <li>
                <Link
                  to={`/Opendata/Dataset/Permohonan`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Permohonan
                  </span>
                </Link>
              </li>
              </>
              ) : null
              }
              {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' ? (
              <>
              <li>
                <Link
                  to={`/Opendata/Iklan`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Iklan
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Opendata/Artikel`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Artikel
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Opendata/Infografik`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Infografik
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Opendata/Bantuan`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Bantuan
                  </span>
                </Link>
              </li>
              
              </>
              ) : null
              }
              {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
              <>
              <li>
                <Link
                  to={`/Opendata/Color`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Color
                  </span>
                </Link>
              </li>
              <li className='mb-3'>
                <Link
                  to={`/Opendata/Feedback`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Feedback
                  </span>
                </Link>
              </li>
              </>
              ) : null
              }
              {/* <li>
                <a
                  href="/Opendata/Dataset"
                  className="tsize-100 block py-1 text-white-a flex"
                >
                  <FaClone className="mt-1 text-white tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Open Data Dataset
                  </span>
                
                </a>
              </li> */}
            </ul>
          </li>
        </>
      ) : null
      } 

      {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd' ? (
      <>
      <li className={`-right-20`}>
        {/* tombol utama */}
        <button
          onClick={toggleCollapse_SatuPeta}
          className="side-li flex tsize-100 w-full items-center justify-between"
          type="button"
        >
          <div className="flex items-center">
            <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
            <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 text-white-a`}>
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
          {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' ? (
            <>
              <li>
                <Link
                  to={`/Satupeta/Lokasi-Peta`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Lokasi Peta
                  </span>
                </Link>
              </li>
            </>
          ) : null
          } 
          {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd' ? (
            <>
              <li>
                <Link
                  to={`/Satupeta/Koleksi-Peta`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Koleksi Peta
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Satupeta/Titik-Lokasi-Peta`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Titik Lokasi Peta
                  </span>
                </Link>
              </li>
            </>
          ) : null
          } 
          {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' ? (
            <>
              <li>
                <Link
                  to={`/Satupeta/Iklan`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Iklan
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Satupeta/Artikel`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Artikel
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/Satupeta/Bantuan`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Bantuan
                  </span>
                </Link>
              </li>
            
            </>
            ) : null
            } 
            {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
            <>
              <li>
                <Link
                  to={`/Satupeta/Color`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Color
                  </span>
                </Link>
              </li>
              <li className='mb-3'>
                <Link
                  to={`/Satupeta/Feedback`}
                  className="tsize-100 block py-1 btn-white-a flex"
                >
                  <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                  <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                    Feedback
                  </span>
                </Link>
              </li>
            </>
          ) : null
          } 
        </ul>
      </li>
      
      </>
      ) : null
      } 


       
        
       
      {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
      <>

      <p className={`text-sage-light  textsize12 duration-200 mb-2 mt-3  ${ !open && "hidden" }`}>Data Item</p>
      <li className={`-right-20 mb-1`}>
        {/* button */}
        <Link
          to={`/Komponen-Statik`}
          className="side-li flex tsize-100 text-white-a"
        >
            <MdDataset className="mt-1 text-red-500 tsize-150"  />
            <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Komponen Statik</span>
        </Link>
      </li>
      <li className={`-right-20 mb-5`}>
        {/* button */}
        <Link
          to={`/Log`}
          className="side-li flex tsize-100 text-white-a"
        >
            <MdDataset className="mt-1 text-red-500 tsize-150"  />
            <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Aktivitas</span>
        </Link>
      </li>
      
        </>
      ) : null
      }   
    </ul>
    </div>
  )
}

export default Sidebar
