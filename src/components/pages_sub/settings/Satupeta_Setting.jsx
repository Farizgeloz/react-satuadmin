import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import {Container,Row,Col} from 'react-bootstrap';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../../App.css";
import NavSub from "../../NavSub";
import { MdDashboard,MdDataset, MdEditSquare} from "react-icons/md";
import ColorPickerDialog from './Satupeta_ColorPickerDialog'; // sesuaikan path


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
  const [rowsFiltered, setRowsFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };

  const handleSaveColors = (id, newColors) => {
    console.log('Update row ID:', id, 'with colors:', newColors);
    // TODO: kirim ke backend via API
  };

  useEffect(() => {
    setTimeout(() => {
      getSatuportal_listSearch();
      
      setLoading(false);
    }, 2000);
    
  }, []);


  const getSatuportal_listSearch = async () => {
    try {
      const response = await axios.get(apiurl + 'api/open-item/site_satupeta_setting');
      const res = response.data;

      setRowsFiltered([res]);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      setRowsFiltered([]);
    }
  };



  

  

  const columns =[
    { 
      field: "bg_header", 
      headerName: "Bg Header", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true, 
      headerAlign: 'center',
    },
    { 
      field: "bg_body", 
      headerName: "Bg Body", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true, 
      headerAlign: 'center',
    },
    { 
      field: "bg_title", 
      headerName: "Bg Title", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true, 
      headerAlign: 'center',
    },
    { 
      field: "bg_content", 
      headerName: "Bg Content", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true, 
      headerAlign: 'center',
    },
    { 
      field: "color_title", 
      headerName: "Color Title", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
    },
    { 
      field: "color_date", 
      headerName: "Color Date", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true, 
      headerAlign: 'center',
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
        <div className="p-0">
          <Link
            
            onClick={() => handleOpenDialog(params.row)}
            className="flex items-center justify-center mb-[2px]"
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1" />
            </button>
          </Link>
        
        </div>
      ),
    },
  ];
  
  
  
  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Satu Peta Setting" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="#" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Satupeta Setting
            </NavLink>
          </p>
        </div>
        
        
       
      </div>
        
      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Warna Tema Satu Peta</p>
          </div>
          <Container fluid>
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
                      rows={rowsFiltered}
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
                          fontSize: "80%"
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
          </Container>
          
        </section>
      </div>
      <ColorPickerDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        rowData={selectedRow || {}}
        onSave={handleSaveColors}
      />
    </div>
  );
};

export default Satuportal_listlist;
