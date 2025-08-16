import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../App.css";
import AccordionCard from './accordion/AccordionCard'
import PendudukModalTambah from "./penduduk/PendudukModalTambah2"
import PendudukModalEdit from "./penduduk/PendudukModalEdit"
import PendudukModalDelete from "./penduduk/PendudukModalDelete"

import { 
  IoChevronBackSharp ,
  IoChevronForward,
  IoLogoGoogle,
  IoPerson,
  IoInformationCircleOutline,
  IoGrid,
  IoSearchCircle,
  IoAlbums    

  } from "react-icons/io5";

  

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;

const Penduduklist = () => {
  const [pendudukku, setPenduduk] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  
  const [keywordkab, setKeywordKab] = useState("Probolinggo");
  const [keywordnama, setKeywordNama] = useState("");
  const [keywordnik, setKeywordNik] = useState("");
  const [keywordtgl_lahir, setKeywordTgl_Lahir] = useState("");
  const [keywordrole, setKeywordRole] = useState("");
  const [querynama, setQueryNama] = useState("");
  const [querynik, setQueryNik] = useState("");
  const [querytgl_lahir, setQueryTgl_Lahir] = useState("");
  const [queryrole, setQueryRole] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getPenduduk();
  }, [page, keywordnama, keywordnik, keywordtgl_lahir, keywordrole]);

  /*const getPenduduk = async () => {
    const response = await axios.get("http://localhost:5000/pendudukku2");
    setPenduduk(response.data);
  };*/
  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk?search_nama=${keywordnama}&search_nik=${keywordnik}&search_tgl_lahir=${keywordtgl_lahir}&search_role=${keywordrole}&page=${page}&limit=${limit}`
    );
    setPenduduk(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };
  
  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 49) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeywordNama(querynama);
    setKeywordNik(querynik);
    setKeywordTgl_Lahir(querytgl_lahir);
    setKeywordRole(queryrole);
  };

  
  return (
    
    <div className="bg-gray-200  max-h-screen  max-[640px]:mt-12  overflow-y-auto">
      <div className="col-span-6 rounded gap-x-6 grid grid-cols-1 grid-cols-6 h-14 bg-white mb-10">
        <p className="col-span-4 max-[640px]:col-span-3 tsize-110 font-semibold text-sky-600 flex pt-2"><IoAlbums  className="mt-2 mx-2"  />Data Penduduk</p>
        <p className="col-span-2 max-[640px]:col-span-3 tsize-70 font-semibold text-gray-500 flex flex-row-reverse pt-2 mt-2 mx-3">
          <NavLink to="/Dashboard" className="text-link-gray">Dashboard</NavLink> / <NavLink to="/Data-Penduduk" className="text-link-gray">Data Penduduk</NavLink>
        </p>
        <div className="col-span-6">
          <div className="garis2 garis1b"></div>
        </div>
      </div>
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6 drop-shadow-lg">
        <div className="md:col-span-2 grid grid-cols-1 grid-cols-6  bg-white  margin-0 rounded p-1">
          <div className="col-span-4 margin-0 align-center text-center p-2">
            <label className="flex block tsize-80 text-gray-500">Total Data 2024</label>
            <label className="tsize-110 font-bold">80</label>
          </div>
          <div className="col-span-2 align-center text-center bg-sky-600 px-2 py-2 rounded -mt-5 mb-4">
            <div className="block tsize-170 font-medium text-white">
              <IoInformationCircleOutline className="mt-2 mx-2"  />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 grid-cols-6  bg-white  margin-0 rounded p-1">
          <div className="col-span-4 margin-0 align-center text-center p-2">
            <label className="flex block tsize-80 text-gray-500">Total Keseluruhan</label>
            <label className="tsize-110 font-bold">{rows}</label>
          </div>
          <div className="col-span-2 align-center text-center bg-sky-600 px-2 py-2 rounded -mt-5 mb-4">
            <div className="block tsize-170 font-medium text-white">
              <IoInformationCircleOutline className="mt-2 mx-2"  />
            </div>
          </div>
        </div>
        
        
        <div className="md:col-span-2 margin-0 px-10 mt-4">
          <PendudukModalTambah/>
        
        </div>
        
      </div>
      
      <div className='w-full flex-1 flex items-center justify-center flex-col md:p-0 p-2'>
        <AccordionCard title={"Pencarian Data Dengan Kata Kunci"}>
          <form onSubmit={searchData} className="w-full">
            <div className="space-y-3 w-full">
              
              <div className="grid grid-cols sm:grid-cols-6 pb-4 w-full">
                
                
                <div className="col-span-6 rounded m-1 mt-3 p-2 grid grid-cols gap-x-6 gap-y-8 grid sm:grid-cols-6 drop-shadow-xl bg-white max-[640px]:w-full">
                
                  <div className="sm:col-span-3 -mt-5  px-2 ">
                    <label className="block tsize-80 font-medium text-gray-900">Nama Lengkap</label>
                    <div className="mt-1 flex">
                      <IoPerson className="mt-3 mx-2 text-cyan-500"  />
                      <input type="text"
                        className="input-gray tsize-80"
                        value={querynama}
                        onChange={(e) => setQueryNama(e.target.value)}
                        placeholder="Cari Nama Lengkap"/>
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-5  px-2 ">
                    <label className="block tsize-80 font-medium text-gray-900">Nama Panggilan</label>
                    <div className="mt-1 flex">
                      <IoPerson className="mt-3 mx-2 text-cyan-500"  />
                      <input type="text"
                        className="input-gray tsize-80"
                        value={querynik}
                        onChange={(e) => setQueryNik(e.target.value)}
                        placeholder="Cari Nama Panggilan"/>
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-5 px-2">
                    <label className="block tsize-80 font-medium text-gray-900">Tanggal Lahir</label>
                    <div className="mt-1 flex">
                      <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />
                      <input type="text"
                        className="input-gray tsize-80"
                        value={querytgl_lahir}
                        onChange={(e) => setQueryTgl_Lahir(e.target.value)}
                        placeholder="Tanggal Lahir"/>
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-5  px-2">
                    <label className="block tsize-80 font-medium text-gray-900">Role</label>
                    <div className="mt-1 flex">
                      <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />
                      <select
                        value={queryrole}
                        onChange={(e) => setQueryRole(e.target.value)}
                        className="input-gray tsize-80"
                      >
                        <option value="">Pilih Akses</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="mt-2 col-md:flex">
                      <button type="submit" className="col-span-3 openModalBtn bg-sky-400 m-1 tsize-80">Cari Data</button>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            
          </form>
          
        </AccordionCard>
      </div>
      <div className="sm:col-span-6 rounded sm:col-span-6 gap-x-6   p-2 bg-white">
            <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Penduduk</h2>
            <div className="garis garis1"></div>
            <div className="garis garis2"></div>
      </div>
      <div className='bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
        <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full  overflow-auto">
          <thead>
            <tr className=" bg-blue-50 text-white w-full">
              <th className="tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2">Nama</th>
              <th className="tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2">NIK</th>
              <th className="text-center tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-1">JK</th>
              <th className="text-center tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-1s">Status</th>
              <th className="text-center tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2s">Wilayah</th>
              
              <th className="text-center tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendudukku.map((penduduk,index) => (
              <tr key={penduduk.uuid} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-2">{penduduk.name}</td>
                <td className="tsize-80 border-slate-300 p-2 tracking-wide wp-2 truncate">{penduduk.nik}</td>
                <td className="text-center tsize-80 border-slate-300 tracking-wide wp-1">{penduduk.jk}</td>
                <td className="text-center tsize-80 border-slate-300 tracking-wide wp-1s">{penduduk.kepala_keluarga}</td>
                <td className="text-center tsize-80 border-slate-300 tracking-wide wp-2s truncate">Des. {penduduk.desa}, Kec. {penduduk.kecamatan}</td>
                
                <td className="justify-center justify-items-center tsize-80 border-slate-300 tracking-wide wp-1">
                <PendudukModalEdit
                      id={penduduk.id}
                      name={penduduk.name}
                      nik={penduduk.nik}
                      tgl_lahir={penduduk.tgl_lahir}
                      tempat_lahir={penduduk.tempat_lahir}
                      jk={penduduk.jk}
                      status_kawin={penduduk.status_kawin}
                      agama={penduduk.agama}
                      pendidikan={penduduk.pendidikan}
                      kepala_keluarga={penduduk.kepala_keluarga}
                      kabupaten={penduduk.kabupaten}
                      kecamatan={penduduk.kecamatan}
                      desa={penduduk.desa}
                  />
                  <PendudukModalDelete
                      id={penduduk.uuid}
                      name={penduduk.name}
                  />
                  
                </td>
                
              </tr>
            ))}
            <tr className=" bg-blue-50 text-white w-full h-3">
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-2"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-2"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-1"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-1s"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-2s"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-1"></th>
            </tr>
          </tbody>
          
        </table>

        <p>
          Total Data: <span className="text-sky-600">{rows}</span> Halaman:  <span className="text-sky-600">{rows ? page + 1 : 0}</span> Dari  <span className="text-sky-600">{pages}</span>
        </p>
        <p className="has-text-centered has-text-danger">{msg}</p>
        <div className=" item-center content-center mb-10 -mt-10">
          <nav
            className="pagination is-centered"
            key={rows}
            role="navigation"
            aria-label="Pagination"
          >
            <ReactPaginate
              previousLabel={
                <span className="block border-2 border-solid border-indigo-200  hover:bg-indigo-500 hover:text-white w-8 h-8 flex items-center justify-center bg-lightGray rounded-md">
                  <IoChevronBackSharp />
                </span>
              }
              nextLabel={
                <span className="block border-2 border-solid border-indigo-200 hover:bg-indigo-500 hover:text-white w-8 h-8 flex items-center justify-center bg-lightGray rounded-md">
                  <IoChevronForward />
                </span>
              }
              pageCount={Math.min(50, pages)}
              onPageChange={changePage}
              containerClassName="flex items-center justify-center mt-8 mb-4 mx-auto"
              pageClassName="block border-2 text-blue border-solid border-indigo-200 hover:bg-indigo-500 hover:text-white mx-1 w-8 h-8 flex items-center justify-center rounded-md"
              activeClassName="btn-skyku"
              //pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              //activeLinkClassName={"btn-blueku"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>     
        </div>
        
      </div>
    </div>
  );
};

export default Penduduklist;
