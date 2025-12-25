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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autocomplete from '@mui/material/Autocomplete';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdEditSquare, MdOutlineSave,
        MdOutlineArrowCircleLeft,
        MdArrowCircleRight} from "react-icons/md";

import qs from 'qs';

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

function UserEdit() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const { id } = useParams();
  const [idku, setid] = useState("");
  
  const [satkerku, setsatkerku] = useState([]);

  const [name, setname] = useState("");
  const [nick, setnick] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");
  const [role, setrole] = useState([]);
  const [satker, setsatker] = useState([]);

  const [showPassword, setShowPassword] = useState(false); // <-- ini dia
    const [showRePassword, setShowRePassword] = useState(false); // <-- ini dia

  const handleShowPassword = () => {
    setShowPassword(true);

    // otomatis kembali hidden setelah 3 detik
    setTimeout(() => {
      setShowPassword(false);
    }, 1000);
  };

  const handleShowRePassword = () => {
    setShowRePassword(true);

    // otomatis kembali hidden setelah 3 detik
    setTimeout(() => {
      setShowRePassword(false);
    }, 1000);
  };

  
  
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    getDatasetItem()
    
  }, [satker]);

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get('openitem/satker', {
      params: {
        search_satker: userloginsatker
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
    });
    setsatkerku(response.data.resultsatker);
  };
   
  useEffect(() => {
    getDataById();

  }, [id]);

  

  const getDataById = async () => {
    const response = await api_url_satuadmin.get(`open-user/user/${id}`);
    setid(response.data.uuid);
    setname(response.data.name);
    setnick(response.data.nick);
    setemail(response.data.email);
    //setpassword(response.data.password);
    setrole({ value: response.data.role, label: response.data.role });
    setsatker({ value: response.data.opd_id, label: response.data.nama_opd });
   
  };


    const updateUser = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name",name);
      formData.append("nick",nick);
      formData.append("email",email);
      formData.append("password",password);
      formData.append("confpassword",confpassword);
      formData.append("role",role.value);
      formData.append("opd_id",satker.value);
      formData.append("admin",userloginadmin);
      formData.append("jenis", "Satu Admin Pengguna");
      formData.append("komponen", "Update Pengguna Satu Admin" );
      try {
        await api_url_satuadmin.patch(`open-user/user/update/${idku}`, formData, {
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
            html: "User Berhasil Diupdate",
            timer: 2000,
            icon: "success",
            timerProgressBar: true,
            didOpen: () => {
            Swal.showLoading();
            
        },
        willClose: () => {
            navigate(`/Data-User`);
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
    
  
    const [validasi_name, setvalidasi_name] = useState(false);
    const [validasi_nick, setvalidasi_nick] = useState(false);
    const [validasi_email, setvalidasi_email] = useState(false);
    const [validasi_password, setvalidasi_password] = useState(false);
    const [validasi_repassword, setvalidasi_repassword] = useState(false);
    const [validasi_role, setvalidasi_role] = useState(false);
    const [validasi_satker, setvalidasi_satker] = useState(false);
  
    const handle_step1 = () => {
      const isNameValid = name?.length >= 5;
      const isNickValid = nick?.length >= 3;
      const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      //const isPasswordValid = password?.length >= 6;
      const isRepasswordValid = confpassword === password;
      const isRoleValid = role !== null;
  
      // default false
      // Default: satker TIDAK valid (wajib)
      let isSatkerValid = false;

      // Jika role adalah Admin, Operator, Super Admin → satker TIDAK wajib
      if (
        role?.value === "Super Admin" ||
        role?.value === "Admin" ||
        role?.value === "Operator"
      ) {
        isSatkerValid = true;            // tidak wajib → otomatis valid
      } else {
        isSatkerValid = !!satker?.value; // wajib → harus ada value
      }
  
      // Set state error messages
      setvalidasi_name(!isNameValid);
      setvalidasi_nick(!isNickValid);
      setvalidasi_email(!isEmailValid);
      //setvalidasi_password(!isPasswordValid);
      setvalidasi_repassword(!isRepasswordValid);
      setvalidasi_role(!isRoleValid);
      setvalidasi_satker(!isSatkerValid);
  
      // Gabung semua validasi jadi satu
      const isValid = isNameValid && isNickValid && isEmailValid  && isRepasswordValid && isRoleValid && isSatkerValid;
  
      if (isValid) {
        nextStep();
      } else {
        console.warn("⛔ Tidak lolos validasi step 1");
      }
    };

    const getRoleOptions = () => {
      if (rolelogin === "Super Admin") {
        return [
          { label: "Admin", value: "Admin" },
          { label: "Operator", value: "Operator" },
          { label: "Operator Opd", value: "Operator Opd" },
          { label: "Verifikator Opd", value: "Verifikator Opd" },
          { label: "Super Admin", value: "Super Admin" },
        ];
      } else if (rolelogin === "Admin") {
        return [
          { label: "Operator", value: "Operator" },
          { label: "Operator Opd", value: "Operator Opd" },
          { label: "Verifikator Opd", value: "Verifikator Opd" },
        ];
        
      } else if (rolelogin === "Operator") {
        return [
          { label: "Operator", value: "Operator" },
        ]; // atau return [] jika tidak boleh pilih sama sekali
      } else {
        return [];
      }
    };


  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="User Edit" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-User" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Data User
          </NavLink> /
          <NavLink  className="text-silver-a mr-2 d-flex textsize10">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateUser}>
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
                                  Nama Lengkap
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {name && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setname("")}
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
  
                                {validasi_name && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Nick
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={nick}
                                  onChange={(e) => setnick(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {nick && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setnick("")}
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
  
                                {validasi_nick && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Email
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={email}
                                  type='email'
                                  onChange={(e) => setemail(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
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
                                  sx={(theme) => textFieldStyle(theme)}
                                />
  
                                {validasi_email && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Format email tidak valid..</p>}
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Password
                                </label>
  
                                <TextField
                                  id="password-field"
                                  className="bg-input rad15 w-full"
                                  value={password}
                                  type={showPassword ? "text" : "password"}
                                  onChange={(e) => setpassword(e.target.value)}
                                  autoComplete="new-password"
                                  InputLabelProps={{ shrink: false }}
                                  InputProps={{
                                  autoComplete: "new-password",       // ⛔ Matikan juga di InputProps
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {password && (
                                          <>
                                            {/* tombol clear */}
                                            <IconButton
                                              onClick={() => setpassword("")}
                                              edge="end"
                                              size="small"
                                            >
                                              <ClearIcon />
                                            </IconButton>

                                            {/* tombol show/hide password */}
                                            <IconButton
                                              onClick={handleShowPassword}
                                              edge="end"
                                              size="small"
                                            >
                                              {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </>
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={(theme) => textFieldStyle(theme)}
                                />
  
                                {validasi_password && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 6 Karakter.</p>}
                              </div>
                            </div>
                          </div>
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Ulang Password
                                </label>
  
                                <TextField
                                  className="bg-input rad15 w-full"
                                  value={confpassword}
                                  type={showRePassword ? "text" : "password"}
                                  onChange={(e) => setconfpassword(e.target.value)}
                                  InputLabelProps={{ shrink: false }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        {confpassword && (
                                          <>
                                            {/* tombol clear */}
                                            <IconButton
                                              onClick={() => setconfpassword("")}
                                              edge="end"
                                              size="small"
                                            >
                                              <ClearIcon />
                                            </IconButton>

                                            {/* tombol show/hide password */}
                                            <IconButton
                                              onClick={handleShowRePassword}
                                              edge="end"
                                              size="small"
                                            >
                                              {showRePassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </>
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={(theme) => textFieldStyle(theme)}
                                />
  
                                {validasi_repassword && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 6 Karakter.</p>}
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Satker / OPD
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                   isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-satker"
                                  options={satkerku.map((row) => ({
                                    label: row.nama_opd,
                                    value: row.id_opd
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={satker}
                                  onChange={(event, newValue) => setsatker(newValue)}
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
  
                                {validasi_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:col-span-6 col-span-6 -mt-2">
                            <div className="mt-1">
                              <div className="p-3 rad15 border bg-white shadow-sm">
  
                                <label className="font_weight600 textsize12 mb-2 d-block">
                                  Role User
                                </label>
  
                                <Autocomplete
                                  className="tsize-110"
                                   isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-satker"
                                  options={getRoleOptions()}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={role}
                                  onChange={(event, newValue) => setrole(newValue)}
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
  
                                {validasi_role && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
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
                                  className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
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

export default UserEdit;
