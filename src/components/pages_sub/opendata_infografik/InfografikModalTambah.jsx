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

import KontenEditor from "../KontenEditor";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';
import { api_url_satudata } from "../../../../../frontend_opendata/src/api/axiosConfig";
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
  const [topikku, settopikku] = useState([""]);
  
  const [topik, settopik] = useState(null);
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [content, setcontent] = useState("");
  const [penyusun, setpenyusun] = useState(null);
  const [visibilitas, setvisibilitas] = useState("");
  const [file_a, setfile_a] = useState("");
  const [file_b, setfile_b] = useState("");
  const [file_c, setfile_c] = useState("");
  const [file_d, setfile_d] = useState("");
  const [images_a, setimages_a] = useState("");
  const [images_b, setimages_b] = useState("");
  const [images_c, setimages_c] = useState("");
  const [images_d, setimages_d] = useState("");
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

    // Validasi ukuran (maks. 2MB)
  const maxSize = 5 * 1024 * 1024; // 2 MB
  if (file.size > maxSize) {
    Swal.fire({
      icon: "error",
      title: "Format Tidak Valid",
      text: "Hanya file JPG atau PNG yang diperbolehkan!",
      confirmButtonColor: "#3085d6",
    });
    e.target.value = "";
    setFile(null);
    setPreview("");
    return;
  }

    // Atur file dan preview
    setFile(file);
    if (setPreview) setPreview(URL.createObjectURL(file));
  };


  const loadImage_a = (e) => validateImageFile(e, setfile_a, setimages_a);
  const loadImage_b = (e) => validateImageFile(e, setfile_b, setimages_b);
  const loadImage_c = (e) => validateImageFile(e, setfile_c, setimages_c);
  const loadImage_d = (e) => validateImageFile(e, setfile_d, setimages_d);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData()
    

  }, []);

  const getData = async () => {
    try {
      

      // 🔹 Ambil semua dataset
      const res3 = await api_url_satudata.get("dataset?limit=1000");
      const allDataset = res3.data || [];

      // 🔹 Ambil sektor unik dari dataset
      const sektorList = allDataset
        .map(item => ({
          id_sektor: item.sektor?.id_sektor,
          nama_sektor: item.sektor?.nama_sektor
        }))
        .filter(sektor => sektor.id_sektor && sektor.nama_sektor);

      const uniqueSektor = Array.from(
        new Map(sektorList.map(sektor => [sektor.id_sektor, sektor])).values()
      );

      // 🔹 Simpan semua sektor ke state sektorku
      settopikku(uniqueSektor);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_a",file_a);
    formData.append("file_b",file_b);
    formData.append("file_c",file_c);
    formData.append("file_d",file_d);
    formData.append("content",content);
    formData.append("topik",topik.value);
    formData.append("title",title);
    formData.append("sub_title",subtitle);
    formData.append("penyusun",penyusun.value);
    formData.append("visibilitas",visibilitas.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Open Data Infografik");
    formData.append("komponen","Tambah Infografik Open Data");

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
      await api_url_satuadmin.post('api/opendata/infografik/add', formData);

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

  const redoStep = () => {
      setStep(1);
  };

  const [errors, setErrors] = useState({});
  
  const validate1 = () => {
    let newErrors = {};

    if (!topik) {
      newErrors.topik = "Topik wajib dipilih";
    }

    if (!title || title.trim().length < 5) {
      newErrors.title = "Judul minimal 5 karakter";
    }
    /* if (!subtitle || subtitle.trim().length < 5) {
      newErrors.subtitle = "Judul minimal 5 karakter";
    } */
    if (!content || content.trim().length < 10) {
      newErrors.content = "Konten minimal 10 karakter";
    }

    if (!penyusun) {
      newErrors.penyusun = "Penyusun wajib dipilih";
    }
    if (!visibilitas) {
      newErrors.visibilitas = "Visibilitas wajib dipilih";
    }

    if (!file_a) {
      newErrors.file_a = "Upload Gambar Pertama Wajib Ada";
    }


    setErrors(newErrors);

    // ✅ true kalau tidak ada error
    return Object.keys(newErrors).length === 0;
  };

  const validate2 = () => {
    let newErrors = {};

    if (!content) {
      newErrors.content_a = "Isi Konten wajib diisi";
    }
    if (!file_a) {
      newErrors.file_a = "Upload wajib Ada";
    }

    setErrors(newErrors);

    // ✅ true kalau tidak ada error
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validate1();
    if (!isValid) {
      console.log("Step 1 masih ada error");
      return;
    }
    nextStep();
  };

  const handleNext2 = () => {
    const isValid = validate2();
    if (!isValid) {
      console.log("Step 2 masih ada error");
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
              <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Infografik</h4>
              
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
                                Judul Infografik
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
                        <div className="md:col-span-6 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Sub Judul Infografik
                              </label>

                              <TextField
                                className="bg-input rad15 w-full"
                                value={subtitle}
                                onChange={(e) => setsubtitle(e.target.value)}
                                InputLabelProps={{ shrink: false }}
                                sx={(theme) => textFieldStyle(theme)}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {subtitle && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setsubtitle("")}
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

                              {errors.subtitle && (
                                <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-3 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Topik
                              </label>

                              <Autocomplete
                                className="tsize-110"
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-sektor"
                                options={topikku.map((row) => ({
                                  label: row.nama_sektor,
                                  value: row.id_sektor
                                }))}
                                getOptionLabel={(option) => option.label || ""}
                                value={topik}
                                onChange={(event, newValue) => settopik(newValue)}
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

                              {errors.topik && (
                                <p className="text-red-500 text-sm mt-1">{errors.topik}</p>
                              )}
                            </div>
                          </div>
                        </div>  
                        <div className="md:col-span-3 col-span-6 -mt-2">
                          <div className="mt-1">
                            <div className="p-3 rad15 border bg-white shadow-sm">

                              <label className="font_weight600 textsize12 mb-2 d-block">
                                Penyusun
                              </label>

                              <Autocomplete
                                className="tsize-110"
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-location"
                                options={[
                                  { label: "Digital Service Prob", value: "Digital Service Prob" },
                                  { label: "Statistik Kominfo", value: "Statistik Kominfo" }
                                ]}
                                getOptionLabel={(option) => option.label || ""}
                                value={penyusun}
                                onChange={(event, newValue) => setpenyusun(newValue)}
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

                              {errors.penyusun && (
                                <p className="text-red-500 text-sm mt-1">{errors.penyusun}</p>
                              )}
                            </div>
                          </div>
                        </div>   
                            
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor content={content} setcontent={setcontent} />
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
                              {errors.file_a && (
                                <p className="text-red-500 text-sm mt-1">{errors.file_a}</p>
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
                                      {file_c && (
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
                                onChange={loadImage_d}
                                InputProps={{
                                  endAdornment: (
                                    <>
                                      {file_d && (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={() => setfile_d("")}
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
                              

                              

                            </div>

                          </div>
                        </div>
                        {/* AREA PREVIEW GAMBAR */}
                        {images_d && (
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
                                src={images_d}
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
                                Visibilitas
                              </label>

                              <Autocomplete
                                className="tsize-110"
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-visibilitas"
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