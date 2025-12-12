import React, { useState, useEffect} from "react";
import { motion, useAnimation } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { MdAddCircle,MdOutlineArrowCircleLeft,MdOutlineQrCode,MdOutlineMap,MdOutlinePerson4,
        MdOutlineSave,MdOutlineErrorOutline,MdArrowCircleRight} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';
import { api_url_satuadmin } from "../../../api/axiosConfig";



function ModalTambahUser() {
   const [locationku, setlocationku] = useState([]);
  const [kecamatanku, setkecamatanku] = useState([]);
  const [desaku, setdesaku] = useState([]);
  const [nama_location_point, setnama_location_point] = useState("");
  const [coordinatlon, setcoordinatlon] = useState("");
  const [coordinatlat, setcoordinatlat] = useState("");
  const [kecamatan, setkecamatan] = useState(null);
  const [lokasi, setlokasi] = useState(null);
  const [desa, setdesa] = useState(null);

  

  useEffect(() => {
    getDatasetItem();
    

    

  }, [lokasi]);

  useEffect(() => {
    if (kecamatan) {
        getDatasetItem2();
    }
  }, [kecamatan]);
  
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get('api/satupeta/map_data/admin');

    const data = response.data;
    setlocationku(response.data.resultlocation);
    setkecamatanku(response.data.resultkecamatan);
    setdesaku(response.data.resultdesa);
  };

  const getDatasetItem2 = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
      params: { search_kecamatan: kecamatan ? kecamatan.value : "" }
    });
    const data = response.data;
    setdesaku(response.data.resultdesa);
  };

  
  const saveDataset = async (e) => {
    e.preventDefault();
    const coordinat="["+coordinatlon+","+coordinatlat+"]"
    const formData = new FormData();
    formData.append("nama_location_point",nama_location_point);
    formData.append("coordinat",coordinat);
    
    formData.append("location_id",lokasi.value);
    formData.append("kecamatan_id",kecamatan.value);
    formData.append("desa_id",desa.value);

    console.log("coba:"+lokasi.value);

    try {
      await api_url_satuadmin.post('api/satupeta/location_point/add', formData);

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

 
  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };


  const [validasi_nama_location_point, setvalidasi_nama_location_point] = useState(false);
  const [validasi_coordinatlon, setvalidasi_coordinatlon] = useState(false);
  const [validasi_coordinatlat, setvalidasi_coordinatlat] = useState(false);
  const [validasi_location, setvalidasi_location] = useState(false);
  const [validasi_kecamatan, setvalidasi_kecamatan] = useState(false);
  const [validasi_desa, setvalidasi_desa] = useState(false);

  // Fungsi validasi longitude
  const isValidLongitude = (lon) => {
    if (!lon && lon !== 0) return false; // null/undefined
    const value = parseFloat(lon);
    return !isNaN(value) && value >= -180 && value <= 180;
  };

  // Fungsi validasi latitude
  const isValidLatitude = (lat) => {
    if (!lat && lat !== 0) return false;
    const value = parseFloat(lat);
    return !isNaN(value) && value >= -90 && value <= 90;
  };
  
  const handle_step = (event) => {
    const validNama = (nama_location_point?.length || 0) >= 3;
    const validLon = isValidLongitude(coordinatlon);
    const validLat = isValidLatitude(coordinatlat);
    const validLokasi = lokasi !== null;
    const validKec = kecamatan !== null;
    const validDesa = desa !== null;
    setvalidasi_nama_location_point(!validNama);
    setvalidasi_coordinatlon(!validLon);
    setvalidasi_coordinatlat(!validLat);
    setvalidasi_location(!validLokasi);
    setvalidasi_kecamatan(!validKec);
    setvalidasi_desa(!validDesa);

    if (validNama && validLon && validLat && validLokasi && validKec && validDesa) {
      nextStep();
    }
  };

  return (
    <>
         <Link onClick={handleShow} className="col-span-1 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right mt-2">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Data</span>
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
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Lokasi Point</h4>
                
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
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-200 text-cyan-600 font-semibold">
                                2
                              </div>
                              <span className="mt-1 text-xs text-gray-500 font-semibold">
                                Konfirmasi
                              </span>
                            </div>

                            {/* PROGRESS LINE */}
                            <div className="absolute top-4 left-0 right-0 h-1 bg-cyan-200 rounded-full">
                              <div className="h-full bg-cyan-600 rounded-full transition-all duration-300 w-1/2" />
                            </div>

                          </div>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-6 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                  <MdOutlineQrCode className="mt-1 mx-2 text-cyan-500"  /> Nama Lokasi Point
                                </label>
                                <div className="mt-0 transisiku">
                                    <input
                                    placeholder="Masukkan Kode Dataset"
                                    value={nama_location_point}
                                    onChange={(e) => setnama_location_point(e.target.value)}
                                    type="text"
                                    autoComplete="kode"
                                    className="input-gray tsize-110"
                                    />
                                      {validasi_nama_location_point && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                  <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Koordinat Longitude
                                </label>
                                <div className="mt-0">
                                    
                                      <input
                                      placeholder="Contoh:113.415787"
                                      value={coordinatlon}
                                      onChange={(e) => setcoordinatlon(e.target.value)}
                                      type="text"
                                      autoComplete="kode"
                                      className="input-gray tsize-110"
                                      />
                                    {validasi_coordinatlon && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Tidak Valid.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                  <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Koordinat Latitude 
                                </label>
                                <div className="mt-0">
                                    
                                      <input
                                      placeholder="Contoh:-7.76090"
                                      value={coordinatlat}
                                      onChange={(e) => setcoordinatlat(e.target.value)}
                                      type="text"
                                      autoComplete="kode"
                                      className="input-gray tsize-110"
                                      />
                                    {validasi_coordinatlat && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Tidak Valid.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-6 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Lokasi
                                </label>
                                <div className="mt-0">
                                    
                                    <Autocomplete
                                      className='tsize-110'
                                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                      id="combo-box-kecamatan"
                                      options={locationku.map((row) => ({
                                        label: row.nama_location,
                                        value: row.id_location
                                      }))}
                                      getOptionLabel={(option) => option.label || ""}
                                      value={lokasi}
                                      onChange={(event, newValue) => setlokasi(newValue)}
                                      clearOnEscape
                                      disableClearable
                                      renderInput={(params) => 
                                        <TextField
                                          {...params}
                                          style={{
                                            borderRadius: 10,
                                            color: "white",
                                            border: '2px solid gray',
                                          }}
                                          className='tsize-110'
                                          placeholder="Pilih Lokasi"
                                        />
                                      }
                                    />
                                    {validasi_location && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Kecamatan
                                </label>
                                <div className="mt-0">
                                    
                                    <Autocomplete
                                      className='tsize-110'
                                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                      id="combo-box-kecamatan"
                                      options={kecamatanku.map((row) => ({
                                        label: row.nama_kecamatan,
                                        value: row.id_kecamatan
                                      }))}
                                      getOptionLabel={(option) => option.label || ""}
                                      value={kecamatan}
                                      onChange={(event, newValue) => setkecamatan(newValue)}
                                      clearOnEscape
                                      disableClearable
                                      renderInput={(params) => 
                                        <TextField
                                          {...params}
                                          style={{
                                            borderRadius: 10,
                                            color: "white",
                                            border: '2px solid gray',
                                          }}
                                          className='tsize-110'
                                          placeholder="Pilih Kecamatan"
                                        />
                                      }
                                    />
                                    {validasi_kecamatan && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                                </div>
                              </div>
                              <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                                <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Desa
                                </label>
                                <div className="mt-0">
                                    
                                    <Autocomplete
                                      className='tsize-110'
                                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                      id="combo-box-kecamatan"
                                      options={desaku.map((row) => ({
                                        label: row.nama_desa,
                                        value: row.id_desa
                                      }))}
                                      getOptionLabel={(option) => option.label || ""}
                                      value={desa}
                                      onChange={(event, newValue) => setdesa(newValue)}
                                      clearOnEscape
                                      disableClearable
                                      disabled={!kecamatan}   // <<== kalau kecamatan null/undefined, jadi disabled
                                      renderInput={(params) => 
                                        <TextField
                                          {...params}
                                          style={{
                                            borderRadius: 10,
                                            color: "white",
                                            border: '2px solid gray',
                                          }}
                                          className='tsize-110'
                                          placeholder="Pilih Desa"
                                        />
                                      }
                                    />


                                    {validasi_desa && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Dipilih.</p>}
                                </div>
                              </div>
                              
                              
                          </div>
                          
                          <div className="flex justify-center mt-12">
                              
                                <button 
                                  type="button"
                                  onClick={() => {
                                    handle_step();
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
                            className="md:w-3/5 mx-auto py-12">
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