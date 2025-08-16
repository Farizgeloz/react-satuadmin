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
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";





import "../../../App.css";
import NavSub from "../../NavSub";
import AccordionCard from '../../accordion/AccordionCard';
import Satuportal_listModalTambah from "./Satuportal_ListModalTambah";
import Satuportal_listModalDelete from "./Satuportal_ListModalDelete";


import { MdDashboard,MdDataset,MdInfoOutline,
        MdEditSquare, MdOutlineMoney} from "react-icons/md";

import { FaBuildingColumns, FaCodeCommit, FaHospitalUser, FaMoneyBillTrendUp, FaTreeCity } from "react-icons/fa6";
import { FaBuilding, FaEnvira, FaGraduationCap, FaPeopleArrows, FaUsers } from "react-icons/fa";

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

      const response = await axios.get(apiurl + 'api/open-item/ekosistem_list');

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
    { 
      field: "kategori", 
      headerName: "Kategori", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "title", 
      headerName: "Judul", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "contents", 
      headerName: "Konten", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
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
              />
            )}
           
          </div>
          <div style={{ textAlign: "center", width: "100%",marginTop:"5px" }}>
            {row.presignedUrl_2 && (
              <Image
                src={row.presignedUrl_2}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
              />
            )}
          </div>
          <div style={{ textAlign: "center", width: "100%",marginTop:"5px" }}>
            {row.presignedUrl_3 && (
              <Image
                src={row.presignedUrl_3}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
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
            to={ `/Satuportal/List/Update/${params.row.id}` }
            className="flex items-center justify-center mb-[2px]"
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1" />
            </button>
          </Link>
          <Satuportal_listModalDelete id={params.row.id} name={params.row.title} />
        </div>
      ),
    },
  ];
 

  
  
  
  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Satu Portal List" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Satuportal-List" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Satu Portal List
            </NavLink>
          </p>
        </div>
        
        
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <Satuportal_listModalTambah/>
        
        </div>
        
      </div>

      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Judul, Kategori dan Isi Konten.</p>
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
    </div>
  );
};

export default Satuportal_listlist;
