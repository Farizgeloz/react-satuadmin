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
        MdArrowCircleRight,MdOutlineToday} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';


const apiurl=process.env.REACT_APP_URL;

const textFieldStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: 50,
    fontSize: "0.9rem",
    background: "#ecfccb",
    borderRadius: "6px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.85rem",
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
    fontSize: "0.9rem",
    background: "#ecfccb",
    borderRadius: "6px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.85rem",
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
  const [satkerku, setsatkerku] = useState([]);
  const [bidangku, setbidangku] = useState([]);
  const [locationku, setlocationku] = useState([]);

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

    try {
      await axios.post(apiurl + 'api/open-item/ekosistem_list_add', formData);

      setShow(false);
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
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

    setvalidasi_title(!isTitleValid);
    setvalidasi_contents(!isContentsValid);
    setvalidasi_linked(!isLinkedValid);

    if (isTitleValid && isContentsValid && isLinkedValid) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi step 1');
    }
  };

  const handle_step2 = () => {
    const isTitleAValid = title_images_a?.trim().length >= 1;
    const isTitleBValid = title_images_b?.trim().length >= 1;
    const isTitleCValid = title_images_c?.trim().length >= 1;

    const isLogoAValid = !!file_logo_a;
    const isLogoBValid = !!file_logo_b;
    const isLogoCValid = !!file_logo_c;

    const isImageAValid = !!file_images_a;
    const isImageBValid = !!file_images_b;
    const isImageCValid = !!file_images_c;

    setvalidasi_title_images_a(!isTitleAValid);
    setvalidasi_title_images_b(!isTitleBValid);
    setvalidasi_title_images_c(!isTitleCValid);

    setvalidasi_logo_a(!isLogoAValid);
    setvalidasi_logo_b(!isLogoBValid);
    setvalidasi_logo_c(!isLogoCValid);

    setvalidasi_image_a(!isImageAValid);
    setvalidasi_image_b(!isImageBValid);
    setvalidasi_image_c(!isImageCValid);

    if (
      isTitleAValid && isTitleBValid && isTitleCValid &&
      isLogoAValid && isLogoBValid && isLogoCValid &&
      isImageAValid && isImageBValid && isImageCValid
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi step 2');
    }
  };

 

  return (

    <>
            
       
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Satu Portal List</span>
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
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Location Maplist</h4>
                
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
                            
                            <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0">
                                  <TextField
                                    label="Judul"
                                    className="bg-input rad15 w-full"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    multiline   // <-- ini bikin jadi textarea
                                    rows={1}    // <-- tinggi awal textarea
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
                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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
                                sx={(theme) => textFieldStyle(theme)}
                              />
                              <span className="file-label">Pilih File .jpg dan .png</span>
                              {validasi_logo_a && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
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
                                sx={(theme) => textFieldStyle(theme)}
                              />
                              <span className="file-label">Pilih File .jpg dan .png</span>
                              {validasi_logo_b && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
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
                                sx={(theme) => textFieldStyle(theme)}
                              />
                              <span className="file-label">Pilih File .jpg dan .png</span>
                              {validasi_logo_c && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
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
                                label="SubList 1"
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
                                label="Unggah Gambar 1"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
                                }}
                                onChange={loadImage_Images_a}
                                sx={(theme) => textFieldStyle(theme)}
                              />
                                <span className="file-label">Pilih File .jpg dan .png</span>
                                {validasi_image_a && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
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
                                label="SubList 2"
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
                                label="Unggah Gambar 2"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
                                }}
                                onChange={loadImage_Images_b}
                                sx={(theme) => textFieldStyle(theme)}
                              />
                                <span className="file-label">Pilih File .jpg dan .png</span>
                                {validasi_image_b && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
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
                                label="SubList 3"
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
                                label="Unggah Gambar 3"
                                className="bg-input rad15 w-100"
                                inputProps={{
                                  accept: "image/*", // hanya file gambar
                                }}
                                alt=""
                                InputLabelProps={{
                                  shrink: true, // biar label tetap tampil di atas saat file dipilih
                                }}
                                onChange={loadImage_Images_c}
                                sx={(theme) => textFieldStyle(theme)}
                              />
                                <span className="file-label">Pilih File .jpg dan .png</span>
                                {validasi_image_c && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
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
                              onClick={prevStep} className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded-xl d-flex mx-1">
                              <MdOutlineArrowCircleLeft   className='mt-1 mx-1'  /><span>Kembali</span>
                          </button>
                          
                          <button 
                            type='button'
                            onClick={() => {
                              handle_step2();
                            }}
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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
                        <div className="mt-12 text-base  text-center">
                            Yakin Data Sudah Benar ?
                        </div>
                        <div>
                            <div className="flex justify-center mt-12">
                              <button 
                                  type="button"
                                  onClick={prevStep}
                                  className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
                                  <MdOutlineArrowCircleLeft  className='mt-1 mx-1'  /><span>Kembali</span>
                              </button>
                              <button 
                                  type="submit"
                                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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