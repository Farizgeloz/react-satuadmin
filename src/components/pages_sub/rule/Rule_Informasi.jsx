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

import { MdDashboard, MdDataset, MdInfoOutline, MdEditSquare, MdOutlineRemoveRedEye } from "react-icons/md";
import { FaBuildingColumns } from "react-icons/fa6";
import { api_url_satuadmin, api_url_satudata } from "../../../api/axiosConfig";



const rolelogin = localStorage.getItem('role');

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
  const [datakustatus, setDatasetSearchStatus] = useState([]);
  const [searchText, setSearchText] = React.useState("");

  const [searchTextStatus, setSearchTextStatus] = React.useState("");
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

  const [showDetail, setShowDetail] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);  
  const [namalokasi, setNamaLokasi] = useState("");

  const handleShowDetail = async (id,nama) => {
    setShowDetail(true);
    setLoadingDetail(true);
    setSelectedDetail(null);

    setNamaLokasi(nama);

    try {
      const res = await api_url_satuadmin.get(`api/satupeta/map_data/locationpoint/${id}`);
      const ambil_titik = res.data?.result;
      
      setSelectedDetail(ambil_titik);
      
      console.log("setSelectedDetail",ambil_titik);
      
    } catch (err) {
      console.error("Gagal ambil detail:", err);
      setSelectedDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchRes = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
          params: { search_satker:userloginsatker,search_role:rolelogin }
        });
        setDatasetSearch(searchRes.data?.resultlocation || []);
        setDatasetSearchStatus(searchRes.data?.resultlocationstatus || []);
        
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
  const rowskustatus = Array.isArray(datakustatus)
    ? datakustatus.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row,
      }))
    : [];

  const rowskulocationpoint = Array.isArray(selectedDetail)
    ? selectedDetail.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row
      }))
    : [];


    const statusStyle = {
      draft: "bg-gray-600 text-white border border-gray-400",
      pending: "bg-yellow-600 text-white border border-yellow-400",
      verified: "bg-green-600 text-white border border-green-500",
      publik: "bg-blue-600 text-white border border-blue-500",
      privat: "bg-red-600 text-white border border-red-500",
    };

   // Filter data manual
  const filteredRows = rowsku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const filteredRowsStatus = rowskustatus.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTextStatus.toLowerCase())
    )
  );

  // 👉 Download Template CSV (hanya header kolom)
  

  return (
    <div className="bg-slate-100 max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Rule & Informasi" />
      <div className="rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-4">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
              <MdDashboard className="mt-1 textsize10" />Dashboard
            </NavLink> / 
            <NavLink to="/Rule-Informasi" className="text-silver-a mr-2 d-flex textsize10">
              <MdDataset className="mt-1 textsize10" />Rule Informasi
            </NavLink>
          </p>
        </div>

       {/*  <DatasetModalTambahFile />

        <Downloadku /> */}

        
        
      </div>

      <div className='overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white px-2">
          
          <Container fluid>
            <Row className="mt-5">
              <p className="textsize12 font_weight600">Proses Alur Pengajuan Mapset:</p>
              <Col sm={12} className="d-flex" >
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block
                      ${statusStyle['draft']}
                    `}
                    style={{width:"100px"}}
                  >
                    Draft
                  </p>
                  <p className="mt-1">Pengajuan data dan menunggu diteruskan oleh Verifikator OPD.</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['pending']}
                    `}
                    style={{width:"100px"}}
                  >
                    Pending
                  </p>
                  <p className="mt-1">Data sudah diajukan dan menunggu proses verifikasi dari Operator Wali Data.</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['verified']}
                    `}
                    style={{width:"100px"}}
                  >
                    Verified
                  </p>
                  <p className="mt-1">Data sudah diverifikasi dan dinyatakan valid oleh Operator Wali Data.</p>
                  
              </Col>
              
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['publik']}
                    `}
                    style={{width:"100px"}}
                  >
                    Publik
                  </p>
                  <p className="mt-1">Data ditampilkan untuk semua pengguna aplikasi.</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['privat']}
                    `}
                    style={{width:"100px"}}
                  >
                    Privat
                  </p>
                  <p className="mt-1">Data dibatasi aksesnya, hanya untuk pengguna tertentu.</p>
                  
              </Col>
            </Row>
            <Row className="mt-5">
              <p className="textsize12 font_weight600">Role Hak Akses Aplikasi:</p>
              <Col sm={12} className="d-flex" >
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Super Admin
                  </p>
                  <p className="mt-1">Hak tertinggi dalam sistem Aplikasi Satu Admin</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Admin
                  </p>
                  <p className="mt-1">Dapat mengakses semua fitur dan sebagai Walidata yang dapat mempublikasi mapset</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Operator
                  </p>
                  <p className="mt-1">Memvalidasi proses verifikasi data dari Verifikator Opd dan kelolah konten </p>
                  
              </Col>
              
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Verifikator Opd
                  </p>
                  <p className="mt-1">Memverifikasi data dan melanjutkannya kepada Operator Walidata.</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Operator Opd
                  </p>
                  <p className="mt-1">Mengajukan mapset berupa layout, marker dan geospasial</p>
                  
              </Col>
            </Row>
            <Row className="mt-5">
              <p className="textsize12 font_weight600">Satu Peta:</p>
              <Col sm={12} className="d-flex" >
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Lokasi Peta
                  </p>
                  <p className="mt-1">CRUD data untuk mengelompokkan lokasi marker</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Koleksi Peta
                  </p>
                  <p className="mt-1">CRUD data peta interaktif dan layout</p>
                  
              </Col>
              <Col sm={12} className="d-flex">
                  <p
                    className={`
                      px-2 py-1 mx-3 textsize10 rounded-lg font-semibold inline-block w-fit
                      ${statusStyle['draft']}
                    `}
                    style={{width:"150px"}}
                  >
                    Titik Lokasi
                  </p>
                  <p className="mt-1">CRUD data titik lokasi marker ( berupa titik koordinat Lan dan Lon) </p>
                  
              </Col>
              
              
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Datasetlist;
