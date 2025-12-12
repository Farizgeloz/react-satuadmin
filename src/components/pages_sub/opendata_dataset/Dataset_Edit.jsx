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
        MdOutlineSave} from "react-icons/md";



import useFetch from './useFeach';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { readString } from 'react-papaparse';
import _ from "lodash";
import { api_url_satuadmin } from '../../../api/axiosConfig';

const apiurl = import.meta.env.VITE_API_URL;

const textFieldStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: 50,
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

function DatasetPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [kode, setkode] = useState("");
  const [wilayah, setwilayah] = useState("");
  const [kategori, setkategori] = useState("");
  const [kategorinama, setkategorinama] = useState("");
  const [nama_dataset, setnama_dataset] = useState("");
  const [satker, setsatker] = useState("");
  const [satkernama, setsatkernama] = useState("");
  
  
  const [sifat_data, setsifat_data] = useState("");
  const [kategori_data, setkategori_data] = useState("");
  const [kegiatan_statistik, setkegiatan_statistik] = useState("");
  const [klasifikasi, setklasifikasi] = useState("");
  const [konsep, setkonsep] = useState("");
  const [definisi, setdefinisi] = useState("");
  const [satuan, setsatuan] = useState("");
  const [ukuran, setukuran] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [tag, settag] = useState("");
  const [visibilitas, setvisibilitas] = useState("");
  //const [createdAt, setcreatedAt] = useState("");
  //const [createdAt, setcreatedAt] = useState("");
  const [updatedAt, setupdatedAt] = useState("");
  const [file, setfile] = useState("");


  const loadImage = (e) =>{
    const image = e.target.files[0];
    setfile(image);
  }
  
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [datacoba, setDataCoba] = useState([]);
  const { fetchCsvData } = useFetch();

  const [groupedData, setGroupedData] = useState({});
  const [groupCounts, setGroupCounts] = useState({});

   
  useEffect(() => {
    getDataById();

    getDatasetItem();
    

    

  }, [id]);

  const satkerr = [{ label: satkernama, value: satker }];
  const kategorir = [{ label: kategorinama, value: kategori }];


  

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get('api/opendata/dataset_item');

    const data = response.data;
    setProdukDataku(response.data.resultSatker);
    setkategoriku(response.data.resultBidangUrusan);
  };
  

  const getDataById = async () => {
    const response = await api_url_satuadmin.get(`api/opendata/dataset_data_detail/${id}`);
    setid(response.data.id);
    setkode(response.data.kode);
    setwilayah(response.data.wilayah);
    setkategori(response.data.kategori);
    setkategorinama(response.data.nama_sektor);
    setsatker(response.data.id_opd);
    setsatkernama(response.data.nama_opd);
    setnama_dataset(response.data.nama_dataset);
    setsifat_data(response.data.sifat_data);
    setkategori_data(response.data.kategori_data);
    //setcreatedAt(formatUTCDateToLocal(response.data.createdAt));
   
    
    setupdatedAt(response.data.updatedAt);
    setkegiatan_statistik(response.data.kegiatan_statistik);
    setklasifikasi(response.data.klasifikasi);
    setkonsep(response.data.konsep);
    setdefinisi(response.data.definisi);
    setukuran(response.data.ukuran);
    setsatuan(response.data.satuan);
    setketerangan(response.data.keterangan);
    settag(response.data.tag);
    setvisibilitas(response.data.visibilitas);
  };


  const updateDataset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file);
    formData.append("nama_dataset",nama_dataset);
    formData.append("sifat_data",sifat_data);
    formData.append("kategori_data",kategori_data);
    formData.append("kegiatan_statistik",kegiatan_statistik);
    formData.append("klasifikasi",klasifikasi);
    formData.append("konsep",konsep);
    formData.append("definisi",definisi);
    formData.append("satuan",satuan);
    formData.append("ukuran",ukuran);
    formData.append("keterangan",keterangan);
    formData.append("tag",tag);
    try {
      await axios.patch(`api/opendata/dataset_data_update/${idku}`, formData, {
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
              navigate(`/Opendata/Dataset/Detail/${id}`);
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

  const [validasi_kode, setvalidasi_kode] = useState(false);
  const [validasi_wilayah, setvalidasi_wilayah] = useState(false);
  const [validasi_satker, setvalidasi_satker] = useState(false);
  const [validasi_kategori, setvalidasi_kategori] = useState(false);
  const [validasi_sifatdata, setvalidasi_sifatdata] = useState(false);
  const [validasi_kategori_data, setvalidasi_kategori_data] = useState(false);

  

  const handle_step1 = (event) => {
    if (kode.length<3) {setvalidasi_kode(true);}else{setvalidasi_kode(false);}
    if (wilayah.length<3) {setvalidasi_wilayah(true);}else{setvalidasi_wilayah(false);}
    if (kategorinama==="" || kategorinama===null ) {setvalidasi_kategori(true);}else{setvalidasi_kategori(false);}
    if (satkernama==="" || satkernama===null) {setvalidasi_satker(true);}else{setvalidasi_satker(false);}
    if (sifat_data.length<3) {setvalidasi_sifatdata(true);}else{setvalidasi_sifatdata(false);}
    if (kategori_data.length<3) {setvalidasi_kategori_data(true);}else{setvalidasi_kategori_data(false);}

    if(kode.length>=3 && wilayah.length>=3 && ((kategorinama!=="")||(kategorinama!==null)) && ((satkernama!=="")||(satkernama!==null)) && sifat_data.length>=3 && kategori_data.length>=3){
      nextStep();
    }
  };

  const [validasi_nama_dataset, setvalidasi_nama_dataset] = useState(false);
  const [validasi_kegiatanstatistik, setvalidasi_kegiatanstatistik] = useState(false);
  const [validasi_konsep, setvalidasi_konsep] = useState(false);
  const [validasi_klasifikasi, setvalidasi_klasifikasi] = useState(false);
  const [validasi_definisi, setvalidasi_definisi] = useState(false);

  const handle_step2 = (event) => {
    if (nama_dataset.length==="") {setvalidasi_nama_dataset(true);}else{setvalidasi_nama_dataset(false);}
    if (kegiatan_statistik.length==="") {setvalidasi_kegiatanstatistik(true);}else{setvalidasi_kegiatanstatistik(false);}
    if (konsep.length==="") {setvalidasi_konsep(true);}else{setvalidasi_konsep(false);}
    if (klasifikasi.length==="") {setvalidasi_klasifikasi(true);}else{setvalidasi_klasifikasi(false);}
    if (definisi.length==="") {setvalidasi_definisi(true);}else{setvalidasi_definisi(false);}

    if(nama_dataset.length>=3 && kegiatan_statistik.length!=="" && konsep.length!=="" && klasifikasi.length!=="" && definisi.length!==""){
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
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Opendata/Dataset" className="text-silver-a mx-2 d-flex">
            <MdDataset className="mt-1 textsize10" />Dataset
          </NavLink> /
          <NavLink  className="text-silver-a mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize10" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
          <Row className='p-1 mx-2'>
            
            <Col md={12} sm={12} className=' bg-linear-9 align-middle justify-content-center align-self-center mt-1 rad15'>
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{nama_dataset}</p>
              <p className='text-white textsize9 text-center font_weight600 bg-red max-width-180 rad15'>{kode}</p>
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
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                1
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                2
                              </p>
                            </div>
                          </div>
                          
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                3
                              </p>
                            </div>
                          </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                4
                              </p>
                            </div>
                          </div>
                            
                        </div>
                        <div className="-mt-5 w-full h-2 bg-cyan-200">
                            <div className="h-full bg-cyan-600 rounded-3xl  w-1/4"></div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlineQrCode className="mt-1 mx-2 text-cyan-500"  /> KODE DATASET
                              </label>
                              <div className="mt-0 transisiku">
                                  <input
                                  placeholder="Masukkan Kode Dataset"
                                  value={kode}
                                  onChange={(e) => setkode(e.target.value)}
                                  type="text"
                                  autoComplete="kode"
                                  className="input-gray tsize-110"
                                  disabled
                                  />
                                    {validasi_kode && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />WILAYAH
                              </label>
                              <div className="mt-0">
                                  
                                  <select
                                    value={wilayah}
                                    onChange={(e) => setwilayah(e.target.value)}
                                    autoComplete="wilayah"
                                    className="input-gray tsize-110"
                                    disabled
                                    >
                                    <option value="">Pilih Wilayah</option>
                                    <option value="Kabupaten">Kabupaten</option>
                                    <option value="Kecamatan">Kecamatan</option>
                                    <option value="Desa">Desa</option>
                                  </select>
                                  {validasi_wilayah && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Wilayah Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />KATEGORI
                              </label>
                              <div className="mt-0">
                                  
                                  <Autocomplete className='tsize-110'
                                    disablePortal
                                    disabled={true} // ✅ Ini menonaktifkan input
                                    isOptionEqualToValue={(option, value) => option?.label === value?.label}
                                    id="combo-box-demo"
                                    options={kategoriku.map((row) => ({
                                      label: row.nama_sektor,  // Ganti sesuai properti nama di datamu
                                      value: row.nama_sektor
                                    }))}
                                   
                                    defaultValue=""
                                    value={kategorinama}
                                    onChange={(event, value) => {
                                        setkategorinama(value);
                                        //getBidangUrusan();
                                      }
                                    }
                                    clearOnEscape
                                    disableClearable={true} // Penting: agar tombol clear aktif
                                    renderInput={(params) => 
                                      <TextField {...params}  
                                      style={{
                                          borderRadius:10,
                                          color: "white",
                                          border: '2px solid gray',
                                      }}
                                      className='tsize-110'
                                      placeholder="Pilih Kategori" />
                                    }
                                    
                                  />
                                  {validasi_kategori && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Kategori Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />ORGANISASI / PRODUSEN DATA
                              </label>
                              <div className="mt-0">
                                  
                                  <Autocomplete className='tsize-110'
                                    disablePortal
                                    disabled={true} // ✅ Ini menonaktifkan input
                                    isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                    id="combo-box-demo"
                                    options={satkerku.map((row) => ({
                                      label: row.nama_opd,  // Ganti sesuai properti nama di datamu
                                      value: row.nama_opd
                                    }))}
                                    defaultValue=""
                                    value={satkernama}
                                    onChange={(event, value) => {
                                        setsatkernama(value);
                                        
                                        
                                        //getBidangUrusan();
                                      }
                                    }
                                    clearOnEscape
                                    disableClearable={true} // Penting: agar tombol clear aktif
                                    renderInput={(params) => 
                                      <TextField {...params}  
                                      style={{
                                          borderRadius:10,
                                          color: "white",
                                          border: '2px solid gray',
                                      }}
                                      className='tsize-110'
                                      placeholder="Pilih Produk Data" />
                                    }
                                  />
                                  
                                  {validasi_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Organisasi Harus Dipilih.</p>}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdDisabledVisible className="mt-1 mx-2 text-cyan-500"  />SIFAT DATA
                              </label>
                              <div className="mt-0">
                                <select
                                  value={sifat_data}
                                  onChange={(e) => setsifat_data(e.target.value)}
                                  autoComplete="sifat_data"
                                  className="input-gray tsize-110"
                                  >
                                  <option value="">Pilih Sifat Data</option>
                                  <option value="Data Prioritas">Data Prioritas</option>
                                  <option value="Data Non Prioritas">Data Non Prioritas</option>
                                  <option value="SPM">SPM</option>
                                </select>
                                {validasi_sifatdata && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Sifat Data Harus Dipilih.</p>}  
                              </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdPermDeviceInformation className="mt-1 mx-2 text-cyan-500"  />FREKUENSI
                              </label>
                              <div className="mt-0">
                                <select
                                  value={kategori_data}
                                  onChange={(e) => setkategori_data(e.target.value)}
                                  autoComplete="wilayah"
                                  className="input-gray tsize-110"
                                  >
                                  <option value="">Pilih Kategori Data</option>
                                  <option value="agregat">agregat</option>
                                  <option value="individual">individual</option>
                                </select>
                                {validasi_kategori_data && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Kategori Data Harus Dipilih.</p>}
                                  
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
                        <div className="mt-3 flex">
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                1
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-white py-1">
                                2
                              </p>
                            </div>
                          </div>
                          
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                3
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                            <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                              <p className=" text-center text-gray-500 py-1">
                                4
                              </p>
                            </div>
                          </div>
                            
                        </div>
                        <div className="-mt-5 w-full h-2 bg-cyan-200">
                            <div className="h-full bg-cyan-600 rounded-3xl w-1/2"></div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />Nama Dataset
                            </label>
                            <div className="mt-0">
                                <textarea 
                                  placeholder="Masukkan Nama Dataset"
                                  value={nama_dataset}
                                  onChange={(e) => setnama_dataset(e.target.value)}
                                  autoComplete="nama_dataset"
                                  rows="3" 
                                  className="input-gray-2 tsize-110" 
                                  >
                                </textarea>
                                  {validasi_nama_dataset && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter...</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />KEGIATAN STATISTIK
                            </label>
                            <div className="mt-0">
                                  <textarea 
                                  placeholder="Masukkan Kegiatan Statistik"
                                  value={kegiatan_statistik}
                                  onChange={(e) => setkegiatan_statistik(e.target.value)}
                                  autoComplete="kegiatan_statistik"
                                  rows="3" 
                                  className="input-gray-2 tsize-110" 
                                  >

                                </textarea>
                                  {validasi_kegiatanstatistik && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-5">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />KONSEP
                            </label>
                            <div className="mt-0">
                                <textarea 
                                  placeholder="Masukkan Konsep"
                                  value={konsep}
                                  onChange={(e) => setkonsep(e.target.value)}
                                  autoComplete="konsep"
                                  rows="3" 
                                  className="input-gray-2 tsize-110" 
                                ></textarea>
                                  {validasi_konsep && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-5">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />KLASIFIKASI
                            </label>
                            <div className="mt-0">
                                <textarea 
                                  placeholder="Masukkan Klasifikasi"
                                  value={klasifikasi}
                                  onChange={(e) => setklasifikasi(e.target.value)}
                                  autoComplete="klasifikasi"
                                  rows="3" 
                                  className="input-gray-2 tsize-110" 
                                  >

                                </textarea>
                                  {validasi_klasifikasi && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                          </div>
                          
                          <div className="sm:col-span-6 -mt-5">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />DEFINISI
                            </label>
                            <div className="mt-0">
                                <textarea 
                                  placeholder="Masukkan Definisi"
                                  value={definisi}
                                  onChange={(e) => setdefinisi(e.target.value)}
                                  autoComplete="definisi"
                                  rows="3" 
                                  className="input-gray-2 tsize-110" 
                                  >

                                </textarea>
                                  {validasi_definisi && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                          </div>
                          
                        </div>
                        <div className="flex justify-center mt-12">

                          <button 
                              onClick={prevStep} className="bg-gray-500 hover:bg-gray-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded-xl d-flex mx-1">
                              <MdOutlineArrowCircleLeft   className='mt-1 mx-1'  /><span>Kembali</span>
                          </button>
                          
                          <button 
                            type="button" 
                            onClick={() => {
                              handle_step2();
                            }} 
                            className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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
                          className="md:w-full mx-auto">
                          <div className="mt-3 flex">
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  1
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  2
                                </p>
                              </div>
                            </div>
                            
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  3
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-gray-500 py-1">
                                  4
                                </p>
                              </div>
                            </div>
                            
                          </div>
                          <div className="-mt-5 w-full h-2 bg-cyan-200">
                              <div className="h-full bg-cyan-600 rounded-3xl w-3/4"></div>
                          </div>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />UKURAN
                              </label>
                              <div className="mt-0">
                                  <input
                                  placeholder="Ukuran"
                                  value={ukuran}
                                  onChange={(e) => setukuran(e.target.value)}
                                  type="text"
                                  autoComplete="ukuran"
                                  className="input-gray tsize-110"
                                  />
                              </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />SATUAN
                              </label>
                              <div className="mt-0">
                                  <input
                                  placeholder="Satuan"
                                  value={satuan}
                                  onChange={(e) => setsatuan(e.target.value)}
                                  type="text"
                                  autoComplete="satuan"
                                  className="input-gray tsize-110"
                                  />
                              </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineTag className="mt-1 mx-2 text-cyan-500"  />TAG
                              </label>
                              <div className="mt-0">
                                  <input
                                  placeholder="Tag"
                                  value={tag}
                                  onChange={(e) => settag(e.target.value)}
                                  type="text"
                                  autoComplete="tag"
                                  className="input-gray tsize-110"
                                  />
                              </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdDescription className="mt-1 mx-2 text-cyan-500"  />KETERANGAN
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Keterangan"
                                    value={keterangan}
                                    onChange={(e) => setketerangan(e.target.value)}
                                    autoComplete="keterangan"
                                    rows="3" 
                                    className="input-gray-2 tsize-110" 
                                    >

                                  </textarea>
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH DATA
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage}
                                  type="file"
                                  className="input-gray tsize-110"
                                  />
                                  <span className="file-label">Pilih File CSV</span>
                              </div>
                            </div>
                            
                            
                        </div>
                          <div className="flex justify-center mt-12">

                            <button 
                                onClick={prevStep} className="bg-gray-500 hover:bg-gray-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded-xl d-flex mx-1">
                                <MdOutlineArrowCircleLeft   className='mt-1 mx-1'  /><span>Kembali</span>
                            </button>
                            
                            <button 
                                onClick={nextStep} className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                                <span>Lanjut</span><MdOutlineArrowCircleRight  className='mt-1 mx-1'  />
                            </button>
                          </div>
                      </motion.div>
                  )}
                  {step === 4 && (
                      <motion.div
                          key={step} // Add this line
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="md:w-3/5 mx-auto py-12">
                          <div className="mt-3 flex">
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  1
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  2
                                </p>
                              </div>
                            </div>
                            
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  3
                                </p>
                              </div>
                            </div>
                            <div className="col-span-2 -mt-2 py-1 justify-end w-1/4">
                              <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                <p className=" text-center text-white py-1">
                                  4
                                </p>
                              </div>
                            </div>
                            
                          </div>
                          <div className="-mt-5 w-full h-2 bg-cyan-200">
                              <div className="h-full bg-cyan-600 rounded-3xl w-full"></div>
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

export default DatasetPengelolah;
