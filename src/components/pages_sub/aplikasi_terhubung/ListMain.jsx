import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import {Container,Row,Col,Tabs, Tab} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";





import "../../../App.css";
import NavSub from "../../NavSub";
import AccordionCard from '../../accordion/AccordionCard';
import Satuportal_listModalTambah from "./ListModalTambah";
import Satuportal_listModalDelete from "./ListModalDelete";
import Activity from "../log/Activity";


import { MdDashboard,MdDataset,MdInfoOutline,
        MdEditSquare, MdOutlineMoney} from "react-icons/md";

import { FaBuildingColumns, FaCodeCommit, FaHospitalUser, FaMoneyBillTrendUp, FaTreeCity } from "react-icons/fa6";
import { FaBuilding, FaEnvira, FaGraduationCap, FaPeopleArrows, FaUsers } from "react-icons/fa";
import { api_url_satuadmin } from "../../../api/axiosConfig";

//const apikey=process.env.REACT_APP_API_KEY

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


const Satuportal_listlist = () => {
  

  const [loading, setLoading] = useState(true);
  const [dataset, setdataset] = useState([]);
  const [dataku, setdata] = useState([]);

  
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);
  
  

  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getSatuportal_listSearch();
      
      setLoading(false);
    }, 2000);
    
  }, []);


  const getSatuportal_listSearch = async () => {
    try {

      const response = await api_url_satuadmin.get('openitem/ekosistem_list');

      const res = response.data;
      //console.log('Failed to fetch data:', error);
      
      setdata(response.data);
      setRowsFiltered(response.data);
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(dataku);
    } else {
      const filtered = dataku.filter(
        (item) =>
          item.title?.toLowerCase().includes(value.toLowerCase()) ||
          item.contents?.toLowerCase().includes(value.toLowerCase())
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
    /* { 
      field: "kategori", 
      headerName: "Kategori", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.kategori}
            </p>
          </>
        );
      } 
    }, */
    { 
      field: "title", 
      headerName: "Judul", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.title}
            </p>
          </>
        );
      }
    },
    { 
      field: "contents", 
      headerName: "Konten", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.contents}
            </p>
          </>
        );
      }
    },
    { 
      field: "images", 
      headerName: "Gambar", 
      flex: 1,  // 30%
      headerClassName: "custom-header", // kelas custom
      headerAlign: 'center',
      minWidth: 100,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
          <div style={{ textAlign: "center", width: "100%" }}>
            {row.presignedUrl_a && (
              <Image
                src={row.presignedUrl_a}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
                loading="lazy"
              />
            )}
            {row.title_images_a && (
              <p className="textsize10 text-center">
                {row.title_images_a}
              </p>
            )}
          </div>
          <div style={{ textAlign: "center", width: "100%",marginTop:"5px" }}>
            {row.presignedUrl_b && (
              <Image
                src={row.presignedUrl_b}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
                loading="lazy"
              />
            )}
            {row.title_images_b && (
              <p className="textsize10 text-center">
                {row.title_images_b}
              </p>
            )}
          </div>
          <div style={{ textAlign: "center", width: "100%",marginTop:"5px" }}>
            {row.presignedUrl_c && (
              <Image
                src={row.presignedUrl_c}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
                loading="lazy"
              />
            )}
            {row.title_images_c && (
              <p className="textsize10 text-center">
                {row.title_images_c}
              </p>
            )}
          </div>
          </>
        );
      }
    },
    { 
      field: "logo", 
      headerName: "Logo", 
      flex: 1,  // 30%
      headerClassName: "custom-header", // kelas custom
      headerAlign: 'center',
      minWidth: 100,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
          <div style={{ textAlign: "center", width: "100%" }}>
            {row.presignedUrl_1 && (
              <Image
                src={row.presignedUrl_1}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
                loading="lazy"
              />
            )}
           
          </div>
          <div style={{ textAlign: "center", width: "100%",marginTop:"5px" }}>
            {row.presignedUrl_2 && (
              <Image
                src={row.presignedUrl_2}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
                loading="lazy"
              />
            )}
          </div>
          <div style={{ textAlign: "center", width: "100%",marginTop:"5px" }}>
            {row.presignedUrl_3 && (
              <Image
                src={row.presignedUrl_3}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
                loading="lazy"
              />
            )}
          </div>
          </>
        );
      }
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
            to={ `/Aplikasi-Terhubung/Update/${params.row.id}` }
            className="flex items-center justify-center mb-[2px]"
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1"  size={18}/>
            </button>
          </Link>
          <Satuportal_listModalDelete id={params.row.id} name={params.row.title} />
        </div>
      ),
    },
  ];
 

  const filteredRows = dataku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );
  
  
  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Aplikasi Terhubung" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
              <MdDashboard className="mt-1 textsize10"/>Dashboard
            </NavLink> / 
            <NavLink to="/Aplikasi-Terhubung" className="text-silver-a mr-2 d-flex textsize10">
              <MdDataset className="mt-1 textsize10" />Aplikasi Terhubung
            </NavLink>
          </p>
        </div>
        
        
        <div className="md:col-span-3 margin-0 px-10 mt-2">
          <Satuportal_listModalTambah/>
        
        </div>
        
      </div>

      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          <div className="text-center">
            <p className="text-sage textsize10 ">Pencarian berdasarkan Judul, Kategori dan Isi Konten.</p>
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
          <Container fluid>
            <Tabs
              defaultActiveKey="home"
              id="example-tabs"
              className="mb-3"
            >
              <Tab eventKey="home" title="Tabel">
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
                            "--DataGrid-color-background-base": "transparent",
                              backgroundColor: "transparent !important", // paksa transparan table
                              border: "none", // hilangkan border utama,
                              marginBottom:"50px",
                            "& .MuiDataGrid-root": {
                              backgroundColor: "transparent", // ⬅ background utama transparan
                              marginBottom:"50px"
                            },
                            "& .MuiDataGrid-row": {
                              marginTop: "8px",
                              paddingTop:"10px",
                              paddingBottom:"10px",
                              paddingLeft:"5px",
                              paddingRight:"5px",
                              backgroundColor: "rgba(255, 255, 255, 0.9)", // bisa dihapus kalau mau full transparan
                              borderRadius: "6px",
                              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)"
                              
                            },
                            "& .custom-header": {
                              backgroundColor: "#1886ca",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontSize: "120%"
                            },
                            "& .MuiDataGrid-virtualScroller": {
                              overflow: "auto !important" // ⬅ hilangkan scroll
                            },
                            "& .MuiDataGrid-cell": {
                              backgroundColor: "transparent", // ⬅ background cell transparan
                              borderTop:"none"
                            },
                            "& .MuiTablePagination-select option:not([value='5']):not([value='10']):not([value='20'])": {
                              display: "none"
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
                            },
                            // style kalau tidak ada data
                            "& .MuiDataGrid-overlay": {
                              backgroundColor: "#fff", // transparan
                              height: "100px",
                              fontSize: "18px",
                              fontWeight: "bold",
                              fontStyle:"italic",
                              color: "#888",
                              marginTop: "-10%",
                              paddingTop: "40px",
                              textTransform: "uppercase",
                              borderRadius: "6px",
                            },
                          }}
                        />
                      </ThemeProvider>
                    </motion.div>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="profile" title="Aktivitas">
                  <Activity kunci={'Satu Portal List'}/>
              </Tab>

             
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Satuportal_listlist;
