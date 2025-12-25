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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import { MdDashboard,MdDataset,MdEditSquare,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";



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

function MottoPengelolah() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
  const [file, setfile] = useState("");
  const [images, setimages] = useState("");
  const [loading, setLoading] = useState(false);

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    // ✅ Validasi tipe file (JPG, JPEG, PNG)
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(image.type)) {
      Swal.fire({
        icon: "error",
        title: "Format Tidak Valid",
        text: "Hanya file gambar JPG, JPEG, atau PNG yang diperbolehkan.",
      });
      e.target.value = "";
      return;
    }

    // ✅ Validasi ukuran file (maks 5 MB)
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (image.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "Ukuran Terlalu Besar",
        text: "Ukuran gambar maksimal 5 MB.",
      });
      e.target.value = "";
      return;
    }

    // ✅ Set file & preview
    setfile(image);
    setimages(URL.createObjectURL(image));
  };
  
  const navigate = useNavigate();
  const { id } = useParams();


   
  useEffect(() => {
    getDataById()
    

  }, [id]);

 

  const getDataById = async () => {
    const response = await api_url_satuadmin.get(`open-item/komponen_detail/${id}`);
    setid(response.data.id);
    settitle(response.data.title);
    setcontents(response.data.contents);
    setimages(response.data.presignedUrl_a);
    
  };


  const updateMotto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_images_a",file);
    formData.append("title",title);
    formData.append("contents",contents);
    formData.append("admin", userloginadmin);
    formData.append("jenis", "Satu Portal Motto");
    formData.append("komponen", "Update Motto Satu Portal");
    
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
      await api_url_satuadmin.patch(`open-item/komponen_update/${idku}`, formData, {
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
              navigate(`/Satuportal/Motto`);
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
  const [validasi_contents, setvalidasi_contents] = useState(false);

    const [validasi_file, setvalidasi_file] = useState(false);

  const handle_step1 = (event) => {
    if (title.length < 3) {
      setvalidasi_title(true);
    } else {
      setvalidasi_title(false);
    }

    if (contents.length < 3) {
      setvalidasi_contents(true);
    } else {
      setvalidasi_contents(false);
    }

    

    if (title.length >= 3 && contents.length >= 3) {
      nextStep();
    }
  };
  

  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Motto Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satuportal/Motto" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Motto
          </NavLink> /
          <NavLink  className="text-silver-a mr-2 d-flex textsize10">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateMotto}>
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

                              {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
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
                        {images && (
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
                                src={images}
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

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default MottoPengelolah;
