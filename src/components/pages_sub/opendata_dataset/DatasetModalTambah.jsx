import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { api_url_satuadmin } from "../../../api/axiosConfig";

const apiurl = import.meta.env.VITE_API_URL;


function ModalTambahUser() {
  const [satkerku, setprodukdataku] = useState([]);
  const [kategoriku, setkategoriku] = useState([]);
  

  const [kode, setkode] = useState("");
  const [kodefile, setkodefile] = useState("");
  const [wilayah, setwilayah] = useState("");
  const [kategori, setkategori] = useState("");
  const [nama_dataset, setnama_dataset] = useState("");
  const [satker, setsatker] = useState("");
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
  const [createdAt, setcreatedAt] = useState("");
  const [file, setfile] = useState("");

  

  useEffect(() => {
    getDatasetItem();
    
  }, [satker]);
  

  const loadImage = (e) =>{
    const image = e.target.files[0];
    setfile(image);
  }

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get('opendata/dataset_item');

    const data = response.data;
    setprodukdataku(response.data.resultSatker);
    setkategoriku(response.data.resultBidangUrusan);
  };

  

  const getKodeData = async (satkeri) => {
     

      try {
        const response = await api_url_satuadmin.get('openitem/satker_code_search', {
          params: {
            search_satker: satkeri.value
          }
        });
  
        const data = response.data;
        setkode(response.data.kode_satker);
        setkodefile(response.data.kode_file);
      } catch (err) {
        console.error("Gagal ambil kode:", err);
      }
      
    };
  
  const saveDataset = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file); // pastikan file diset dengan setFile()
    formData.append("kode", kode);
    formData.append("kodefile", kodefile);
    formData.append("wilayah", wilayah);
    formData.append("kategori", kategori?.value);
    formData.append("nama_dataset", nama_dataset);
    formData.append("satker", satker?.value); // ambil value ID
    formData.append("sifat_data", sifat_data);
    formData.append("kategori_data", kategori_data);
    formData.append("kegiatan_statistik", kegiatan_statistik);
    formData.append("klasifikasi", klasifikasi);
    formData.append("konsep", konsep);
    formData.append("definisi", definisi);
    formData.append("satuan", satuan);
    formData.append("ukuran", ukuran);
    formData.append("keterangan", keterangan);
    formData.append("tag", tag);
    formData.append("createdAt", createdAt);

    try {
      await axios.post(apiurl + 'opendata/dataset_data_add', formData);

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

  const [validasi_kode, setvalidasi_kode] = useState(false);
  const [validasi_wilayah, setvalidasi_wilayah] = useState(false);
  const [validasi_kategori, setvalidasi_kategori] = useState(false);
  const [validasi_satker, setvalidasi_satker] = useState(false);
  const [validasi_sifatdata, setvalidasi_sifatdata] = useState(false);
  const [validasi_kategori_data, setvalidasi_kategori_data] = useState(false);

  const handle_step1 = (event) => {
    if (kode.length<3) {setvalidasi_kode(true);}else{setvalidasi_kode(false);}
    if (wilayah.length<3) {setvalidasi_wilayah(true);}else{setvalidasi_wilayah(false);}
    if (kategori.length<3) {setvalidasi_kategori(true);}else{setvalidasi_kategori(false);}
    
    if (satker===""||satker===null) {setvalidasi_satker(true);}else{setvalidasi_satker(false);}
    if (sifat_data.length<3) {setvalidasi_sifatdata(true);}else{setvalidasi_sifatdata(false);}
    if (kategori_data.length<3) {setvalidasi_kategori_data(true);}else{setvalidasi_kategori_data(false);}

    if(kode.length>=3 && wilayah.length>3 && (satker!==""||satker!==null) && sifat_data.length>3 && kategori_data.length>3){
      nextStep();
    }
  };

  const [validasi_nama_dataset, setvalidasi_nama_dataset] = useState(false);
  const [validasi_kegiatanstatistik, setvalidasi_kegiatanstatistik] = useState(false);
  const [validasi_konsep, setvalidasi_konsep] = useState(false);
  const [validasi_klasifikasi, setvalidasi_klasifikasi] = useState(false);
  const [validasi_definisi, setvalidasi_definisi] = useState(false);
  const [validasi_keterangan, setvalidasi_keterangan] = useState(false);

  const handle_step2 = (event) => {
    if (nama_dataset.length<3) {setvalidasi_nama_dataset(true);}else{setvalidasi_nama_dataset(false);}
    if (kegiatan_statistik.length<1) {setvalidasi_kegiatanstatistik(true);}else{setvalidasi_kegiatanstatistik(false);}
    if (konsep.length<1) {setvalidasi_konsep(true);}else{setvalidasi_konsep(false);}
    if (klasifikasi.length<1) {setvalidasi_klasifikasi(true);}else{setvalidasi_klasifikasi(false);}
    if (definisi.length<1) {setvalidasi_definisi(true);}else{setvalidasi_definisi(false);}

    if(nama_dataset.length>=3 && kegiatan_statistik.length>=1 && konsep.length>=1 && klasifikasi.length>=1 && definisi.length>=1){
      nextStep();
    }
  };

  


   

  return (

    <>
            
       
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Dataset</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal3"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveDataset}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Dataset</h4>
                
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
                              
                              <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                  <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />WILAYAH
                                </label>
                                <div className="mt-0">
                                    
                                    <select
                                      value={wilayah}
                                      onChange={(e) => setwilayah(e.target.value)}
                                      autoComplete="wilayah"
                                      className="input-gray tsize-110"
                                      >
                                      <option value="">Pilih Wilayah</option>
                                      <option value="Kabupaten">Kabupaten</option>
                                      <option value="Kecamatan">Kecamatan</option>
                                      <option value="Desa">Desa</option>
                                    </select>
                                    {validasi_wilayah && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Wilayah Harus Dipilih.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlinePerson4  className="mt-1 mx-2 text-cyan-500"  />KATEGORI
                                </label>
                                <div className="mt-0">
                                   
                                    <Autocomplete className=""
                                      disablePortal
                                      isOptionEqualToValue={(option, value) => option?.label === value?.label}
                                      id="combo-box-demo"
                                      options={kategoriku.map((row) => ({
                                        label: row.nama_sektor,  // Ganti sesuai properti nama di datamu
                                        value: row.id_sektor
                                      }))}
                                      defaultValue=""
                                      value={kategori}
                                      onChange={(event, value) => {
                                          setkategori(value);
                                          /*getBidangUrusan();*/
                                        }
                                      }
                                      renderInput={(params) => 
                                        <TextField {...params}  
                                        style={{
                                            borderRadius:10,
                                            color: "white",
                                            border: '2px solid gray',
                                        }}
                                        placeholder="Pilih Produk Data" />
                                      }
                                      
                                    />
                                    {validasi_kategori && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Kategori Harus Dipilih.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-4 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlinePerson4  className="mt-1 mx-2 text-cyan-500"  />SATKER / PRODUSEN DATA
                                </label>
                                <div className="mt-0">
                                   
                                    <Autocomplete className=""
                                      disablePortal
                                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                      id="combo-box-demo"
                                      
                                      options={satkerku.map((row) => ({
                                        label: row.nama_opd,  // Ganti sesuai properti nama di datamu
                                        value: row.id_opd
                                      }))}
                                      defaultValue=""
                                      value={satker}
                                      onChange={(event, value) => {
                                          setsatker(value);
                                          if(value!==null){
                                             getKodeData(value);
                                             
                                          } else {
                                            // Jika di-clear
                                            setkode("");
                                            setkodefile("");
                                          }
                                         
                                          /*getBidangUrusan();*/
                                        }
                                      }
                                      clearOnEscape
                                      disableClearable={false} // Penting: agar tombol clear aktif
                                      renderInput={(params) => 
                                        <TextField {...params}  
                                        style={{
                                            borderRadius:10,
                                            color: "white",
                                            border: '2px solid gray',
                                        }}
                                        placeholder="Pilih Organisasi" />
                                      }
                                      
                                    />
                                    {validasi_satker && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Organisasi Harus Dipilih.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-2 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                  <MdOutlineQrCode className="mt-1 mx-2 text-cyan-500"  /> Kode Dataset
                                </label>
                                <div className="mt-0 transisiku">
                                    <input
                                    placeholder="Kode Dataset"
                                    value={kode}
                                    onChange={(e) => setkode(e.target.value)}
                                    type="text"
                                    autoComplete="kode"
                                    className="input-gray tsize-110"
                                    disabled
                                    />
                                     {validasi_kode && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Minimal 3 karakter.</p>}
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
                                  {validasi_sifatdata && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Sifat Data Harus Dipilih.</p>}  
                                </div>
                              </div>
                              <div className="sm:col-span-2 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdPermDeviceInformation className="mt-1 mx-2 text-cyan-500"  />KATEGORI DATA
                                </label>
                                <div className="mt-0">
                                  <select
                                    value={kategori_data}
                                    onChange={(e) => setkategori_data(e.target.value)}
                                    autoComplete="wilayah"
                                    className="input-gray tsize-110 h-7v"
                                    >
                                    <option value="">Pilih Kategori Data</option>
                                    <option value="agregat">agregat</option>
                                    <option value="individual">individual</option>
                                  </select>
                                  {validasi_kategori_data && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Kategori Data Harus Dipilih</p>}
                                   
                                </div>
                              </div>
                              <div className="sm:col-span-2 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdCalendarMonth className="mt-1 mx-2 text-cyan-500"  />TANGGAL UNGGAH
                                </label>
                                <div className="mt-0">
                                    <input
                                    placeholder="Tanggal Unggah"
                                    value={createdAt}
                                    onChange={(e) => setcreatedAt(e.target.value)}
                                    type="date"
                                    autoComplete="createdAt"
                                    className="input-gray tsize-110"
                                    />
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
                              <MdOutlineShortText className="mt-1 mx-2 text-cyan-500"  />NAMA DATASET
                              </label>
                              <div className="mt-0">
                                  <textarea 
                                    placeholder="Masukkan Nama Dataset"
                                    value={nama_dataset}
                                    onChange={(e) => setnama_dataset(e.target.value)}
                                    autoComplete="nama_dataset"
                                    rows="2" 
                                    className="input-gray-2 tsize-110" 
                                    >
                                  </textarea>
                                   {validasi_nama_dataset && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />KEGIATAN STATISTIK
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
                                   {validasi_kegiatanstatistik && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-3 -mt-5">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />KONSEP
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
                                   {validasi_konsep && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                            <div className="sm:col-span-3 -mt-5">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />KLASIFIKASI
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
                                   {validasi_klasifikasi && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
                              </div>
                            </div>
                            
                            <div className="sm:col-span-6 -mt-5">
                              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                              <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />DEFINISI
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
                                   {validasi_definisi && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Harus Diisi...</p>}
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
                                <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />SATUAN
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
                                <MdOutlineTag  className="mt-1 mx-2 text-cyan-500"  />TAG
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
                                <MdFileUpload  className="mt-1 mx-2 text-cyan-500"  />UNGGAH DATA
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