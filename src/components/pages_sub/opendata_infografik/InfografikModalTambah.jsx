import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";

import { MdAddCircle,MdErrorOutline,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,
        MdOutlineQrCode,MdOutlineMap,MdOutlinePerson4,MdPermDeviceInformation,MdAccessibility,
        MdCalendarMonth,MdOutlineShortText,MdOutlineTag,MdOutlineScale,MdDescription,MdFileUpload, 
        MdDisabledVisible,
        MdOutlineSave,
        MdCategory} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';
import { api_url_satudata } from "../../../../../frontend_opendata/src/api/axiosConfig";
import { api_url_satuadmin } from "../../../api/axiosConfig";




const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const userloginadmin = userlogin.id || '';

const textFieldStyle = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: 60,
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

const textFieldStyleMultiline = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: "auto",
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


function ModalTambahUser() {
  
  const [topikku, settopikku] = useState([""]);
  
  const [topik, settopik] = useState(null);
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [content, setcontent] = useState("");
  const [penyusun, setpenyusun] = useState(null);
  const [visibilitas, setvisibilitas] = useState("");
  const [file_a, setfile_a] = useState("");
  const [file_b, setfile_b] = useState("");
  const [file_c, setfile_c] = useState("");
  const [file_d, setfile_d] = useState("");
  const [images_a, setimages_a] = useState("");
  const [images_b, setimages_b] = useState("");
  const [images_c, setimages_c] = useState("");
  const [images_d, setimages_d] = useState("");
  const [loading, setLoading] = useState(false);

  

  const loadImage_a = (e) =>{
    const image = e.target.files[0];
    setfile_a(image);
    if (image) {
      setimages_a(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }
  const loadImage_b = (e) =>{
    const image = e.target.files[0];
    setfile_b(image);
    if (image) {
      setimages_b(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }
  const loadImage_c = (e) =>{
    const image = e.target.files[0];
    setfile_c(image);
    if (image) {
      setimages_c(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }

  const loadImage_d = (e) =>{
    const image = e.target.files[0];
    setfile_d(image);
    if (image) {
      setimages_d(URL.createObjectURL(image)); // buat URL sementara
    } else {
    }
  }

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData()
    

  }, []);

  const getData = async () => {
    try {
      

      // 🔹 Ambil semua dataset
      const res3 = await api_url_satudata.get("dataset?limit=1000");
      const allDataset = res3.data || [];

      // 🔹 Ambil sektor unik dari dataset
      const sektorList = allDataset
        .map(item => ({
          id_sektor: item.sektor?.id_sektor,
          nama_sektor: item.sektor?.nama_sektor
        }))
        .filter(sektor => sektor.id_sektor && sektor.nama_sektor);

      const uniqueSektor = Array.from(
        new Map(sektorList.map(sektor => [sektor.id_sektor, sektor])).values()
      );

      // 🔹 Simpan semua sektor ke state sektorku
      settopikku(uniqueSektor);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const saveIklan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_a",file_a);
    formData.append("file_b",file_b);
    formData.append("file_c",file_c);
    formData.append("file_d",file_d);
    formData.append("content",content);
    formData.append("topik",topik.value);
    formData.append("title",title);
    formData.append("sub_title",subtitle);
    formData.append("penyusun",penyusun.value);
    formData.append("visibilitas",visibilitas.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Open Data Infografik");
    formData.append("komponen","Tambah Infografik Open Data");

    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses tambah data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await api_url_satuadmin.post('api/opendata/infografik/add', formData);

      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
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

  const [errors, setErrors] = useState({});
  
  const validate1 = () => {
    let newErrors = {};

    if (!topik) {
      newErrors.topik = "Topik wajib dipilih";
    }

    if (!title || title.trim().length < 5) {
      newErrors.title = "Judul minimal 5 karakter";
    }
    /* if (!subtitle || subtitle.trim().length < 5) {
      newErrors.subtitle = "Judul minimal 5 karakter";
    } */
    if (!content || content.trim().length < 10) {
      newErrors.content = "Konten minimal 10 karakter";
    }

    if (!penyusun) {
      newErrors.penyusun = "Penyusun wajib dipilih";
    }
    if (!visibilitas) {
      newErrors.visibilitas = "Visibilitas wajib dipilih";
    }

    if (!file_a) {
      newErrors.file_a = "Upload wajib Ada";
    }


    setErrors(newErrors);

    // ✅ true kalau tidak ada error
    return Object.keys(newErrors).length === 0;
  };

  const validate2 = () => {
    let newErrors = {};

    if (!content) {
      newErrors.content_a = "Isi Konten wajib diisi";
    }
    if (!file_a) {
      newErrors.file_a = "Upload wajib Ada";
    }

    setErrors(newErrors);

    // ✅ true kalau tidak ada error
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validate1();
    if (!isValid) {
      console.log("Step 1 masih ada error");
      return;
    }
    nextStep();
  };

  const handleNext2 = () => {
    const isValid = validate2();
    if (!isValid) {
      console.log("Step 2 masih ada error");
      return;
    }
    nextStep();
  };
   

  return (

    <>
            
       
      <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
        <button 
          className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
            <MdAddCircle className="mt-1 mx-1" /><span>Tambah Data</span>
        </button>
      </Link>
      
      <Modal dialogClassName="my-modal4"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
          <form onSubmit={saveIklan}>
          <Modal.Header closeButton className="border-b ">
              <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Infografik</h4>
              
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
                                label="Title"
                                className="bg-input rad15 w-full"
                                value={title}
                                onChange={(e) => settitle(e.target.value)}
                                sx={(theme) => textFieldStyle(theme)}
                              />
                              {errors.title && <p className="text-red-500">{errors.title}</p>}
                                
                          </div>
                          
                        </div>
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                              <TextField
                                label="Subtitle"
                                className="bg-input rad15 w-full"
                                value={subtitle}
                                onChange={(e) => setsubtitle(e.target.value)}
                                sx={(theme) => textFieldStyle(theme)}
                              />
                              {errors.title && <p className="text-red-500">{errors.title}</p>}
                                
                          </div>
                          
                        </div>
                        <div className="sm:col-span-3 -mt-4">
                          <div className="mt-0">
                              <Autocomplete
                                className='tsize-110'
                                isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                id="combo-box-sektor"
                                options={topikku.map((row) => ({
                                  label: row.nama_sektor,
                                  value: row.id_sektor
                                }))}
                                getOptionLabel={(option) => option.label || ""}
                                value={topik}
                                onChange={(event, newValue) => settopik(newValue)}
                                clearOnEscape
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Topik"
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
                              {errors.topik && <p className="text-red-500">{errors.topik}</p>}

                          </div>
                        </div>
                        <div className="sm:col-span-3 -mt-4">
                          <div className="mt-0">
                            <Autocomplete
                              className="tsize-110"
                              isOptionEqualToValue={(option, value) => option?.value === value?.value}
                              id="combo-box-location"
                              options={[
                                { label: "Digital Service Prob", value: "Digital Service Prob" },
                                { label: "Statistik Kominfo", value: "Statistik Kominfo" }
                              ]}
                              getOptionLabel={(option) => option.label || ""}
                              value={penyusun}
                              onChange={(event, newValue) => setpenyusun(newValue)}
                              clearOnEscape
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Penyusun"
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
                            {errors.penyusun && <p className="text-red-500">{errors.penyusun}</p>}
                          </div>
                          
                        </div>
                        <div className="sm:col-span-3 -mt-4">
                          <div className="mt-0">
                            <Autocomplete
                              className="tsize-110"
                              isOptionEqualToValue={(option, value) => option?.value === value?.value}
                              id="combo-box-location"
                              options={[
                                { label: "Privat", value: "Privat" },
                                { label: "Publik", value: "Publik" }
                              ]}
                              getOptionLabel={(option) => option.label || ""}
                              value={visibilitas}
                              onChange={(event, newValue) => setvisibilitas(newValue)}
                              clearOnEscape
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Visibilitas"
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
                            {errors.visibilitas && <p className="text-red-500">{errors.visibilitas}</p>}
                            
                          </div>
                        </div>
                        <div className="sm:col-span-6 -mt-4">
                          <div className="mt-0">
                            <TextField
                              label="Isi Konten"
                              className="bg-input rad15 w-full"
                              value={content}
                              onChange={(e) => setcontent(e.target.value)}
                              multiline   // <-- ini bikin jadi textarea
                              rows={5}    // <-- tinggi awal textarea
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {content && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setcontent("")}
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
                            {errors.content && <p className="text-red-500">{errors.content}</p>}
                          </div>
                          
                        </div>
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
                              }}
                              onChange={loadImage_a}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {file_a && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setfile_a("")}
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
                            {errors.file_a && <p className="text-red-500">{errors.file_a}</p>}
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_a}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>
                        
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
                              }}
                              onChange={loadImage_b}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {file_b && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setfile_a("")}
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
                            
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_b}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>
                        
                        <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
                              }}
                              onChange={loadImage_c}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {file_c && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setfile_c("")}
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
                            
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_c}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>

                          <div className="sm:col-span-5 -mt-4">
                          <div className="mt-0">
                            <TextField
                              type="file"
                              label="Unggah Gambar Konten"
                              className="bg-input rad15 w-100"
                              InputLabelProps={{
                                shrink: true, // biar label tetap tampil di atas saat file dipilih
                              }}
                              onChange={loadImage_d}
                              InputProps={{
                                endAdornment: (
                                  <>
                                    {file_c && (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={() => setfile_d("")}
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
                            
                              
                          </div>
                        </div>
                        <div className="sm:col-span-1 -mt-4">
                            <img
                                src={images_d}
                                alt="gambar"
                                style={{ maxwidth: "80%", objectFit: "contain" }}
                                className="rounded border p-1"
                              />
                        </div>

                        
                        
                        
                        
                        
                    </div>
                      <div className="flex justify-center mt-5">

                        <button type="button"
                          onClick={() => {
                            handleNext();
                          }}  
                          className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
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