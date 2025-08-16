import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {Container,Row,Col} from 'react-bootstrap';
import { motion } from "framer-motion";

import "../../../App.css";
import AccordionCard from '../../accordion/AccordionCard'
import UserModalTambah from "./UserModalTambah"
import UserModalEdit from "./UserModalEdit"
import UserModalDelete from "./UserModalDelete"
import NavSub from "../../NavSub"


import { MdDashboard,MdDataset,MdInfo,MdInfoOutline,MdAccountCircle,MdEditSquare} from "react-icons/md";

import { 
  IoChevronBackSharp ,
  IoChevronForward,
  IoLogoGoogle,
  IoPerson,
  IoInformationCircleOutline,
  IoGrid,
  IoSearchCircle   

  } from "react-icons/io5";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;
const Spinner = () => <div className="loader "></div>;
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Userlist = () => {
  const [loading, setLoading] = useState(true);
  const [userku, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keywordnama, setKeywordNama] = useState("");
  const [keywordnick, setKeywordNick] = useState("");
  const [keywordemail, setKeywordEmail] = useState("");
  const [keywordrole, setKeywordRole] = useState("");
  const [querynama, setQueryNama] = useState("");
  const [querynick, setQueryNick] = useState("");
  const [queryemail, setQueryEmail] = useState("");
  const [queryrole, setQueryRole] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUsers();
    setTimeout(() => {
      
      setLoading(false);
    }, 2000);
  }, []);

  /*const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users2");
    setUsers(response.data);
  };*/
  const getUsers = async () => {
    const response = await axios.get(
      apiurl+`backend_users`
    );
    setUsers(response.data.resultuser);
    //setPage(response.data.page);
    //setPages(response.data.totalPage);
    //setRows(response.data.totalRows);
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
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'Awal',
    prePageText: 'Kembali',
    nextPageText: 'Lanjut',
    lastPageText: 'Akhir',
    nextPageTitle: 'Page Awal',
    prePageTitle: 'Page Akhir',
    firstPageTitle: 'Page Awal',
    lastPageTitle: 'Page Akhir',
    showTotal: true,
    paginationTotalRenderer: pagecustomTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      
      text: '10', value: 10
    }, {
      text: '20', value: 20
    }, {
      text: '30', value: 30
    }, {
      text: '40', value: 40
    }, {
      text: '50', value: 50
    }, {
      text: '100', value: 100
    }, {
      text: 'All', value: userku.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

  const columns =[
    {
      dataField:'name',
      text:"Nama",
      filter: textFilter(),
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '30%'
      },
      sort: true
    },
    {
      dataField:'nick',
      text:"Nick",
      filter: textFilter({style:{display:'block'}}),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      style: {
        'width': '25%'
      },
      
    },
    {
      dataField:'email',
      text:"Email",
      filter: textFilter({style:{display:'block'}}),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      style: {
        'width': '25%'
      },
    },
    {
      dataField:'role',
      text:"Role",
      filter: textFilter({style:{display:'block'}}),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      style: {
        'width': '20%'
      },
    },
    {
      dataField:'',
      text:"Aksi",
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => {
        //console.log(row);
        return <div className="d-flex">
        <Link to={ `/Data-User/Update/${row.uuid}` } className="max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-1">
          <button 
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold textsize9 py-1 px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
              <MdEditSquare className="mt-1 mx-1" />
          </button>
        </Link>
        <UserModalDelete
            id={row.uuid}
            name={row.name}
        />
        </div>;
        
      },
      style: {
        'width': '40%'
      },
      sort: true
    },
  ];

  const rowStyle = { fontSize: '80%' };

  const afterSearch = (newResult) => {
    console.log(newResult);
  };

  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Data Produsen" />
      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-User" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Data User
            </NavLink>
          </p>
        </div>
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <UserModalTambah/>
        </div>
      </div>
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Nama Lengkap, Nick, Email atau Role.</p>
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
                      data={ userku } 
                      columns={ columns } 
                      rowStyle={ rowStyle }
                      exportCSV={ { onlyExportFiltered: true, exportAll: false } }
                      filter={ filterFactory() }
                      search={ { afterSearch } }
                      pagination={ paginationFactory(pageoptions) }
                      hover 
                      
                      >

                        {
                          props => (
                            <div>
                             
                              <BootstrapTable
                                { ...props.baseProps }
                                pagination={ paginationFactory() }
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
      </div>

      {/*<div className='w-full flex-1 flex items-center justify-center flex-col md:p-0 p-2  drop-shadow-lg'>
        <AccordionCard title={"Pencarian Data Dengan Kata Kunci"}>
          <form onSubmit={searchData} className="w-full">
            <div className="space-y-3 w-full">
              
              <div className="grid grid-cols sm:grid-cols-6 pb-4 w-full">
                
                
                <div className="col-span-6 rounded m-1 p-2 grid grid-cols gap-x-6 gap-y-8 grid sm:grid-cols-6 drop-shadow-xl bg-white max-[640px]:w-full">
                
                  <div className="sm:col-span-3 px-2 ">
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
                  <div className="sm:col-span-3 px-2 ">
                    <label className="block tsize-80 font-medium text-gray-900">Nama Panggilan</label>
                    <div className="mt-1 flex">
                      <IoPerson className="mt-3 mx-2 text-cyan-500"  />
                      <input type="text"
                        className="input-gray tsize-80"
                        value={querynick}
                        onChange={(e) => setQueryNick(e.target.value)}
                        placeholder="Cari Nama Panggilan"/>
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-5 px-2">
                    <label className="block tsize-80 font-medium text-gray-900">Alamat Email</label>
                    <div className="mt-1 flex">
                      <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />
                      <input type="text"
                        className="input-gray tsize-80"
                        value={queryemail}
                        onChange={(e) => setQueryEmail(e.target.value)}
                        placeholder="Cari Alamat Email"/>
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
                      <button type="submit" className="col-span-3 openModalBtn bg-sky-400 m-1 tsize-90">Cari Data</button>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            
          </form>
          
        </AccordionCard>
      </div>*/}

      {/*<div className="sm:col-span-6 rounded sm:col-span-6 gap-x-6   p-2 bg-white">
            <h2 className="tsize-110 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel User</h2>
            <div className="garis garis1"></div>
            <div className="garis garis2"></div>
      </div>
      <div className='bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
        <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full  overflow-auto">
          <thead>
            <tr className=" bg-blue-50 text-white w-full">
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3">Name</th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3">Email</th>
              <th className="text-center tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/6">Role</th>
              <th className="text-center tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/7">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <tr key={user.uuid} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                <td className="tsize-90 border-slate-300 tracking-wide p-2 w-1/3">{user.name}</td>
                <td className="tsize-90 border-slate-300 tracking-wide p-2 w-1/3">{user.email}</td>
                <td className="text-center tsize-90 border-slate-300 tracking-wide w-1/6">{user.role}</td>
                <td className="sm:flex justify-center justify-items-center tsize-90 border-slate-300 tracking-wide w-1/7">
                <UserModalEdit
                      id={user.id}
                      name={user.name}
                      nick={user.nick}
                      email={user.email}
                      password={user.password}
                      confpassword={user.password}
                      role={user.role}
                  />
                  <UserModalDelete
                      id={user.uuid}
                      name={user.name}
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
          Total Data: <span className="text-sky-600">{rows}</span> Halaman:  <span className="text-sky-600">{rows ? page + 1 : 0}</span> Dari  <span className="text-sky-600">{pages}</span>
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
        </div>
        
      </div>*/}
    </div>
  );
};

export default Userlist;
