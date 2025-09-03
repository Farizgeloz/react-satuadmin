import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Select from 'react-select';

import { MdAddCircle,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,
        MdOutlineMap,MdOutlinePerson4,MdOutlineShortText,MdFileUpload,MdOutlineSave,MdOutlineErrorOutline,
        MdArrowCircleRight,MdOutlineToday} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const apiurl=process.env.REACT_APP_URL;


function ModalTambahUser() {
  const [satkerku, setsatkerku] = useState([]);
  const [bidangku, setbidangku] = useState([]);
  const [locationku, setlocationku] = useState([]);

  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
  const [images_a, setimage_a] = useState("");
  const [title_images_a, settitle_image_a] = useState("");
  const [images_b, setimage_b] = useState("");
  const [title_images_b, settitle_image_b] = useState("");
  const [images_c, setimage_c] = useState("");
  const [title_images_c, settitle_image_c] = useState("");
  const [linked, setlinked] = useState("");

  const [file1, setfile1] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const [fileError, setFileError] = useState("");

  
  


  const loadImage1 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
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

  const loadImage2 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile2(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile2(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile2(file);
  };

  const loadImage3 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi ekstensi
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP).");
      setfile3(null);
      return;
    }

    // Validasi ukuran (maks. 2MB)
    const maxSize = 5 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
      setFileError("Ukuran file maksimal 5MB.");
      setfile3(null);
      return;
    }

    // Jika valid
    setFileError("");
    setfile3(file);
  };

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  
  const saveSatkercode = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file1",file1);
    formData.append("file2",file2);
    formData.append("file3",file3);
    formData.append("title",title);
    formData.append("contents",contents);
    formData.append("title_images_a",title_images_a);
    formData.append("title_images_b",title_images_b);
    formData.append("title_images_c",title_images_c);
    formData.append("linked",linked);

    try {
      await axios.post(apiurl + 'api/open-item/ekosistem_list_add', formData);

      setShow(false);
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
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
  };
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

  const [formData, setFormData] = useState({
        name: '',
        number: '',
        occupation: '',
        completionDate: '',
        projectDetails: ''
  });
 

  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };

  const redoStep = () => {
      setStep(1);
  };

  // STATE VALIDASI
  const [validasi_title, setvalidasi_title] = useState(false);
  const [validasi_contents, setvalidasi_contents] = useState(false);
  const [validasi_linked, setvalidasi_linked] = useState(false);

  const [validasi_title_images_a, setvalidasi_title_images_a] = useState(false);
  const [validasi_title_images_b, setvalidasi_title_images_b] = useState(false);
  const [validasi_title_images_c, setvalidasi_title_images_c] = useState(false);

  const [validasi_file1, setvalidasi_file1] = useState(false);
  const [validasi_file2, setvalidasi_file2] = useState(false);
  const [validasi_file3, setvalidasi_file3] = useState(false);
  
  const handle_step1 = () => {
    const isTitleValid = title?.length >= 5;
    const isContentsValid = contents?.length >= 5;
    const isLinkedValid = linked?.length >= 1;

    setvalidasi_title(!isTitleValid);
    setvalidasi_contents(!isContentsValid);
    setvalidasi_linked(!isLinkedValid);

    if (isTitleValid && isContentsValid && isLinkedValid) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi step 1');
    }
  };


  const handle_step2 = () => {
    const isTitleAValid = title_images_a?.length >= 1;
    const isTitleBValid = title_images_b?.length >= 1;
    const isTitleCValid = title_images_c?.length >= 1;

    const isFile1Valid = !!file1;
    const isFile2Valid = !!file2;
    const isFile3Valid = !!file3;

    setvalidasi_title_images_a(!isTitleAValid);
    setvalidasi_title_images_b(!isTitleBValid);
    setvalidasi_title_images_c(!isTitleCValid);

    setvalidasi_file1(!isFile1Valid);
    setvalidasi_file2(!isFile2Valid);
    setvalidasi_file3(!isFile3Valid);

    if (
      isTitleAValid &&
      isTitleBValid &&
      isTitleCValid &&
      isFile1Valid &&
      isFile2Valid &&
      isFile3Valid
    ) {
      nextStep();
    } else {
      console.warn('⛔ Tidak lolos validasi step 2');
    }
  };

 

  return (

    <>
            
       
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Ekosistem List</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal3"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveSatkercode}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Location Maplist</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2 bg-silver-light p-0">

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
                                  onChange={loadImage1}
                                  type="file"
                                  accept="image/*" // hanya file gambar
                                  className="input-green-2 tsize-110"
                                  />
                                  <span className="italicku textsize8 text-sliver">(Pilih File .jpg dan .png)</span>
                                  {fileError && (
                                    <p className="text-red-600 mt-2 d-flex">
                                      <MdOutlineErrorOutline className="mt-1 me-2" />
                                      {fileError}
                                    </p>
                                  )}
                                  {validasi_file1 && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Gambar Belum Dipilih...</p>}
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
                                  onChange={loadImage2}
                                  type="file"
                                  accept="image/*" // hanya file gambar
                                  className="input-green-2 tsize-110"
                                  />
                                  <span className="italicku textsize8 text-sliver">(Pilih File .jpg dan .png)</span>
                                  {fileError && (
                                    <p className="text-red-600 mt-2 d-flex">
                                      <MdOutlineErrorOutline className="mt-1 me-2" />
                                      {fileError}
                                    </p>
                                  )}
                                  {validasi_file2 && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Gambar Belum Dipilih...</p>}
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
                                  onChange={loadImage3}
                                  type="file"
                                  accept="image/*" // hanya file gambar
                                  className="input-green-2 tsize-110"
                                  />
                                  <span className="italicku textsize8 text-sliver">(Pilih File .jpg dan .png)</span>
                                  {fileError && (
                                    <p className="text-red-600 mt-2 d-flex">
                                      <MdOutlineErrorOutline className="mt-1 me-2" />
                                      {fileError}
                                    </p>
                                  )}
                                  {validasi_file3 && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Gambar Belum Dipilih...</p>}
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
                
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                    className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClose}>
                    Keluar
                </button>
                 
               
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalTambahUser;