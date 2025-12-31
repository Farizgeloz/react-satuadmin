import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  Dialog,
  DialogContent
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";

import _ from "lodash";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";

import { MdAddCircle,MdOutlineArrowCircleLeft,MdOutlineQrCode,MdOutlineMap,MdOutlinePerson4,
        MdOutlineSave,MdOutlineErrorOutline,MdArrowCircleRight} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import "../../../App.css";
import Swal from 'sweetalert2';
import { IoAdd, IoTrash } from "react-icons/io5";
import { api_url_satuadmin } from "../../../api/axiosConfig";



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

function ModalTambahMulti() {
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [maplistku, setmaplistku] = useState([]);
  const [kecamatanku, setkecamatanku] = useState([]);
  const [desaku, setdesaku] = useState([]);
  const [nama_geospasial, setnama_geospasial] = useState("");
  const [coordinatlon, setcoordinatlon] = useState("");
  const [coordinatlat, setcoordinatlat] = useState("");
  const [kecamatan, setkecamatan] = useState(null);
  const [lokasi, setlokasi] = useState(null);
  const [desa, setdesa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openColor, setOpenColor] = useState(false);

  const [locations, setLocations] = useState([
    { nama_geospasial: "", geojson: "", luas_area: "", satuan: "", map_color: "", id_maplist: "", kecamatan_id: "", desa_id: "" }
  ]);

  const addLocationField = () => {
    setLocations([
      ...locations,
      { nama_geospasial: "", geojson: "", luas_area: "", satuan: "", map_color: "", id_maplist: "", kecamatan_id: "", desa_id: "" }
    ]);
  };

  const removeLocationField = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  const saveDataset = async (e) => {
    e.preventDefault();
    const payloadLocations = locations.map((loc) => ({
        nama_geospasial: loc.nama_geospasial.toString(),
        geojson: loc.geojson.toString(),
        luas_area: loc.luas_area.toString(),
        satuan: loc.satuan.value.toString(),
        map_color: loc.map_color.toString(),
        id_maplist: loc.koleksi.value.toString(),   // <-- pastikan string
        kecamatan_id: loc.kecamatan_id.value.toString(), // <-- pastikan string
        desa_id: loc.desa_id.value.toString()            // <-- pastikan string
    }));


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
      await api_url_satuadmin.post("satupeta/geospasial/addmulti", 
        { 
          locations: payloadLocations,
          admin : userloginadmin,
          jenis: "Satu Peta Geospasial",
          komponen: "Tambah Geospasial Satu Peta" 

         
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
    } catch (error) {
      console.error(error);
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
    }
  };
  

  useEffect(() => {
    getDatasetItem();
    

    

  }, [lokasi]);

  useEffect(() => {
    if (kecamatan) {
        getDatasetItem2();
    }
  }, [kecamatan]);
  
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get("satupeta/map_data/admin", {
      params: { search_satker:userloginsatker,search_kecamatan: kecamatan ? kecamatan.value : "" }
    });

    const data = response.data;
    setmaplistku(response.data.resultlocationmaplistgeo);
    setkecamatanku(response.data.resultkecamatan);
    setdesaku(response.data.resultdesa);
  };

  const getDatasetItem2 = async () => {
    const response = await api_url_satuadmin.get("satupeta/map_data/admin", {
      params: { search_satker:userloginsatker,search_kecamatan: kecamatan ? kecamatan.value : "" }
    });
    const data = response.data;
    setdesaku(response.data.resultdesa);
  };

  
  /*const saveDataset = async (e) => {
    e.preventDefault();
    const coordinat="["+coordinatlon+","+coordinatlat+"]"
    const formData = new FormData();
    formData.append("nama_geospasial",nama_geospasial);
    formData.append("coordinat",coordinat);
    
    formData.append("id_maplist",lokasi.value);
    formData.append("kecamatan_id",kecamatan.value);
    formData.append("desa_id",desa.value);

    console.log("coba:"+lokasi.value);

    try {
      await axios.post(apiurl + 'satupeta/map_data/admin/add', formData);

      setShow(false);
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
    }
  };*/

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
            navigate(0);
        }
      }).then((result) => {
      });
  };
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


 

  // Fungsi validasi longitude
  const isValidLongitude = (lon) => {
    if (!lon && lon !== 0) return false; // null/undefined
    const value = parseFloat(lon);
    return !isNaN(value) && value >= -180 && value <= 180;
  };

  // Fungsi validasi latitude
  const isValidLatitude = (lat) => {
    if (!lat && lat !== 0) return false;
    const value = parseFloat(lat);
    return !isNaN(value) && value >= -90 && value <= 90;
  };
  

  const [errors, setErrors] = useState({});

  const validateGeoJsonPolygon = (geojsonString) => {
    let data;

    // 1. pastikan JSON valid
    try {
      data = JSON.parse(geojsonString);
    } catch (e) {
      return {
        valid: false,
        message: "GeoJSON bukan JSON valid. Format harus [[[lng,lat,z],...]]"
      };
    }

    // 2. cek struktur [[[...]]]
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      return {
        valid: false,
        message: "Format GeoJSON harus [[[lng,lat,z],...]]"
      };
    }

    const ring = data[0];

    // 3. polygon minimal 4 titik
    if (ring.length < 4) {
      return {
        valid: false,
        message: "Polygon minimal memiliki 4 titik (termasuk titik penutup)"
      };
    }

    for (let i = 0; i < ring.length; i++) {
      const point = ring[i];

      // 4. cek point
      if (!Array.isArray(point) || point.length < 2) {
        return {
          valid: false,
          message: `Koordinat ke-${i + 1} harus [lng, lat, z]`
        };
      }

      const [lng, lat] = point;

      // 5. cek numeric
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
        return {
          valid: false,
          message: `Koordinat ke-${i + 1} bukan angka valid`
        };
      }

      // 6. deteksi lat-lng tertukar
      if (Math.abs(lng) <= 90 && Math.abs(lat) > 90) {
        return {
          valid: false,
          message: `Koordinat ke-${i + 1} kemungkinan tertukar (lat,lng)`
        };
      }

      // 7. validasi range
      if (lng < -180 || lng > 180) {
        return {
          valid: false,
          message: `Longitude ke-${i + 1} di luar range (-180 s/d 180)`
        };
      }

      if (lat < -90 || lat > 90) {
        return {
          valid: false,
          message: `Latitude ke-${i + 1} di luar range (-90 s/d 90)`
        };
      }
    }

    // 8. cek ring tertutup
    const first = ring[0];
    const last = ring[ring.length - 1];

    if (first[0] !== last[0] || first[1] !== last[1]) {
      return {
        valid: false,
        message: "Polygon harus tertutup (titik awal dan akhir harus sama)"
      };
    }

    return { valid: true };
  };


  const validateAll = () => {
    let newErrors = [];

    locations.forEach((loc, index) => {
      let rowErrors = {};

      if (!loc.nama_geospasial?.trim()) {
        rowErrors.nama_geospasial = "Data wajib diisi";
      }
      // GeoJSON
     
      if (loc.luas_area === null || loc.luas_area === "" || loc.luas_area <= 0) {
        rowErrors.luas_area = "Luas area wajib diisi dan > 0";
      }
      if (!loc.map_color?.trim()) {
        rowErrors.map_color = "Data wajib diisi";
      }

      // ✅ Simpan error per baris, bukan di root
      if (!loc.satuan?.value) {
        rowErrors.satuan = "Satuan wajib dipilih";
      }

      if (!loc.koleksi?.value) {
        rowErrors.koleksi = "Koleksi wajib dipilih";
      }
      if (!loc.kecamatan_id) {
        rowErrors.kecamatan_id = "Kecamatan wajib dipilih";
      }
      if (!loc.desa_id) {
        rowErrors.desa_id = "Desa wajib dipilih";
      }

       if (!loc.geojson?.trim()) {
        rowErrors.geojson = "GeoJSON wajib diisi";
      } else {
        const geoValidation = validateGeoJsonPolygon(loc.geojson);
        if (!geoValidation.valid) {
          rowErrors.geojson = geoValidation.message;
        }
      }

      newErrors[index] = rowErrors;
    });

    setErrors(newErrors);

    // return true kalau semua row tidak ada error
    return newErrors.every((row) => Object.keys(row).length === 0);
  };

  const handleNext = () => {
    const isValid = validateAll();
    if (!isValid) {
      console.log("Form masih error, cek inputan");
      return;
    }
    // kalau valid, lanjut step
     nextStep();
  };

  return (
    <>
         <Link onClick={handleShow} className="col-span-1 max-[640px]:col-span-2 tsize-110 font-semibold text-white-a flex-right mt-2">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-3 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Data</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal4"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveDataset}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Geospasial</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2 bg-silver-light p-0 px-5">

              <div className="relative px-2">
                {step === 1 && (
                  <motion.div
                    key={step} // Add this line
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-100 mx-auto"
                  >
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
                  {locations.map((loc, index) => (
                      
                    <div key={index} className="mt-3">
                      <div className="mt-3 mb-3" style={{backgroundColor:"#8989893b",height:"3px"}}>
                      
                      </div>
                      <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6">
                        <div className="md:col-span-2 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Koleksi Geomap
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
                                value={loc.koleksi}
                                onChange={(event, newValue) => handleChange(index, "koleksi",newValue)}
                                clearOnEscape
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    className="bg-input rad15 w-full"
                                    InputLabelProps={{ shrink: false }}
                                    sx={(theme) => textFieldStyle(theme)}
                                    error={!!errors[index]?.koleksi}
                                    helperText={errors[index]?.koleksi}
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
                             
                                
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-4 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Nama Geospasial
                              </label>
                              <TextField
                                className="bg-input rad15 w-full"
                                value={loc.nama_geospasial}
                                onChange={(e) => handleChange(index, "nama_geospasial", e.target.value)}
                                error={!!errors[index]?.nama_geospasial}
                                helperText={errors[index]?.nama_geospasial}
                                InputLabelProps={{ shrink: false }}
                                sx={(theme) => textFieldStyle(theme)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {loc.nama_geospasial && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => handleChange(index, "nama_geospasial","")}
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
                                value={loc.kecamatan_id}
                                onChange={(event, newValue) => handleChange(index, "kecamatan_id",newValue)}
                                
                                clearOnEscape
                                disableClearable
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    className="bg-input rad15 w-full"
                                    InputLabelProps={{ shrink: false }}
                                    sx={(theme) => textFieldStyle(theme)}
                                    error={!!errors[index]?.kecamatan_id}
                                    helperText={errors[index]?.kecamatan_id}
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
                                label: row.nama_kecamatan+"-"+row.nama_desa,
                                value: row.id_desa
                                }))}
                                getOptionLabel={(option) => option.label || ""}
                                value={loc.desa_id}
                                onChange={(event, newValue) => handleChange(index, "desa_id",newValue)}
                                
                                clearOnEscape
                                disableClearable
                                disabled={!loc.kecamatan_id}   // <<== kalau kecamatan null/undefined, jadi disabled
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    className="bg-input rad15 w-full"
                                    InputLabelProps={{ shrink: false }}
                                    sx={(theme) => textFieldStyle(theme)}
                                    error={!!errors[index]?.desa_id}
                                    helperText={errors[index]?.desa_id}
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
                                value={loc.luas_area}
                                type='number'
                                onChange={(e) => handleChange(index, "luas_area", e.target.value)}
                                error={!!errors[index]?.luas_area}
                                helperText={errors[index]?.luas_area}
                                InputLabelProps={{ shrink: false }}
                                sx={(theme) => textFieldStyle(theme)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {loc.luas_area && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => handleChange(index, "luas_area","")}
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
                        <div className="md:col-span-2 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Satuan
                              </label>

                              <Autocomplete
                                className="tsize-110"
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-satuan"
                                options={[
                                  { label: "Ha", value: "Ha" },
                                  { label: "Km", value: "Km" }
                                ]}
                                getOptionLabel={(option) => option.label || ""}
                                value={loc.satuan}
                                onChange={(event, newValue) => handleChange(index, "satuan",newValue)}
                                
                                clearOnEscape
                                disableClearable
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    className="bg-input rad15 w-full"
                                    InputLabelProps={{ shrink: false }}
                                    sx={(theme) => textFieldStyle(theme)}
                                    error={!!errors[index]?.satuan}
                                    helperText={errors[index]?.satuan}
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
                                value={loc.map_color}
                                onChange={(e) => handleChange(index, "map_color", e.target.value)}
                                error={!!errors[index]?.map_color}
                                helperText={errors[index]?.map_color}
                                InputLabelProps={{ shrink: false }}
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
                                          backgroundColor: loc.map_color || "#ccc",
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

                                      {loc.map_color && (
                                        <InputAdornment position="end">
                                          <IconButton
                                           onClick={() => handleChange(index, "map_color","")}
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
                                      value={loc.map_color || "#00ff88"}
                                      onChange={(e) => {
                                        handleChange(index, "map_color", e.target.value);
                                        setOpenColor(false);
                                      }}
                                      style={{
                                        width: 120,
                                        height: 120,
                                        border: "none",
                                        cursor: "pointer"
                                      }}
                                    />
                                    <p className="textsize12 mt-2">{loc.map_color}</p>
                                  </DialogContent>
                                </Dialog>
                            </div>
                          </div>
                        </div> 
                        <div className="md:col-span-6 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                GeoJson
                              </label>
                              <TextField
                                className="bg-input rad15 w-full"
                                value={loc.geojson}
                                multiline   // <-- ini bikin jadi textarea
                                rows={10}    // <-- tinggi awal textarea
                                onChange={(e) => handleChange(index, "geojson", e.target.value)}
                                error={!!errors[index]?.geojson}
                                helperText={errors[index]?.geojson}
                                InputLabelProps={{ shrink: false }}
                                sx={(theme) => textFieldStyleMultiline(theme)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {loc.geojson && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => handleChange(index, "geojson","")}
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
                       
                        
                      </div>
                     
                      {locations.length > 1 && index !== 0 && (
                        <button 
                          type="button"
                          className="mt-3 mb-5 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-3 rounded-xl flex items-center gap-1"
                          onClick={() => removeLocationField(index)}
                        >
                          <IoTrash /> Hapus Baris
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                      type="button"
                      className="mt-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center"
                      onClick={addLocationField}
                  >
                          <IoAdd   /> Tambah Baris
                  </button>
                
                  <div className="flex justify-center mt-12">
                      <button 
                          type="button"
                          onClick={handleNext}
                          className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                          <MdOutlineSave  className='mt-1 mx-1'  /><span>Lanjut</span>
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
                
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                    className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClose}>
                    Keluar
                </button>
                 
               
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalTambahMulti;