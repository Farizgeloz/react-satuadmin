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
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineQrCode,
        MdOutlineMap,
        MdOutlinePerson4,
        MdDisabledVisible,
        MdPermDeviceInformation,
        MdOutlineShortText,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdOutlineTag,
        MdDescription,
        MdFileUpload,
        MdOutlineScale,
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";

import KontenEditor from "../KontenEditor";

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

function IklanPengelolah() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [idku, setid] = useState("");
  const [email, setemail] = useState("");
  const [telpon, settelpon] = useState("");
  const [alamat, setalamat] = useState("");
  const [fax, setfax] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [whatapp, setwhatapp] = useState("");
  const [twitter, settwitter] = useState("");
  const [facebook, setfacebook] = useState("");
  const [loading, setLoading] = useState(false);


  
  const navigate = useNavigate();
  const { id } = useParams();


   
  useEffect(() => {
    getDataById()
    

  }, [id]);

 

  const getDataById = async () => {
    const response = await api_url_satuadmin.get(`openitem/ekosistem_bio_detail/${id}`);
    setid(response.data.id);
    setemail(response.data.email);
    settelpon(response.data.telpon);
    setfax(response.data.fax);
    setalamat(response.data.alamat);
    setinstagram(response.data.instagram);
    setlinkedin(response.data.linkedin);
    setfacebook(response.data.facebook);
    settwitter(response.data.twitter);
    setwhatapp(response.data.whatapp);
    
  };


  const updateIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email",email);
    formData.append("telpon",telpon);
    formData.append("fax",fax);
    formData.append("alamat",alamat);
    formData.append("instagram",instagram);
    formData.append("linkedin",linkedin);
    formData.append("facebook",facebook);
    formData.append("twitter",twitter);
    formData.append("whatapp",whatapp);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Open Data Bantuan");
    formData.append("komponen","Update Bantuan Open Data");
    
    
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
      await api_url_satuadmin.patch(`openitem/ekosistem_bio/update/${idku}`, formData, {
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
              navigate(`/Bioinfo`);
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

  const [validasi_email, setvalidasi_email] = useState(false);
  const [validasi_telpon, setvalidasi_telpon] = useState(false);
  const [validasi_fax, setvalidasi_fax] = useState(false);
  const [validasi_alamat, setvalidasi_alamat] = useState(false);
  const [validasi_instagram, setvalidasi_instagram] = useState(false);
  const [validasi_linkedin, setvalidasi_linkedin] = useState(false);
  const [validasi_facebook, setvalidasi_facebook] = useState(false);
  const [validasi_twitter, setvalidasi_twitter] = useState(false);
  const [validasi_whatapp, setvalidasi_whatapp] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{8,}$/;
  const waRegex = /^(\+62|62|08)[0-9]{7,12}$/;
  const igRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$|^[a-zA-Z0-9._]+$/;
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/;
  const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/;
  const twitterRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+$/;
  const faxRegex = /^[0-9-]+$/;

  const handle_step1 = (event) => {
    if (!emailRegex.test(email)) {
      setvalidasi_email(true);
    } else {
      setvalidasi_email(false);
    }
    if (!phoneRegex.test(telpon)) {
      setvalidasi_telpon(true);
    } else {
      setvalidasi_telpon(false);
    }
    if (!faxRegex.test(fax)) {
      setvalidasi_fax(true);
    } else {
      setvalidasi_fax(false);
    }
    if (alamat.length < 5) {
      setvalidasi_alamat(true);
    } else {
      setvalidasi_alamat(false);
    }
    if (!igRegex.test(instagram)) {
      setvalidasi_instagram(true);
    } else {
      setvalidasi_instagram(false);
    }
    if (!linkedinRegex.test(linkedin)) {
      setvalidasi_linkedin(true);
    } else {
      setvalidasi_linkedin(false);
    }
    if (!facebookRegex.test(facebook)) {
      setvalidasi_facebook(true);
    } else {
      setvalidasi_facebook(false);
    }
    if (!waRegex.test(whatapp)) {
      setvalidasi_whatapp(true);
    } else {
      setvalidasi_whatapp(false);
    }
    if (!twitterRegex.test(twitter)) {
      setvalidasi_twitter(true);
    } else {
      setvalidasi_twitter(false);
    }


    

    if (emailRegex.test(email) && phoneRegex.test(telpon) && faxRegex.test(fax) && alamat.length >= 5 && linkedinRegex.test(linkedin) && igRegex.test(instagram)
       && facebookRegex.test(facebook) && twitterRegex.test(twitter) && waRegex.test(whatapp)) {
      nextStep();
    }
  };
  

  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Bio Info" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Bioinfo" className="text-silver-a mx-2 d-flex">
            <MdDataset className="mt-1 textsize10" />Bio Info
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
                                  Email
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={email}
                                  onChange={(e) => setemail(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {email && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setemail("")}
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
  
                                {validasi_email && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Format Tidak Sesuai...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Telpon
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={telpon}
                                  onChange={(e) => settelpon(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {telpon && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settelpon("")}
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
  
                                {validasi_telpon && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus 0xxx...</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Fax
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={fax}
                                  onChange={(e) => setfax(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {fax && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfax("")}
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

                                {validasi_fax && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Harus 0xxx...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Alamat
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={alamat}
                                  onChange={(e) => setalamat(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {alamat && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setalamat("")}
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

                                {validasi_alamat && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Harus Diisi Minimal 5 Karakter...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Instagram
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={instagram}
                                  onChange={(e) => setinstagram(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {instagram && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setinstagram("")}
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

                                {validasi_instagram && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Format Tidak Sesuai...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  LinkedIn
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={linkedin}
                                  onChange={(e) => setlinkedin(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {linkedin && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setlinkedin("")}
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

                                {validasi_linkedin && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Format Tidak Sesuai...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Facebook
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={facebook}
                                  onChange={(e) => setfacebook(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {facebook && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfacebook("")}
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

                                {validasi_facebook && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Format Tidak Sesuai...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  WhatsApp
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={whatapp}
                                  onChange={(e) => setwhatapp(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {whatapp && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setwhatapp("")}
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

                                {validasi_whatapp && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Format Tidak Sesuai. Harus +62,62,0xxx...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">

                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Twitter
                                </label>

                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={twitter}
                                  onChange={(e) => settwitter(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  sx={(theme) => textFieldStyle(theme)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {twitter && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settwitter("")}
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

                                {validasi_twitter && (
                                  <p className="transisi mb-0 text-red-700 d-flex">
                                    <MdErrorOutline className="mt-1 mx-2" />Format Tidak Sesuai...
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          
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

export default IklanPengelolah;
