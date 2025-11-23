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


import _ from "lodash";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import { api_url_satuadmin } from '../../../api/axiosConfig';

const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const userloginadmin = userlogin.id || '';

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

function DatasetPengelolah() {
  const [locationku, setlocationku] = useState([]);
  const [kecamatanku, setkecamatanku] = useState([""]);
  const [desaku, setdesaku] = useState([""]);
  const [nama_location_point, setnama_location_point] = useState("");
  const [coordinatlon, setcoordinatlon] = useState("");
  const [coordinatlat, setcoordinatlat] = useState("");

  const [kecamatan, setkecamatan] = useState(null);
  const [lokasi, setlokasi] = useState(null);
  const [desa, setdesa] = useState(null);
  const [loading, setLoading] = useState(false);

  
  
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
      params: { search_kecamatan: kecamatan ? kecamatan.value : "" }
    });
    const data = response.data;
    setlocationku(response.data.resultlocation);
    setkecamatanku(response.data.resultkecamatan);
    setdesaku(response.data.resultdesa);
  };

  const getDatasetItem2 = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
      params: { search_kecamatan: kecamatan ? kecamatan.value : "" }
    });
    const data = response.data;
    setdesaku(response.data.resultdesa);
  };
  

  const getDataById = async () => {
    try {
      const response = await api_url_satuadmin.get(`api/satupeta/location_point/detail/${id}`);

      // Ambil data utama
      setnama_location_point(response.data.nama_location_point);

      // Parse koordinat
      const coords = response.data.coordinat.replace("[", "").replace("]", "").split(",");
      const lon = coords[0];
      const lat = coords[1];
      setcoordinatlon(lon);
      setcoordinatlat(lat);

      // Bungkus jadi array options untuk select/autocomplete
      setlokasi({ value: response.data.location_id, label: response.data.nama_location });
      setkecamatan({ value: response.data.kecamatan_id, label: response.data.kecamatan });
      setdesa({ value: response.data.desa_id, label: response.data.desa });

    } catch (err) {
      console.error("❌ Gagal ambil data detail:", err);
    }
  };



  const updateDataset = async (e) => {
    e.preventDefault();
    const coordinat="["+coordinatlon+","+coordinatlat+"]"
    const formData = new FormData();
    formData.append("nama_location_point",nama_location_point);
    formData.append("coordinat",coordinat);
    
    formData.append("location_id",lokasi.value);
    formData.append("kecamatan_id",kecamatan.value);
    formData.append("desa_id",desa.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Peta Titik Lokasi");
    formData.append("komponen","Update Titik Lokasi Satu Peta");
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
      await api_url_satuadmin.patch(`api/satupeta/location_point/update/${id}`, formData, {
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
              navigate(`/Satupeta/Titik-Lokasi-Peta`);
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

  const [validasi_nama_location_point, setvalidasi_nama_location_point] = useState(false);
  const [validasi_coordinatlon, setvalidasi_coordinatlon] = useState(false);
  const [validasi_coordinatlat, setvalidasi_coordinatlat] = useState(false);
  const [validasi_location, setvalidasi_location] = useState(false);
  const [validasi_kecamatan, setvalidasi_kecamatan] = useState(false);
  const [validasi_desa, setvalidasi_desa] = useState(false);

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
  
  const handle_step = (event) => {
    const validNama = (nama_location_point?.length || 0) >= 3;
    const validLon = isValidLongitude(coordinatlon);
    const validLat = isValidLatitude(coordinatlat);
    const validLokasi = lokasi !== null;
    const validKec = kecamatan !== null;
    const validDesa = desa !== null;
    

    setvalidasi_nama_location_point(!validNama);
    setvalidasi_coordinatlon(!validLon);
    setvalidasi_coordinatlat(!validLat);
    setvalidasi_location(!validLokasi);
    setvalidasi_kecamatan(!validKec);
    setvalidasi_desa(!validDesa);

    if (validNama && validLon && validLat && validLokasi && validKec && validDesa) {
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
      <NavSub  title="Satupeta Titik Lokasi Peta Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satupeta/Titik-Lokasi-Peta" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Titik Lokasi
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
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{nama_location_point}</p>
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
                        
                        
                          <div className="mt-3 flex">
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  1
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                              <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-gray-500 py-1">
                                  2
                                </p>
                              </div>
                            </div>
                            
                            
                            
                        </div>
                        <div className="-mt-5 w-full h-2 bg-cyan-200">
                            <div className="h-full bg-cyan-600 rounded-3xl  w-1/2"></div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0">
                                  
                                  <Autocomplete
                                    className='tsize-110'
                                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                    id="combo-box-kecamatan"
                                    options={locationku.map((row) => ({
                                      label: row.nama_location,
                                      value: row.id_location
                                    }))}
                                    getOptionLabel={(option) => option.label || ""}
                                    value={lokasi}
                                    onChange={(event, newValue) => setlokasi(newValue)}
                                    clearOnEscape
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Lokasi Infrastruktur"
                                        variant="outlined"
                                        sx={(theme) => textFieldStyle(theme)}
                                      />
                                    )}
                                    sx={{
                                        width: "100%",
                                        "& .MuiAutocomplete-popupIndicator": { color: "#1976d2", transition: "transform 0.3s" },
                                        "& .MuiAutocomplete-popupIndicatorOpen": { transform: "rotate(180deg)" }
                                    }}
                                  />


                                  {validasi_location && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0 transisiku">
                                <TextField
                                  label="Lokasi Point"
                                  className="bg-input rad15 w-full"
                                  value={nama_location_point}
                                  onChange={(e) => setnama_location_point(e.target.value)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {nama_location_point && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setnama_location_point("")}
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
                                  sx={(theme) => textFieldStyle(theme)}
                                />  
                                  {validasi_nama_location_point && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0">
                                <TextField
                                  label="Koordinat Longitude"
                                  className="bg-input rad15 w-full"
                                  value={coordinatlon}
                                  onChange={(e) => setcoordinatlon(e.target.value)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {coordinatlon && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setcoordinatlon("")}
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
                                  sx={(theme) => textFieldStyle(theme)}
                                />  
                                  {validasi_coordinatlon && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Diisi.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0">
                                <TextField
                                  label="Koordinat Latitude"
                                  className="bg-input rad15 w-full"
                                  value={coordinatlat}
                                  onChange={(e) => setcoordinatlat(e.target.value)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {coordinatlat && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setcoordinatlat("")}
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
                                  sx={(theme) => textFieldStyle(theme)}
                                />  
                                  {validasi_coordinatlat && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Diisi.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0">
                                  
                                  <Autocomplete
                                    className='tsize-110'
                                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                    id="combo-box-kecamatan"
                                    options={kecamatanku.map((row) => ({
                                      label: row.nama_kecamatan,
                                      value: row.id_kecamatan
                                    }))}
                                    getOptionLabel={(option) => option.label || ""}
                                    value={kecamatan}
                                    onChange={(event, newValue) => setkecamatan(newValue)}
                                    clearOnEscape
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Kecamatan"
                                        variant="outlined"
                                        sx={(theme) => textFieldStyle(theme)}
                                      />
                                    )}
                                    sx={{
                                        width: "100%",
                                        "& .MuiAutocomplete-popupIndicator": { color: "#1976d2", transition: "transform 0.3s" },
                                        "& .MuiAutocomplete-popupIndicatorOpen": { transform: "rotate(180deg)" }
                                    }}
                                  />



                                  {validasi_kecamatan && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0">
                                  
                                  <Autocomplete
                                    className='tsize-110'
                                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                    id="combo-box-kecamatan"
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
                                        label="Desa"
                                        variant="outlined"
                                        sx={(theme) => textFieldStyle(theme)}
                                      />
                                    )}
                                    sx={{
                                        width: "100%",
                                        "& .MuiAutocomplete-popupIndicator": { color: "#1976d2", transition: "transform 0.3s" },
                                        "& .MuiAutocomplete-popupIndicatorOpen": { transform: "rotate(180deg)" }
                                    }}
                                  />


                                  {validasi_desa && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
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
                          <div className="mt-3 flex">
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  1
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  2
                                </p>
                              </div>
                            </div>
                            
                           
                            
                          </div>
                          <div className="-mt-5 w-full h-2 bg-cyan-200">
                              <div className="h-full bg-cyan-600 rounded-3xl w-full"></div>
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
