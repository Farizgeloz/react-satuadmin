import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";

import Select from 'react-select';

import { MdAddCircle,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,
        MdOutlineMap,MdOutlinePerson4,MdOutlineShortText,MdFileUpload,MdOutlineSave,MdOutlineErrorOutline,
        MdArrowCircleRight,MdOutlineToday,
        MdErrorOutline} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';
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

function ModalTambahUser() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [satkerku, setsatkerku] = useState([]);
  const [bidangku, setbidangku] = useState([]);
  const [locationku, setlocationku] = useState([]);

  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
  const [logo_a, setlogo_a] = useState("");
  const [logo_b, setlogo_b] = useState("");
  const [logo_c, setlogo_c] = useState("");
  const [images_a, setimage_a] = useState("");
  const [title_images_a, settitle_image_a] = useState("");
  const [images_b, setimage_b] = useState("");
  const [title_images_b, settitle_image_b] = useState("");
  const [images_c, setimage_c] = useState("");
  const [title_images_c, settitle_image_c] = useState("");
  const [linked, setlinked] = useState("");

  const [file_logo_a, setfile_logo_a] = useState("");
  const [file_logo_b, setfile_logo_b] = useState("");
  const [file_logo_c, setfile_logo_c] = useState("");
  const [file_images_a, setfile_images_a] = useState("");
  const [file_images_b, setfile_images_b] = useState("");
  const [file_images_c, setfile_images_c] = useState("");
  const [fileError_logo_a, setFileError_logo_a] = useState("");
  const [fileError_logo_b, setFileError_logo_b] = useState("");
  const [fileError_logo_c, setFileError_logo_c] = useState("");
  const [fileError_images_a, setFileError_images_a] = useState("");
  const [fileError_images_b, setFileError_images_b] = useState("");
  const [fileError_images_c, setFileError_images_c] = useState("");

  const [loading, setLoading] = useState(false);

  
  const validateImageFile = (e, setFile, setPreview,setError) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Format Tidak Valid",
        text: "Hanya file JPG atau PNG yang diperbolehkan!",
        confirmButtonColor: "#3085d6",
      });
      e.target.value = "";
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setError("Ukuran file maksimal 5MB.");
      setFile(null);
      return;
    }else{
      setError("");
    }

    // Atur file dan preview
    setFile(file);
    if (setPreview) setPreview(URL.createObjectURL(file));
  };


  const loadImage_Logo_a = (e) => validateImageFile(e, setfile_logo_a, setlogo_a,setFileError_logo_a);
  const loadImage_Logo_b = (e) => validateImageFile(e, setfile_logo_b, setlogo_b,setFileError_logo_b);
  const loadImage_Logo_c = (e) => validateImageFile(e, setfile_logo_c, setlogo_c,setFileError_logo_c);
  const loadImage_Images_a = (e) => validateImageFile(e, setfile_images_a, setimage_a,setFileError_images_a);
  const loadImage_Images_b = (e) => validateImageFile(e, setfile_images_b, setimage_b,setFileError_images_b);
  const loadImage_Images_c = (e) => validateImageFile(e, setfile_images_c, setimage_c,setFileError_images_c);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  
  const saveSatuportal_list = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file_logo_a",file_logo_a);
    formData.append("file_logo_b",file_logo_b);
    formData.append("file_logo_c",file_logo_c);
    formData.append("file_images_a",file_images_a);
    formData.append("file_images_b",file_images_b);
    formData.append("file_images_c",file_images_c);
    formData.append("kategori","Satu Portal List");
    formData.append("title",title);
    formData.append("contents",contents);
    formData.append("title_images_a",title_images_a);
    formData.append("title_images_b",title_images_b);
    formData.append("title_images_c",title_images_c);
    formData.append("linked",linked);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Portal List");
    formData.append("komponen","Tambah Data List Satu Portal");

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
      await api_url_satuadmin.post('open-item/komponen_add', formData);

      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
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

  // STATE VALIDASI
  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_contents, setvalidasi_contents] = useState(false);
  const [validasi_linked, setvalidasi_linked] = useState(false);

  const [validasi_title_images_a, setvalidasi_title_images_a] = useState(false);
  const [validasi_title_images_b, setvalidasi_title_images_b] = useState(false);
  const [validasi_title_images_c, setvalidasi_title_images_c] = useState(false);

  const [validasi_logo_a, setvalidasi_logo_a] = useState(false);
  const [validasi_logo_b, setvalidasi_logo_b] = useState(false);
  const [validasi_logo_c, setvalidasi_logo_c] = useState(false);
  const [validasi_image_a, setvalidasi_image_a] = useState(false);
  const [validasi_image_b, setvalidasi_image_b] = useState(false);
  const [validasi_image_c, setvalidasi_image_c] = useState(false);
  
  const handle_step1 = () => {
    const isTitleValid = title?.trim().length >= 5;
    const isContentsValid = contents?.trim().length >= 5;
    const isLinkedValid = linked?.trim().length >= 1;

    const isTitleAValid = title_images_a?.trim().length >= 1;
    const isTitleBValid = title_images_b?.trim().length >= 1;
    const isTitleCValid = title_images_c?.trim().length >= 1;

    const isLogoAValid = !!file_logo_a;
    const isLogoBValid = !!file_logo_b;
    const isLogoCValid = !!file_logo_c;


    const isImageAValid = !!file_images_a;
    const isImageBValid = !!file_images_b;
    const isImageCValid = !!file_images_c;

    setvalidasi_title(!isTitleValid);
    setvalidasi_contents(!isContentsValid);
    setvalidasi_linked(!isLinkedValid);
    /* setvalidasi_title_images_a(!isTitleAValid);
    setvalidasi_title_images_b(!isTitleBValid);
    setvalidasi_title_images_c(!isTitleCValid); */

    setvalidasi_logo_a(!isLogoAValid);
    setvalidasi_logo_b(!isLogoBValid);
    setvalidasi_logo_c(!isLogoCValid);

    setvalidasi_image_a(!isImageAValid);
    setvalidasi_image_b(!isImageBValid);
    setvalidasi_image_c(!isImageCValid);

    if (
      isTitleValid && isContentsValid && isLinkedValid &&
      //isTitleAValid && isTitleBValid && isTitleCValid &&
      isLogoAValid && isLogoBValid && isLogoCValid &&
      isImageAValid && isImageBValid && isImageCValid
    
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi step 1');
    }
  };

  

 

  return (

    <>
            
       
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Data</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal3"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveSatuportal_list}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Aplikasi Terhubung</h4>
                
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
                                  Judul Aplikasi
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
  
                                {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Isi Konten
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={contents}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={5}    // <-- tinggi awal textarea
                                  onChange={(e) => setcontents(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyleMultiline(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {contents && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setcontents("")}
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
  
                                {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Tautan Link
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={linked}
                                  onChange={(e) => setlinked(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {linked && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setlinked("")}
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
  
                                {validasi_linked && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                              </div>
                            </div>
                          </div>  
                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Logo 1
                                </label>
  
                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage_Logo_a}
                                  required
                                  error={validasi_logo_a}
                                  helperText={validasi_logo_a ? "Logo 1 wajib diunggah" : ""}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file_logo_a && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile_logo_a("")}
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
                                {fileError_logo_a && (
                                  <p className="text-red-600 mt-2 d-flex">
                                    <MdOutlineErrorOutline className="mt-1 me-2" />
                                    {fileError_logo_a}
                                  </p>
                                )}
  
                                
  
                              </div>
  
                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {logo_a && (
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
                                  src={logo_a}
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

                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">
  
                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Logo 2
                                </label>
  
                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage_Logo_b}
                                  required
                                  error={validasi_logo_b}
                                  helperText={validasi_logo_b ? "Logo 2 wajib diunggah" : ""}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file_logo_a && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile_logo_b("")}
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
                                {fileError_logo_b && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError_logo_b}
                                </p>
                              )}
  
                                
  
                              </div>
  
                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {logo_b && (
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
                                  src={logo_b}
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
                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">
  
                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Logo 3
                                </label>
  
                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage_Logo_c}
                                  required
                                  error={validasi_logo_c}
                                  helperText={validasi_logo_c ? "Logo 3 wajib diunggah" : ""}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file_logo_c && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile_logo_c("")}
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
                                {fileError_logo_c && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError_logo_c}
                                </p>
                              )}
  
                                
  
                              </div>
  
                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {logo_c && (
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
                                  src={logo_c}
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
                          
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Sub List Konten 1
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={title_images_a}
                                  onChange={(e) => settitle_image_a(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {title_images_a && (
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
  
                                {validasi_title_images_a && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Gambar Konten 1
                                </label>
  
                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage_Images_a}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file_images_a && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile_images_a("")}
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
                                {fileError_images_a && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError_images_a}
                                </p>
                              )}
  
                                
  
                              </div>
  
                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {images_a && (
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
                                  src={images_a}
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


                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Sub List Konten 2
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={title_images_b}
                                  onChange={(e) => settitle_image_b(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {title_images_b && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settitle_image_b("")}
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
  
                                {validasi_title_images_b && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Gambar Konten 2
                                </label>
  
                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage_Images_b}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file_images_b && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile_images_b("")}
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
                                {fileError_images_b && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError_images_b}
                                </p>
                              )}
  
                                
  
                              </div>
  
                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {images_b && (
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
                                  src={images_b}
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

                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Sub List Konten 3
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={title_images_c}
                                  onChange={(e) => settitle_image_c(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {title_images_c && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settitle_image_c("")}
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
  
                                {validasi_title_images_c && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-5 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Unggah Gambar Konten 3
                                </label>
  
                                <TextField
                                  type="file"
                                  accept="image/*"
                                  className="bg-input rad15 w-100"
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  onChange={loadImage_Images_c}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file_images_c && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile_images_c("")}
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
                                {fileError_images_c && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError_images_c}
                                </p>
                              )}
  
                                
  
                              </div>
  
                            </div>
                          </div>
                          {/* AREA PREVIEW GAMBAR */}
                          {images_c && (
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
                                  src={images_c}
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
                        
                        <div className="flex justify-center mt-12">
                            
                              <button 
                                type="button"
                                onClick={() => {
                                  handle_step1();
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
                        className="md:w-3/5 mx-auto py-12">
                        <div className="mt-3 flex">
                          <div className="col-span-2 -mt-2 py-1 justify-end w-2/3">
                            <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                1
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 -mt-2 py-1 justify-end w-2/3">
                            <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                2
                              </p>
                            </div>
                          </div>
                          
                          <div className="col-span-2 -mt-2 py-1 justify-end w-2/3">
                            <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                3
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