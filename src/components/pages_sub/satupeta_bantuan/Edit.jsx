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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineQrCode,
        MdOutlineMap,
        MdOutlinePerson4,
        MdDisabledVisible,
        MdPermDeviceInformation,
        MdOutlineShortText,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdOutlineTag,
        MdDescription,
        MdFileUpload,
        MdOutlineScale,
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";

import KontenEditor from "../KontenEditor";

import _ from "lodash";
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

function IklanPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [title, settitle] = useState("");
  const [seksi, setseksi] = useState("");
  const [kategori, setkategori] = useState("");
  const [content, setcontent] = useState("");
  const [visibilitas, setvisibilitas] = useState("");
  const [file, setfile] = useState("");
  const [images, setimages] = useState("");
  const [loading, setLoading] = useState(false);


  const loadImage = (e) =>{
    const image = e.target.files[0];
    setfile(image);
    if (image) {
      setimages(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }
  
  const navigate = useNavigate();
  const { id } = useParams();


   
  useEffect(() => {
    getDataById()
    

  }, [id]);

 

  const getDataById = async () => {
    const response = await api_url_satuadmin.get(`api/open-item/satupeta-bantuan/detail/${id}`);
    setid(response.data.id);
    settitle(response.data.title);
    setseksi(response.data.seksi);
    setkategori({ value: response.data.kategori, label: response.data.kategori });
    setcontent(response.data.content);
    setvisibilitas({ value: response.data.visibilitas, label: response.data.visibilitas });
    
  };


  const updateIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title);
    formData.append("seksi",seksi);
    formData.append("kategori",kategori.value);
    formData.append("content",content);
    formData.append("visibilitas",visibilitas.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Peta Bantuan");
    formData.append("komponen","Update Bantuan Satu Peta");
    
    
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
      await api_url_satuadmin.patch(`api/open-item/satupeta-bantuan/update/${idku}`, formData, {
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
              navigate(`/Satupeta/Bantuan`);
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

  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_kategori, setvalidasi_kategori] = useState(false);
  const [validasi_seksi, setvalidasi_seksi] = useState(false);
  const [validasi_visibilitas, setvalidasi_visibilitas] = useState(false);

  const handle_step1 = (event) => {
    if (title.length < 3) {
      setvalidasi_title(true);
    } else {
      setvalidasi_title(false);
    }

    if (!kategori) {
      setvalidasi_kategori(true);
    } else {
      setvalidasi_kategori(false);
    }

    if (seksi.length < 3) {
      setvalidasi_seksi(true);
    } else {
      setvalidasi_seksi(false);
    }

    if (!visibilitas) {
      setvalidasi_visibilitas(true);
    } else {
      setvalidasi_visibilitas(false);
    }

    if (title.length >= 3 && (kategori) && (seksi.length >= 3) && (visibilitas)) {
      nextStep();
    }
  };
  

  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Satu Peta Bantuan Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satupeta/Bantuan" className="text-silver-a mx-2 d-flex">
            <MdDataset className="mt-1 textsize10" />Satupeta Bantuan
          </NavLink> /
          <NavLink  className="text-silver-a mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateIklan}>
            <div className="relative flex px-5">
              <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                  {step === 1 && (
                    <motion.div
                        key={step} // Add this line
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:w-full mx-auto">
                        
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          
                          <div className="sm:col-span-6 -mt-4">
                            <div className="mt-0">
                              <TextField
                                label="Judul Bantuan"
                                className="bg-input rad15 w-full"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
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
                                sx={(theme) => textFieldStyle(theme)}
                              /> 
                                  {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                            
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <div className="mt-0">
                              <Autocomplete
                                className="tsize-110"
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-location"
                                options={[
                                  { label: "Satupeta", value: "Satupeta" },
                                  { label: "Mapset", value: "Mapset" }
                                ]}
                                getOptionLabel={(option) => option.label || ""}
                                value={kategori}
                                onChange={(event, newValue) => setkategori(newValue)}
                                clearOnEscape
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Kategori"
                                    variant="outlined"
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
                              {validasi_kategori && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Dipilih...</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <div className="mt-0">
                              <TextField
                                label="Kode Seksi"
                                className="bg-input rad15 w-full"
                                value={seksi}
                                onChange={(e) => setseksi(e.target.value)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {seksi && (
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
                                sx={(theme) => textFieldStyle(theme)}
                              /> 
                                  {validasi_seksi && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                            
                          </div>
                          <div className="sm:col-span-6 -mt-4">
                            <div className="mt-0">
                              <Autocomplete
                                className="tsize-110"
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-location"
                                options={[
                                  { label: "Privat", value: "Privat" },
                                  { label: "Publik", value: "Publik" }
                                ]}
                                getOptionLabel={(option) => option.label || ""}
                                value={visibilitas}
                                onChange={(event, newValue) => setvisibilitas(newValue)}
                                clearOnEscape
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Visibilitas"
                                    variant="outlined"
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
                              {validasi_visibilitas && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Dipilih...</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-6 -mt-4">
                            <div className="mt-0">
                              <KontenEditor content={content} setcontent={setcontent} />
                            </div>
                            
                          </div>
                          
                          
                          
                          
                          
                          
                      </div>
                        <div className="flex justify-center mt-5">

                          <button type="button"
                            onClick={() => {
                              handle_step1();
                            }}  
                            className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                              <span>Lanjut</span><MdOutlineArrowCircleRight  className='mt-1 mx-1'  />
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
                        className="md:w-3/5 mx-auto py-12">
                        
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

export default IklanPengelolah;
