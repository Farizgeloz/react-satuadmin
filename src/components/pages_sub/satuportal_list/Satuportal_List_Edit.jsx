import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"

import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import {Row,Col,Image} from 'react-bootstrap';
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineMap,
        MdOutlinePerson4,
        MdOutlineShortText,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdFileUpload,
        MdOutlineToday,
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";

import useFetch from './useFeach';

import _ from "lodash";
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

function Satuportal_listPengelolah() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [satkerku, setsatkerku] = useState([""]);
  const [bidangku, setbidangku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [idku, setid] = useState("");

 
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
  const [fileError, setFileError] = useState("");
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
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  
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

  


  
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [datacoba, setDataCoba] = useState([]);
  const { fetchCsvData } = useFetch();

  const [groupedData, setGroupedData] = useState({});
  const [groupCounts, setGroupCounts] = useState({});

   
  useEffect(() => {
    getDataById();


  }, [id]);



  const getDataById = async () => {
    const response = await api_url_satuadmin.get(`openitem/ekosistem_list_detail/${id}`);
    setid(response.data.id);
    settitle(response.data.title);
    setcontents(response.data.contents);
    setlogo_a(response.data.presignedUrl_logo_a);
    setlogo_b(response.data.presignedUrl_logo_b);
    setlogo_c(response.data.presignedUrl_logo_c);
    settitle_image_a(response.data.title_images_a);
    setimage_a(response.data.presignedUrl_a);
    settitle_image_b(response.data.title_images_b);
    setimage_b(response.data.presignedUrl_b);
    settitle_image_c(response.data.title_images_c);
    setimage_c(response.data.presignedUrl_c);
    setlinked(response.data.linked);
    
  };


  const updateSatuportal_list = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_logo_a",file_logo_a);
    formData.append("file_logo_b",file_logo_b);
    formData.append("file_logo_c",file_logo_c);
    formData.append("file_images_a",file_images_a);
    formData.append("file_images_b",file_images_b);
    formData.append("file_images_c",file_images_c);
    formData.append("title",title);
    formData.append("contents",contents);
    formData.append("title_images_a",title_images_a);
    formData.append("title_images_b",title_images_b);
    formData.append("title_images_c",title_images_c);
    formData.append("linked",linked);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Portal List");
    formData.append("komponen","Update Data List Satu Portal");
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
      await api_url_satuadmin.patch(`openitem/komponen_update/${idku}`, formData, {
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
        navigate(`/Satuportal/List`);
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
  const [validasi_contents, setvalidasi_contents] = useState(false);
  const [validasi_title_images_a, setvalidasi_title_images_a] = useState(false);
  const [validasi_title_images_b, setvalidasi_title_images_b] = useState(false);
  const [validasi_title_images_c, setvalidasi_title_images_c] = useState(false);
  const [validasi_linked, setvalidasi_linked] = useState(false);

  const handle_step1 = (event) => {
    const validTitle = title && title.trim().length >= 5;
    const validContents = contents && contents.trim().length >= 5;
    const validLinked = linked && linked.trim().length >= 1;
    const validA = title_images_a && title_images_a.trim().length > 0;
    const validB = title_images_b && title_images_b.trim().length > 0;
    const validC = title_images_c && title_images_c.trim().length > 0;

    setvalidasi_title(!validTitle);
    setvalidasi_contents(!validContents);
    setvalidasi_linked(!validLinked);
    setvalidasi_title_images_a(!validA);
    setvalidasi_title_images_b(!validB);
    setvalidasi_title_images_c(!validC);

    if (validTitle && validContents && validLinked && validA && validB && validC) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi');
    }
  };

  const handle_step2 = (event) => {
    

    

    
  };


  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Satu Portal List Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satuportal/List" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Satu Portal List
          </NavLink> /
          <NavLink  className="text-silver-a mr-2 d-flex textsize10">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
         
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1 rad15'>
          <form onSubmit={updateSatuportal_list}>
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
                                  Judul Portal List
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

export default Satuportal_listPengelolah;
