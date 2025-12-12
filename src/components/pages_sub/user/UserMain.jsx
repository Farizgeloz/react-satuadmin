import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import { Col, Container, Row,Tabs, Tab } from "react-bootstrap";
import qs from 'qs';

import UserModalTambah from "./UserModalTambah";
import UserModalDelete from "./UserModalDelete";

import Activity from "../log/Activity";
import { api_url_satuadmin } from "../../../api/axiosConfig";


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
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [loading, setLoading] = useState(true);
  const [userku, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

  useEffect(() => {
    
    setTimeout(() => {
      getUsers();
      setLoading(false);
    }, 2000);
  }, []);

  /*const getUsers = async () => {
    const response = await api_url_satuadmin.get("http://localhost:5000/users2");
    setUsers(response.data);
  };*/
  const getUsers = async () => {
    const response = await api_url_satuadmin.get('api/open-user/user', {
      params: {
        search_opd: userloginsatker,
        search_role: rolelogin
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
    });
    //console.log(response.data);
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

  const rowsku = Array.isArray(rowsFiltered)
    ? rowsFiltered.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row,
        name_nick: `${row.name ?? ''} ${row.nick ?? ''}`,
        satker_jabatan: `${row.nama_opd ?? ''} ${row.jabatan ?? ''}`,
      }))
    : [];

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
      headerName: "Nama Lengkap & Nick", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%" }}>
           
            {row.name && (
              <p className="textsize10 mb-0">{row.name}</p>
            )}
            {row.nick && (
              <p className="textsize10">({row.nick})</p>
            )}
          </div>
        );
      } 
    },
    { 
      field: "email", 
      headerName: "Email", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "nama_opd", 
      headerName: "Satker", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%" }}>
           
            {row.nama_opd && (
              <p className="textsize10 mb-0">{row.nama_opd}</p>
            )}
          </div>
        );
      }
    },
    { 
      field: "role", 
      headerName: "Role", 
      flex: 2,  // 30%
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
              <MdEditSquare className="mr-1"  size={18}/>
            </button>
          </Link>
          <UserModalDelete id={params.row.id} name={params.row.nick} />
        </div>
      ),
    },
  ];


  const filteredRows = rowsku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Data USer" />
      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
              <MdDashboard className="mt-1 textsize10"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-User" className="text-silver-a mx-2 d-flex textsize10">
              <MdDataset className="mt-1 textsize10" />Data User
            </NavLink>
          </p>
        </div>
       
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <UserModalTambah/>
        </div>
      </div>
      <div className="drop-shadow-lg overflow-xx-auto mb-9 p-2">
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          
          <Container fluid>
            <Tabs
              defaultActiveKey="home"
              id="example-tabs"
              className="mb-3"
            >
              <Tab eventKey="home" title="Tabel">
                <div className="text-center">
                  <p className="text-sage textsize10 ">Pencarian berdasarkan Nama, Nick atau Email.</p>
                  <div className="mb-3 w-100">
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Cari data..."
                        className="border p-2 rounded w-100 input-gray textsize10"
                      />
                    </div>
                </div>
                <Row className='portfoliolist'>
                  <Col sm={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <ThemeProvider theme={theme}>
                        <DataGrid
                          loading={loading}
                          rows={filteredRows}
                          columns={columns}
                          pageSizeOptions={[5, 10, 50, 100]}
                          initialState={{
                            pagination: {
                              paginationModel: { pageSize: 10, page: 0 }
                            }
                          }}
                        
                          disableSelectionOnClick
                          getRowHeight={() => 'auto'}
                          
                          sx={{
                            "& .custom-header": {
                              backgroundColor: "#1886ca",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontSize: "100%"
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
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="profile" title="Aktivitas">
                  <Activity kunci={'Satu Admin Pengguna'}/>
              </Tab>

             
            </Tabs>
            
          </Container>
        </section>
      </div>

    </div>
  );
};

export default Userlist;
