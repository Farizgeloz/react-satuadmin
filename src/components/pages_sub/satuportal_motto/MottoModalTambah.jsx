import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";

import { MdAddCircle,MdErrorOutline,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,MdOutlineSave} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';


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

const textFieldStyleMultiline = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: "auto",
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
  const [satkerku, setprodukdataku] = useState([]);
  const [kategoriku, setkategoriku] = useState([]);
  

  const [title, settitle] = useState("");
  const [contents, setcontents] = useState("");
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveMotto = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("kategori", "Satu Portal Motto"); // pastikan file diset dengan setFile()
    formData.append("file", file); // pastikan file diset dengan setFile()
    formData.append("title", title);
    formData.append("contents", contents);

    try {
      await axios.post(apiurl + 'api/open-item/komponen_add', formData);

      setShow(false);
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data2");
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
  const [validasi_file, setvalidasi_file] = useState(false);

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

    if (!file) {
      setvalidasi_file(true);
    } else {
      setvalidasi_file(false);
    }

    if (title.length >= 3 && contents.length >= 3 && file) {
      nextStep();
    }
  };

   

  return (

    <>
            
       
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Motto</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal2"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveMotto}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Motto</h4>
                
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
                          className="md:w-full mx-auto">
                          
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6 -mt-4">
                              <div className="mt-0">
                                <TextField
                                  label="Judul Motto"
                                  className="bg-input rad15 w-full"
                                  value={title}
                                  onChange={(e) => settitle(e.target.value)}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {title && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => settitle("")}
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
                                  {validasi_title && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                              
                            </div>
                            <div className="sm:col-span-6 -mt-4">
                              <div className="mt-0">
                                  <TextField
                                    label="Isi Konten"
                                    className="bg-input rad15 w-full"
                                    value={contents}
                                    onChange={(e) => setcontents(e.target.value)}
                                    multiline   // <-- ini bikin jadi textarea
                                    rows={5}    // <-- tinggi awal textarea
                                    InputProps={{
                                      endAdornment: (
                                        <>
                                          {contents && (
                                            <InputAdornment position="end">
                                              <IconButton
                                                onClick={() => setcontents("")}
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
                                    sx={(theme) => textFieldStyleMultiline(theme)}
                                  />

                                    {validasi_contents && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-5 -mt-4">
                              <div className="mt-0">
                                <TextField
                                  type="file"
                                  label="Unggah Gambar"
                                  className="bg-input rad15 w-100"
                                  alt=""
                                  InputLabelProps={{
                                    shrink: true, // biar label tetap tampil di atas saat file dipilih
                                  }}
                                  onChange={loadImage}
                                  InputProps={{
                                    endAdornment: (
                                      <>
                                        {file && (
                                          <InputAdornment position="end">
                                            <IconButton
                                              onClick={() => setfile("")}
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
                                {validasi_file && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Pilih Gambar...</p>}
                                  
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