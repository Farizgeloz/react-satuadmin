import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory,{ PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {Container,Row,Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { motion } from "framer-motion";





import "../../../App.css";
import NavSub from "../../NavSub"
import AccordionCard from '../../accordion/AccordionCard'
import Location_MaplistModalTambah from "./Location_MaplistModalTambah"
import Location_MaplistModalDelete from "./Location_MaplistModalDelete"


import { MdDashboard,MdDataset,MdInfoOutline,
        MdEditSquare, MdOutlineMoney} from "react-icons/md";

import { FaBuildingColumns, FaCodeCommit, FaHospitalUser, FaMoneyBillTrendUp, FaTreeCity } from "react-icons/fa6";
import { FaBuilding, FaEnvira, FaGraduationCap, FaPeopleArrows, FaUsers } from "react-icons/fa";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;

const Spinner = () => <div className="loader "></div>;

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Location_Maplistlist = () => {
  

  const [loading, setLoading] = useState(true);
  const [dataset, setdataset] = useState([]);
  const [dataku, setdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [kategoriku, setkategori] = useState([]);
  const [satkerku, setsatker] = useState([]);
  
  

  const [msg, setMsg] = useState("");

  useEffect(() => {
      getLocation_MaplistItem();
    setTimeout(() => {
      getLocation_MaplistSearch();
      
      setLoading(false);
    }, 2000);
    
  }, []);


  const getLocation_MaplistSearch = async () => {
    try {

      const response = await axios.get(apiurl + 'satupeta/map_list');

      const res = response.data;
      setdata(res.data);
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const getLocation_MaplistItem = async () => {
    const response = await axios.get(apiurl + 'satupeta/map_item2');

    const data = response.data;
    setsatker(response.data.resultsatker);
    setkategori(response.data.resultbidangurusan);
  };

  

  function HeadFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
         { column.text }
        { filterElement }
       
        { sortElement }
      </div>
    );
  }
  
  const pagecustomTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total px-2">
      Menampilkan { from } Sampai { to } dari { size } data
    </span>
  );
  const pageoptions = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: 'Awal',
    prePageText: 'Kembali',
    nextPageText: 'Lanjut',
    lastPageText: 'Akhir',
    nextPageTitle: 'Page Awal',
    prePageTitle: 'Page Akhir',
    firstPageTitle: 'Page Awal',
    lastPageTitle: 'Page Akhir',
    showTotal: true,
    onPageChange: (page) => setCurrentPage(page),
    onSizePerPageChange: (size, page) => {
      setSizePerPage(size);
      setCurrentPage(page);
    },
    sizePerPageList: [
      { text: '10', value: 10 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
      { text: 'All', value: dataku.length }
    ]
  };

 
  const satkerlist= satkerku.map((row, index) => (
      
       {
          value: [row.nama_satker],
          label: [row.nama_satker]
          
      }
      
  ));
   const kategorilist= kategoriku.map((row, index) => (
      
       {
          value: [row.nama_bidang_urusan],
          label: [row.nama_bidang_urusan]
          
      }
      
  ));

  const koleksilist = [
    { label: "Peta Interaktif", value: "1" },
    { label: "Peta Layout", value: "2" }
  ];
 

  const columns =[
    {
      dataField: 'nomor',
      text: 'No',
      headerAlign: 'center',
      headerFormatter: HeadFormatter,
      formatter: (cell, row, rowIndex) => (rowIndex + 1) + ((currentPage - 1) * sizePerPage),
      style: { width: '5%', textAlign: 'center' },
      csvExport: false,
      sort: false
    },
    {
      dataField:'koleksi_data',
      text:"Koleksi Data",
      filter: selectFilter({
        options: koleksilist,
        comparator: Comparator.LIKE, // default is Comparator.EQ
        placeholder: 'Pilih Koleksi Data',
        style:{display:'block',color:'#334856'},
      }),
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => {
          return (
            <div className="">
              <Image src={row.presignedUrl} className="rad15 px-3" />
              <p className="textsize6 text-center">{row.koleksi_data}</p>
            </div>
          );
       
      },
      style: {
        'width': '15%'
      },
      sort: true
    },
    {
      dataField:'title',
      text:"Judul",
      filter: textFilter({
        style:{display:'block',color:'#334856'},
        placeholder: 'Cari Judul',
      }),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray',
      style: {
        fontWeight: 'bold',
        fontSize: '80%'
      },
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => {
        //console.log(row);
        if(row.status!=="Publik"){
           return <div className="">
            <p className="text-red-a2 flex textsize10"> {`${row.title}`}</p>
          </div>;
        }else{
             return <div className="">
            <p className="text-sky-a2 flex  textsize10"> {`${row.title}`}</p>
            </div>;
        }
       
      },
      style: {
        'width': '30%',
      },
      sort: true
    },

    {
      dataField:'nama_location',
      text:"Lokasi",
      filter: textFilter({
        style:{display:'block',color:'#334856'},
        placeholder: 'Cari Lokasi',
      }),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray',
      style: {
        fontWeight: 'bold',
        fontSize: '80%'
      },
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => {
        //console.log(row);
        if(row.status!=="Publik"){
           return <div className="">
            <p className="text-red-a2 flex textsize10"> {`${row.nama_location}`}</p>
          </div>;
        }else{
             return <div className="">
            <p className="text-sky-a2 flex  textsize10"> {`${row.nama_location}`}</p>
            </div>;
        }
       
      },
      style: {
        'width': '20%',
      },
      sort: true
    },
    
    {
      dataField:'nama_satker',
      text:"Satker",
      filter: selectFilter({
        options: satkerlist,
        comparator: Comparator.LIKE, // default is Comparator.EQ
        placeholder: 'Pilih Satker',
        style:{display:'block',color:'#334856'},
      }),
      formatter: (cell, row) => {
        //console.log(row);
         return <div className="d-flex align-items-start text-start">
          <FaBuildingColumns
            className="textsize10"
            style={{ marginTop: '2px', width: '20px', minWidth: '20px' }}
          />
          <div className="ps-2">
            <p className="textsize10 mb-0">{row.nama_satker}</p>
          </div>
        </div>;
       
      },
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '20%'
      },
      sort: true
    },
    {
      dataField:'nama_bidang_urusan',
      text:"Bidang",
      filter: selectFilter({
        options: kategorilist,
        comparator: Comparator.LIKE, // default is Comparator.EQ
        placeholder: 'Pilih Bidang',
        style:{display:'block',color:'#334856'},
      }),
      formatter: (cell, row) => {
        //console.log(row);
         return <div className="">
           
            <p className="textsize10 text-center">{row.nama_bidang_urusan}</p>
          </div>;
       
      },
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '15%'
      },
      sort: true
    },
    
  ];

  const rowStyle = { fontSize: '80%' };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
  };
  

  const afterSearch = (newResult) => {
    console.log(newResult);
  };

  const expandRow = {
    onlyOneExpanding: true,
    renderer: row => (
      <div className="bg-sky-100 p-2 transisi cekkk rad-bottom10 hover:bg-sky-50" ke={ `${row.id}` }>
       
        <div className="d-flex">
          
         <Link to={ `/Data-Location_Maplist/Detail/${row.id}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-2">
          <button 
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex">
              <MdInfoOutline  className="mt-1 mx-1"   /><span>Detail</span>
          </button>
        </Link>
        
        <Link to={ `/Data-Location_Maplist/Update/${row.id}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-2">
          <button 
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
              <MdEditSquare className="mt-1 mx-1" /><span>Edit</span>
          </button>
        </Link>
        <Location_MaplistModalDelete
            id={row.id}
            name={row.komponen}
        />
        </div>
        
      </div>
    )
  };

  function convertDate(datePicker) {
      const selectedDate = new Date(datePicker);

      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      const dayName = dayNames[selectedDate.getDay()];
      const day = selectedDate.getDate();
      const monthName = monthNames[selectedDate.getMonth()];
      const year = selectedDate.getFullYear();

      const jam=selectedDate.getHours();
      const menit=selectedDate.getMinutes();
      const detik=selectedDate.getSeconds();

      const indonesianFormat = `${day} ${monthName} ${year}`+' Waktu : '+`${jam}:${menit}:${detik} WIB`;
      return indonesianFormat;
  }
  
  
  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Location Maplist" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-Location_Maplist" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Location Maplist
            </NavLink>
          </p>
        </div>
        
        
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <Location_MaplistModalTambah/>
        
        </div>
        
      </div>

      <div className='w-full flex-1 flex items-center justify-center flex-col md:p-0 p-2  drop-shadow-lg'>
        {/*<AccordionCard title={"Pencarian Data Dengan Kata Kunci"}>
          <form onSubmit={searchData} className="w-full">
            <div className="space-y-3 w-full">
              
              <div className="grid grid-cols sm:grid-cols-6 pb-4 w-full">
                
                
                <div className="col-span-6 rounded m-1 p-2 grid grid-cols gap-x-6 gap-y-8 grid sm:grid-cols-6 drop-shadow-xl bg-white max-[640px]:w-full">
                
                  
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                      <IoMapOutline className="mt-1 mx-2 text-cyan-500"  />WILAYAH
                    </label>
                    <div className="mt-0">
                        
                        <select
                          value={wilayah}
                          onChange={(e) => setwilayah(e.target.value)}
                          autoComplete="wilayah"
                          className="input-gray tsize-90"
                          >
                          <option value="">Pilih Wilayah</option>
                          <option value="Kabupaten">Kabupaten</option>
                          <option value="Kecamatan">Kecamatan</option>
                          <option value="Desa">Desa</option>
                        </select>
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoPeopleCircleOutline className="mt-1 mx-2 text-cyan-500"  />PRODUSEN DATA
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Produsen Data"
                        value={satker}
                        onChange={(e) => setsatker(e.target.value)}
                        type="text"
                        autoComplete="satker"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoInformationCircleOutline className="mt-1 mx-2 text-cyan-500"  />SIFAT DATA
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Produsen Data"
                        value={sifat_data}
                        onChange={(e) => setsifat_data(e.target.value)}
                        type="text"
                        autoComplete="sifat_data"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoInformationCircleOutline className="mt-1 mx-2 text-cyan-500"  />FREKUENSI
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Frekuensi"
                        value={frekuensi}
                        onChange={(e) => setfrekuensi(e.target.value)}
                        type="text"
                        autoComplete="frekuensi"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  
                  
                  
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoLogoWebComponent className="mt-1 mx-2 text-cyan-500"  />KONSEP
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Konsep"
                        value={konsep}
                        onChange={(e) => setkonsep(e.target.value)}
                        type="text"
                        autoComplete="konsep"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  
                  
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoLogoGoogle className="mt-1 mx-2 text-cyan-500"  />UKURAN
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Ukuran"
                        value={ukuran}
                        onChange={(e) => setukuran(e.target.value)}
                        type="text"
                        autoComplete="ukuran"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoLogoGoogle className="mt-1 mx-2 text-cyan-500"  />SATUAN
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Satuan"
                        value={satuan}
                        onChange={(e) => setsatuan(e.target.value)}
                        type="text"
                        autoComplete="satuan"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoLogoGoogle className="mt-1 mx-2 text-cyan-500"  />TAG
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Tag"
                        value={tag}
                        onChange={(e) => settag(e.target.value)}
                        type="text"
                        autoComplete="tag"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-2 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <IoCalendarNumberOutline className="mt-1 mx-2 text-cyan-500"  />TANGGAL UPDATE
                    </label>
                    <div className="mt-0">
                        <input
                        placeholder="Tanggal Update"
                        value={updatedAt}
                        onChange={(e) => setupdatedAt(e.target.value)}
                        type="date"
                        autoComplete="updatedAt"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  

                  <div className="sm:col-span-3">
                    <div className="mt-2 col-md:flex">
                      <button type="submit" className="col-span-3 openModalBtn bg-green-600 hover:bg-green-700 m-1 tsize-90">Cari Data</button>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            
          </form>
          
        </AccordionCard>*/}
      </div>

      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Judul, Kategori Sektoral atau Penghasil Data.</p>
          </div>
          <Container fluid>
            <Row className='portfoliolist'>
              <Col sm={12} key={'bodyku'}>
                <Row>
                  {loading ? (
                      <Spinner />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <BootstrapTable 
                      keyField='id' 
                      data={ dataku } 
                      columns={ columns } 
                      rowStyle={ rowStyle }
                      exportCSV={ { onlyExportFiltered: true, exportAll: false } }
                      filter={ filterFactory() }
                      search={ { afterSearch } }
                      pagination={paginationFactory({
                        ...pageoptions,
                        paginationTotalRenderer: pagecustomTotal,
                        page: currentPage,
                        sizePerPage: sizePerPage
                      })}
                      expandRow={ expandRow }
                      hover 
                      
                      >
                        {
                          props => (
                            <div>
                              
                              <SearchBar { ...props.searchProps } className="widthtt" placeholder="Cari Data" />
                              <hr />
                              <BootstrapTable
                                { ...props.baseProps }
                                //pagination={ paginationFactory(pageoptions) }
                                expandRow={ expandRow }
                              />
                            </div>
                          )
                        }

                       
                      </BootstrapTable>
                   </motion.div>
                          )}
                  {/*<ToolkitProvider
                    keyField="id"
                    data={ datasetku }
                    columns={ columns }
                    exportCSV={ { onlyExportFiltered: true, exportAll: false } }
                     filter={ filterFactory() }
                    /*exportCSV={ { 
                      onlyExportFiltered: true,
                      exportAll: false,
                      fileName: 'custom.csv',
                      separator: '|',
                      ignoreHeader: false,
                      noAutoBOM: false,
                      blobType: 'text/csv;charset=ansi' 
                    } }*
                    search={ { afterSearch } }
                  >
                    {
                      props => (
                        <div>
                          
                          <SearchBar { ...props.searchProps } className="widthtt" placeholder="Cari Data" />
                          <hr />
                          <BootstrapTable
                            { ...props.baseProps }
                            pagination={ paginationFactory() }
                            expandRow={ expandRow }
                          />
                        </div>
                      )
                    }
                  </ToolkitProvider>*/}

                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        {/*<table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full  overflow-auto">
          <thead>
            <tr className=" bg-blue-50 text-white w-full">
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3">Wilayah</th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3">Komponen</th>
              <th className="text-center tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/6">Kategori Sektoral</th>
              <th className="text-center tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/7">Actions</th>
            </tr>
          </thead>
          <tbody>
            dataset.map((user,index) => (
              <tr key={user.id} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                <td className="tsize-90 border-slate-300 tracking-wide p-2 w-1/3">{user.wilayah}</td>
                <td className="tsize-90 border-slate-300 tracking-wide p-2 w-1/3">{user.satker}</td>
                <td className="text-center tsize-90 border-slate-300 tracking-wide w-1/6">{user.komponen}</td>
                <td className="sm:flex justify-center justify-items-center tsize-90 border-slate-300 tracking-wide w-1/7">
                <UserModalEdit
                      id={user.id}
                      name={user.wilayah}
                      nick={user.satker}
                      email={user.komponen}
                      password={user.sifat_data}
                      confpassword={user.frekuensi}
                      role={user.kegiatan_statistik}
                  />
                  <Location_MaplistModalDelete
                      id={user.id}
                      name={user.komponen}
                  />
                  
                </td>
                
              </tr>
            ))}
            <tr className=" bg-blue-50 text-white w-full h-3">
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3"></th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3"></th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/6"></th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/7"></th>
            </tr>
          </tbody>
         
        </table>

        <p>
          Total Data: <span className="text-green-600">{rows}</span> Halaman:  <span className="text-green-600">{rows ? page + 1 : 0}</span> Dari  <span className="text-green-600">{pages}</span>
        </p>
        <p className="has-text-centered has-text-danger">{msg}</p>
        <div className="item-center content-center mb-10 -mt-10">
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
              containerClassName="flex items-center justify-center mt-8 mb-4  mx-auto"
              pageClassName="block border-2 text-blue border-solid border-indigo-200 hover:bg-indigo-500 hover:text-white mx-1 w-8 h-8 flex items-center justify-center rounded-md"
              activeClassName="btn-skyku"
              //pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              //activeLinkClassName={"btn-blueku"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>     
        </div>*/}
        
      </div>
    </div>
  );
};

export default Location_Maplistlist;
