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
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: "Data per halaman:"
      }
    }
  }
});

const Userlist = () => {
  const [loading, setLoading] = useState(true);
  const [userku, setUsers] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

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
      `${apiurl}api/open-user/user`
    );
    //console.log(response.data.resultsearch);
    setUsers(response.data);
    setRowsFiltered(response.data);
    
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(userku);
    } else {
      const filtered = userku.filter(
        (item) =>
          item.name?.toLowerCase().includes(value.toLowerCase()) ||
          item.nick?.toLowerCase().includes(value.toLowerCase()) ||
          item.email?.toLowerCase().includes(value.toLowerCase())
      );
      setRowsFiltered(filtered);
    }
  };

  const columns =[
    {
      field: "no",
      headerName: "No",
      headerClassName: "custom-header",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        // Cari index row saat ini
        return params.api.getAllRowIds().indexOf(params.id) + 1;
      },
    },
    { 
      field: "name", 
      headerName: "Nama Lengkap", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "nick", 
      headerName: "Nick", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "email", 
      headerName: "Email", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "role", 
      headerName: "Role", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1, // 20%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="p-2">
          <Link
            to={ `/Data-User/Update/${params.row.uuid}` }
            className="flex items-center justify-center mb-[2px]"
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1" />
            </button>
          </Link>
          <UserModalDelete id={params.row.id} name={params.row.nick} />
        </div>
      ),
    },
  ];


  const rowStyle = { fontSize: '80%' };

  const afterSearch = (newResult) => {
    console.log(newResult);
  };

  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Data USer" />
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
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Judul, Kategori atau Isi Konten.</p>
            <div className="mb-3">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Cari data..."
                  className="border p-2 rounded w-64 input-green2"
                />
              </div>
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
                      <ThemeProvider theme={theme}>
                        <DataGrid
                          rows={rowsFiltered}
                          columns={columns}
                          getRowId={(row) => row.id}
                          disableSelectionOnClick
                          // Versi MUI baru (v5.17+ atau v6) → pakai ini
                          pageSizeOptions={[5, 10, 50,100]}
                          initialState={{
                            pagination: {
                              paginationModel: { pageSize: 10, page: 0 }
                            }
                          }}
                          getRowHeight={() => 'auto'} // otomatis menyesuaikan konten
                          // Styling agar versi lama tetap aman
                          sx={{
                            "& .custom-header": {
                              backgroundColor: "#1886ca",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontSize: "0.9rem"
                            },
                            "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon": {
                              opacity: 1,
                              visibility: "visible",
                              width: "auto",
                              color: "#fff"
                            },
                            "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
                              opacity: 1
                            },
                            "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon button svg": {
                              fill: "#fff"
                            },
                            '& .MuiDataGrid-cell': {
                              whiteSpace: 'normal', // biar teks wrap
                              lineHeight: '1.2rem',  // lebih rapat
                              padding: '8px'
                            },
                            "& .MuiTablePagination-select option:not([value='5']):not([value='10']):not([value='20'])": {
                              display: "none" // sembunyikan opsi default MUI yang tidak diinginkan
                            },
                            "& .MuiTablePagination-selectLabel": {
                              color: "#444",
                              fontWeight: "bold",
                              marginTop: "15px"
                            },
                            "& .MuiTablePagination-displayedRows": {
                              color: "#666",
                              marginTop: "15px"
                            },
                            "& .MuiTablePagination-select": {
                              color: "#000",
                              fontWeight: "600",
                              backgroundColor: "#dbdbdb",
                              borderRadius: "6px"
                            }
                          }}
                        />
                      </ThemeProvider>
                   </motion.div>
                  )}

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
