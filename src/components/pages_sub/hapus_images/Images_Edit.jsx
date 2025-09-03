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



function ImagesPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [kategori, setkategori] = useState("");
  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
  const [file1, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [images1, setimages1] = useState("");
  const [images2, setimages2] = useState("");
  const [images3, setimages3] = useState("");


  const loadImage1 = (e) =>{
    const image = e.target.files[0];
    setfile1(image);
  }
  const loadImage2 = (e) =>{
    const image = e.target.files[0];
    setfile2(image);
  }
  const loadImage3 = (e) =>{
    const image = e.target.files[0];
    setfile3(image);
  }
  
  const navigate = useNavigate();
  const { id } = useParams();


   
  useEffect(() => {
    getDataById()
    

  }, [id]);

 

  const getDataById = async () => {
    const response = await axios.get(apiurl+`api/open-item/images_detail/${id}`);
    setid(response.data.id);
    setkategori(response.data.kategori);
    settitle(response.data.title);
    setcontents(response.data.contents);
    setimages1(response.data.presignedUrl1);
    setimages2(response.data.presignedUrl2);
    setimages3(response.data.presignedUrl3);
    
  };


  const updateImages = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file1",file1);
    formData.append("file2",file2);
    formData.append("file3",file3);
    formData.append("kategori",kategori);
    formData.append("title",title);
    formData.append("contents",contents);
    
    try {
      await axios.patch(`${apiurl}api/open-item/images_update/${idku}`, formData, {
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
             navigate(`/Data-Images`);
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
      <NavSub  title="Images Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Images" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Images
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateImages}>
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
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Kategori
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Masukkan Judul"
                                value={kategori}
                                type="text"
                                autoComplete="title"
                                className="input-gray tsize-110"
                                disabled
                                />
                                 
                            </div>
                            
                          </div>
                          <div className="sm:col-span-6 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Judul Images
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
                          <div className="sm:col-span-6 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />Isi Konten
                            </label>
                            <div className="mt-0">
                                
                                <textarea 
                                  placeholder="Masukkan Konten"
                                  value={contents}
                                  onChange={(e) => setcontents(e.target.value)}
                                  autoComplete="contents"
                                  rows="5" 
                                  className="input-gray-2 tsize-110" 
                                  >

                                </textarea>
                                  {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                            </div>
                          </div>
                          
                          
                          <div className="sm:col-span-5 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdFileUpload  className="mt-1 mx-2 text-cyan-500"  />UPDATE GAMBAR
                            </label>
                            <div className="mt-0">
                                <input
                                onChange={loadImage1}
                                type="file"
                                className="input-gray tsize-100"
                                />
                              
                               
                            </div>
                          </div>
                          <div className="sm:col-span-1 -mt-4">
                             <img
                                  src={images1}
                                  alt="gambar"
                                  style={{ maxwidth: "80%", objectFit: "contain" }}
                                  className="rounded border p-1"
                                />
                          </div>
                          <div className="sm:col-span-5 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdFileUpload  className="mt-1 mx-2 text-cyan-500"  />UPDATE GAMBAR 2
                            </label>
                            <div className="mt-0">
                                <input
                                onChange={loadImage2}
                                type="file"
                                className="input-gray tsize-100"
                                />
                              
                               
                            </div>
                          </div>
                          <div className="sm:col-span-1 -mt-4">
                             <img
                                  src={images2}
                                  alt="gambar2"
                                  style={{ maxwidth: "80%", objectFit: "contain" }}
                                  className="rounded border p-1"
                                />
                          </div>
                          <div className="sm:col-span-5 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdFileUpload  className="mt-1 mx-2 text-cyan-500"  />UPDATE GAMBAR 3
                            </label>
                            <div className="mt-0">
                                <input
                                onChange={loadImage3}
                                type="file"
                                className="input-gray tsize-100"
                                />
                              
                               
                            </div>
                          </div>
                          <div className="sm:col-span-1 -mt-4">
                             <img
                                  src={images3}
                                  alt="gambar3"
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

export default ImagesPengelolah;
