import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"

import Select from 'react-select';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import {Row,Col,Image} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { motion, } from 'framer-motion';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineMap,
        MdOutlinePerson4,
        MdOutlineShortText,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdFileUpload,
        MdOutlineToday,
        MdOutlineSave} from "react-icons/md";



import useFetch from './useFeach';

import _ from "lodash";

const apiurl=process.env.REACT_APP_URL;



function Location_MaplistPengelolah() {
  const [satkerku, setsatkerku] = useState([""]);
  const [bidangku, setbidangku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [idku, setid] = useState("");

  const [koleksi_data, setkoleksi_data] = useState("");
  const [title, settitle] = useState("");
  const [satker_id, setsatker_id] = useState("");
  const [nama_satker, setnama_satker] = useState("");
  const [bidang_urusan_id, setbidang_urusan_id] = useState("");
  const [nama_bidang_urusan, setnama_bidang_urusan] = useState("");
  const [location_id, setlocation_id] = useState("");
  const [tahun, settahun] = useState("");
  const [images, setimages] = useState("");
  const [status, setstatus] = useState("");

  const [file, setfile] = useState("");
  const [fileError, setFileError] = useState("");


  const loadImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile(file);
  };
  
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [datacoba, setDataCoba] = useState([]);
  const { fetchCsvData } = useFetch();

  const [groupedData, setGroupedData] = useState({});
  const [groupCounts, setGroupCounts] = useState({});

   
  useEffect(() => {
    getDataById();

    getLocation_MaplistItem();
    

    

  }, [id]);



  const koleksidataOptions = [
    { label: 'Peta Interaktif', value: 'Peta Interaktif' },
    { label: 'Peta Layout', value: 'Peta Layout' }
  ];

  const satkerOptions = satkerku.map((row) => ({
    label: row.nama_satker,
    value: row.id_satker
  }));

  const bidangOptions = bidangku.map((row) => ({
    label: row.nama_bidang_urusan,
    value: row.id_bidang_urusan
  }));

  const locationOptions = locationku.map((row) => ({
    label: row.nama_location,
    value: row.id_location
  }));

  const statusOptions = [
    { label: 'Publik', value: 'Publik' },
    { label: 'Eksekutif', value: 'Eksekutif' }
  ];


  

  const getLocation_MaplistItem = async () => {
    const response = await axios.get(apiurl + 'satupeta/map_item');

    const data = response.data;
    setsatkerku(response.data.resultsatker);
    setbidangku(response.data.resultbidangurusan);
    setlocationku(response.data.resultlocation);
  };
  

  const getDataById = async () => {
    const response = await axios.get(apiurl+`satupeta/locationmaplist_detail/${id}`);
    setid(response.data.id);
    setkoleksi_data(response.data.koleksi_data);
    settitle(response.data.title);
    setsatker_id(response.data.satker_id);
    setnama_satker(response.data.nama_satker);
    setbidang_urusan_id(response.data.bidang_urusan_id);
    setnama_bidang_urusan(response.data.nama_bidang_urusan);
    setlocation_id(response.data.location_id);
    settahun(response.data.tahun_rilis);
    setimages(response.data.presignedUrl);
    setstatus(response.data.status);
    
  };


  const updateLocation_Maplist = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file);
    formData.append("koleksi_data",koleksi_data);
    formData.append("title",title);
    formData.append("satker_id",satker_id);
    formData.append("bidang_urusan_id",bidang_urusan_id);
    formData.append("location_id",location_id);
    formData.append("tahun_rilis",tahun);
    formData.append("status",status);
    try {
      await axios.patch(`${apiurl}satupeta/locationmaplist_update/${idku}`, formData, {
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
              //navigate(`/Data-Location_Maplist/Detail/${id}`);
              navigate(`/Data-Location_Maplist`);
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

  const [validasi_koleksi_data, setvalidasi_koleksi_data] = useState(false);
  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_satker_id, setvalidasi_satker_id] = useState(false);
  const [validasi_bidang_urusan_id, setvalidasi_bidang_urusan_id] = useState(false);
  const [validasi_location_id, setvalidasi_location_id] = useState(false);
  const [validasi_tahun, setvalidasi_tahun] = useState(false);
  const [validasi_status, setvalidasi_status] = useState(false);

  const handle_step1 = (event) => {
    if (koleksi_data.length<1) {setvalidasi_koleksi_data(true);}else{setvalidasi_koleksi_data(false);}
    if (title.length<3) {setvalidasi_title(true);}else{setvalidasi_title(false);}
    if (satker_id==="" || satker_id===null ) {setvalidasi_satker_id(true);}else{setvalidasi_satker_id(false);}
    if (bidang_urusan_id==="" || bidang_urusan_id===null) {setvalidasi_bidang_urusan_id(true);}else{setvalidasi_bidang_urusan_id(false);}
    if (location_id.length<1) {setvalidasi_location_id(true);}else{setvalidasi_location_id(false);}
    if (tahun.length !== 4) {setvalidasi_tahun(true);}else{setvalidasi_tahun(false);}
    if (status.length<1) {setvalidasi_status(true);}else{setvalidasi_status(false);}

    if (
      koleksi_data?.length >= 1 &&
      title?.length >= 3 &&
      satker_id?.toString().trim() !== "" &&
      bidang_urusan_id !== null &&
      tahun?.toString().length === 4 &&
      status?.length >= 1
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi');
    }
  };


  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Location Maplist Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Location_Maplist" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Location Maplist
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
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{title}</p>
              <p className='text-white textsize9 text-center font_weight600 bg-red max-width-180 rad15'>{koleksi_data}</p>
            </Col>
            
            
            
          </Row>
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1 rad15'>
          <form onSubmit={updateLocation_Maplist}>
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
                            
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Koleksi Data
                              </label>
                              <div className="mt-0">
                                  <Select
                                    className="basic-single tsize-110"
                                    classNamePrefix="select"
                                    value={koleksidataOptions.find((opt) => opt.value === koleksi_data) || null}
                                    isSearchable={true}
                                    name="koleksi_data"
                                    options={koleksidataOptions}
                                    onChange={(selectedOption) => {
                                      setkoleksi_data(selectedOption ? selectedOption.value : '');
                                    }}
                                    styles={{
                                      control: (base,state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? '#dff2fe' :'#ecfcca', // 🎨 ganti warna background
                                        borderColor: state.isFocused ? '#00a6f4' : '#9ae600', // Biru saat fokus
                                        borderWidth: '2px',
                                        minHeight: '38px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                          borderColor: '#00a6f4'
                                        }
                                    
                                      }),
                                      menu: (base) => ({
                                        ...base,
                                        backgroundColor: '#fff', // dropdown background
                                        zIndex: 9999
                                      }),
                                      singleValue: (base) => ({
                                        ...base,
                                        color: '#333' // teks yang dipilih
                                      })
                                    }}
                                  /> 
                                  {validasi_koleksi_data && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Lokasi
                              </label>
                              <div className="mt-0">
                                <Select
                                  className="basic-single tsize-110"
                                  classNamePrefix="select"
                                  value={locationOptions.find((opt) => opt.value === location_id) || null}
                                  isSearchable={true}
                                  name="locations"
                                  options={locationOptions}
                                  onChange={(selectedOption) => {
                                    setlocation_id(selectedOption ? selectedOption.value : '');
                                  }}
                                  styles={{
                                    control: (base,state) => ({
                                      ...base,
                                      backgroundColor: state.isFocused ? '#dff2fe' :'#ecfcca', // 🎨 ganti warna background
                                      borderColor: state.isFocused ? '#00a6f4' : '#9ae600', // Biru saat fokus
                                      borderWidth: '2px',
                                      minHeight: '38px',
                                      boxShadow: 'none',
                                      '&:hover': {
                                        borderColor: '#00a6f4'
                                      }
                                  
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: '#fff', // dropdown background
                                      zIndex: 9999
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      color: '#333' // teks yang dipilih
                                    })
                                  }}
                                /> 
                                


                                {validasi_location_id && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />Judul
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Masukkan Judul"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    autoComplete="judul"
                                    rows="3" 
                                    className="input-green-2 tsize-110" 
                                    >
                                  </textarea>
                                    {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter...</p>}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Satker
                              </label>
                              <div className="mt-0">
                                <Select
                                  className="basic-single tsize-110"
                                  classNamePrefix="select"
                                  value={satkerOptions.find((opt) => opt.value === satker_id) || null}
                                  isSearchable={true}
                                  name="satker"
                                  options={satkerOptions}
                                  onChange={(selectedOption) => {
                                    setsatker_id(selectedOption ? selectedOption.value : '');
                                  }}
                                  styles={{
                                    control: (base,state) => ({
                                      ...base,
                                      backgroundColor: state.isFocused ? '#dff2fe' :'#ecfcca', // 🎨 ganti warna background
                                      borderColor: state.isFocused ? '#00a6f4' : '#9ae600', // Biru saat fokus
                                      borderWidth: '2px',
                                      minHeight: '38px',
                                      boxShadow: 'none',
                                      '&:hover': {
                                        borderColor: '#00a6f4'
                                      }
                                  
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: '#fff', // dropdown background
                                      zIndex: 9999
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      color: '#333' // teks yang dipilih
                                    })
                                  }}
                                /> 
                                


                                {validasi_satker_id && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Bidang Urusan
                              </label>
                              <div className="mt-0">
                                <Select
                                  className="basic-single tsize-110"
                                  classNamePrefix="select"
                                  value={bidangOptions.find((opt) => opt.value === bidang_urusan_id) || null}
                                  isSearchable={true}
                                  name="bidang_urusan"
                                  options={bidangOptions}
                                  onChange={(selectedOption) => {
                                    setbidang_urusan_id(selectedOption ? selectedOption.value : '');
                                  }}
                                  styles={{
                                    control: (base,state) => ({
                                      ...base,
                                      backgroundColor: state.isFocused ? '#dff2fe' :'#ecfcca', // 🎨 ganti warna background
                                      borderColor: state.isFocused ? '#00a6f4' : '#9ae600', // Biru saat fokus
                                      borderWidth: '2px',
                                      minHeight: '38px',
                                      boxShadow: 'none',
                                      '&:hover': {
                                        borderColor: '#00a6f4'
                                      }
                                  
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: '#fff', // dropdown background
                                      zIndex: 9999
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      color: '#333' // teks yang dipilih
                                    })
                                  }}
                                />   
                                

                                  
                                  {validasi_bidang_urusan_id && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineToday className="mt-1 mx-2 text-cyan-500"  />Tahun Rilis
                              </label>
                              <div className="mt-0">
                                  <input
                                    placeholder="Tahun Rilis"
                                    value={tahun}
                                    onChange={(e) => settahun(e.target.value)}
                                    type="text"
                                    pattern="\d*"
                                    maxLength={4}
                                    autoComplete="tahun"
                                    className="input-green-2 tsize-110"
                                  />
                                  {validasi_tahun && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Tahun harus 4 digit angka.</p>}
                              </div>

                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Status
                              </label>
                              <div className="mt-1">
                                  <Select
                                    className="basic-single tsize-110"
                                    classNamePrefix="select"
                                    value={statusOptions.find((opt) => opt.value === status) || null}
                                    isSearchable={true}
                                    name="status"
                                    options={statusOptions}
                                    onChange={(selectedOption) => {
                                      setstatus(selectedOption ? selectedOption.value : '');
                                    }}
                                    styles={{
                                      control: (base,state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? '#dff2fe' :'#ecfcca', // 🎨 ganti warna background
                                        borderColor: state.isFocused ? '#00a6f4' : '#9ae600', // Biru saat fokus
                                        borderWidth: '2px',
                                        minHeight: '38px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                          borderColor: '#00a6f4'
                                        }
                                    
                                      }),
                                      menu: (base) => ({
                                        ...base,
                                        backgroundColor: '#fff', // dropdown background
                                        zIndex: 9999
                                      }),
                                      singleValue: (base) => ({
                                        ...base,
                                        color: '#333' // teks yang dipilih
                                      })
                                    }}
                                  /> 
                                  
                                  {validasi_status && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
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
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH GAMBAR
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage}
                                  type="file"
                                  accept="image/*" // hanya file gambar
                                  className="input-green2 tsize-110"
                                  />
                                  <span className="file-label">Pilih File .jpg dan .png</span>
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
                                onClick={nextStep} className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default Location_MaplistPengelolah;
