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
import { api_url_satuadmin } from "../../../api/axiosConfig";

import KontenEditor_a from "../KontenEditor_a";
import KontenEditor_b from "../KontenEditor_b";
import KontenEditor_c from "../KontenEditor_c";






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
  const [satkerku, setprodukdataku] = useState([]);
  const [kategoriku, setkategoriku] = useState([]);
  

  
  const [title, settitle] = useState("");
  const [content_a, setcontent_a] = useState("");
  const [content_b, setcontent_b] = useState("");
  const [content_c, setcontent_c] = useState("");
  const [download, setdownload] = useState("");
  const [file_download, setfile_download] = useState("");
  const [sumber, setsumber] = useState("");
  const [visibilitas, setvisibilitas] = useState("");
  const [file_a, setfile_a] = useState("");
  const [file_b, setfile_b] = useState("");
  const [file_c, setfile_c] = useState("");
  const [images_a, setimages_a] = useState("");
  const [images_b, setimages_b] = useState("");
  const [images_c, setimages_c] = useState("");
  const [loading, setLoading] = useState(false);

  

  const validateImageFile = (e, setFile, setPreview) => {
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

    // Atur file dan preview
    setFile(file);
    if (setPreview) setPreview(URL.createObjectURL(file));
  };


  const loadImage_a = (e) => validateImageFile(e, setfile_a, setimages_a);
  const loadImage_b = (e) => validateImageFile(e, setfile_b, setimages_b);
  const loadImage_c = (e) => validateImageFile(e, setfile_c, setimages_c);


  const loadImage_download = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // VALIDASI FILE HARUS PDF
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Format Tidak Didukung",
        text: "Hanya file PDF, DOC, atau DOCX yang diperbolehkan!",
      });
      e.target.value = "";
      return;
    }

    setfile_download(file);
  };
  

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_a",file_a);
    formData.append("file_b",file_b);
    formData.append("file_c",file_c);
    formData.append("content_a",content_a);
    formData.append("content_b",content_b);
    formData.append("content_c",content_c);
    formData.append("title",title);
    formData.append("sumber",sumber);
    formData.append("download_file",file_download);
    formData.append("visibilitas",visibilitas.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Open Data Artikel");
    formData.append("komponen","Tambah Artikel Open Data");

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
      await api_url_satuadmin.post('opendata/artikel/add', formData);

      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data2");
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
  
    const [errors, setErrors] = useState({});
  
    const validateAll = () => {
      let newErrors = {};
  
      if (!title || title.trim().length < 3) {
        newErrors.title = "Judul minimal 3 karakter";
      }
  
      if (!visibilitas) {
        newErrors.visibilitas = "Visibilitas wajib dipilih";
      }
  
      if (!content_a) {
        newErrors.content_a = "Isi Konten wajib diisi";
      }
      /*if (!file_a) {
        newErrors.file_a = "Upload wajib Ada";
      }*/
  
      setErrors(newErrors);
  
      // ✅ true kalau tidak ada error
      return Object.keys(newErrors).length === 0;
    };
  
    const handleNext = () => {
      const isValid = validateAll();
      if (!isValid) {
        console.log("Step 1 masih ada error");
        return;
      }
      nextStep();
    };
   

  return (

    <>
            
       
      <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
        <button 
          className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
            <MdAddCircle className="mt-1 mx-1" /><span>Tambah Data</span>
        </button>
      </Link>
      
      <Modal dialogClassName="my-modal4"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
          <form onSubmit={saveIklan}>
          <Modal.Header closeButton className="border-b ">
              <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Open Data Artikel</h4>
              
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
                        
                        {/* JUDUL ARTIKEL */}
                        <div className="md:col-span-6 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Judul Artikel
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

                              {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                              )}
                            </div>
                          </div>
                        </div>


                        {/* SUMBER */}
                        <div className="md:col-span-6 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Sumber Artikel
                              </label>

                              <TextField
                                className="bg-input rad15 w-full"
                                value={sumber}
                                onChange={(e) => setsumber(e.target.value)}
                                InputLabelProps={{ shrink: false }}
                                sx={(theme) => textFieldStyle(theme)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {sumber && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setsumber("")}
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
                        <div className="md:col-span-3 col-span-6 -mt-2">
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

                              {errors.visibilitas && (
                                <p className="text-red-500 text-sm mt-1">{errors.visibilitas}</p>
                              )}
                            </div>
                          </div>
                        </div>


                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor_a content_a={content_a} setcontent_a={setcontent_a} />
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
                                onChange={loadImage_a}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {file_a && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setfile_a("")}
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
                              {errors.file_a && <p className="text-red-500">{errors.file_a}</p>}

                              

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
                        
                        
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor_b content_b={content_b} setcontent_b={setcontent_b} />
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
                                onChange={loadImage_b}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {file_b && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setfile_b("")}
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
                              {errors.file_b && <p className="text-red-500">{errors.file_b}</p>}

                              

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
                        
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor_c content_c={content_c} setcontent_c={setcontent_c} />
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
                                onChange={loadImage_c}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {file_a && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setfile_c("")}
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
                              {errors.file_c && <p className="text-red-500">{errors.file_c}</p>}

                              

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

                        
                        <div className="md:col-span-6 col-span-6 -mt-2">
                          <div className="mt-1">

                            <div className="p-3 rad15 border bg-white shadow-sm mb-2">
                              <label className="font_weight600 textsize13 mb-2 d-block">
                                Unggah File PDF
                              </label>

                              <TextField
                                type="file"
                                accept="application/pdf"
                                className="bg-input rad15 w-100"
                                InputLabelProps={{
                                  shrink: false,
                                }}
                                onChange={loadImage_download}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {file_download && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setfile_download("")}
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
                              {errors.file_download && <p className="text-red-500">{errors.file_download}</p>}

                              

                            </div>

                          </div>
                        </div>
                        
                       
                        
                        
                        
                    </div>
                      <div className="flex justify-center mt-5">

                        <button type="button"
                          onClick={() => {
                            handleNext();
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