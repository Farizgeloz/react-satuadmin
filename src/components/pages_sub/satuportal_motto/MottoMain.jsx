import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import {Container,Row,Col, Image,Tabs, Tab} from 'react-bootstrap';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";


import "../../../App.css";
import NavSub from "../../NavSub"
import MottoModalTambah from "./MottoModalTambah"
import MottoModalDelete from "./MottoModalDelete"
import Activity from "../log/Activity";


import { MdDashboard,MdDataset,MdEditSquare} from "react-icons/md";
import { api_url_satuadmin } from "../../../api/axiosConfig";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl = import.meta.env.VITE_API_URL;

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


const Mottolist = () => {
  

  const [loading, setLoading] = useState(true);
  const [dataku, setMottoSearch] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

  const [msg, setMsg] = useState("");
  

  useEffect(() => {
    //getMottoUnsur();
    setTimeout(() => {
      getMottoSearch();
      setLoading(false);
    }, 2000);
    
  }, []);
 

  const getMottoSearch = async () => {
    const response = await api_url_satuadmin.get(
      `openitem/komponen`
    );
    //console.log(response.data.resultsearch);
    setMottoSearch(response.data.resultWithUrls_satuportal_motto);
    setRowsFiltered(response.data.resultWithUrls_satuportal_motto);
  };


  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(dataku);
    } else {
      const filtered = dataku.filter(
        (item) =>
          item.title?.toLowerCase().includes(value.toLowerCase()) ||
          item.contents?.toLowerCase().includes(value.toLowerCase()) ||
          item.kategori?.toLowerCase().includes(value.toLowerCase())
      );
      setRowsFiltered(filtered);
    }
  };

  const rowsku = Array.isArray(rowsFiltered)
    ? rowsFiltered.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row
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
      field: "title", 
      headerName: "Judul", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <p className="textsize10">{row.title}</p>
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
          <p className="textsize10">{row.contents}</p>
        );
      }
    },
    { 
      field: "presignedUrl", 
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
          <div style={{ textAlign: "center", width: "100%" }}>
            {row.presignedUrl && (
              <Image
                src={row.presignedUrl}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
              />
            )}
           
          </div>
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
            to={ `/Satuportal/Motto/Update/${params.row.title}` }
            className="flex items-center justify-center mb-[2px]"
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1"  size={18}/>
            </button>
          </Link>
          <MottoModalDelete id={params.row.id} name={params.row.title} />
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
      <NavSub  title="Satuportal Motto" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
              <MdDashboard className="mt-1 textsize10"/>Dashboard
            </NavLink> / 
            <NavLink to="/Satuportal/Motto" className="text-silver-a mx-2 d-flex textsize10">
              <MdDataset className="mt-1 textsize10" />Motto
            </NavLink>
          </p>
        </div>
        
        <div className="md:col-span-3 margin-0 px-10 mt-2">
          <MottoModalTambah/>
        
        </div>
        
      </div>

      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          
          <Container fluid>
            <Tabs
              defaultActiveKey="tabel"
              id="example-tabs"
              className="mb-3"
            >
              <Tab eventKey="tabel" title="Tabel">
                <div className="text-center">
                  <p className="text-sage textsize10 ">Pencarian berdasarkan Judul dan Isi Konten</p>
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
                          autoHeight // <- ini penting biar tidak scroll
                          localeText={{
                            noRowsLabel: "📭 Data Tidak Ditemukan", // ganti teks default
                            toolbarDensity: 'Kepadatan',
                            toolbarDensityLabel: 'Kepadatan',
                            toolbarDensityCompact: 'Kompak',
                            toolbarDensityStandard: 'Standar',
                            toolbarDensityComfortable: 'Nyaman',
                            toolbarFilters: 'Filter',
                            toolbarFiltersLabel: 'Tampilkan filter',
                            toolbarFiltersTooltipHide: 'Sembunyikan filter',
                            toolbarFiltersTooltipShow: 'Tampilkan filter',
                            footerPaginationRowsPerPage: 'Baris per halaman', // Ganti "Rows per page"
                            footerRowSelected: (count) =>
                              count !== 1
                                ? `${count.toLocaleString()} baris dipilih`
                                : `${count.toLocaleString()} baris dipilih`,
                          }}
                          
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

              <Tab eventKey="aktivitas" title="Aktivitas">
                  <Activity kunci={'Satu Portal Motto'}/>
              </Tab>

             
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Mottolist;
