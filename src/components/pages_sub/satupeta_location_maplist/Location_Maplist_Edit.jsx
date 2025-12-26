import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import {Row,Col} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineArrowCircleLeft,
        MdOutlineSave} from "react-icons/md";


import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import { api_url_satuadmin } from '../../../api/axiosConfig';

import KontenEditor_deskripsi from "../KontenEditor_deskripsi";


const textFieldStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: 60,
    fontSize: "1.2rem",
    background: "#ecfccb",
    borderRadius: "6px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.0rem",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    backgroundColor: "#2a4f74",
    color: "#fff",
    borderRadius: "6px",
    padding: "0 6px",
    transform: "translate(14px, -9px) scale(0.85)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "6px",
    padding: "0 6px",
    transform: "translate(14px, -9px) scale(0.85)",
  },
});

const textFieldStyleMultiline = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: "auto",
    fontSize: "1.2rem",
    background: "#ecfccb",
    borderRadius: "6px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.0rem",
    fontWeight: 600,
    transition: "all 0.2s ease",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    backgroundColor: "#2a4f74",
    color: "#fff",
    borderRadius: "6px",
    padding: "0 6px",
    transform: "translate(14px, -9px) scale(0.85)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: "6px",
    padding: "0 6px",
    transform: "translate(14px, -9px) scale(0.85)",
  },
});

function DatasetPengelolah() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [sektorku, setsektorku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [satkerku, setsatkerku] = useState([""]);
  const [location, setlocation] = useState(null);
  const [satker, setsatker] = useState(null);
  const [sektor, setsektor] = useState(null);
  const [id_data, setid_data] = useState(null);
  const [koleksi_data, setkoleksi_data] = useState(null);
  const [title, settitle] = useState("");
  const [tahun, settahun] = useState("");
  const [pengukuran, setpengukuran] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [tipe, settipe] = useState(null);
  const [periode, setperiode] = useState(null);
  const [visibilitas, setvisibilitas] = useState(null);
  const [loading, setLoading] = useState(false);


  const [fileError, setFileError] = useState("");
  const [validasi_file, setvalidasi_file] = useState(false);


  const [file, setfile] = useState("");
  const [images, setimages] = useState("");

  const validateImageFile = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validasi tipe file
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Format Tidak Valid",
        text: "Hanya file JPG, JPEG, atau PNG yang diperbolehkan!",
        confirmButtonColor: "#3085d6",
      });
      e.target.value = "";
      return;
    }

    // ✅ Validasi ukuran (maks 5MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "Ukuran Terlalu Besar",
        text: "Ukuran file maksimal 5 MB.",
        confirmButtonColor: "#3085d6",
      });
      e.target.value = "";
      return;
    }

    // ✅ Set file & preview
    setFile(file);
    if (setPreview) setPreview(URL.createObjectURL(file));
  };
  const loadImage = (e) => {
    validateImageFile(e, setfile, setimages);
  };

  
  const navigate = useNavigate();
  const { id } = useParams();

   
  useEffect(() => {
    getDataById();

    getDatasetItem();
    

    

  }, []);

  
  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_item2", {
      params: { search_satker:userloginsatker }
    });
    setlocationku(response.data.resultlocation);
    setsektorku(response.data.resultsektor);
    setsatkerku(response.data.resultsatker);
  };

  
  

  const getDataById = async () => {
    try {
      const response = await api_url_satuadmin.get(`satupeta/Koleksi-Peta/detail/${id}`);

      // Ambil data utama
      setid_data(response.data.data.id_maplist);
      setkoleksi_data({ value: response.data.data.koleksi_data, label: response.data.data.koleksi_data });
      settitle(response.data.data.title);
      settahun(response.data.data.tahun_rilis);
      settipe({ value: response.data.data.tipe, label: response.data.data.tipe });
      setimages(response.data.data.presignedUrl);
      setperiode({ value: response.data.data.periode, label: response.data.data.periode });
      setvisibilitas({ value: response.data.data.visibilitas, label: response.data.data.visibilitas });
      setlocation({ value: response.data.data.location_id, label: response.data.data.nama_location });
      setsatker({ value: response.data.data.satker_id, label: response.data.data.nama_opd });
      setsektor({ value: response.data.data.sektor_id, label: response.data.data.nama_sektor });
      
      setpengukuran(response.data.data.pengukuran);
      setdeskripsi(response.data.data.deskripsi);

      
      

    } catch (err) {
      console.error("❌ Gagal ambil data detail:", err);
    }
  };



  const updateDataset = async (e) => {
    e.preventDefault();
    let locationn=location.value;
    if(locationn === null){
      locationn="0";
    }
    const formData = new FormData();
    
    formData.append("file",file);
    formData.append("koleksi_data",koleksi_data.value);
    formData.append("title",title);
    formData.append("tahun_rilis",tahun);
    formData.append("pengukuran",pengukuran);
    formData.append("deskripsi",deskripsi);
    formData.append("tipe",tipe.value);
    formData.append("periode",periode.value);
    /* formData.append(
      "visibilitas",
      rolelogin === "Super Admin" || rolelogin === "Admin"
        ? visibilitas.value
        : "Privat"
    ); */
    formData.append("visibilitas",visibilitas.value);
    formData.append("location_id",locationn);
    formData.append("satker_id",satker.value);
    formData.append("sektor_id",sektor.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis", "Satu Peta Koleksi");
    formData.append("komponen", "Update Koleksi Satu Peta" );
    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses update data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await api_url_satuadmin.patch(`satupeta/Koleksi-Peta/update/${id_data}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
     
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Terjadi kesalahan.");
    }
  };


      
    

  function sweetsuccess() {
    Swal.fire({
      title: "Sukses",
      html: "Data Berhasil Disimpan",
      timer: 2000,
      icon: "success",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        navigate(`/Satupeta/Koleksi-Peta`);
      },
    });
  }

  function sweeterror(error) {
    Swal.fire({
      title: "Gagal",
      html: error,
      timer: 1500,
      icon: "error",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const [step, setStep] = useState(1);

  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };


  const [validasi_koleksi_data, setvalidasi_koleksi_data] = useState(false);
  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_tipe, setvalidasi_tipe] = useState(false);
  const [validasi_tahun, setvalidasi_tahun] = useState(false);
  const [validasi_periode, setvalidasi_periode] = useState(false);
  const [validasi_visibilitas, setvalidasi_visibilitas] = useState(false);
  const [validasi_location, setvalidasi_location] = useState(false);
  const [validasi_satker, setvalidasi_satker] = useState(false);
  const [validasi_sektor, setvalidasi_sektor] = useState(false);

 
  
  const handle_step = (event) => {
    const validKoleksi = koleksi_data !== null;
    const validTitle = (title?.length || 0) >= 3;
    const validTipe = tipe !== null;
    const validTahun = /^\d{4}$/.test(tahun) && Number(tahun) >= 1900 && Number(tahun) <= 2100;
    const validvisibilitas = visibilitas !== null;
    const validperiode = periode !== null;
    // kalau tipe marker, wajib pilih lokasi (bukan "0")
    const validsatker = satker !== null;
    const validsektor = sektor !== null;

    const isMarker = tipe?.value === "Marker";

    // validasi lokasi hanya wajib kalau Marker
    const validLocation = isMarker
      ? location !== null && location.value !== 0
      : true;
    

    setvalidasi_koleksi_data(!validKoleksi);
    setvalidasi_title(!validTitle);
    setvalidasi_tipe(!validTipe);
    setvalidasi_tahun(!validTahun);
    setvalidasi_periode(!validperiode);
    setvalidasi_visibilitas(!validvisibilitas);
    setvalidasi_location(!validLocation);
    setvalidasi_satker(!validsatker);
    setvalidasi_sektor(!validsektor);
    const allValid =
      validKoleksi && validTitle && validTipe && validTahun && validperiode &&
      validvisibilitas && validsatker && validsektor && validLocation;

  

    if (allValid) {
      nextStep();
    }

    
  };

  const getStatusOptions = () => {
    if (rolelogin === "Super Admin") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
        { label: "Publik", value: "Publik" },
        { label: "Privat", value: "Privat" },
      ];
    } else if (rolelogin === "Admin") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
        { label: "Publik", value: "Publik" },
        { label: "Privat", value: "Privat" },
      ];
      
    } else if (rolelogin === "Operator") {
      return [
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
      ]; // atau return [] jika tidak boleh pilih sama sekali
    } else if (rolelogin === "Operator Opd") {
      return [
        { label: "Draft", value: "Draft" }
      ]; // atau return [] jika tidak boleh pilih sama sekali
    } else if (rolelogin === "Verifikator Opd") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Pending", value: "Pending" },
      ]; // atau return [] jika tidak boleh pilih sama sekali
    } else {
      return [];
    }
  };


  
  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Satupeta Koleksi Peta Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satupeta/Koleksi-Peta" className="text-silver-a mx-2 d-flex">
            <MdDataset className="mt-1 textsize10" />Koleksi Peta
          </NavLink> /
          <NavLink  className="text-silver-a mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
          <Row className='p-1 mx-2'>
            
            <Col md={12} sm={12} className=' bg-linear-9 align-middle justify-content-center align-self-center mt-1 rad15'>
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{title}</p>
            </Col>
            
            
            
          </Row>
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateDataset}>
            <div className="relative flex px-5">
              <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                  {step === 1 && (
                    <motion.div
                        key={step} // Add this line
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-100 mx-auto">
                        {/* STEP INDICATOR */}
                        <div className="mt-4 flex items-center justify-between relative">

                          {/* STEP 1 */}
                          <div className="flex flex-col items-center z-10 w-1/2">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-600 text-white font-semibold shadow">
                              1
                            </div>
                            <span className="mt-1 text-xs text-cyan-700 font-semibold">
                              Form Input
                            </span>
                          </div>

                          {/* STEP 2 */}
                          <div className="flex flex-col items-center z-10 w-1/2">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-200 text-cyan-600 font-semibold">
                              2
                            </div>
                            <span className="mt-1 text-xs text-gray-500 font-semibold">
                              Konfirmasi
                            </span>
                          </div>

                          {/* PROGRESS LINE */}
                          <div className="absolute top-4 left-0 right-0 h-1 bg-cyan-200 rounded-full">
                            <div className="h-full bg-cyan-600 rounded-full transition-all duration-300 w-1/2" />
                          </div>

                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Jenis Koleksi Peta
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={[
                                    { label: "Peta Interaktif", value: "Peta Interaktif" },
                                    { label: "Peta Layout", value: "Peta Layout" }
                                  ]}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={koleksi_data}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_koleksi_data && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Tipe Map
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={[
                                    { label: "Layout", value: "Layout" },
                                    { label: "Geomap", value: "Geomap" },
                                    { label: "Marker", value: "Marker" },
                                  ]}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={tipe}
                                  onChange={(event, newValue) => {
                                    settipe(newValue);
                                    if (newValue?.value === "Geomap" || newValue?.value === "Layout") {
                                      setlocation({label: "0",value: "0"});
                                    }
                                  }}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_tipe && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Lokasi Peta
                                </label>
  
                                <Autocomplete
                                  className='tsize-110'
                                  disabled={tipe?.value === "Geomap" || tipe?.value === "Layout"}
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={locationku.map((row) => ({
                                    label: row.nama_location,
                                    value: row.id_location
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={location}
                                  onChange={(event, newValue) => setlocation(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_location && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Judul Koleksi
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={title}
                                  onChange={(e) => settitle(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {title && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settitle("")}
                                              edge="end"
                                              size="small"
                                            >
                                              <ClearIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        )}
                                      </>
                                    ),
                                  }}
                                />
  
                                {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                          </div> 

                          <div className="md:col-span-4 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Satker / OPD
                                </label>
  
                                <Autocomplete
                                  className='tsize-110'
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-satker"
                                  options={satkerku.map((row) => ({
                                    label: row.nama_opd,
                                    value: row.id_opd
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={satker}
                                  onChange={(event, newValue) => setsatker(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Sektor
                                </label>
  
                                <Autocomplete
                                  className='tsize-110'
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-sektor"
                                  options={sektorku.map((row) => ({
                                    label: row.nama_sektor,
                                    value: row.id_sektor
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={sektor}
                                  onChange={(event, newValue) => setsektor(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_sektor && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Periode
                                </label>
  
                                <Autocomplete
                                  className='tsize-110'
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={[
                                    { label: "Harian", value: "Harian" },
                                    { label: "Mingguan", value: "Mingguan" },
                                    { label: "Bulanan", value: "Bulanan" },
                                    { label: "Tahunan", value: "Tahunan" }
                                  ]}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={periode}
                                  onChange={(event, newValue) => setperiode(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_periode && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Tahun Rilis
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={tahun}
                                  type="number"
                                  onChange={(e) => settahun(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {tahun && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settahun("")}
                                              edge="end"
                                              size="small"
                                            >
                                              <ClearIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        )}
                                      </>
                                    ),
                                    maxLength: 4,
                                  }}
                                />
  
                                {validasi_tahun && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />Tidak Valid.</p>}
                              </div>
                            </div>
                          </div> 
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Pengukuran Skala
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={pengukuran}
                                  onChange={(e) => setpengukuran(e.target.value)}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={1}    // <-- tinggi awal textarea
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {pengukuran && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setpengukuran("")}
                                              edge="end"
                                              size="small"
                                            >
                                              <ClearIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        )}
                                      </>
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          </div> 
                          
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Deskripsi
                                </label>

                                <KontenEditor_deskripsi deskripsi={deskripsi} setdeskripsi={setdeskripsi} />
  
                                
                              </div>
                            </div>
                          </div> 
                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">

                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Gambar Konten
                                </label>

                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile("")}
                                              edge="end"
                                              size="small"
                                              title="Hapus file"
                                            >
                                              <ClearIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        )}
                                      </>
                                    ),
                                  }}
                                  sx={(theme) => ({
                                    ...textFieldStyle(theme),
                                    "& .MuiInputBase-root": {
                                      borderRadius: "12px",
                                      paddingRight: "8px",
                                      background: "#fafafa",
                                    },
                                    "& input::file-selector-button": {
                                      marginRight: "15px",
                                      padding: "7px 14px",
                                      border: "1px solid #ddd",
                                      borderRadius: "8px",
                                      background: "#fff",
                                      cursor: "pointer",
                                      fontWeight: 600,
                                    },
                                  })}
                                />
                                {fileError && (
                                  <p className="text-red-600 mt-2 d-flex">
                                    <MdOutlineErrorOutline className="mt-1 me-2" />
                                    {fileError}
                                  </p>
                                )}

                                

                              </div>

                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {images && (
                            <div className="md:col-span-1  col-span-6 -mt-4">
                              <p className="textsize10 mb-1 text-center">Preview Gambar:</p>

                              <div
                                className="p-2 border rad10 bg-light d-flex align-items-center justify-content-center"
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={images}
                                  alt="preview"
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="md:col-span-3 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Status
                                </label>
  
                                <Autocomplete
                                  className='tsize-110'
                                  //disabled={rolelogin !== "Super Admin" && rolelogin !== "Admin"}   // ⬅ DISABLE jika bukan admin
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={getStatusOptions()}
                                  getOptionLabel={(option) => option.label || ""}
                                  
                                  // jika bukan admin, value dipaksa privat
                                  value={visibilitas
                                  }

                                  onChange={(event, newValue) => {
                                    // jika bukan admin → jangan bisa ubah
                                    //if (rolelogin !== "Super Admin" && rolelogin !== "Admin") return;

                                    setvisibilitas(newValue);
                                  }}

                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="outlined"
                                      className="bg-input rad15 w-full"
                                      InputLabelProps={{ shrink: false }}
                                      sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                    width: "100%",
                                    "& .MuiAutocomplete-popupIndicator": {
                                      color: "#1976d2",
                                      transition: "transform 0.3s",
                                    },
                                    "& .MuiAutocomplete-popupIndicatorOpen": {
                                      transform: "rotate(180deg)",
                                    },
                                  }}
                                />
                                    {validasi_visibilitas && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mt-12">
                            
                              <button 
                                type="button"
                                onClick={() => {
                                  handle_step();
                                }}
                                className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                                <span>Lanjut</span><MdArrowCircleRight  className='mt-1 mx-1'  />
                            </button>
                              
                        </div>
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                      <motion.div
                          key={step} // Add this line
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="md:w-1/2 mx-auto py-12">
                          {/* STEP INDICATOR */}
                          <div className="mt-4 flex items-center justify-between relative">

                            {/* STEP 1 */}
                            <div className="flex flex-col items-center z-10 w-1/2">
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-600 text-white font-semibold shadow">
                                1
                              </div>
                              <span className="mt-1 text-xs text-cyan-700 font-semibold">
                                Form Input
                              </span>
                            </div>

                            {/* STEP 2 */}
                            <div className="flex flex-col items-center z-10 w-1/2">
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-600 text-white font-semibold shadow">
                                2
                              </div>
                              <span className="mt-1 text-xs text-cyan-700 font-semibold">
                                Konfirmasi
                              </span>
                            </div>

                            {/* PROGRESS LINE */}
                            <div className="absolute top-4 left-0 right-0 h-1 bg-cyan-200 rounded-full">
                              <div className="h-full bg-cyan-600 rounded-full transition-all duration-300 w-full" />
                            </div>

                          </div>
                          <div className="mt-12 textsize10  text-center">
                              Yakin Data Sudah Benar ?
                          </div>
                          <div>
                              <div className="flex justify-center mt-12">
                                <button 
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-slate-500 hover:bg-slate-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
                                    <MdOutlineArrowCircleLeft  className='mt-1 mx-1'  /><span>Kembali</span>
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                                    <MdOutlineSave  className='mt-1 mx-1'  /><span>Simpan</span>
                                </button>
                              </div>
                          </div>
                      </motion.div>
                  )}
              </div>
            </div>

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default DatasetPengelolah;
