import React, { useState } from 'react'
//import AccordionMenu from './accordion/AccordionMenu'
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronDown, LuDatabase, LuLayoutDashboard, LuCircleUser  } from 'react-icons/lu';
import { FaBuildingColumns, FaCircleUser, FaClipboardUser, FaPeopleLine } from "react-icons/fa6";
import {
    IoSearchCircle   

    } from "react-icons/io5";

import "../App.css";
import { MdCategory, MdDashboard, MdDataset } from 'react-icons/md';
import { FaClone, FaGg, FaMapMarkerAlt } from 'react-icons/fa';

const Sidebar = (props) => {
  const username = props.username;
  const usernick = props.usernick;
  const userrole = props.userrole;
  const [open, setOpen] = useState(true);
  const [isOpenPenduduk, setIsOpenPenduduk] = React.useState(false);

  const [collapsed_satuportal, setCollapsed_SatuPortal] = useState(true);
  const [collapsed_opendata, setCollapsed_OpenData] = useState(true);
  const [collapsed_satupeta, setCollapsed_SatuPeta] = useState(true);

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



  return (
    <div className={` ${ open ? "w-rem12 " : "w-16 " } bg-linear-10 shadow-md border-solid border-2 h-100v overflow-yy-auto  pt-2 relative duration-300 z-8 max-[680px]:hidden  `} >
      {/*<img src="/assetku/control.png" className={`absolute cursor-pointer -right-3 top-9 w-7  border-dark-purple
          border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)} />*/}
      <div className={` ${ open ? "w-46 " : "w-16 " } gap-x-4 items-center py-1  garis7`}>
        
        <img src="/assetku/logo-kab-probolinggo.png" className={` ${ open ? "ml-1 mx-auto d-block " : " mt-1 mx-auto d-block" } img-40 cursor-pointer duration-500 ${ open && "rotate-[360deg]" }`} onClick={() => setOpen(!open)}  />
        <div>
          <p className={`text-white origin-left text-center  textsize10 font_weight600 duration-200 mb-0 ${ !open && "hidden" }`} >
            SATU ADMIN
          </p>
          <p className={`text-white bg-red rad15 text-center textsize8 duration-200 mb-0 px-2 ${ !open && "hidden" }`} >
            KAB. PROBOLINGGO
          </p>
        </div>
      </div>
      <ul className="pt-6 " style={{ margin: "0px 0px 0px -20px"}}>
        <p className={`text-sage-light  textsize8 duration-200 mb-2  ${ !open && "hidden" }`}>Navigasi</p>
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Dashboard">
              <MdDashboard  className="mt-1 text-orange-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Dashboard</span>
          </a>
        </li>
        <li className={`-right-20`}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-User">
              <FaPeopleLine className="mt-1 text-teal-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Data Pengguna</span>
          </a>
        </li>


        <li className={`-right-20`}>
        {/* tombol utama */}
        <button
          onClick={toggleCollapse_SatuPortal}
          className="side-li flex tsize-70 w-full items-center justify-between"
          type="button"
        >
          <div className="flex items-center">
            <FaGg className="mt-1 text-red-500 tsize-150" />
            <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
              Satu Portal
            </span>
          </div>
          {/* icon panah collapse */}
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-300 ${
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
          className={`pl-5 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
            collapsed_satuportal ? "max-h-0" : "max-h-40"
          }`}
        >
          <li>
            <a
              href="/Satuportal/Motto"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaGg className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                Satu Portal Motto
              </span>
              
            </a>
          </li>
          <li>
            <a
              href="/Satuportal/Iklan"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaGg className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                Satu Portal Iklan
              </span>
              
            </a>
          </li>
          <li>
            <a
              href="/Satuportal/Visitor"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaGg className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                 Satu Portal Visitor
              </span>
             
            </a>
          </li>
          <li>
            <a
              href="/Satuportal/List"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaGg className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                 Satu Portal List
              </span>
             
            </a>
          </li>
          <li>
            <a
              href="/Satuportal/Setting"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaGg className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                 Satu Portal Setting
              </span>
             
            </a>
          </li>
        </ul>
      </li>


      <li className={`-right-20`}>
        {/* tombol utama */}
        <button
          onClick={toggleCollapse_OpenData}
          className="side-li flex tsize-70 w-full items-center justify-between"
          type="button"
        >
          <div className="flex items-center">
            <FaClone className="mt-1 text-red-500 tsize-150" />
            <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
              Open Data
            </span>
          </div>
          {/* icon panah collapse */}
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-300 ${
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
          className={`pl-5 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
            collapsed_opendata ? "max-h-0" : "max-h-40"
          }`}
        >
          <li>
            <a
              href="/Opendata/Iklan"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaClone className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                Open Data Iklan
              </span>
              
            </a>
          </li>
          <li>
            <a
              href="/Opendata/Setting"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaClone className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                Open Data Setting
              </span>
              
            </a>
          </li>
          <li>
            <a
              href="/Opendata/Dataset"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaClone className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                 Open Data Dataset
              </span>
             
            </a>
          </li>
        </ul>
      </li>


      <li className={`-right-20`}>
        {/* tombol utama */}
        <button
          onClick={toggleCollapse_SatuPeta}
          className="side-li flex tsize-70 w-full items-center justify-between"
          type="button"
        >
          <div className="flex items-center">
            <FaMapMarkerAlt className="mt-1 text-red-500 tsize-150" />
            <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
              Satu Peta
            </span>
          </div>
          {/* icon panah collapse */}
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-300 ${
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
          className={`pl-5 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
            collapsed_satupeta ? "max-h-0" : "max-h-40"
          }`}
        >
          <li>
            <a
              href="/Satupeta/Iklan"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaMapMarkerAlt className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                Satu Peta Iklan
              </span>
              
            </a>
          </li>
          <li>
            <a
              href="/Satupeta/Setting"
              className="tsize-70 block py-1 text-white-a flex"
            >
              <FaMapMarkerAlt className="mt-1 text-white tsize-150" />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>
                Satu Peta Setting
              </span>
              
            </a>
          </li>
        </ul>
      </li>


       
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Komponen">
              <MdDataset className="mt-1 text-red-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Komponen</span>
          </a>
        </li>
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-Images">
              <MdDataset className="mt-1 text-red-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Images</span>
          </a>
        </li>
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-Location_Maplist">
              <MdDataset className="mt-1 text-red-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Location Maplist</span>
          </a>
        </li>
        
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-Satkercode">
              <MdDataset className="mt-1 text-red-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Satker Code</span>
          </a>
        </li>


        <p className={`text-sage-light  textsize8 duration-200 mb-2 mt-3  ${ !open && "hidden" }`}>Data Item</p>
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-Bio">
              <MdCategory className="mt-1 text-cyan-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Bio</span>
          </a>
        </li>
        <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-Kategori">
              <MdCategory className="mt-1 text-cyan-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Kategori Sektoral</span>
          </a>
        </li>
         <li className={`-right-20 `}>
          {/* button */}
          <a className="side-li flex tsize-70" href="/Data-Produsen">
              <FaBuildingColumns className="mt-1 text-cyan-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Produsen</span>
          </a>
        </li>

        <li className={`-right-20 `}>
            {/* a */}
            <a className="side-li flex tsize-70" onClick={toggleAccordion}>
                <LuDatabase  className="mt-1 text-sky-500 tsize-150"  />
                <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Kependudukan</span>
                <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpenPenduduk ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}>
                    <LuChevronDown  className={`${!open && "hidden"} tsize-50 w-6 h-4 ${isOpenPenduduk ? "text-gray-50" : "text-white"}`} />
                </motion.span>
            </a>
            <AnimatePresence>
              {isOpenPenduduk && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
                    className='overflow-hidden'>
                    <ul className='-ml-5'>
                      <li>
                        <a className="side-li flex tsize-70" href="/Data-Penduduk">
                            <LuDatabase className="mt-1 text-sky-500 tsize-150"  />
                            <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Data Penduduk</span>
                        </a>
                      </li>
                      <li>
                        <a className="side-li flex tsize-70" href="/Data-Penduduk-Kecamatan">
                            <LuDatabase className="mt-1 text-sky-500 tsize-150"  />
                            <span className={`${!open && "hidden"} origin-left duration-300 -ml-3`}>Data Per Kecamatan</span>
                        </a>
                      </li>
                    </ul>
                </motion.div>
              )}
            </AnimatePresence>
        </li>
        
      </ul>
    </div>
  )
}

export default Sidebar
