import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"

import Select from 'react-select';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import {Row,Col,Image} from 'react-bootstrap';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import Swal from 'sweetalert2';
import { motion, } from 'framer-motion';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineMap,
        MdOutlinePerson4,
        MdOutlineShortText,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdFileUpload,
        MdOutlineToday,
        MdOutlineSave} from "react-icons/md";



import useFetch from './useFeach';

import _ from "lodash";
import { api_url_satuadmin } from '../../../api/axiosConfig';

const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const useropdlogin = userlogin.opd_id || '';
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
  const [satkerku, setsatkerku] = useState([""]);
  const [bidangku, setbidangku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [idku, setid] = useState("");

  const [kategori, setkategori] = useState("");
  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
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

  const [loading, setLoading] = useState(false);


  const loadImage_Logo_a = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_logo_a(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_logo_a(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_logo_a(file);
  };

  const loadImage_Logo_b = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_logo_b(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_logo_b(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_logo_b(file);
  };

  const loadImage_Logo_c = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_logo_c(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_logo_c(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_logo_c(file);
  };

  const loadImage_Images_a = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_images_a(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_images_a(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_images_a(file);
  };

  const loadImage_Images_b = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_images_b(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_images_b(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_images_b(file);
  };

  const loadImage_Images_c = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_images_c(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_images_c(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_images_c(file);
  };
  
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
    const response = await api_url_satuadmin.get(`api/open-item/komponen_detail/${id}`);
    setid(response.data.id);
    setkategori(response.data.kategori);
    settitle(response.data.title);
    setcontents(response.data.contents);
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
    formData.append("admin", userloginadmin);
    formData.append("jenis", "Komponen Statik");
    formData.append("komponen", "Update Komponen Statik");

    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses edit data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await api_url_satuadmin.patch(`api/open-item/komponen_update/${idku}`, formData, {
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
              //navigate(`/Data-Satuportal_list/Detail/${id}`);
              navigate(`/Komponen-Statik`);
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

  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_contents, setvalidasi_contents] = useState(false);
  const [validasi_title_images_a, setvalidasi_title_images_a] = useState(false);
  const [validasi_title_images_b, setvalidasi_title_images_b] = useState(false);
  const [validasi_title_images_c, setvalidasi_title_images_c] = useState(false);
  const [validasi_linked, setvalidasi_linked] = useState(false);

  const handle_step1 = (event) => {
    if (title.length<5) {setvalidasi_title(true);}else{setvalidasi_title(false);}
    if (!contents) {setvalidasi_contents(true);}else{setvalidasi_contents(false);}
    //if (linked.length<1) {setvalidasi_linked(true);}else{setvalidasi_linked(false);}

    if (
      title?.length >= 5 &&
      contents
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi');
    }
  };

  const handle_step2 = (event) => {
    /*if (title_images_a.length<1) {setvalidasi_title_images_a(true);}else{setvalidasi_title_images_a(false);}
    if (title_images_b.length<1) {setvalidasi_title_images_b(true);}else{setvalidasi_title_images_b(false);}
    if (title_images_c.length<1) {setvalidasi_title_images_c(true);}else{setvalidasi_title_images_c(false);}

    if (
      title_images_a?.length >= 1 &&
      title_images_b?.length >= 1 &&
      title_images_c?.length >= 1
    ) {*/
      nextStep();
    /*} else {
      console.warn('⛔ Tidak lolos validasi');
    }*/
  };


  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Komponen Statik Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Komponen-Statik" className="text-silver-a mx-2 d-flex">
            <MdDataset className="mt-1 textsize10" />Komponen Statik
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
                      
                      
                      <div className="mt-3 flex">
                        <div className="col-span-2 -mt-2 py-1 justify-end w-2/3">
                          <div className=" bg-cyan-600 rad15 w-10 h-8  float-right">
                            <p className=" text-center text-white py-1">
                              1
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 -mt-2 py-1 justify-end w-2/3">
                          <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                            <p className=" text-center text-gray-500 py-1">
                              2
                            </p>
                          </div>
                        </div>
                        
                        <div className="col-span-2 -mt-2 py-1 justify-end w-2/3">
                          <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                            <p className=" text-center text-gray-500 py-1">
                              3
                            </p>
                          </div>
                        </div>
                          
                      </div>
                      <div className="-mt-5 w-full h-2 bg-cyan-200">
                          <div className="h-full bg-cyan-600 rounded-3xl  w-1/3"></div>
                      </div>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-2 -mt-2">
                            <div className="mt-0">
                                <TextField
                                  label="Kategori"
                                  className="bg-input rad15 w-full"
                                  value={kategori}
                                  onChange={(e) => setkategori(e.target.value)}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={1}    // <-- tinggi awal textarea
                                  disabled
                                  sx={(theme) => textFieldStyle(theme)}
                                />
                                  {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-4 -mt-2">
                            <div className="mt-0">
                                <TextField
                                  label="Judul"
                                  className="bg-input rad15 w-full"
                                  value={title}
                                  onChange={(e) => settitle(e.target.value)}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={1}    // <-- tinggi awal textarea
                                  
                                  sx={(theme) => textFieldStyle(theme)}
                                />
                                  {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                            </div>
                          </div>

                          <div className="sm:col-span-6 -mt-2">
                            <div className="mt-0">
                              <TextField
                                label="Isi Konten"
                                className="bg-input rad15 w-full"
                                value={contents}
                                onChange={(e) => setcontents(e.target.value)}
                                multiline   // <-- ini bikin jadi textarea
                                rows={5}    // <-- tinggi awal textarea
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
                                sx={(theme) => textFieldStyleMultiline(theme)}
                              />
                                {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                            </div>
                          </div>
                          
                          <div className="sm:col-span-6 -mt-2">
                            <div className="mt-0">
                                <TextField
                                  label="Link Url"
                                  className="bg-input rad15 w-full"
                                  value={linked}
                                  onChange={(e) => setlinked(e.target.value)}
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
                                  sx={(theme) => textFieldStyle(theme)}
                                />
                                {validasi_linked && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                            </div>

                          </div>
                          
                          
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
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                3
                              </p>
                            </div>
                          </div>
                            
                        </div>
                        <div className="-mt-5 w-full h-2 bg-cyan-200">
                            <div className="h-full bg-cyan-600 rounded-3xl w-2/3"></div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-6 -mt-2">
                            <div className="mt-0">
                              <TextField
                                type="file"
                                label="Unggah Logo 1"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                              <span className="file-label">Pilih File .jpg dan .png</span>
                              {fileError && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-6 -mt-2">
                            <div className="mt-0">
                              <TextField
                                type="file"
                                label="Unggah Logo 2"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
                                }}
                                onChange={loadImage_Logo_b}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {file_logo_b && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setfile_logo_b("")}
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
                              <span className="file-label">Pilih File .jpg dan .png</span>
                              {fileError && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-6 -mt-2">
                            <div className="mt-0">
                              <TextField
                                type="file"
                                label="Unggah Logo 3"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                              <span className="file-label">Pilih File .jpg dan .png</span>
                              {fileError && (
                                <p className="text-red-600 mt-2 d-flex">
                                  <MdOutlineErrorOutline className="mt-1 me-2" />
                                  {fileError}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                label="Sub List Konten"
                                className="bg-input rad15 w-full"
                                value={title_images_a}
                                onChange={(e) => settitle_image_a(e.target.value)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {title_images_a && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => settitle_image_a("")}
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
                              
                                {validasi_title_images_a && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                            </div>

                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                type="file"
                                label="Unggah Gambar Konten"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                                <span className="file-label">Pilih File .jpg dan .png</span>
                                {fileError && (
                                  <p className="text-red-600 mt-2 d-flex">
                                    <MdOutlineErrorOutline className="mt-1 me-2" />
                                    {fileError}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                label="Sub List Konten"
                                className="bg-input rad15 w-full"
                                value={title_images_b}
                                onChange={(e) => settitle_image_b(e.target.value)}
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
                                sx={(theme) => textFieldStyle(theme)}
                              /> 
                                {validasi_title_images_b && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                            </div>

                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                type="file"
                                label="Unggah Gambar Konten"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                                <span className="file-label">Pilih File .jpg dan .png</span>
                                {fileError && (
                                  <p className="text-red-600 mt-2 d-flex">
                                    <MdOutlineErrorOutline className="mt-1 me-2" />
                                    {fileError}
                                  </p>
                                )}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                label="Sub List Konten"
                                className="bg-input rad15 w-full"
                                value={title_images_c}
                                onChange={(e) => settitle_image_c(e.target.value)}
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
                                sx={(theme) => textFieldStyle(theme)}
                              /> 
                                {validasi_title_images_c && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                            </div>

                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                type="file"
                                label="Unggah Gambar Konten"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                                <span className="file-label">Pilih File .jpg dan .png</span>
                                {fileError && (
                                  <p className="text-red-600 mt-2 d-flex">
                                    <MdOutlineErrorOutline className="mt-1 me-2" />
                                    {fileError}
                                  </p>
                                )}
                            </div>
                          </div>
                          
                      </div>
                        <div className="flex justify-center mt-12">

                          <button 
                              onClick={prevStep} className="bg-gray-500 hover:bg-gray-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded-xl d-flex mx-1">
                              <MdOutlineArrowCircleLeft   className='mt-1 mx-1'  /><span>Kembali</span>
                          </button>
                          
                          <button 
                            type='button'
                            onClick={() => {
                              handle_step2();
                            }}
                            className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                            <span>Lanjut</span><MdOutlineArrowCircleRight  className='mt-1 mx-1'  />
                          </button>
                        </div>
                    </motion.div>
                )}
                {step === 3 && (
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

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default Satuportal_listPengelolah;
