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



function Satuportal_listPengelolah() {
  const [satkerku, setsatkerku] = useState([""]);
  const [bidangku, setbidangku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [idku, setid] = useState("");

 
  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
  const [images_a, setimage_a] = useState("");
  const [title_images_a, settitle_image_a] = useState("");
  const [images_b, setimage_b] = useState("");
  const [title_images_b, settitle_image_b] = useState("");
  const [images_c, setimage_c] = useState("");
  const [title_images_c, settitle_image_c] = useState("");
  const [linked, setlinked] = useState("");

  const [file_logo_a, setfile_logo_a] = useState("");
  const [file_logo_b, setfile_logo_b] = useState("");
  const [file_logo_c, setfile_logo_c] = useState("");
  const [file_images_a, setfile_images_a] = useState("");
  const [file_images_b, setfile_images_b] = useState("");
  const [file_images_c, setfile_images_c] = useState("");
  const [fileError, setFileError] = useState("");


  const loadImage_Logo_a = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_logo_a(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_logo_a(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_logo_a(file);
  };

  const loadImage_Logo_b = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_logo_b(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_logo_b(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_logo_b(file);
  };

  const loadImage_Logo_c = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_logo_c(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_logo_c(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_logo_c(file);
  };

  const loadImage_Images_a = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_images_a(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_images_a(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_images_a(file);
  };

  const loadImage_Images_b = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_images_b(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_images_b(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_images_b(file);
  };

  const loadImage_Images_c = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile_images_c(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile_images_c(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile_images_c(file);
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
    const response = await axios.get(apiurl+`api/open-item/ekosistem_list_detail/${id}`);
    setid(response.data.id);
    settitle(response.data.title);
    setcontents(response.data.contents);
    settitle_image_a(response.data.title_images_a);
    setimage_a(response.data.presignedUrl_a);
    settitle_image_b(response.data.title_images_b);
    setimage_b(response.data.presignedUrl_b);
    settitle_image_c(response.data.title_images_c);
    setimage_c(response.data.presignedUrl_c);
    setlinked(response.data.linked);
    
  };


  const updateSatuportal_list = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_logo_a",file_logo_a);
    formData.append("file_logo_b",file_logo_b);
    formData.append("file_logo_c",file_logo_c);
    formData.append("file_images_a",file_images_a);
    formData.append("file_images_b",file_images_b);
    formData.append("file_images_c",file_images_c);
    formData.append("title",title);
    formData.append("contents",contents);
    formData.append("title_images_a",title_images_a);
    formData.append("title_images_b",title_images_b);
    formData.append("title_images_c",title_images_c);
    formData.append("linked",linked);
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
              //navigate(`/Data-Satuportal_list/Detail/${id}`);
              navigate(`/Satuportal/List`);
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

  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_contents, setvalidasi_contents] = useState(false);
  const [validasi_title_images_a, setvalidasi_title_images_a] = useState(false);
  const [validasi_title_images_b, setvalidasi_title_images_b] = useState(false);
  const [validasi_title_images_c, setvalidasi_title_images_c] = useState(false);
  const [validasi_linked, setvalidasi_linked] = useState(false);

  const handle_step1 = (event) => {
    if (title.length<5) {setvalidasi_title(true);}else{setvalidasi_title(false);}
    if (contents.length<5) {setvalidasi_contents(true);}else{setvalidasi_contents(false);}
    if (linked.length<1) {setvalidasi_linked(true);}else{setvalidasi_linked(false);}

    if (
      title?.length >= 5 &&
      contents?.length >= 5 &&
      linked?.length >= 1
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi');
    }
  };

  const handle_step2 = (event) => {
    if (title_images_a.length<1) {setvalidasi_title_images_a(true);}else{setvalidasi_title_images_a(false);}
    if (title_images_b.length<1) {setvalidasi_title_images_b(true);}else{setvalidasi_title_images_b(false);}
    if (title_images_c.length<1) {setvalidasi_title_images_c(true);}else{setvalidasi_title_images_c(false);}

    if (
      title_images_a?.length >= 1 &&
      title_images_b?.length >= 1 &&
      title_images_c?.length >= 1
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi');
    }
  };


  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Satu Portal List Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Satuportal/List" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Satu Portal List
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
         
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1 rad15'>
          <form onSubmit={updateSatuportal_list}>
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
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />Judul
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Masukkan Judul"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    autoComplete="judul"
                                    rows="2" 
                                    className="input-green-2 tsize-110" 
                                    >
                                  </textarea>
                                    {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />Konten
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Masukkan Konten"
                                    value={contents}
                                    onChange={(e) => setcontents(e.target.value)}
                                    autoComplete="konten"
                                    rows="2" 
                                    className="input-green-2 tsize-110" 
                                    >
                                  </textarea>
                                    {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 5 karakter...</p>}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineToday className="mt-1 mx-2 text-cyan-500"  />Link Url
                              </label>
                              <div className="mt-0">
                                  <input
                                    placeholder="Tahun Rilis"
                                    value={linked}
                                    onChange={(e) => setlinked(e.target.value)}
                                    type="text"
                                    autoComplete="linked"
                                    className="input-green-2 tsize-110"
                                  />
                                  {validasi_linked && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
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
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH LOGO 1
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage_Logo_a}
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
                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH LOGO 2
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage_Logo_b}
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
                            <div className="sm:col-span-6 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH LOGO 3
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage_Logo_c}
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
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineToday className="mt-1 mx-2 text-cyan-500"  />SubList 1
                              </label>
                              <div className="mt-0">
                                  <input
                                    placeholder="Judul Gambar 1"
                                    value={title_images_a}
                                    onChange={(e) => settitle_image_a(e.target.value)}
                                    type="text"
                                    autoComplete="gambar1"
                                    className="input-green-2 tsize-110"
                                  />
                                  {validasi_title_images_a && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                              </div>

                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH GAMBAR 1
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage_Images_a}
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
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineToday className="mt-1 mx-2 text-cyan-500"  />SubList 2
                              </label>
                              <div className="mt-0">
                                  <input
                                    placeholder="Judul Gambar2"
                                    value={title_images_b}
                                    onChange={(e) => settitle_image_b(e.target.value)}
                                    type="text"
                                    autoComplete="gambar2"
                                    className="input-green-2 tsize-110"
                                  />
                                  {validasi_title_images_b && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                              </div>

                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH GAMBAR 2
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage_Images_b}
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
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineToday className="mt-1 mx-2 text-cyan-500"  />SubList 3
                              </label>
                              <div className="mt-0">
                                  <input
                                    placeholder="Judul Gambar 3"
                                    value={title_images_c}
                                    onChange={(e) => settitle_image_c(e.target.value)}
                                    type="text"
                                    autoComplete="gambar3"
                                    className="input-green-2 tsize-110"
                                  />
                                  {validasi_title_images_c && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 1 Karakter...</p>}
                              </div>

                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdFileUpload className="mt-1 mx-2 text-cyan-500"  />UNGGAH GAMBAR 3
                              </label>
                              <div className="mt-0">
                                  <input
                                  onChange={loadImage_Logo_c}
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
                              type='button'
                              onClick={() => {
                                handle_step2();
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

export default Satuportal_listPengelolah;
