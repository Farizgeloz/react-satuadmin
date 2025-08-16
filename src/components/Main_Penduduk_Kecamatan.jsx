import React, { useRef,useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import "../App.css";
import AccordionCard from './accordion/AccordionCard'



//import ChartColumn_Kecamatan from "./chartku/kecamatan/ChartColumn_Kec";
import Tabel_Penduduk_Kec_Kawin from "./tabelku/Tabel_Penduduk_Kec_Kawin";
import Tabel_Penduduk_Kec_Jk from "./tabelku/Tabel_Penduduk_Kec_Jk";
import Tabel_Penduduk_Kec_Agama from "./tabelku/Tabel_Penduduk_Kec_Agama";

import { 
  IoPerson,
  IoInformationCircleOutline,
  IoGrid,
  IoAlbums,
  IoChevronBackSharp ,
  IoChevronForward,
  IoSearchCircle

  } from "react-icons/io5";

  

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;

const PendudukKecamatanlist = () => {
  const [pendudukku, setPenduduk] = useState([]);
  const [row_kecamatanku, setRowsKecamatan] = useState([]);
  const [row_kecamatanku2, setRowsKecamatan2] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [msg, setMsg] = useState("");

  const [chart_kec_kawin, setChart_Kec_Kawin] = useState([]);
  const [tabel_kec_kawin, setTabel_Kec_Kawin] = useState([]);
  const [page_kawin, setPage_Kawin] = useState(0);
  const [pages_kawin, setPages_Kawin] = useState(0);
  const [rows_kawin, setRows_Kawin] = useState(0);
  const [msg_kawin, setMsg_Kawin] = useState("");

  const [chart_kec_jk, setChart_Kec_Jk] = useState([]);
  const [tabel_kec_jk, setTabel_Kec_Jk] = useState([]);
  const [page_jk, setPage_Jk] = useState(0);
  const [pages_jk, setPages_Jk] = useState(0);
  const [rows_jk, setRows_Jk] = useState(0);
  const [msg_jk, setMsg_Jk] = useState("");

  const [chart_kec_agama, setChart_Kec_Agama] = useState([]);
  const [tabel_kec_agama, setTabel_Kec_Agama] = useState([]);
  const [page_agama, setPage_Agama] = useState(0);
  const [pages_agama, setPages_Agama] = useState(0);
  const [rows_agama, setRows_Agama] = useState(0);
  const [msg_agama, setMsg_Agama] = useState("");

  const [chart_kec_pendidikan, setChart_Kec_Pendidikan] = useState([]);
  const [tabel_kec_pendidikan, setTabel_Kec_Pendidikan] = useState([]);
  const [page_pendidikan, setPage_Pendidikan] = useState(0);
  const [pages_pendidikan, setPages_Pendidikan] = useState(0);
  const [rows_pendidikan, setRows_Pendidikan] = useState(0);
  const [msg_pendidikan, setMsg_Pendidikan] = useState("");

  const [chart_kec_umur, setChart_Kec_Umur] = useState([]);
  const [tabel_kec_umur, setTabel_Kec_Umur] = useState([]);
  const [page_umur, setPage_Umur] = useState(0);
  const [pages_umur, setPages_Umur] = useState(0);
  const [rows_umur, setRows_Umur] = useState(0);
  const [msg_umur, setMsg_Umur] = useState("");

  const [keywordkecamatan, setKeywordKecamatan] = useState("");
  const [input_search_kecamatan, setInputSearchKecamatan] = useState("");
  const [list_kecamatanku, setListKecamatanku] = useState([]);
  const [isFocusKecamatan, setIsFocusKecamatan] = useState(false);
	const [isHoveredKecamatan, setIsHoveredKecamatan] = useState(false);
	const inputRefKecamatan = useRef();

  useEffect(() => {
    getPenduduk();
    getKecamatan();
  }, [page,page_kawin,page_jk,page_agama,page_pendidikan,page_umur,keywordkecamatan]);

  const getKecamatan = async () => {
    const response = await axios.get(
      apiurl+`get_kecamatan`
    );
    setListKecamatanku(response.data.result);
  };

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk_kecamatan?search_kecamatan=${keywordkecamatan}&page=${page}&limit=${limit}&page_kawin=${page_kawin}&page_jk=${page_jk}&page_agama=${page_agama}&page_pendidikan=${page_pendidikan}&page_umur=${page_umur}`
    );
    setPenduduk(response.data.result);
    setRowsKecamatan(response.data.result);
    setRowsKecamatan2(response.data.result2);
    setPage(response.data.page);
    setPages(response.data.totalpage);
    setRows(response.data.totalrows);

    setChart_Kec_Kawin(response.data.chart_result_kawin);
    setTabel_Kec_Kawin(response.data.tabel_result_kawin);
    setPage_Kawin(response.data.page_kawin);
    setPages_Kawin(response.data.totalpage_kawin);
    setRows_Kawin(response.data.totalrows_kawin);

    setChart_Kec_Jk(response.data.chart_result_jk);
    setTabel_Kec_Jk(response.data.tabel_result_jk);
    setPage_Jk(response.data.page_jk);
    setPages_Jk(response.data.totalpage_jk);
    setRows_Jk(response.data.totalrows_jk);

    setChart_Kec_Agama(response.data.chart_result_agama);
    setTabel_Kec_Agama(response.data.tabel_result_agama);
    setPage_Agama(response.data.page_agama);
    setPages_Agama(response.data.totalpage_agama);
    setRows_Agama(response.data.totalrows_agama);

    setChart_Kec_Pendidikan(response.data.chart_result_pendidikan);
    setTabel_Kec_Pendidikan(response.data.tabel_result_pendidikan);
    setPage_Pendidikan(response.data.page_pendidikan);
    setPages_Pendidikan(response.data.totalpage_pendidikan);
    setRows_Pendidikan(response.data.totalrows_pendidikan);

    setChart_Kec_Umur(response.data.chart_result_umur);
    setTabel_Kec_Umur(response.data.tabel_result_umur);
    setPage_Umur(response.data.page_umur);
    setPages_Umur(response.data.totalpage_umur);
    setRows_Umur(response.data.totalrows_umur);
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

  const changePage_Kawin = ({ selected }) => {
    setPage_Kawin(selected);
    if (selected === 49) {
      setMsg_Kawin(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg_Kawin("");
    }
  };

  const changePage_Jk = ({ selected }) => {
    setPage_Jk(selected);
    if (selected === 49) {
      setMsg_Jk(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg_Jk("");
    }
  };
  const changePage_Agama = ({ selected }) => {
    setPage_Agama(selected);
    if (selected === 49) {
      setMsg_Agama(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg_Agama("");
    }
  };
  const changePage_Pendidikan = ({ selected }) => {
    setPage_Pendidikan(selected);
    if (selected === 49) {
      setMsg_Pendidikan(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg_Pendidikan("");
    }
  };

  const changePage_Umur = ({ selected }) => {
    setPage_Umur(selected);
    if (selected === 49) {
      setMsg_Umur(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg_Umur("");
    }
  };

  const data_kecamatan= row_kecamatanku.map((kecamatanx, index) => (
      {
          name: [kecamatanx.kecamatan],
          data: [kecamatanx.count_kecamatan]
          
      }
  ));
  const data_kecamatan2= row_kecamatanku2.map((kecamatanx2, index) => (
    {
        name: [kecamatanx2.kecamatan],
        y: kecamatanx2.count_kecamatan
        
    }
));

  const data_list_kawin= chart_kec_kawin.map((kawinx, index) => (
      {
          name: [kawinx.kecamatan]+"-"+[kawinx.status_kawin],
          data: [kawinx.count_kawin]
          
      }
  ));

  const data_list_jk= chart_kec_jk.map((jkx, index) => (
    {
        name: [jkx.kecamatan]+"-"+[jkx.jk],
        data: [jkx.count_jk]
        
    }
  ));

  const data_list_agama= chart_kec_agama.map((agamax, index) => (
    {
        name: [agamax.kecamatan]+"-"+[agamax.agama],
        data: [agamax.count_agama]
        
    }
  ));

  const data_list_pendidikan= chart_kec_pendidikan.map((pendidikanx, index) => (
    {
        name: [pendidikanx.kecamatan]+"-"+[pendidikanx.pendidikan],
        data: [pendidikanx.count_pendidikan]
        
    }
  ));

  const data_list_umur= chart_kec_umur.map((umurx, index) => (
    {
        name: [umurx.kecamatan]+"-"+[umurx.tgl_lahir],
        data: [umurx.count_tgl_lahir]
        
    }
  ));
  


  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setPage_Kawin(0);
    setPage_Jk(0);
    setPage_Agama(0);
    setPage_Pendidikan(0);
    setPage_Umur(0);
    setMsg("");
    setKeywordKecamatan(input_search_kecamatan);
  };

  
  return (
    
    <div className="bg-gray-200  max-h-screen  max-[640px]:mt-12  overflow-y-auto  grid grid-cols-1 grid-cols-6">
      <div className="col-span-6 rounded gap-x-6 grid grid-cols-1 grid-cols-6 h-14 bg-white mb-2">
        <p className="col-span-3 max-[640px]:col-span-3 tsize-110 font-semibold text-sky-600 flex pt-2"><IoAlbums  className="mt-2 mx-2"  />Data Penduduk Kecamatan</p>
        <p className="col-span-3 max-[640px]:col-span-3 tsize-70 font-semibold text-gray-500 flex flex-row-reverse pt-2 mt-2 mx-3">
          <NavLink to="/Dashboard" className="text-link-gray">Dashboard</NavLink> / <NavLink to="/Data-Penduduk" className="text-link-gray">Data Penduduk</NavLink> / <NavLink to="/Data-Penduduk" className="text-link-gray">Kecamatan</NavLink>
        </p>
        <div className="col-span-6">
          <div className="garis2 garis1b"></div>
        </div>
      </div>
{/*------------------------PENCARIAN DATA KECAMATAN--------------------------*/}       
      <div className='col-span-6 w-full flex-1 flex items-center justify-center flex-col md:p-0 p-2'>
        <AccordionCard title={"Pencarian Data Dengan Kata Kunci"}>
          <form onSubmit={searchData} className="w-full">
            <div className="space-y-3 w-full">
              
              <div className="grid grid-cols sm:grid-cols-6 pb-4 w-full">
                <div className="col-span-6 rounded m-1 mt-3 p-2 grid grid-cols gap-x-6 gap-y-8 grid sm:grid-cols-6 drop-shadow-xl bg-white max-[640px]:w-full">
                  <div className="md:col-span-3 col-span-10 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                      <IoSearchCircle className="mt-2 mx-2 text-cyan-500"  />Kecamatan
                    </label>
                    <div className="mt-2">
                        <input
                          className="input-gray tsize-90"
                          placeholder="Kecamatan"
                          onFocus={() => setIsFocusKecamatan(true)}
                          onBlur={() => {
                            if (!isHoveredKecamatan) {
                              setIsFocusKecamatan(false);
                            }
                          }}
                          value={input_search_kecamatan}
                          onChange={(e) => setInputSearchKecamatan(e.target.value)}
                          ref={inputRefKecamatan}
                        />
                        {isFocusKecamatan && (
                          <div
                            className="bg-white border-2 border-gray-200 rounded text-gray-600 absolute w-3/6 max-height1"
                            onMouseEnter={() => {
                              setIsHoveredKecamatan(true);
                            }}
                            onMouseLeave={() => {
                              setIsHoveredKecamatan(false);
                            }}
                          >
                            {list_kecamatanku.map((suggestion, index) => {
                              const isMatchKecamatan =
                                suggestion.kecamatan.toLowerCase().indexOf(input_search_kecamatan.toLowerCase()) >
                                -1;
                              return (
                                <div key={index} className="">
                                  {isMatchKecamatan && (
                                    <div
                                      className="p-2 hover:bg-sky-600 hover:text-white cursor-pointer rounded"
                                      onClick={() => {
                                        setInputSearchKecamatan(suggestion.kecamatan);
                                        inputRefKecamatan.current.focus();
                                      }}
                                    >
                                      {suggestion.kecamatan}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
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

{/*------------------------DATA KECAMATAN--------------------------*/}      
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6  bg-white drop-shadow-lg">
        <div className="md:col-span-4 col-span-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              { 
                /*chart: {
                  type: "bar",
                  name:"coba"
                },
                title: {
                  text: "Diagram Kecamatan",
                },
                xAxis: {
                  categories: ["Kecamatan"]
                },
                series:data_kecamatan2*/
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
                },
                title: {
                    text: 'Diagram Per Kecamatan'
                },
                tooltip: {
                  pointFormat: '{series.name}:{point.y} (<b>{point.percentage:.1f}%</b>)'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: [{
                          enabled: true,
                          distance: 0,
                          style: {
                            fontSize: '0.5em',
                            opacity: 0.7
                        },
                      }, 
                      {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '0.5em',
                            opacity: 0.7
                        },
                        /*filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }*/
                        
                      }],
                      cursor: 'pointer',
                      showInLegend: true

                    }
                },
                series: [{
                    name: 'Total',
                    colorByPoint: true,
                    data: data_kecamatan2
                }],
                legend: {
                    enabled: true,
                   
                    itemStyle: {
                            color: '#000',
                            fontFamily: 'MuseoS500',
                            fontSize: '70%'
                    }
                }
              }      
                
            }
            containerProps={{ style: { height: "100%" } }}
          />
        </div>
        <div className='md:col-span-2 col-span-6 drop-shadow-lg overflow-auto mb-1 p-2'>
          <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
                <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Penduduk</h2>
                <div className="garis garis1"></div>
                <div className="garis garis2"></div>
          </div>
          <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
            <thead>
              <tr className=" bg-blue-50 text-white w-full">
                <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-5">Kecamatan</th>
                <th className="text-center tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3 text-center">n</th>
              </tr>
            </thead>
            <tbody>
              {pendudukku.map((penduduk,index) => (
                <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                  <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-5">{penduduk.kecamatan}</td>
                  <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3 text-center">{penduduk.count_kecamatan}</td>
                  
                </tr>
              ))}
              <tr className=" bg-blue-50 text-white w-full h-3">
                <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-5"></th>
                <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
              </tr>
            </tbody>
            
          </table>
          <p>
            Total Data: <span className="text-sky-600">{rows}</span> Halaman:  <span className="text-sky-600">{rows ? page + 1 : 0}</span> Dari  <span className="text-sky-600">{pages}</span>
          </p>
          <div className=" item-center content-center mb-2">
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
{/*------------------------STATUS PERKAWINAN--------------------------*/}
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6  bg-white drop-shadow-lg">
        <div className="md:col-span-3 col-span-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              { 
                chart: {
                  type: "bar",
                  name:"coba"
                },
                title: {
                  text: "Diagram Status Kawin",
                },
                
                xAxis: {
                  categories: [""]
                },
                tooltip: {
                  valueSuffix: '{point.data} jiwa'
                },
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                series:data_list_kawin,
                legend: {
                    enabled: true,
                   
                    itemStyle: {
                            color: '#000',
                            fontFamily: 'MuseoS500',
                            fontSize: '70%'
                    }
                }
              }      
                
            }
            containerProps={{ style: { height: "600px" } }}
          />
        </div>
        
        <div className="md:col-span-3 col-span-6 p-2 drop-shadow-lg">
          <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
            <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
                  <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Status Kawin</h2>
                  <div className="garis garis1"></div>
                  <div className="garis garis2"></div>
            </div>
            <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
              <thead>
                <tr className=" bg-blue-50 text-white w-full">
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Kecamatan</th>
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Status Kawin</th>
                  
                  <th className="text-center tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2">n</th>
                </tr>
              </thead>
              <tbody>
                {tabel_kec_kawin.map((penduduk_kec_kawinx,index) => (
                  <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_kawinx.kecamatan}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_kawinx.status_kawin}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-2 text-center">{penduduk_kec_kawinx.count_kawin}</td>
                    
                  </tr>
                ))}
                <tr className=" bg-blue-50 text-white w-full h-3">
                  <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
                  <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
                  <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-2"></th>
                </tr>
              </tbody>
              
            </table>
            <p>
              Total Data: <span className="text-sky-600">{rows_kawin}</span> Halaman:  <span className="text-sky-600">{rows_kawin ? page_kawin + 1 : 0}</span> Dari  <span className="text-sky-600">{pages_kawin}</span>
            </p>
            <div className=" item-center content-center mb-5">
              <nav
                className="pagination is-centered"
                key={rows_kawin}
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
                  pageCount={Math.min(50, pages_kawin)}
                  onPageChange={changePage_Kawin}
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
      </div>
{/*------------------------JENIS KELAMIN--------------------------*/}
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6  bg-white drop-shadow-lg">
        <div className="md:col-span-3 col-span-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              { 
                chart: {
                  type: "bar",
                  name:"coba"
                },
                title: {
                  text: "Diagram Jenis Kelamin",
                },
                xAxis: {
                  categories: [""]
                },
                tooltip: {
                  valueSuffix: '{point.data} jiwa'
                },
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                series:data_list_jk,
                legend: {
                    enabled: true,
                   
                    itemStyle: {
                            color: '#000',
                            fontFamily: 'MuseoS500',
                            fontSize: '70%'
                    }
                }
              }      
                
            }
            containerProps={{ style: { height: "600px" } }}
          />
        </div>
        
        <div className="md:col-span-3 col-span-6 p-2 drop-shadow-lg">
          <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
            <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
                  <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Jenis Kelamin</h2>
                  <div className="garis garis1"></div>
                  <div className="garis garis2"></div>
            </div>
            <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
              <thead>
                <tr className=" bg-blue-50 text-white w-full">
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-5">Kecamatan</th>
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2 text-center">JK</th>
                  <th className="text-center tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3  text-center">n</th>
                </tr>
              </thead>
              <tbody>
                {tabel_kec_jk.map((penduduk_kec_jkx,index) => (
                  <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-5">{penduduk_kec_jkx.kecamatan}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-2 text-center">{penduduk_kec_jkx.jk}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3 text-center">{penduduk_kec_jkx.count_jk}</td>
                    
                  </tr>
                ))}
                <tr className=" bg-blue-50 text-white w-full h-3">
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-5"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-2"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                </tr>
              </tbody>
              
            </table>
            <p>
              Total Data: <span className="text-sky-600">{rows_jk}</span> Halaman:  <span className="text-sky-600">{rows_jk ? page_jk + 1 : 0}</span> Dari  <span className="text-sky-600">{pages_jk}</span>
            </p>
            <div className=" item-center content-center mb-5">
              <nav
                className="pagination is-centered"
                key={rows_jk}
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
                  pageCount={Math.min(50, pages_jk)}
                  onPageChange={changePage_Jk}
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
      </div>
{/*------------------------Status Agama--------------------------*/}
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6  bg-white drop-shadow-lg">
        <div className="md:col-span-3 col-span-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              { 
                chart: {
                  type: "bar",
                  name:"coba"
                },
                title: {
                  text: "Diagram Status Agama",
                },
                xAxis: {
                  categories: [""]
                },
                tooltip: {
                  valueSuffix: '{point.data} jiwa'
                },
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                series:data_list_agama,
                legend: {
                    enabled: true,
                   
                    itemStyle: {
                            color: '#000',
                            fontFamily: 'MuseoS500',
                            fontSize: '70%'
                    }
                }
              }      
                
            }
            containerProps={{ style: { height: "600px" } }}
          />
        </div>
        
        <div className="md:col-span-3 col-span-6 p-2 drop-shadow-lg">
          <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
            <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
                  <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Status Agama</h2>
                  <div className="garis garis1"></div>
                  <div className="garis garis2"></div>
            </div>
            <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
              <thead>
                <tr className=" bg-blue-50 text-white w-full">
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Kecamatan</th>
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">Agama</th>
                  <th className="text-center tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">n</th>
                </tr>
              </thead>
              <tbody>
                {tabel_kec_agama.map((penduduk_kec_agamax,index) => (
                  <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_agamax.kecamatan}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3">{penduduk_kec_agamax.agama}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3 text-center">{penduduk_kec_agamax.count_agama}</td>
                    
                  </tr>
                ))}
                <tr className=" bg-blue-50 text-white w-full h-3">
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                </tr>
              </tbody>
              
            </table>
            <p>
              Total Data: <span className="text-sky-600">{rows_agama}</span> Halaman:  <span className="text-sky-600">{rows_agama ? page_agama + 1 : 0}</span> Dari  <span className="text-sky-600">{pages_agama}</span>
            </p>
            <div className=" item-center content-center mb-5">
              <nav
                className="pagination is-centered"
                key={rows_agama}
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
                  pageCount={Math.min(50, pages_agama)}
                  onPageChange={changePage_Agama}
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
      </div>      
{/*------------------------JENJANG PENDIDIKAN--------------------------*/}
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6  bg-white drop-shadow-lg">
        <div className="md:col-span-3 col-span-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              { 
                chart: {
                  type: "bar",
                  name:"coba"
                },
                title: {
                  text: "Diagram Jenjang Pendidikan",
                },
                xAxis: {
                  categories: [""]
                },
                tooltip: {
                  valueSuffix: '{point.data} jiwa'
                },
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                series:data_list_pendidikan,
                legend: {
                    enabled: true,
                   
                    itemStyle: {
                            color: '#000',
                            fontFamily: 'MuseoS500',
                            fontSize: '70%'
                    }
                }
              }      
                
            }
            containerProps={{ style: { height: "600px" } }}
          />
        </div>
        
        <div className="md:col-span-3 col-span-6 p-2 drop-shadow-lg">
          <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
            <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
                  <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Jenjang Pendidikan</h2>
                  <div className="garis garis1"></div>
                  <div className="garis garis2"></div>
            </div>
            <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
              <thead>
                <tr className=" bg-blue-50 text-white w-full">
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Kecamatan</th>
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">Agama</th>
                  <th className="text-center tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">n</th>
                </tr>
              </thead>
              <tbody>
                {tabel_kec_pendidikan.map((penduduk_kec_pendidikanx,index) => (
                  <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_pendidikanx.kecamatan}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3">{penduduk_kec_pendidikanx.pendidikan}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3 text-center">{penduduk_kec_pendidikanx.count_pendidikan}</td>
                    
                  </tr>
                ))}
                <tr className=" bg-blue-50 text-white w-full h-3">
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                </tr>
              </tbody>
              
            </table>
            <p>
              Total Data: <span className="text-sky-600">{rows_pendidikan}</span> Halaman:  <span className="text-sky-600">{rows_pendidikan ? page_pendidikan + 1 : 0}</span> Dari  <span className="text-sky-600">{pages_pendidikan}</span>
            </p>
            <div className=" item-center content-center mb-5">
              <nav
                className="pagination is-centered"
                key={rows_pendidikan}
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
                  pageCount={Math.min(50, pages_pendidikan)}
                  onPageChange={changePage_Pendidikan}
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
      </div>      
{/*------------------------RANGE UMUR--------------------------*/}
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-3 gap-y-1 md:grid-cols-6  bg-white drop-shadow-lg">
        <div className="md:col-span-3 col-span-6 p-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={
              { 
                chart: {
                  type: "bar",
                  name:"coba"
                },
                title: {
                  text: "Diagram Range Umur",
                },
                xAxis: {
                  categories: [""]
                },
                tooltip: {
                  valueSuffix: '{point.data} jiwa'
                },
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                series:data_list_umur,
                legend: {
                    enabled: true,
                   
                    itemStyle: {
                            color: '#000',
                            fontFamily: 'MuseoS500',
                            fontSize: '70%'
                    }
                }
              }      
                
            }
            containerProps={{ style: { height: "600px" } }}
          />
        </div>
        
        <div className="md:col-span-3 col-span-6 p-2 drop-shadow-lg">
          <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
            <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
                  <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Range Umur</h2>
                  <div className="garis garis1"></div>
                  <div className="garis garis2"></div>
            </div>
            <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
              <thead>
                <tr className=" bg-blue-50 text-white w-full">
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Kecamatan</th>
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">Tgl Lahir</th>
                  <th className="tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">Umur</th>
                  <th className="text-center tsize-70 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-3">n</th>
                </tr>
              </thead>
              <tbody>
                {tabel_kec_umur.map((penduduk_kec_umurx,index) => (
                  <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_umurx.kecamatan}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3">{penduduk_kec_umurx.tgl_lahir}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3">{penduduk_kec_umurx.agee}</td>
                    <td className="tsize-70 border-slate-300  p-2 tracking-wide wp-3 text-center">{penduduk_kec_umurx.count_tgl_lahir}</td>
                    
                  </tr>
                ))}
                <tr className=" bg-blue-50 text-white w-full h-3">
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                  <th className="tsize-70 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-3"></th>
                </tr>
              </tbody>
              
            </table>
            <p>
              Total Data: <span className="text-sky-600">{rows_umur}</span> Halaman:  <span className="text-sky-600">{rows_umur ? page_umur + 1 : 0}</span> Dari  <span className="text-sky-600">{pages_umur}</span>
            </p>
            <div className=" item-center content-center mb-5">
              <nav
                className="pagination is-centered"
                key={rows_umur}
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
                  pageCount={Math.min(50, pages_umur)}
                  onPageChange={changePage_Umur}
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
      </div>       
      
    </div>
  );
};

export default PendudukKecamatanlist;
