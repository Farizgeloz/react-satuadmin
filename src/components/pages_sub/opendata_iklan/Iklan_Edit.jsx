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
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";



import _ from "lodash";

const apiurl=process.env.REACT_APP_URL;



function IklanPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [title, settitle] = useState("");
  const [linked, setlink] = useState("");
  const [status, setstatus] = useState("");
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
    const response = await axios.get(apiurl+`api/open-item/opendata-iklan/detail/${id}`);
    setid(response.data.id);
    settitle(response.data.title);
    setimages(response.data.presignedUrl);
    setlink(response.data.linked);
    setstatus(response.data.status);
    
  };


  const updateIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file);
    formData.append("title",title);
    formData.append("linked",linked);
    formData.append("status",status);
    
    
    try {
      await axios.patch(`${apiurl}api/open-item/opendata-iklan/update/${idku}`, formData, {
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
              navigate(`/Opendata-Iklan`);
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
  const [validasi_status, setvalidasi_status] = useState(false);

  const handle_step1 = () => {
    setvalidasi_title(!title || title.length < 3);
    setvalidasi_status(!status || status.length < 3);

    if (title?.length >= 3 && status?.length >= 3) {
      nextStep();
    }
  };
  

  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Open Data Iklan Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Opendata/Iklan" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Opendata Iklan
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
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
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Judul Iklan
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Masukkan Judul"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                type="text"
                                autoComplete="title"
                                className="input-gray tsize-110"
                                />
                                  {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                            
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Link Url
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Masukkan Link"
                                value={linked}
                                onChange={(e) => setlink(e.target.value)}
                                type="text"
                                autoComplete="linked"
                                className="input-gray tsize-110"
                                />
                            </div>
                            
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdPermDeviceInformation className="mt-1 mx-2 text-cyan-500"  />Status
                            </label>
                            <div className="mt-0">
                              <select
                                value={status}
                                onChange={(e) => setstatus(e.target.value)}
                                autoComplete="wilayah"
                                className="input-gray tsize-110"
                                >
                                <option value="">Pilih Status</option>
                                <option value="Private">Private</option>
                                <option value="Publik">Publik</option>
                              </select>
                              {validasi_status && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Dipilih...</p>}
                            </div>
                          </div>
                          
                          <div className="sm:col-span-5 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdFileUpload  className="mt-1 mx-2 text-cyan-500"  />UNGGAH GAMBAR
                            </label>
                            <div className="mt-0">
                                <input
                                onChange={loadImage}
                                type="file"
                                className="input-gray tsize-110"
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

export default IklanPengelolah;
