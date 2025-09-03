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

function MottoPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
  const [file, setfile] = useState("");
  const [images, setimages] = useState("");


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
    const response = await axios.get(apiurl+`api/open-item/komponen_detail/${id}`);
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
    
    try {
      await axios.patch(`${apiurl}api/open-item/komponen_update/${idku}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satuportal/Motto" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Motto
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
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
                      
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <TextField
                              label="Judul Motto"
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
                        <div className="sm:col-span-6 -mt-4">
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

                                {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                          </div>
                        </div>
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar"
                              className="bg-input rad15 w-100"
                              alt=""
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
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
                                src={images}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>
                      </div>
                      <div className="flex justify-center mt-5">

                        <button type="button"
                          onClick={() => {
                            handle_step1();
                          }}  
                          className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default MottoPengelolah;
