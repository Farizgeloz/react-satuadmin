import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col, Button,Modal,Tabs, Tab } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';

import "../../../App.css";
import NavSub from "../../NavSub";
import DatasetModalTambah from "./PermohonanModalTambahMulti";
import DatasetModalTambahFile from "./PermohonanModalTambahFile";
import Downloadku from "./Permohonan_Download";
import Downloaddataku from "./Permohonan_Download_Data";
import DatasetModalDelete from "./PermohonanModalDelete";
import Activity from "../log/Activity";

import { MdDashboard, MdDataset, MdInfoOutline, MdEditSquare, MdOutlineRemoveRedEye, MdOutlineMessage } from "react-icons/md";
import { api_url_satuadmin, api_url_satudata } from "../../../api/axiosConfig";

const apiurl =  import.meta.env.VITE_API_URL;

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
  const [opd, setOpd] = useState("");
  const [searchText, setSearchText] = React.useState("");
  const [kategoriku, setDatasetKategori] = useState([]);
  const [satkerku, setDatasetProdukData] = useState([]);
  const [sifat_dataku, setDatasetSifatData] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);  
  const [tiketDetail, setTiketDetail] = useState(null);
  const [jumlahTiketMap, setJumlahTiketMap] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

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
      const res = await axios.post(apiurl + "api/satupeta/location_point/addcsv", formData, {
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
    if (!dataku?.length) return;

    const idsBelumAda = dataku
      .map(row => row.id_permohonan)
      .filter(id => !(id in jumlahTiketMap));

    idsBelumAda.forEach(id => getJumlahTiket(id));
  }, [dataku]);

  const getJumlahTiket = async (id) => {
    try {
      const res = await api_url_satuadmin.get(`api/opendata/dataset_permohonan/detail_jumlah/${id}`);
      const tiket = res.data.tiket || [];
      setJumlahTiketMap(prev => ({ ...prev, [id]: tiket.length }));
      
    } catch (err) {
      console.error("Gagal ambil jumlah tiket:", err);
    }
  };

  const handleShowDetail = async (id) => {
    setShowDetail(true);
    setLoadingDetail(true);
    setSelectedDetail(null);

    try {
      const res = await api_url_satuadmin.get(`api/opendata/dataset_permohonan/detail/${id}`);
      const permohonan = res.data.permohonan;
      const tiket = res.data.tiket; // kalau butuh tiket juga
      
      setSelectedDetail(permohonan);
      setTiketDetail(tiket);
      const res3 = await api_url_satudata.get("dataset?limit=1000");
      const allDataset = res3.data || [];

      const satkerList = allDataset
      .map(item => ({
          id_opd: item.opd?.id_opd,
          nama_opd: item.opd?.nama_opd,
      }))
      .filter(opd => opd.id_opd && opd.nama_opd);

      // Buat unique berdasarkan id_opd
      const uniqueSatker = Array.from(
      new Map(satkerList.map(opd => [opd.id_opd, opd])).values()
      );

      // 🟢 Cocokkan nama OPD berdasarkan id_opd dari response
      const opd_id_from_response =
        typeof permohonan.opd === "object"
          ? permohonan.opd?.id_opd
          : permohonan.opd;

      const matchedOpd = uniqueSatker.find(opd => opd.id_opd === opd_id_from_response);

      setOpd(matchedOpd ? matchedOpd.nama_opd : permohonan.nama_opd || "-");
      //console.log("selectdata:", res3.data);
      
    } catch (err) {
      console.error("Gagal ambil detail:", err);
      setSelectedDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  /* const handleShowDetail = (row) => {
    setSelectedRow(row);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedRow(null);
  }; */

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*const [searchRes, itemRes] = await Promise.all([
          axios.get(apiurl + 'api/satupeta/map_data/admin')
          //axios.get(apiurl + 'api/opendata/dataset_item')
        ]);*/
        const searchRes = await api_url_satuadmin.get("api/opendata/dataset_permohonan");
    
        setDatasetSearch(searchRes.data?.data || []);
        
        
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
      field: "nomor_tiket", 
      headerName: "No Tiket", 
      flex: 2,
      minWidth: 100,
      filterable: true,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="text-left">
           <p className={` my-1 textsize10`}>{row.nomor_tiket}</p>
          </div>
        );
      }
    },
    { 
      field: "nama_lengkap", 
      headerName: "Pemohon", 
      flex: 3,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%" }}>
           
            {row.nama_lengkap && (
              <p className="textsize10">{row.nama_lengkap}</p>
            )}
          </div>
        );
      }
    },
    { 
      field: "telpon", 
      headerName: "Telpon", 
      flex: 2,
      filterable: true,
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <div>
            <p className={`my-1 textsize10`}>{row.telpon}</p>
            
          </div>
        );
      }
    },
    
    { 
      field: "Email", 
      headerName: "Email", 
      flex: 2,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="text-left">
           <p className={` my-1 textsize10`}>{row.email}</p>
          </div>
        );
      }
    },
    { 
      field: "judul", 
      headerName: "Judul", 
      flex: 3,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{ textAlign: "left", width: "100%" }}>
           
            {row.judul && (
              <p className="textsize10">{row.judul}</p>
            )}
          </div>
        );
      }
    },
    { 
      field: "status", 
      headerName: "Status", 
      flex: 1,
      minWidth: 100,
      headerAlign: 'left',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="" style={{  width: "100%" }}>
           
            {row.status && (
              <p className="textsize10">{row.status}</p>
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
          <Tooltip title="Balas Tiket" arrow>
            <Link to={`/Opendata/Dataset/Permohonan/Update/${params.row.id_permohonan}`} className="flex items-center justify-center mb-[2px]">
              <button
                className={`
                  ${ (jumlahTiketMap[params.row.id_permohonan] ?? 0) > 0
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-yellow-500 hover:bg-yellow-400"
                  }
                   text-white font-bold py-2 px-3 rounded-xl flex items-center
                `}
              >
                <MdOutlineMessage className="mr-1" size={18} />
                <span 
                  className={`
                    ${ (jumlahTiketMap[params.row.id_permohonan] ?? 0) > 0
                      ? "text-red"
                      : "text-white"
                    }
                    font-bold
                  `}
                
                >
                  ({jumlahTiketMap[params.row.id_permohonan] ?? 0})
                </span>
              </button>
            </Link>
          </Tooltip>
           {/* Tombol Detail */}
          <Tooltip title="Lihat Detail" arrow>
            <Link to='' className="flex items-center justify-center mb-[2px]">
              <Button
                variant="info"
                size="xs"
                className="rad10 flex items-center justify-center px-3 text-white"
                onClick={() => handleShowDetail(params.row.id_permohonan)}
              >
                <MdOutlineRemoveRedEye className="mr-1" size={18} />
                
              </Button>
            </Link>
          </Tooltip>
          
          <DatasetModalDelete id={params.row.id_permohonan} name={params.row.nomor_tiket} />
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
  

  return (
    <div className="bg-slate-100 max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Opendata Permohonan Dataset" />
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
              to="/Dataset/Permohonan"
              className="text-silver-a ms-2 d-flex textsize10"
            >
              <MdDataset className="mt-1 textsize10" />
              Dataset Permohonan
            </NavLink>
          </p>
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
                  <p className="text-sage textsize10">Pencarian berdasarkan Nomor Tiket dan Nama Pemohon.</p>
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
                      {/* MODAL DETAIL */}
                      <Modal
                        show={showDetail}
                        onHide={() => setShowDetail(false)}
                        centered
                        size="lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Detail Permohonan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {loadingDetail ? (
                            <p>Sedang memuat data...</p>
                          ) : selectedDetail ? (
                            <>
                            <table className="table table-bordered table-sm">
                              <tbody>
                                <tr>
                                  <th className="bg-light w-25">Nomor Tiket</th>
                                  <td>{selectedDetail.nomor_tiket}</td>
                                </tr>
                                <tr>
                                  <th>Nama Lengkap</th>
                                  <td>{selectedDetail.nama_lengkap}</td>
                                </tr>
                                <tr>
                                  <th>Email</th>
                                  <td>{selectedDetail.email}</td>
                                </tr>
                                <tr>
                                  <th>Telpon</th>
                                  <td>{selectedDetail.telpon}</td>
                                </tr>
                                <tr>
                                  <th>Pekerjaan</th>
                                  <td>{selectedDetail.pekerjaan}</td>
                                </tr>
                                <tr>
                                  <th>Judul Permohonan</th>
                                  <td>{selectedDetail.judul}</td>
                                </tr>
                                <tr>
                                  <th>OPD Tujuan</th>
                                  <td>{opd}</td>
                                </tr>
                                <tr>
                                  <th>Status</th>
                                  <td>{selectedDetail.status}</td>
                                </tr>
                                <tr>
                                  <th>Tanggal Dibuat</th>
                                  <td>{convertDate(selectedDetail.created_at)}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div style={{ maxHeight: "300px", }} className="py-2 px-3 overflow-yy-auto">
                                {tiketDetail.map((message) => (
                                  
                                    <div key={message.id_permohonan} className="p-1 bg-border2 rad10 mb-1">
                                        {message.from === "Admin" ? (
                                            <>
                                                <p className="mb-0 italicku text-body">Anda</p>
                                                <p
                                                  className={`text-left font_weight600 pb-1 px-3 ${
                                                    message.status === "read" ? "text-primary" : "text-body"
                                                  }`}
                                                >
                                                  {message.pesan}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="mb-0 italicku text-body text-end">Pemohon</p>
                                                <p
                                                  className={`text-left font_weight600 pb-1 px-3 ${
                                                    message.status === "read" ? "text-primary" : "text-body"
                                                  }`}
                                                >
                                                  {message.pesan}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            </>
                          ) : (
                            <p>Data tidak ditemukan</p>
                          )}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setShowDetail(false)}>
                            Tutup
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      {/* <Modal show={showDetail} onHide={handleCloseDetail} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Detail Permohonan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {selectedRow ? (
                            <div>
                              <p><strong>No Tiket:</strong> {selectedRow.nomor_tiket}</p>
                              <p><strong>Nama Pemohon:</strong> {selectedRow.nama_lengkap}</p>
                              <p><strong>Telpon:</strong> {selectedRow.telpon}</p>
                              <p><strong>Email:</strong> {selectedRow.email}</p>
                              <p><strong>Pekerjaan:</strong> {selectedRow.pekerjaan}</p>
                              <p><strong>Judul:</strong> {selectedRow.judul}</p>
                              <p><strong>Status:</strong> {selectedRow.status}</p>
                            </div>
                          ) : (
                            <p>Memuat data...</p>
                          )}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseDetail}>
                            Tutup
                          </Button>
                        </Modal.Footer>
                      </Modal> */}

                    </motion.div>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="aktivitas" title="Aktivitas">
                  <Activity kunci={'Permohonan Dataset'}/>
              </Tab>

            </Tabs>
            
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Datasetlist;
