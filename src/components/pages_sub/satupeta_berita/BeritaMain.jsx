import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare,MdOutlineFileDownload} from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import ModalTambah from "./BeritaModalTambah";
import ModalDelete from "./BeritaModalDelete";
import Activity from "../log/Activity";
import { Col, Container, Row,Tabs, Tab } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
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
    const res = await api_url_satuadmin.get("api/satupeta/map_artikel");
    const data = res.data.data || [];
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
        ...row,
        content_a_b_c: `${row.content_a ?? ''} ${row.content_a ?? ''} ${row.content_c ?? ''}`
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
          <div style={{ textAlign: "center", width: "100%" }}>
           
            {row.title && (
              <p className="textsize10 text_justif font_weight700" style={{color:"#0B486B"}}>
                {row.title}
              </p>
            )}
            {row.sumber && (
              <p className="textsize11 text_justif">
                {row.sumber}
              </p>
            )}
            {row.presignedUrl_download_file && (
              <a
                href={params.row.presignedUrl_download_file}
                target="_blank"
                className="text_white_a"
                style={{textDecorationLine:"none"}}
                rel="noopener noreferrer"
              >
                <button className="bg-green-500 hover:bg-blue-400 text-white-a font-bold py-2 px-3 rounded-xl flex items-center">
                  <MdOutlineFileDownload className="mr-1" />
                  Download
                </button>
              </a>
            )}
          </div>
        );
      } 
    },
    {
      field: "content_a_b_c",
      headerName: "Konten",
      flex: 4, // 10%
      headerClassName: "custom-header text-center", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            {row.presignedUrl_tumb_a && (
              <Image
                src={row.presignedUrl_tumb_a}
                className="rad15 px-3"
                style={{ maxWidth: 130, objectFit: "contain" }}
              />
            )}
            {row.content_a && (
              <p className="textsize10 text_justif">
                {row.content_a.length > 150 
                  ? row.content_a.substring(0, 150) + "..." 
                  : row.content_a}
              </p>
            )}
            {row.presignedUrl_tumb_b && (
              <Image
                src={row.presignedUrl_tumb_b}
                className="rad15 px-3"
                style={{ maxWidth: 130, objectFit: "contain" }}
              />
            )}
            {row.content_b && (
              <p className="textsize10 text_justif">
                {row.content_b.length > 150 
                  ? row.content_b.substring(0, 150) + "..." 
                  : row.content_b}
              </p>
            )}
            {row.presignedUrl_tumb_c && (
              <Image
                src={row.presignedUrl_tumb_c}
                className="rad15 px-3"
                style={{ maxWidth: 130, objectFit: "contain" }}
              />
            )}
            {row.content_c && (
              <p className="textsize10 text_justif">
                {row.content_c.length > 150 
                  ? row.content_c.substring(0, 150) + "..." 
                  : row.content_c}
              </p>
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
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="gap-2 p-2">
          <Link to={`/Satupeta/Artikel/Update/${params.row.id_artikel}`}>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1" size={18} />
            </button>
          </Link>
          <ModalDelete id={params.row.id_artikel} name={params.row.title} />
        </div>
      ),
    },
  ];

   // Filter data manual
  const filteredRows = rowsku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Ganti spasi dengan strip (-)
      .replace(/[^\w\-]+/g, '')    // Hapus karakter non-kata
      .replace(/\-\-+/g, '-');     // Hapus strip ganda
  };

  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satu Peta Artikel" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-4">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 flex textsize10">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="text-silver-a mx-2 flex textsize10">
              <MdDataset className="mt-1" /> Satupeta Artikel
            </NavLink>
          </p>
        </div>
        <div className="md:col-span-2 px-10 mt-2">
          <ModalTambah />
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
                <div className="text-center mb-3">
                  <p className="text-gray-500 textsize10">
                    Pencarian berdasarkan Judul & Konten.
                  </p>
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
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

              <Tab eventKey="aktivitas" title="Aktivitas">
                  <Activity kunci={'Satu Peta Artikel'}/>
              </Tab>
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
}
