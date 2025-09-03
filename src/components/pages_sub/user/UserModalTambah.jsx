import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";

import { motion, useAnimation } from 'framer-motion';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autocomplete from '@mui/material/Autocomplete';


import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import { MdAddCircle,MdAccessibility,MdPerson,MdEmail, MdPassword, MdOutlineSave, MdOutlineExitToApp,
        MdErrorOutline,MdOutlinePerson4,MdCategory,
        MdOutlineErrorOutline,
        MdArrowCircleRight,
        MdOutlineArrowCircleLeft} from "react-icons/md";

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

function ModalTambahUser() {
  const [satkerku, setsatkerku] = useState([]);
  const [kategoriku, setkategoriku] = useState([]);
  const [name, setname] = useState("");
  const [nick, setnick] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");
  const [role, setrole] = useState([]);
  const [satker, setsatker] = useState([""]);
  const [jabatan, setjabatan] = useState([""]);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(false); // <-- ini dia
  
  const handleShowPassword = () => {
    setShowPassword(true);

    // otomatis kembali hidden setelah 3 detik
    setTimeout(() => {
      setShowPassword(false);
    }, 1000);
  };

  useEffect(() => {
    getDatasetItem()
    
  }, [satker]);

  const getDatasetItem = async () => {
    const response = await axios.get(apiurl + "api/satupeta/map_item2");
    const data = response.data;
    setsatkerku(response.data.resultsatker);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",name);
    formData.append("nick",nick);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("confpassword",confpassword);
    formData.append("role",role.value);
    formData.append("satker_id",satker.value);
    formData.append("jabatan",jabatan.value);
    try {
      await axios.post(apiurl + 'api/open-user/user/add', formData);
      setShow(false);
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
            navigate(0);
        }
      }).then((result) => {
      });
  }
  function sweeterror(){
      Swal.fire({
          title: "Gagal",
          html: "Data Gagal Disimpan",
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
  

  const [validasi_name, setvalidasi_name] = useState(false);
  const [validasi_nick, setvalidasi_nick] = useState(false);
  const [validasi_email, setvalidasi_email] = useState(false);
  const [validasi_password, setvalidasi_password] = useState(false);
  const [validasi_repassword, setvalidasi_repassword] = useState(false);
  const [validasi_role, setvalidasi_role] = useState(false);
  const [validasi_satker, setvalidasi_satker] = useState(false);
  const [validasi_jabatan, setvalidasi_jabatan] = useState(false);

  const handle_step1 = () => {
    const isNameValid = name?.length >= 5;
    const isNickValid = nick?.length >= 3;
    const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password?.length >= 6;
    const isRepasswordValid = confpassword === password;
    const isRoleValid = role !== null;

    // default false
    let isSatkerValid = true;
    let isJabatanValid = true;

    if (role?.value !== "Super Admin") {
      isSatkerValid = !!satker?.value;
      isJabatanValid = !!jabatan?.value;
    }

    // Set state error messages
    setvalidasi_name(!isNameValid);
    setvalidasi_nick(!isNickValid);
    setvalidasi_email(!isEmailValid);
    setvalidasi_password(!isPasswordValid);
    setvalidasi_repassword(!isRepasswordValid);
    setvalidasi_role(!isRoleValid);
    setvalidasi_satker(!isSatkerValid);
    setvalidasi_jabatan(!isJabatanValid);

    // Gabung semua validasi jadi satu
    const isValid = isNameValid && isNickValid && isEmailValid && isPasswordValid && isRepasswordValid && isRoleValid && isSatkerValid && isJabatanValid;

    if (isValid) {
      nextStep();
    } else {
      console.warn("⛔ Tidak lolos validasi step 1");
    }
  };


  
    

  return (

    <>
            
        
        <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah User</span>
          </button>
        </Link>

        <Modal dialogClassName="my-modal2"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveUser}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Data User</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2">
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
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                            <div className=" bg-cyan-600 rad15 w-10 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                1
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                2
                              </p>
                            </div>
                          </div>
                          
                         
                            
                        </div>
                        <div className="-mt-5 w-full h-2 bg-cyan-200">
                            <div className="h-full bg-cyan-600 rounded-3xl  w-1/2"></div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-6 -mt-2">
                              <div className="mt-0 transisiku">
                                <TextField
                                  label="Nama Lengkap"
                                  className="bg-input rad15 w-full"
                                  value={name}
                                  onChange={(e) => setname(e.target.value)}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={1}    // <-- tinggi awal textarea
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
                          <div className="sm:col-span-3 -mt-2">
                              <div className="mt-0">
                                <TextField
                                  label="Nick"
                                  className="bg-input rad15 w-full"
                                  value={nick}
                                  onChange={(e) => setnick(e.target.value)}
                                  multiline   // <-- ini bikin jadi textarea
                                  rows={1}    // <-- tinggi awal textarea
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
                          <div className="sm:col-span-3 -mt-2">
                            <div className="mt-0">
                              <TextField
                                label="Email"
                                className="bg-input rad15 w-full"
                                type='email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                multiline   // <-- ini bikin jadi textarea
                                rows={1}    // <-- tinggi awal textarea
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
                          <div className="sm:col-span-3 -mt-2">
                              <div className="mt-0">
                                <TextField
                                  label="Password"
                                  className="bg-input rad15 w-full"
                                  type={showPassword ? "text" : "password"}
                                  value={password}
                                  onChange={(e) => setpassword(e.target.value)}
                                  InputProps={{
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
                          <div className="sm:col-span-3 -mt-2">
                              <div className="mt-0">
                                <TextField
                                  label="Ulang Password"
                                  className="bg-input rad15 w-full"
                                  type={"password"}   // bisa toggle show/hide
                                  value={confpassword}
                                  onChange={(e) => setconfpassword(e.target.value)}
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
                                          </>
                                        )}
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={(theme) => textFieldStyle(theme)}
                                />

                                  {validasi_repassword && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Ulang Password Tidak Sesuai.</p>}
                              </div>
                          </div>
                          
                          <div className="sm:col-span-2 -mt-2">
                            <div className="mt-0">
                                
                                <Autocomplete
                                  className='tsize-110'
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
                                    label="Satker"
                                    variant="outlined"
                                    sx={(theme) => textFieldStyle(theme)}
                                    />
                                  )}
                                  sx={{
                                      width: "100%",
                                      "& .MuiAutocomplete-popupIndicator": { color: "#1976d2", transition: "transform 0.3s" },
                                      "& .MuiAutocomplete-popupIndicatorOpen": { transform: "rotate(180deg)" }
                                  }}
                                />
                                 {validasi_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                                
                            </div>
                          </div>
                          <div className="col-span-2 -mt-2">
                            <div className=" grid grid-cols-1">
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={[
                                    { label: "Operator", value: "Operator" },
                                    { label: "Eksekutif", value: "Eksekutif" }
                                  ]}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={jabatan}
                                  onChange={(event, newValue) => setjabatan(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Jabatan"
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
                                {validasi_jabatan && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-2 -mt-2">
                              <div className="mt-0">
                                <Autocomplete
                                  className="tsize-110"
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-location"
                                  options={[
                                    { label: "User", value: "User" },
                                    { label: "Admin", value: "Admin" },
                                    { label: "Super Admin", value: "Super Admin" }
                                  ]}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={role}
                                  onChange={(event, newValue) => setrole(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Role"
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
                                {validasi_role && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}  
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
                <button 
                    type="button"
                    onClick={handleClose}
                    className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
                    <MdOutlineExitToApp  className='mt-1 mx-1'  /><span>Batal</span>
                </button>
               
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalTambahUser;