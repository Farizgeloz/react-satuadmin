import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import IklanModalTambah from "./ModalTambah";
import IklanModalDelete from "./ModalDelete";
import Activity from "../log/Activity";
import { Col, Container, Row,Tabs, Tab } from "react-bootstrap";
import { api_url_satuadmin } from "../../../api/axiosConfig";

const apiurl =  import.meta.env.VITE_API_URL;;

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
    const res = await api_url_satuadmin.get(`api/open-item/satupeta-bantuan`);
    const data = res.data.resultWithUrls || [];
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
      field: "kategori", 
      headerName: "Kategori", 
      flex: 1,  // 30%
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
    },
    { 
      field: "seksi", 
      headerName: "Seksi", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.seksi}
            </p>
          </>
        );
      }  
    },
     { 
      field: "title", 
      headerName: "Title", 
      flex: 3,  // 30%
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
      field: "content", 
      headerName: "Konten", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
               {row.content.length > 100 
                ? row.content.substring(0, 100) + "..." 
                : row.content}
            </p>
          </>
        );
      }  
    },
    
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1, // 20%
      headerClassName: "custom-header", // kelas custom
      minWidth: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="gap-2 p-2">
          <Link to={`/Satupeta/Bantuan/Update/${params.row.title}`}>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1"  size={18}/>
            </button>
          </Link>
          <IklanModalDelete id={params.row.id} name={params.row.title} />
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
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satu Peta Bantuan" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-4">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="textsize10 text-silver-a mr-2 flex">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="textsize10 text-silver-a mx-2 flex">
              <MdDataset className="mt-1" /> Satupeta Bantuan
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

              <Tab eventKey="aktivitas" title="Aktivitas">
                  <Activity kunci={'Satu Peta Bantuan'}/>
              </Tab>
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
}
