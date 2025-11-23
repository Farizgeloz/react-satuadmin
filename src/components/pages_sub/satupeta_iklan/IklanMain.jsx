import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import IklanModalTambah from "./IklanModalTambah";
import IklanModalDelete from "./IklanModalDelete";
import Activity from "../log/Activity";
import { Col, Container, Row,Tabs, Tab } from "react-bootstrap";
import { api_url_satuadmin } from "../../../api/axiosConfig";


const Spinner = () => <div className="loader"></div>;

const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: "Data per halaman:"
      }
    }
  }
});

export default function Iklanlist() {
  const [loading, setLoading] = useState(true);
  const [datasetku, setDatasetku] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getIklanSearch();
    }, 1000);
  }, []);

  const getIklanSearch = async () => {
    const res = await api_url_satuadmin.get(`api/open-item/satupeta-iklan`);
    const data = res.data.resultWithUrls2 || [];
    setDatasetku(data);
    setRowsFiltered(data);
    setLoading(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(datasetku);
    } else {
      const filtered = datasetku.filter(
        (item) =>
          item.title?.toLowerCase().includes(value.toLowerCase()) ||
          item.content_a?.toLowerCase().includes(value.toLowerCase())
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

  const columns = [
    { 
      field: "no", 
      headerName: "No", 
      width: 70,
      headerClassName: "custom-header", // kelas custom
    },
    { 
      field: "title", 
      headerName: "Judul", 
      flex: 3,  // 30%
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
      field: "linked", 
      headerName: "Link", 
      flex: 3,  // 20%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <p className="textsize10">{row.linked}</p>
        );
      }  
    },
    {
      field: "presignedUrl",
      headerName: "Gambar",
      flex: 1, // 10%
      headerClassName: "custom-header text-center", // kelas custom
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      minWidth: 100,
      headerAlign: 'center',
      renderCell: (params) => (
        <img
          src={params.value}
          alt="gambar"
          style={{
            width: "100%",
            height: "100%", // penuh tinggi cell
            objectFit: "contain", // tetap proporsional
            maxHeight: '100%' // biar tidak overflow
          }}
          className="rounded border p-1"
        />
      ),
    },
    { 
      field: "visibilitas", 
      headerName: "Visibilitas", 
      flex: 1,  // 10%
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <p className="textsize10">{row.visibilitas}</p>
        );
      } 
    },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1, // 20%
      headerClassName: "custom-header", // kelas custom
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="gap-2 p-2">
          <Link to={`/Satupeta/Iklan/Update/${params.row.title}`}>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1" size={18} />
            </button>
          </Link>
          <IklanModalDelete id={params.row.id} name={params.row.title} />
        </div>
      ),
    },
  ];


  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satu Peta Iklan" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-4">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 flex textsize10">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="text-silver-a mx-2 flex textsize10">
              <MdDataset className="mt-1" /> Satupeta Iklan
            </NavLink>
          </p>
        </div>
        <div className="md:col-span-2 px-10 mt-2">
          <IklanModalTambah />
        </div>
      </div>

      <div className="drop-shadow-lg overflow-auto mb-9 p-2">
        <section className="py-3 rounded-lg bg-white px-2">
          
          <Container fluid>
            <Tabs
              defaultActiveKey="tabel"
              id="example-tabs"
              className="mb-3"
            >
              <Tab eventKey="tabel" title="Tabel">
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
                          rows={datasetku}
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

              <Tab eventKey="aktivitas" title="Aktivitas">
                  <Activity kunci={'Satu Peta Iklan'}/>
              </Tab>
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
}
