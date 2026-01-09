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



const portal = "Portal Satu Admin";

const Sidebar = ({ itemmenu, username, usernick, userrole }) => {
  
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  
  const [open, setOpen] = useState(true);
  const [isOpenPenduduk, setIsOpenPenduduk] = React.useState(false);

  const [collapsed_satuportal, setCollapsed_SatuPortal] = useState(true);
  const [collapsed_opendata, setCollapsed_OpenData] = useState(true);
  const [collapsed_satupeta, setCollapsed_SatuPeta] = useState(false);

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
    // reset collapsed ketika role berubah
    setCollapsed_SatuPortal(true);
    setCollapsed_OpenData(true);
    setCollapsed_SatuPeta(false);
    if(itemmenu==="Satuportal Motto" || itemmenu==="Satuportal Iklan" || itemmenu==="Satuportal Visitor" || itemmenu==="Satuportal List" || itemmenu==="Satuportal Color"){
      setCollapsed_SatuPortal(false);
      setCollapsed_OpenData(true);
      setCollapsed_SatuPeta(true);
    }
    if(itemmenu==="Opendata Permohonan" || itemmenu==="Opendata Iklan" || itemmenu==="Opendata Artikel" || itemmenu==="Opendata Infografik" || itemmenu==="Opendata Bantuan" || itemmenu==="Opendata Color" || itemmenu==="Opendata Feedback"){
      setCollapsed_OpenData(false);
      setCollapsed_SatuPortal(true);
      setCollapsed_SatuPeta(true);
    }
    if(itemmenu==="Satupeta Lokasi" || itemmenu==="Satupeta Koleksi" || itemmenu==="Satupeta Titik" || itemmenu==="Satupeta Iklan" || itemmenu==="Satupeta Artikel" || itemmenu==="Satupeta Bantuan" || itemmenu==="Satupeta Color" || itemmenu==="Satupeta Feedback"){
      setCollapsed_SatuPeta(false);
      setCollapsed_OpenData(true);
      setCollapsed_SatuPortal(true);
    }
    if(itemmenu==="User" || itemmenu==="Dashboard" || itemmenu==="Komponen Statik" || itemmenu==="Aplikasi Terhubung" || itemmenu==="Bio Info" || itemmenu==="Log"){
      setCollapsed_SatuPeta(true);
      setCollapsed_OpenData(true);
      setCollapsed_SatuPortal(true);
    }

    // jika perlu set default menu lagi
    // setMenu(defaultMenuBasedOnRole(rolelogin));

  }, [rolelogin]);

  useEffect(() => {
    //getMenu();
  }, []);

  return (
    <>
    <div
      className={`
        group
        ${open ? "w-rem16" : "w-17 hover:w-rem16"}
        overflow-yy-auto
        box-border
        transition-[width]
        duration-300
        bg-linear-10 shadow-md border-2
        h-100v pt-2 relative z-8
        max-[680px]:hidden
      `}
    >
      {/* HEADER */}
      <div className="w-full gap-x-4 items-center py-1 pb-2 garis7 bg-linear-10" style={{height:"120px"}}>
        <img
          src="./logo.png"
          onClick={() => setOpen(!open)}
          className={`
            img-45 cursor-pointer mx-auto d-block
            duration-500
            ${open && "rotate-[360deg]"}
          `}
          title={open ? "Sembunyikan Menu" : "Tampilkan Menu"}
        />

        <div>
          <p
            className={`
              text-white text-center textsize12 font_weight600 mb-0
              transition-all duration-200
              ${open ? "block" : "hidden group-hover:block"}
            `}
          >
            SATU ADMIN
          </p>
          <p
            className={`
              text-white bg-red rad15 text-center textsize10 mx-2 mb-0 px-2
              transition-all duration-200
              ${open ? "block" : "hidden group-hover:block"}
            `}
          >
            KAB. PROBOLINGGO
          </p>
        </div>
      </div>

      {/* MENU */}
      <ul className="pt-6 pr-3 h-70v overflow-yy-auto" style={{ marginLeft: 5 }}>
        <p
          className={`
            text-sage-light textsize12 mb-2 transition-all duration-200
            ${open ? "block" : "hidden group-hover:block"}
          `}
        >
          Navigasi
        </p>

        {/* DASHBOARD */}
        <li>
          <Link
            to="/Dashboard"
            className={`side-li flex text-white-a ${itemmenu === "Dashboard" ? "active-menu" : ""}`}
          >
            <MdDashboard className="mt-1 text-orange-500 tsize-150" />
            <span
              className={`
                ml-1 mt-1 transition-all duration-200
                ${open ? "inline" : "hidden group-hover:inline"}
              `}
            >
              Dashboard
            </span>
          </Link>
        </li>

        {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
          <>
          <li className={`-right-20 mt-2`}>
            <Link
              to={`/Data-User`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "User" ? "active-menu" : ""
              }`}
            >
                <FaPeopleLine className="mt-1 text-teal-500 tsize-150"  />
                <span className={` ${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1 mb-2`}>Data Pengguna</span>
            </Link>
          </li>
          </>
        ) : null
        } 

        {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' || rolelogin==='CS' ? (
          <>
            <li className={`-right-20`}>
              <button
                onClick={toggleCollapse_OpenData}
                className="side-li flex tsize-100 w-full items-center justify-between"
                type="button"
              >
                <div className="flex items-center">
                  <FaClone className="mt-1 text-sky-500 tsize-150" />
                  <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1 text-white-a`}>
                    Open Data
                  </span>
                </div>
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

              <ul
                className={`pl-2 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
                  collapsed_opendata ? "max-h-0" : ""
                }`}
              >
                {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' ? (
                <>
                <li>
                  <Link
                    to={`/Opendata/Dataset/Permohonan`}
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Permohonan" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
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
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Iklan" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                      Iklan
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/Opendata/Artikel`}
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Artikel" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                      Artikel
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/Opendata/Infografik`}
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Infografik" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                      Infografik
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/Opendata/Bantuan`}
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Bantuan" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
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
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Color" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                      Warna Tema
                    </span>
                  </Link>
                </li>
                <li className='mb-3'>
                  <Link
                    to={`/Opendata/Feedback`}
                    className={`tsize-100 block py-1 btn-white-a flex ${
                      itemmenu === "Opendata Feedback" ? "active-menu" : ""
                    }`}
                  >
                    <FaClone className="mt-1 text-sky-500 tsize-150" />
                    <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
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

        {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd'  || rolelogin==='Verifikator Opd' ? (
          <>
          <li className={`-right-20`}>
            <button
              onClick={toggleCollapse_SatuPeta}
              className="side-li flex tsize-100 w-full items-center justify-between"
              type="button"
            >
              <div className="flex items-center">
                <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1 text-white-a`}>
                  Satu Peta
                </span>
              </div>
              
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

            <ul
              className={`pl-2 mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ${
                collapsed_satupeta ? "max-h-0" : "max-h-50"
              }`}
            >
              {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd'  || rolelogin==='Verifikator Opd' ? (
                <>
                  <li>
                    <Link
                      to={`/Satupeta/Lokasi-Peta`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Lokasi" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Lokasi Peta
                      </span>
                    </Link>
                  </li>
                </>
              ) : null
              } 
              {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd'  || rolelogin==='Verifikator Opd' ? (
                <>
                  <li>
                    <Link
                      to={`/Satupeta/Koleksi-Peta`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Koleksi" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Koleksi Peta
                      </span>
                    </Link>
                  </li>
                  {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd' ? (
                  <>
                  <li>
                    <Link
                      to={`/Satupeta/Titik-Lokasi-Peta`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Titik" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Titik Lokasi Peta
                      </span>
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      to={`/Satupeta/Geospasial`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Geospasial" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Geospasial
                      </span>
                    </Link>
                  </li>
                  </>
                   ):""}
                </>
              ) : null
              } 
              {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator' ? (
                <>
                  <li>
                    <Link
                      to={`/Satupeta/Iklan`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Iklan" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Iklan
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/Satupeta/Artikel`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Artikel" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Artikel
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/Satupeta/Bantuan`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Bantuan" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
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
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Color" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                        Warna Tema
                      </span>
                    </Link>
                  </li>
                  <li className='mb-3'>
                    <Link
                      to={`/Satupeta/Feedback`}
                      className={`tsize-100 block py-1 btn-white-a flex ${
                        itemmenu === "Satupeta Feedback" ? "active-menu" : ""
                      }`}
                    >
                      <FaMapMarkerAlt className="mt-1 text-yellow-500 tsize-150" />
                      <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
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

          <p className={`text-sage-light  textsize12 duration-200 mb-2 mt-3  ${ !open && "hidden" }`}>Lainnya</p>
          <li className={`-right-20 mb-1`}>
            <Link
              to={`/Komponen-Statik`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "Komponen Statik" ? "active-menu" : ""
              }`}
            >
                <MdDataset className="mt-1 text-red-500 tsize-150"  />
                <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>Komponen Statik</span>
            </Link>
          </li>
          <li>
            <Link
              to={`/Aplikasi-Terhubung`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "Aplikasi Terhubung" ? "active-menu" : ""
              }`}
            >
              <MdDataset className="mt-1 text-red-500 tsize-150"  />
              <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>
                Aplikasi Terhubung
              </span>
            </Link>
          </li>
          <li className={`-right-20 mb-1`}>
            <Link
              to={`/Bioinfo`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "Bio Info" ? "active-menu" : ""
              }`}
            >
                <MdDataset className="mt-1 text-red-500 tsize-150"  />
                <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>Bio Info</span>
            </Link>
          </li>
          
          <li className={`-right-20 mb-5`}>
            <Link
              to={`/Log`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "Log" ? "active-menu" : ""
              }`}
            >
                <MdDataset className="mt-1 text-red-500 tsize-150"  />
                <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>Aktivitas</span>
            </Link>
          </li>
          
            </>
          ) : null
        }   
        {rolelogin ==='Super Admin' || rolelogin==='Admin' || rolelogin==='Operator'  || rolelogin==='Operator Opd'  || rolelogin==='Verifikator Opd' ? (
          <li className={`-right-20 mb-5`}>
            <Link
              to={`/Rule-Informasi`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "Rule Informasi" ? "active-menu" : ""
              }`}
            >
                <MdDataset className="mt-1 text-red-500 tsize-150"  />
                <span className={`${open ? "inline" : "hidden group-hover:inline"} origin-left duration-300 ml-1 mt-1`}>Rule Informasi</span>
            </Link>
          </li>
        ) : null}

      </ul>
     <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          height: "20px",
          background: "#f8f9fa",
          textAlign: "center",
          zIndex: 999
        }}
        className={`w-100 textsize6 mx-1`}
      >
        <p className='mt-1'>@ 2026 Satu Admin Kab. Prob v 1.0.1</p>
      </div>
    </div>
    
    </>
  );


  /* return (
    <div className={` ${ open ? "w-rem16 " : "w-17" } bg-linear-10 shadow-md border-solid border-2 h-100v  pt-2 relative duration-300 z-8 max-[680px]:hidden  `} >
      
      <div className={` ${ open ? "w-46 " : "w-16" } gap-x-4 items-center py-1 pb-2  garis7  bg-linear-10`}>
        
        <img
          src="./logo.png"
          className={`${
            open ? "ml-1 mx-auto d-block" : "mt-1 mx-auto d-block"
          } img-45 cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          onClick={() => setOpen(!open)}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title={open ? "Sembunyikan Menu" : "Tampilkan Menu"}
        />
        <div>
          <p className={`text-white origin-left text-center  textsize12 font_weight600 duration-200 mb-0 ${ !open && "hidden" }`} >
            SATU ADMIN
          </p>
          <p className={`text-white bg-red rad15 text-center textsize10 duration-200 mx-2 mb-0 px-2 ${ !open && "hidden" }`} >
            KAB. PROBOLINGGO
          </p>
        </div>
      </div>
      <ul className="pt-6 pr-3  h-85v overflow-yy-auto" style={{ margin: "0px 0px 0px 5px"}}>
        <p className={`text-sage-light  textsize12 duration-200 mb-2  ${ !open && "hidden" }`}>Navigasi</p>
        <li className={`-right-20 `}>
          <Link
            to={`/Dashboard`}
            className={`side-li flex tsize-100 text-white-a ${
              itemmenu === "Dashboard" ? "active-menu" : ""
            }`}
          >
              <MdDashboard  className="mt-1 text-orange-500 tsize-150"  />
              <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1`}>Dashboard</span>
          </Link>
         
        </li>
        {rolelogin ==='Super Admin' || rolelogin==='Admin' ? (
          <>
          <li className={`-right-20 mt-2`}>
            <Link
              to={`/Data-User`}
              className={`side-li flex tsize-100 text-white-a ${
                itemmenu === "User" ? "active-menu" : ""
              }`}
            >
                <FaPeopleLine className="mt-1 text-teal-500 tsize-150"  />
                <span className={`${!open && "hidden"} origin-left duration-300 ml-1 mt-1 mb-2`}>Data Pengguna</span>
            </Link>
          </li>
          </>
        ) : null
        }
        
        


        

      

      


       
        
       
      
    </ul>
    </div>
  ) */
}

export default Sidebar
