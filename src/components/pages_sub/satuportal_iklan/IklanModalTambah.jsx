import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";

import { MdAddCircle,MdErrorOutline,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,
        MdOutlineQrCode,MdOutlineMap,MdOutlinePerson4,MdPermDeviceInformation,MdAccessibility,
        MdCalendarMonth,MdOutlineShortText,MdOutlineTag,MdOutlineScale,MdDescription,MdFileUpload, 
        MdDisabledVisible,
        MdOutlineSave,
        MdCategory} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
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

function ModalTambahUser() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [satkerku, setprodukdataku] = useState([]);
  const [kategoriku, setkategoriku] = useState([]);
  

  
  const [title, settitle] = useState("");
  const [linked, setlink] = useState("");
  const [visibilitas, setvisibilitas] = useState("");
  const [file, setfile] = useState("");
  const [file2, setfile2] = useState(null);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    
  }, [title]);
  

  const loadImage = (e) =>{
    const image = e.target.files[0];
    setfile(image);
    if (image) {
      setfile2(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file);
    formData.append("title",title);
    formData.append("linked",linked);
    formData.append("visibilitas",visibilitas.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Portal Iklan");
    formData.append("komponen","Tambah Iklan Satu Portal");

    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses tambah data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await api_url_satuadmin.post('open-item/ekosistem-iklan/add', formData);

      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data2");
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
          navigate(0);
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

  const redoStep = () => {
      setStep(1);
  };

  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_visibilitas, setvalidasi_visibilitas] = useState(false);
  const [validasi_file, setvalidasi_file] = useState(false);

  const handle_step1 = (event) => {
    if (title.length < 3) {
      setvalidasi_title(true);
    } else {
      setvalidasi_title(false);
    }

    if (!visibilitas) {
      setvalidasi_visibilitas(true);
    } else {
      setvalidasi_visibilitas(false);
    }

    if (!file) {
      setvalidasi_file(true);
    } else {
      setvalidasi_file(false);
    }

    if (title.length >= 3 && visibilitas && file) {
      nextStep();
    }
  };

   

  return (

    <>
            
       
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Satu Portal Iklan</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal2"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveIklan}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Satu Portal Iklan</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2 bg-silver-light p-0">

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
                                  Judul Motto
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
  
                                {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Link Url
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={linked}
                                  onChange={(e) => setlink(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {linked && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setlink("")}
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
                          {/* VISIBILITAS */}
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Visibilitas
                                </label>
  
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
  
                               {validasi_visibilitas && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Dipilih...</p>}
                            
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
                                {validasi_file && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
                                

                              </div>

                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {file2 && (
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
                                  src={file2}
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

export default ModalTambahUser;