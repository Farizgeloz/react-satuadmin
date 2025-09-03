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



function SatkercodePengelolah() {
  const [satkerku, setsatkerku] = useState([""]);
  const [bidangku, setbidangku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [idku, setid] = useState("");

 
  const [nama_satker, setnama_satker] = useState("");
  const [kode_satker, setkode_satker] = useState("");
  const [no_satker, setno_satker] = useState("");
  const [logo_satker, setlogo_satker] = useState("");

  const [file1, setfile1] = useState("");
  const [fileError, setFileError] = useState("");


  const loadImage1 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/png'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (PNG).");
      setfile1(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile1(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile1(file);
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


  const getDataById = async () => {
    const response = await axios.get(apiurl+`api/open-item/satker_code_detail/${id}`);
    setid(response.data.id_satker);
    setnama_satker(response.data.nama_satker);
    setkode_satker(response.data.kode_satker);
    setno_satker(response.data.no_satker);
    setlogo_satker(response.data.presignedUrl);
    
  };


  const updateSatkercode = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file1",file1);
    formData.append("nama_satker",nama_satker);
    formData.append("kode_satker",kode_satker);
    formData.append("no_satker",no_satker);
    try {
      await axios.patch(`${apiurl}api/open-item/satker_code_update/${idku}`, formData, {
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
              //navigate(`/Data-Satkercode/Detail/${id}`);
              navigate(`/Data-Satkercode`);
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

  const [validasi_nama_satker, setvalidasi_nama_satker] = useState(false);
  const [validasi_kode_satker, setvalidasi_kode_satker] = useState(false);
  const [validasi_no_satker, setvalidasi_no_satker] = useState(false);

  const handle_step1 = (event) => {
    if (nama_satker.length<5) {setvalidasi_nama_satker(true);}else{setvalidasi_nama_satker(false);}
    if (kode_satker.length<1) {setvalidasi_kode_satker(true);}else{setvalidasi_kode_satker(false);}
    if (!Number.isInteger(no_satker) || no_satker < 0) {setvalidasi_no_satker(true);}else{setvalidasi_no_satker(false);}

    if (
      nama_satker?.length >= 5 &&
      kode_satker?.length >= 1 &&
      (Number.isInteger(no_satker) || no_satker >= 0)
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi');
    }
  };

  


  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Satker Code Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Satkercode" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Satker Code
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
              
              <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{nama_satker}</p>
            </Col>
            
            
            
          </Row>
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1 rad15'>
          <form onSubmit={updateSatkercode}>
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
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />Nama Satker
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Masukkan Nama Satker"
                                    value={nama_satker}
                                    onChange={(e) => setnama_satker(e.target.value)}
                                    autoComplete="nama_satker"
                                    rows="2" 
                                    className="input-green-2 tsize-110" 
                                    >
                                  </textarea>
                                    {validasi_nama_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />Kode Satker
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Masukkan Kode Satker"
                                    value={kode_satker}
                                    onChange={(e) => setkode_satker(e.target.value)}
                                    autoComplete="kode_satker"
                                    rows="2" 
                                    className="input-green-2 tsize-110" 
                                    >
                                  </textarea>
                                    {validasi_kode_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 karakter...</p>}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineToday className="mt-1 mx-2 text-cyan-500"  />No Satker
                              </label>
                              <div className="mt-0">
                                  <input
                                    placeholder="Masukkan No Satker"
                                    value={no_satker}
                                    onChange={(e) => setno_satker(e.target.value)}
                                    type="number"
                                    autoComplete="no_satker"
                                    className="input-green-2 tsize-110"
                                  />
                                  {validasi_no_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Tidak Boleh Dibawah 0...</p>}
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
                            
                            <div className="col-span-6 -mt-2 w-100">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH LOGO SATKER
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage1}
                                  type="file"
                                  accept="image/png" // hanya file gambar
                                  className="input-green-2 tsize-110 w-100"
                                  />
                                  <p className="file-label">Pilih Hanya File .png</p>
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
                                nextStep();
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

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default SatkercodePengelolah;
