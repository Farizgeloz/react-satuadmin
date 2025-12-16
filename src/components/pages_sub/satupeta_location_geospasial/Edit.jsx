import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import {Row,Col,Image} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { motion, useAnimation } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineQrCode,
        MdOutlineMap,
        MdOutlinePerson4,
        MdOutlineArrowCircleLeft,
        MdOutlineSave} from "react-icons/md";
import {
  Dialog,
  DialogContent
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

import _ from "lodash";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import { api_url_satuadmin } from '../../../api/axiosConfig';


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
  const [maplistku, setmaplistku] = useState([]);
  const [kecamatanku, setkecamatanku] = useState([""]);
  const [desaku, setdesaku] = useState([""]);
  const [nama_geospasial, setnama_geospasial] = useState("");
  const [geoJson, setgeoJson] = useState("");
  const [luasarea, setluasarea] = useState("");
  const [satuan, setsatuan] = useState("");
  const [map_color, setmap_color] = useState("");

  const [kecamatan, setkecamatan] = useState(null);
  const [koleksi, setkoleksi] = useState(null);
  const [desa, setdesa] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [openColor, setOpenColor] = useState(false);
  
  
  const navigate = useNavigate();
  const { id } = useParams();

   
  useEffect(() => {
    getDataById();

    getDatasetItem();
    

    

  }, []);

  useEffect(() => {
    if (kecamatan) {
        getDatasetItem2();
    }
  }, [kecamatan]);

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
      params: { search_satker:userloginsatker,search_kecamatan: kecamatan ? kecamatan.value : "" }
    });
    const data = response.data;
    setmaplistku(response.data.resultlocationmaplistgeo);
    setkecamatanku(response.data.resultkecamatan);
    setdesaku(response.data.resultdesa);
  };

  const getDatasetItem2 = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
      params: { search_satker:userloginsatker,search_kecamatan: kecamatan ? kecamatan.value : "" }
    });
    const data = response.data;
    setdesaku(response.data.resultdesa);
  };
  

  const getDataById = async () => {
    try {
      const response = await api_url_satuadmin.get(`api/satupeta/geospasial/detail/${id}`);

      // Ambil data utama
      setnama_geospasial(response.data.nama_geospasial);
      setgeoJson(response.data.geojson);
      setluasarea(response.data.luas_area);
      setsatuan({ value: response.data.satuan, label: response.data.satuan });
      setmap_color(response.data.map_color);

      // Parse koordinat
      /* const coords = response.data.coordinat.replace("[", "").replace("]", "").split(",");
      const lon = coords[0];
      const lat = coords[1];
      setgeoJson(lon);
      setluasarea(lat); */

      // Bungkus jadi array options untuk select/autocomplete
      setkoleksi({ value: response.data.id_maplist, label: response.data.title });
      
      setkecamatan({ value: response.data.kecamatan_id, label: response.data.kecamatan });
      setdesa({ value: response.data.desa_id, label: response.data.desa });

    } catch (err) {
      console.error("❌ Gagal ambil data detail:", err);
    }
  };



  const updateDataset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_geospasial",nama_geospasial);
    formData.append("geojson",geoJson);
    formData.append("luas_area",luasarea);
    formData.append("satuan",satuan.value);
    
    formData.append("map_color",map_color);
    
    formData.append("id_maplist",koleksi.value);
    formData.append("kecamatan_id",kecamatan.value);
    formData.append("desa_id",desa.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Peta Geospasial");
    formData.append("komponen","Update Geospasial Satu Peta");
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
      await api_url_satuadmin.patch(`api/satupeta/geospasial/update/${id}`, formData, {
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


      
    

  function sweetsuccess(){
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
              navigate(`/Satupeta/Geospasial`);
              //navigate(`/Data-Dataset`);
        }
      }).then((result) => {
      });
  }
  function sweeterror(error){
      Swal.fire({
          title: "Gagal",
          html: error,
          timer: 1500,
          icon: "error",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            
          },
          willClose: () => {
          }
        }).then((result) => {
        });
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };

  const redoStep = () => {
      setStep(1);
  };

  const [validasi_nama_geospasial, setvalidasi_nama_geospasial] = useState(false);
  const [validasi_geoJson, setvalidasi_geoJson] = useState(false);
  const [validasi_luasarea, setvalidasi_luasarea] = useState(false);
  const [validasi_satuan, setvalidasi_satuan] = useState(false);
  const [validasi_map_color, setvalidasi_map_color] = useState(false);
  const [validasi_koleksi, setvalidasi_koleksi] = useState(false);
  const [validasi_kecamatan, setvalidasi_kecamatan] = useState(false);
  const [validasi_desa, setvalidasi_desa] = useState(false);

  const validateGeoJsonPolygon = (geoJsonString) => {
    let data;

    // 1. pastikan JSON valid
    try {
      data = JSON.parse(geoJsonString);
    } catch (e) {
      return { valid: false, message: "GeoJSON bukan JSON yang valid,Format harus [[[lng,lat,z],...]]" };
    }

    // 2. cek struktur dasar
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      return { valid: false, message: "Format harus [[[lng,lat,z],...]]" };
    }

    const ring = data[0];

    for (let i = 0; i < ring.length; i++) {
      const point = ring[i];

      // 3. cek point
      if (!Array.isArray(point) || point.length < 2) {
        return {
          valid: false,
          message: `Koordinat ke-${i} bukan array [lng, lat, z]`
        };
      }

      const [lng, lat] = point;

      // 4. cek numeric
      if (isNaN(lng) || isNaN(lat)) {
        return {
          valid: false,
          message: `Koordinat ke-${i+1} bukan angka`
        };
      }

      // 5. deteksi tertukar lat-lng
      if (Math.abs(lng) <= 90 && Math.abs(lat) > 90) {
        return {
          valid: false,
          message: `Koordinat ke-${i+1} kemungkinan TERTUKAR (lat,lng)`
        };
      }

      // 6. validasi range longitude
      if (lng < -180 || lng > 180) {
        return {
          valid: false,
          message: `Longitude ke-${i+1} di luar range (-180 s/d 180)`
        };
      }

      // 7. validasi range latitude
      if (lat < -90 || lat > 90) {
        return {
          valid: false,
          message: `Latitude ke-${i+1} di luar range (-90 s/d 90)`
        };
      }
    }

    // 8. polygon minimal 4 titik
    if (ring.length < 4) {
      return {
        valid: false,
        message: "Polygon minimal memiliki 4 titik"
      };
    }

    return { valid: true };
  };



  // Fungsi validasi longitude
  /* const isValidLongitude = (lon) => {
    if (!lon && lon !== 0) return false; // null/undefined
    const value = parseFloat(lon);
    return !isNaN(value) && value >= -180 && value <= 180;
  };

  // Fungsi validasi latitude
  const isValidLatitude = (lat) => {
    if (!lat && lat !== 0) return false;
    const value = parseFloat(lat);
    return !isNaN(value) && value >= -90 && value <= 90;
  }; */
  //const geoValidation = validateGeoJsonPolygon(geoJson);
   const geoValidation = validateGeoJsonPolygon(geoJson);
    const handle_step = (event) => {
      const validNama = (nama_geospasial?.length || 0) >= 3;
      const validluasarea = Number(luasarea) > 0;
      const validsatuan = satuan !== null;
      const validmapcolor = (map_color?.length || 0) >=6;
      const validLokasi = koleksi !== null;
      const validKec = kecamatan !== null;
      const validDesa = desa !== null;

    

    setvalidasi_geoJson(!geoValidation.valid);
  

    

    //setvalidasi_geoJson(!validgeoJson);
    

    setvalidasi_nama_geospasial(!validNama);
    setvalidasi_luasarea(!validluasarea);
    setvalidasi_satuan(!validsatuan);
    setvalidasi_map_color(!validmapcolor);
    setvalidasi_koleksi(!validLokasi);
    setvalidasi_kecamatan(!validKec);
    setvalidasi_desa(!validDesa);

    if (validNama && geoValidation.valid && validluasarea && validsatuan && validmapcolor && validLokasi && validKec && validDesa) {
      nextStep();
    }
  };


  
  
 
  function formatUTCDateToLocal(utcDateString) {
    const utcDate = new Date(utcDateString);

    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000);

    const formattedLocalDate = localDate.toLocaleString();

    return formattedLocalDate;
  }



  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Satupeta Geospasial Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satupeta/Geospasial" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Geospasial
          </NavLink> /
          <NavLink  className="text-silver-a mr-2 d-flex textsize10">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
          <Row className='p-1 mx-2'>
            
            <Col md={12} sm={12} className=' bg-linear-9 align-middle justify-content-center align-self-center mt-1 rad15'>
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{nama_geospasial}</p>
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
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Koleksi Peta
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-koleksi"
                                  options={maplistku.map((row) => ({
                                    label: row.title,
                                    value: row.id_maplist
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={koleksi}
                                  onChange={(event, newValue) => setkoleksi(newValue)}
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
                                  {validasi_koleksi && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Nama Geospasial
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={nama_geospasial}
                                  onChange={(e) => setnama_geospasial(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {nama_geospasial && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setnama_geospasial("")}
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
  
                                {validasi_nama_geospasial && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                          </div> 
                          <div className="md:col-span-3 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Kecamatan
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-kecamatan"
                                  options={kecamatanku.map((row) => ({
                                    label: row.nama_kecamatan,
                                    value: row.id_kecamatan
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={kecamatan}
                                  onChange={(event, newValue) => {
                                    setkecamatan(newValue);
                                    setdesa("");
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
                                  {validasi_kecamatan && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-3 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Desa
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-desa"
                                  options={desaku.map((row) => ({
                                    label: row.nama_desa,
                                    value: row.id_desa
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={desa}
                                  onChange={(event, newValue) => setdesa(newValue)}
                                  clearOnEscape
                                  disabled={!kecamatan}   // <<== kalau kecamatan null/undefined, jadi disabled
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
                                  {validasi_desa && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Luas Area
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={luasarea}
                                  type='number'
                                  onChange={(e) => setluasarea(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {luasarea && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setluasarea("")}
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
  
                                {validasi_luasarea && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />Minimal 1 Angka</p>}
                              </div>
                            </div>
                          </div> 
                          
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Satuan
                                </label>
                                <Autocomplete
                                  className='tsize-110'
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={[
                                    { label: "Ha", value: "Ha" },
                                    { label: "Km", value: "Km" }
                                  ]}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={satuan}
                                  onChange={(event, newValue) => setsatuan(newValue)}
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
                                
  
                                {validasi_satuan && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div> 
                          <div className="md:col-span-2 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Map Color
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  placeholder="#00FF88"
                                  value={map_color}
                                  onChange={(e) => setmap_color(e.target.value)}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <div
                                          onClick={() => setOpenColor(true)}
                                          className="cursor-pointer"
                                          style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: 6,
                                            backgroundColor: map_color || "#ccc",
                                            border: "1px solid #999"
                                          }}
                                        />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <>
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setOpenColor(true)}
                                            size="small"
                                          >
                                            <PaletteIcon />
                                          </IconButton>
                                        </InputAdornment>

                                        {map_color && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setmap_color("")}
                                              size="small"
                                            >
                                              <ClearIcon />
                                            </IconButton>
                                          </InputAdornment>
                                        )}
                                      </>
                                    )
                                  }}
                                />
                                {/* =====================
                                    DIALOG COLOR PICKER
                                  ===================== */}
                                <Dialog open={openColor} onClose={() => setOpenColor(false)}>
                                  <DialogContent className="text-center">
                                    <input
                                      type="color"
                                      value={map_color || "#00ff88"}
                                      onChange={(e) => {
                                        setmap_color(e.target.value);
                                        setOpenColor(false);
                                      }}
                                      style={{
                                        width: 120,
                                        height: 120,
                                        border: "none",
                                        cursor: "pointer"
                                      }}
                                    />
                                    <p className="textsize12 mt-2">{map_color}</p>
                                  </DialogContent>
                                </Dialog>
  
                                {validasi_map_color && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />Harus Diisi.</p>}
                              </div>
                            </div>
                          </div> 
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Geojson
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={geoJson}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={10}    // <-- tinggi awal textarea
                                  onChange={(e) => setgeoJson(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyleMultiline(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {geoJson && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setgeoJson("")}
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
  
                                {validasi_geoJson && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline  className="mt-1 mx-2" />{geoValidation.message}</p>}
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
