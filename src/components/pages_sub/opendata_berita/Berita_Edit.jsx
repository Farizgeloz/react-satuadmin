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
import { MdDashboard,MdDataset,MdEditSquare,
        MdPermDeviceInformation,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdFileUpload,
        MdOutlineScale,
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";

import KontenEditor_a from "../KontenEditor_a";
import KontenEditor_b from "../KontenEditor_b";
import KontenEditor_c from "../KontenEditor_c";


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

function IklanPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const { id } = useParams();
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


  const loadImage_a = (e) =>{
    const image = e.target.files[0];
    setfile_a(image);
    if (image) {
      setimages_a(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }
  const loadImage_b = (e) =>{
    const image = e.target.files[0];
    setfile_b(image);
    if (image) {
      setimages_b(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }
  const loadImage_c = (e) =>{
    const image = e.target.files[0];
    setfile_c(image);
    if (image) {
      setimages_c(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }

  const loadImage_download = (e) =>{
    const image = e.target.files[0];
    setfile_download(image);
    /*if (image) {
      //setdownload(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }*/
  }
  
  const navigate = useNavigate();


   
  useEffect(() => {
    getDataById()
    

  }, [id]);

 

  const getDataById = async () => {
    
    
    const response = await api_url_satuadmin.get(`api/opendata/artikel/detail_admin/${id}`);
    setid(response.data.id_artikel);
    settitle(response.data.title);
    setcontent_a(response.data.content_a);
    setcontent_b(response.data.content_b);
    setcontent_c(response.data.content_c);
    setimages_a(response.data.presignedUrl_a);
    setimages_b(response.data.presignedUrl_b);
    setimages_c(response.data.presignedUrl_c);
    setsumber(response.data.sumber);
    setdownload(response.data.presignedUrl_download);
    setvisibilitas({ value: response.data.visibilitas, label: response.data.visibilitas });
    
    
  };


  const updateIklan = async (e) => {
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
    formData.append("komponen","Update Artikel Open Data");
    
    
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
      await api_url_satuadmin.patch(`api/opendata/artikel/update/${idku}`, formData, {
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
              navigate(`/Opendata/Artikel`);
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
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Opendata Artikel Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex">
            <MdDashboard className="mt-1 textsize10"/>Dashboard1
          </NavLink> / 
          <NavLink to="/Opendata/Artikel" className="text-silver-a mx-2 d-flex">
            <MdDataset className="mt-1 textsize10" />Opendata Artikel
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
                                label="Judul Artikel"
                                className="bg-input rad15 w-full"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                sx={(theme) => textFieldStyle(theme)}
                              />
                              {errors.title && <p className="text-red-500">{errors.title}</p>}
                               
                          </div>
                          
                        </div>
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <TextField
                              label="Sumber"
                              className="bg-input rad15 w-full"
                              value={sumber}
                              onChange={(e) => setsumber(e.target.value)}
                              sx={(theme) => textFieldStyle(theme)}
                            />

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
                            {errors.visibilitas && <p className="text-red-500">{errors.visibilitas}</p>}
                           
                          </div>
                        </div>
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor_a content_a={content_a} setcontent_a={setcontent_a} />
                          </div>
                          
                        </div>
                        
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                            {errors.file_a && <p className="text-red-500">{errors.file_a}</p>}
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_a}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor_b content_b={content_b} setcontent_b={setcontent_b} />
                          </div>
                          
                        </div>
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
                              }}
                              onChange={loadImage_b}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {file_b && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setfile_a("")}
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
                            
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_b}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <KontenEditor_c content_c={content_c} setcontent_c={setcontent_c} />
                          </div>
                          
                        </div>
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                            
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_c}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>

                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Download File"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
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
