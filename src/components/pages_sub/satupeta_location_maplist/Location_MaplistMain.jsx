import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col,Tabs, Tab } from 'react-bootstrap';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';

import "../../../App.css";
import NavSub from "../../NavSub";
import DatasetModalTambah from "./Location_MaplistModalTambahMulti";
import DatasetModalTambahFile from "./Location_MaplistModalTambahFile";
import Downloaddataku from "./Location_Maplist_Download_Data";
import Downloadku from "./Location_Maplist_Download";
import DatasetModalDelete from "./Location_MaplistModalDelete";
import Activity from "../log/Activity";

import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { api_url_satuadmin } from "../../../api/axiosConfig";


const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const userloginsatker = userlogin.satker_id || '';
const userloginadmin = userlogin.id || '';

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
  const [loading, setLoading] = useState(true);
  const [dataku, setDatasetSearch] = useState([]);
  const [searchText, setSearchText] = React.useState("");

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchRes = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
          params: { search_satker:userloginsatker }
        });
    
        setDatasetSearch(searchRes.data?.resultlocationmaplistUrls || []);
        
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
        koleksi_tipe: `${row.koleksi_data ?? ''} ${row.tipe ?? ''}`,
        sektor_satker: `${row.nama_sektor ?? ''} ${row.nama_opd ?? ''}`,
        tahun_visibilitas: `${row.tahun_rilis ?? ''} ${row.visibilitas ?? ''}`
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
      field: "koleksi_tipe", 
      headerName: "Koleksi", 
      flex: 2,
      minWidth: 100,
      filterable: true,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="">
            <p className={` my-1 textsize10 mb-0`}>{row.koleksi_data}</p>
            <p
              className={`my-0 textsize10 ${
                row.tipe === "Geomap"
                  ? "bg-orange-600 text-white px-1 rounded"
                  : row.tipe === "Marker"
                  ? "bg-teal-600 text-white px-1 rounded"
                  : row.tipe === "Layout"
                  ? "bg-sky-600 text-white px-1 rounded"
                  : ""
              }`}
            >
              ({row.tipe})
            </p>
          </div>
        );
      }
    },
    { 
      field: "title", 
      headerName: "Nama Maplist", 
      flex: 3,
      minWidth: 100,
      filterable: true,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="">
           <p className={` my-1 textsize10`}>{row.title}</p>
          </div>
        );
      }
    },
    { 
      field: "sektor_satker", 
      headerName: "Sektor & Satker", 
      flex: 3,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%" }}>
           
            {row.nama_opd && (
              <p className="textsize10 mb-0 d-flex"> <FaBuildingColumns size={25} className="mt-1 mr-2" /> <span>{row.nama_opd}</span></p>
              
            )}
            {row.nama_sektor && (
              <p className={`my-3 textsize10 `} style={{color:"#"+row.sektor_color}}>( {row.nama_sektor} )</p>
             )}
          </div>
        );
      }
    },
    { 
      field: "nama_location", 
      headerName: "Lokasi", 
      flex: 2,
      filterable: true,
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div>
            <p className={`my-1 textsize10`}>{row.nama_location}</p>
            <img
              src={row.presignedUrl_tumb}
              alt="gambar"
              style={{
                width: "100px",
                height: "auto", // penuh tinggi cell
                maxHeight: '100%' // biar tidak overflow
              }}
              className="rounded border p-1"
            />
            
          </div>
        );
      }
    },
    { 
      field: "tahun_visibilitas", 
      headerName: "Tahun & Visibilitas", 
      flex: 1,
      minWidth: 100,
      filterable: true,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="">
           <p className={` my-1 textsize10 mb-0`}>{row.tahun_rilis}</p>
           <p className={` my-2 textsize10`}>{row.visibilitas}</p>
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
         
          <Tooltip title="Edit dataset" arrow>
            <Link to={`/Satupeta/Koleksi-Peta/Update/${slugify(params.row.title)}`} className="flex items-center justify-center mb-[2px]">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                <MdEditSquare className="mr-1" size={18} />
              </button>
            </Link>
          </Tooltip>
          <DatasetModalDelete id={params.row.id_maplist} name={params.row.title} />
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
  
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-');        // Ganti spasi dengan strip (-)
      //.replace(/[^\w\-]+/g, '')    // Hapus karakter non-kata
      //.replace(/\-\-+/g, '-');     // Hapus strip ganda
  };

  return (
    <div className="bg-slate-100 max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satupeta Koleksi Peta" />
      <Row className="rounded g-4 drop-shadow-lg">
        {/* Breadcrumb */}
        <Col md={8} xs={12}>
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
              to="/Satupeta/Koleksi-Peta"
              className="text-silver-a ms-2 d-flex textsize10"
            >
              <MdDataset className="mt-1 textsize10" />
              Koleksi Peta
            </NavLink>
          </p>
        </Col>

        {/* Tambah Dataset */}
        <Col md={4} xs={12}>
          <Row className="g-4 drop-shadow-lg">
            <Col xs={12}>
              <DatasetModalTambah />
            </Col>
            <Col xs={6}>
              {/* <DatasetModalTambahFile /> */}
            </Col>
          </Row>
        </Col>

        {/* Download Section */}
        {/* <Col md={4} xs={12}>
          <Row className="g-4 drop-shadow-lg">
            <Col xs={6}>
              <Downloaddataku dataku={dataku} />
            </Col>
            <Col xs={6}>
              <Downloadku />
            </Col>
          </Row>
        </Col> */}
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
                <div className="text-center p-2">
                  <p className="text-sage textsize10">Pencarian berdasarkan Nama Lokasi, Satker dan Sektor.</p>
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
                  <Activity kunci={'Satu Peta Koleksi'}/>
              </Tab>
            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Datasetlist;
