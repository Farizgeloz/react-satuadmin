import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory,{ PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {Container,Row,Col} from 'react-bootstrap';
import { motion } from "framer-motion";





import "../../../App.css";
import NavSub from "../../NavSub"
import AccordionCard from '../../accordion/AccordionCard'
import ImagesModalTambah from "./ImagesModalTambah"
import ImagesModalDelete from "./ImagesModalDelete"


import { MdDashboard,MdDataset,MdInfoOutline,
        MdEditSquare, MdOutlineMoney} from "react-icons/md";

import { FaBuildingColumns, FaCodeCommit, FaHospitalUser, FaMoneyBillTrendUp, FaTreeCity } from "react-icons/fa6";
import { FaBuilding, FaEnvira, FaGraduationCap, FaPeopleArrows, FaUsers } from "react-icons/fa";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;

const Spinner = () => <div className="loader "></div>;

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Imageslist = () => {
  

  const [loading, setLoading] = useState(true);
  const [datasetku, setImagesSearch] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    //getImagesUnsur();
    setTimeout(() => {
      getImagesSearch();
      setLoading(false);
    }, 2000);
    
  }, []);
 

  const getImagesSearch = async () => {
    const response = await axios.get(
      `${apiurl}api/open-item/images`
    );
    //console.log(response.data.resultsearch);
    setImagesSearch(response.data);
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
      { text: 'All', value: datasetku.length }
    ]
  };

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
      dataField:'kategori',
      text:"Kategori",
      filter: textFilter({
        style:{display:'block',color:'#334856'},
        placeholder: 'Cari Kategori',
      }),
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      formatter: (cell, row) => (
        <p className="px-2"> {row.kategori}</p>
      ),
      style: {
        'width': '35%'
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
      headerFormatter: HeadFormatter,
      formatter: (cell, row) => (
        <p className=" px-2"> {row.title}</p>
      ),
      style: {
        'width': '35%'
      },
      sort: true
    },
    {
      dataField:'contents',
      text:"Konten",
      filter: textFilter({
        style:{display:'block',color:'#334856'},
        placeholder: 'Cari Konten',
      }),
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      formatter: (cell, row) => (
        <p className="px-2"> {row.contents}</p>
      ),
      style: {
        'width': '35%'
      },
      sort: true
    },
    {
      dataField:'presignedUrl1',
      text:"Gambar 1",
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => (
        <img
          src={row.presignedUrl1}
          alt="gambar"
          style={{ maxwidth: "80%", objectFit: "contain" }}
          className="rounded border p-1"
        />
      ),
      style: {
        'width': '15%'
      },
      sort: false
    },
    {
      dataField:'presignedUrl2',
      text:"Gambar 2",
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => (
        <img
          src={row.presignedUrl2}
          alt="gambar2"
          style={{ maxwidth: "80%", objectFit: "contain" }}
          className="rounded border p-1"
        />
      ),
      style: {
        'width': '15%'
      },
      sort: false
    },
    {
      dataField:'presignedUrl3',
      text:"Gambar 3",
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => (
        <img
          src={row.presignedUrl3}
          alt="gambar3"
          style={{ maxwidth: "80%", objectFit: "contain" }}
          className="rounded border p-1"
        />
      ),
      style: {
        'width': '15%'
      },
      sort: false
    }
    
    
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
          
        
        <Link to={ `/Data-Images/Update/${row.kategori}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-2">
          <button 
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
              <MdEditSquare className="mt-1 mx-1" /><span>Edit</span>
          </button>
        </Link>
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
      <NavSub  title="Images" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-Images" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Images
            </NavLink>
          </p>
        </div>
        
        
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <ImagesModalTambah/>
        
        </div>
        
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
                      data={ datasetku } 
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
                  <ImagesModalDelete
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

export default Imageslist;
