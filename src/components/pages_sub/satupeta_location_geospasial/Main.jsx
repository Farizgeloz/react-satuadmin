import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col,Tabs, Tab } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';

import "../../../App.css";
import NavSub from "../../NavSub";
import DatasetModalTambah from "./ModalTambahMulti";
import DatasetModalTambahFile from "./ModalTambahFile";
import Downloadku from "./Download";
import Downloaddataku from "./Download_Data";
import DatasetModalDelete from "./ModalDelete";
import Activity from "../log/Activity";

import { MdDashboard, MdDataset, MdInfoOutline, MdEditSquare } from "react-icons/md";
import { api_url_satuadmin } from "../../../api/axiosConfig";




// Theme MUI custom label pagination
const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: "Data per halaman:"
      }
    }
  }
});



// Format tanggal Indonesia aman
function convertDate(datePicker) {
  if (!datePicker) return "-";
  const selectedDate = new Date(datePicker);
  if (isNaN(selectedDate)) return "-";

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const day = selectedDate.getDate();
  const monthName = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();
  const jam = String(selectedDate.getHours()).padStart(2, "0");
  const menit = String(selectedDate.getMinutes()).padStart(2, "0");
  const detik = String(selectedDate.getSeconds()).padStart(2, "0");

  return `${day} ${monthName} ${year} Waktu : ${jam}:${menit}:${detik} WIB`;
}



const Datasetlist = () => {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [loading, setLoading] = useState(true);
  const [dataku, setDatasetSearch] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [kategoriku, setDatasetKategori] = useState([]);
  const [satkerku, setDatasetProdukData] = useState([]);
  const [sifat_dataku, setDatasetSifatData] = useState([]);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Silakan pilih file CSV/Excel terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");
      const res = await api_url_satuadmin.post("api/satupeta/location_point/addcsv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`✅ ${res.data.message} | Inserted: ${res.data.inserted}, Skipped: ${res.data.skipped}`);
      
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage(`❌ Upload gagal: ${err.response.data.error} (${err.response.data.detail})`);
      } else {
        setMessage(`❌ Terjadi error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*const [searchRes, itemRes] = await Promise.all([
          axios.get(apiurl + 'satupeta/map_data/admin')
          //axios.get(apiurl + 'opendata/dataset_item')
        ]);*/
        //const searchRes = await api_url_satuadmin.get("api/satupeta/map_data/admin");
        const searchRes = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
                  params: { search_satker:userloginsatker }
                });
    
        setDatasetSearch(searchRes.data?.resultgeospasial || []);
        
        
        
        //setDatasetSifatData(itemRes.data?.resultSifatData || []);
        //setDatasetProdukData(itemRes.data?.resultSatker || []);
        //setDatasetKategori(itemRes.data?.resultsektor || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Data untuk DataGrid
  const rowsku = Array.isArray(dataku)
    ? dataku.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row,
        koleksi_peta_geospasial: `${row.koleksi_peta ?? ''} ${row.nama_geospasial ?? ''}`
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
      field: "koleksi_peta_geospasial", 
      headerName: "Nama Geospasial & Koleksi", 
      flex: 2,
      minWidth: 100,
      filterable: true,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="text-left">
            {row.nama_geospasial && (
              <p className="textsize10 mb-0">{row.nama_geospasial}</p>
            )}
           <p className={` my-1 textsize10`}>({row.koleksi_peta})</p>
          </div>
        );
      }
    },
    
    { 
      field: "luas_area", 
      headerName: "Luas", 
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%" }}>
           
            {row.luas_area && (
              <p className="textsize10">{formatArea(row.luas_area)} {row.satuan}</p>
            )}
          </div>
        );
      }
    },
    { 
      field: "geojson", 
      headerName: "Geojson", 
      flex: 3,
      filterable: true,
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        const text = row.geojson ? row.geojson.substring(0, 50) + "..." : "";

        return (
          <div>
            <p className="my-1 textsize10">{text}</p>
          </div>
        );
      }
    },
    
    { 
      field: "kecamatan", 
      headerName: "Kecamatan", 
      flex: 2,
      minWidth: 100,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="text-center">
           <p className={` my-1 textsize10`}>{row.kecamatan}</p>
          </div>
        );
      }
    },
     { 
      field: "desa", 
      headerName: "Desa", 
      flex: 2,
      minWidth: 100,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="text-center">
           <p className={` my-1 textsize10`}>{row.desa}</p>
          </div>
        );
      }
    },
    { 
      field: "map_color", 
      headerName: "Warna", 
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%",backgroundColor: row.map_color }}>
           
            {row.map_color && (
              <p className="textsize10 text-white px-1">{row.map_color}</p>
            )}
          </div>
        );
      }
    },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1,
      minWidth: 60,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
         
          <Tooltip title="Edit Geospasial" arrow>
            <Link to={`/Satupeta/Geospasial/Update/${params.row.id_location_geospasial}`} className="flex items-center justify-center mb-[2px]">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                <MdEditSquare className="mr-1" size={18} />
              </button>
            </Link>
          </Tooltip>
          {(rolelogin === "Super Admin" || rolelogin === "Admin" || rolelogin === "Operatior") && (
          <DatasetModalDelete id={params.row.id_location_geospasial} name={params.row.nama_geospasial} />
          )}
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

  // 👉 Download Template CSV (hanya header kolom)
  
  const formatArea = (value) => {
    if (!value && value !== 0) return "-";

    const num = Number(value);
    if (isNaN(num)) return value;

    if (num >= 1000) {
      return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
    }

    return num;
  };

  return (
    <div className="bg-slate-100 max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satupeta Geospasial" />
      <Row className="rounded g-4 drop-shadow-lg">
        {/* Breadcrumb */}
        <Col md={12} xs={12}>
          <p className="textsize10 font-semibold text-gray-300 d-flex pt-2 mt-2 mx-3 mb-0">
            <NavLink
              to="/Dashboard"
              className="text-silver-a me-2 d-flex textsize10"
            >
              <MdDashboard className="mt-1 textsize10" />
              Dashboard
            </NavLink>
            /
            <NavLink
              to="/Satupeta/Geospasial"
              className="text-silver-a ms-2 d-flex textsize10"
            >
              <MdDataset className="mt-1 textsize10" />
              Geospasial
            </NavLink>
          </p>
        </Col>
        {/* Download Buttons */}
        <Col md={7} xs={12}>
          <Row className="g-4 drop-shadow-lg">
            <Col xs={3}>
              <Downloaddataku dataku={dataku} />
            </Col>
            <Col xs={6}>
              <Downloadku />
            </Col>
          </Row>
        </Col>
        {/* DatasetModa
        {/* DatasetModals */}
        <Col md={5} xs={12} className="bg-blue">
          <Row className="g-4 drop-shadow-lg px-3">
            <Col md={5} xs={12}>
              <DatasetModalTambah />
            </Col>
            <Col md={6} xs={6}>
              <DatasetModalTambahFile />
            </Col>
          </Row>
        </Col>

        
      </Row>

      <div className='overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          <Container fluid>
            <Tabs
              defaultActiveKey="tabel"
              id="example-tabs"
              className="mb-3"
            >
              <Tab eventKey="tabel" title="Tabel">
                <div className="text-center">
                  <p className="text-sage textsize10">Pencarian berdasarkan Lokasi, Titik Lokasi Kecamatan,dan Desa.</p>
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
                  <Activity kunci={'Satu Peta Geospasial'}/>
              </Tab>
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Datasetlist;
