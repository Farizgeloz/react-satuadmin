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
        MdOutlineArrowCircleLeft,
        MdOutlineSave} from "react-icons/md";


import _ from "lodash";

const apiurl=process.env.REACT_APP_URL;
const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const userloginsatker = userlogin.satker_id || '';
const userloginadmin = userlogin.id || '';

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

function DatasetPengelolah() {
  const [bidangurusanku, setbidangurusanku] = useState([""]);
  const [satkerku, setsatkerku] = useState([""]);
  const [nama_locations, setnama_locations] = useState("");
  const [satker, setsatker] = useState(null);
  const [bidangurusan, setbidangurusan] = useState(null);


  
  
  const navigate = useNavigate();
  const { id } = useParams();

   
  useEffect(() => {
    getDataById();

    getDatasetItem();
    

    

  }, []);

  
  const getDatasetItem = async () => {
    const response = await axios.get(apiurl + "api/satupeta/map_item2", {
      params: { search_satker:userloginsatker }
    });
    const data = response.data;
    setbidangurusanku(response.data.resultbidangurusan);
    setsatkerku(response.data.resultsatker);
  };

  
  

  const getDataById = async () => {
    try {
      const response = await axios.get(apiurl + `api/satupeta/locations/detail/${id}`);

      // Ambil data utama
      setnama_locations(response.data.nama_location);
      setsatker({ value: response.data.satker_id, label: response.data.nama_opd });
      setbidangurusan({ value: response.data.bidang_urusan_id, label: response.data.nama_bidang_urusan });

    } catch (err) {
      console.error("❌ Gagal ambil data detail:", err);
    }
  };



  const updateDataset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_location",nama_locations);
    formData.append("satker_id",satker.value);
    formData.append("bidang_urusan_id",bidangurusan.value);
    formData.append("admin",String(userloginadmin));
    try {
      await axios.patch(`${apiurl}api/satupeta/locations/update/${id}`, formData, {
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
              navigate(`/Satupeta/Locations`);
              //navigate(`/Data-Dataset`);
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

  const [validasi_nama_locations, setvalidasi_nama_locations] = useState(false);
  const [validasi_satker, setvalidasi_satker] = useState(false);
  const [validasi_bidangurusan, setvalidasi_bidangurusan] = useState(false);

 
  
  const handle_step = (event) => {
    const validNama = (nama_locations?.length || 0) >= 3;
    const validsatker = satker !== null;
    const validbidangurusan = bidangurusan !== null;
    

    setvalidasi_nama_locations(!validNama);
    setvalidasi_satker(!validsatker);
    setvalidasi_bidangurusan(!validbidangurusan);

    if (validNama && validsatker && validbidangurusan) {
      nextStep();
    }
  };


  
  
 
  function formatUTCDateToLocal(utcDateString) {
    const utcDate = new Date(utcDateString);

    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000);

    const formattedLocalDate = localDate.toLocaleString();

    return formattedLocalDate;
  }



  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Dataset Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satupeta/Locations" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Locations
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
          <Row className='p-1 mx-2'>
            
            <Col md={12} sm={12} className=' bg-linear-9 align-middle justify-content-center align-self-center mt-1 rad15'>
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{nama_locations}</p>
            </Col>
            
            
            
          </Row>
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateDataset}>
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
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
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
                                  label="Nama Lokasi"
                                  className="bg-input rad15 w-full"
                                  value={nama_locations}
                                  onChange={(e) => setnama_locations(e.target.value)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {nama_locations && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setnama_locations("")}
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
                                  {validasi_nama_locations && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-4 -mt-2">
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
                            <div className="sm:col-span-2 -mt-2">
                              <div className="mt-0">
                                <Autocomplete
                                  className='tsize-110'
                                  isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                  id="combo-box-bidangurusan"
                                  options={bidangurusanku.map((row) => ({
                                    label: row.nama_bidang_urusan,
                                    value: row.id_bidang_urusan
                                  }))}
                                  getOptionLabel={(option) => option.label || ""}
                                  value={bidangurusan}
                                  onChange={(event, newValue) => setbidangurusan(newValue)}
                                  clearOnEscape
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Bidang Urusan"
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
                                  {validasi_bidangurusan && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            
                            
                            
                        </div>
                        
                        <div className="flex justify-center mt-12">
                            
                              <button 
                                type="button"
                                onClick={() => {
                                  handle_step();
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
                          className="md:w-1/2 mx-auto py-12">
                          <div className="mt-3 flex">
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  1
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
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

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default DatasetPengelolah;
