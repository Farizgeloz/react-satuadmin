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
import { IoAdd, IoTrash } from "react-icons/io5";
import { api_url_satuadmin } from "../../../api/axiosConfig";

const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const userloginsatker = userlogin.satker_id || '';
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

function ModalTambahMulti() {
  const [sektorku, setsektorku] = useState([""]);
  const [satkerku, setsatkerku] = useState([""]);
  const [loading, setLoading] = useState(false);  

  const [locations, setLocations] = useState([
    { nama_location: "", satker_id: "", bidang_urusan_id: "" }
  ]);

  const addLocationField = () => {
    setLocations([
      ...locations,
      { nama_location: "", satker_id: "", bidang_urusan_id: "" }
    ]);
  };

  const removeLocationField = (index) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const handleChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  const saveDataset = async (e) => {
    e.preventDefault();

    const payloadLocations = locations.map((loc) => ({
        nama_location: loc.nama_location.toString(),
        satker_id: loc.satker_id.value.toString(),
        sektor_id: loc.sektor_id.value.toString()         // <-- pastikan string
    }));

    console.log("Payload locations:", payloadLocations);

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
      await api_url_satuadmin.post("api/satupeta/locations/addmulti", 
        { 
          locations: payloadLocations,
          admin : String(userloginadmin),
          jenis: "Satu Peta Lokasi",
          komponen: "Delete Lokasi Satu Peta" 
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
    } catch (error) {
      console.error(error);
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
    }
  };
  

  useEffect(() => {
    getDatasetItem();
    

    

  }, []);
  
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_item2", {
      params: { search_satker:userloginsatker }
    });
    const data = response.data;
    setsektorku(response.data.resultsektor);
    setsatkerku(response.data.resultsatker);
  };

  

  
  /*const saveDataset = async (e) => {
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
      await axios.post(apiurl + 'api/satupeta/map_data/admin/add', formData);

      setShow(false);
      sweetsuccess();
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Gagal menambah data");
    }
  };*/

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


  

  return (
    <>
         <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right mt-2">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Data</span>
          </button>
        </Link>
      
        <Modal dialogClassName="my-modal6"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveDataset}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Lokasi</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2 bg-silver-light p-0">

              <div className="relative px-2">
                {locations.map((loc, index) => (
                    
                    <div key={index} className="mt-3">
                        <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2 -mt-2">
                                
                              <div className="mt-0 transisiku">
                                <TextField
                                  label="Nama Lokasi"
                                  className="bg-input rad15 w-full"
                                  value={loc.nama_location}
                                  onChange={(e) => handleChange(index, "nama_location", e.target.value)}
                                  sx={(theme) => textFieldStyle(theme)}
                                />     
                                  
                              </div>
                            </div>
                            
                            <div className="sm:col-span-2 -mt-2">
                                
                                <div className="mt-0">
                                    
                                    <Autocomplete
                                        className='tsize-110 w-full'
                                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                        id="combo-box-bidang_urusan_id"
                                        options={sektorku.map((row) => ({
                                        label: row.nama_sektor,
                                        value: row.id_sektor
                                        }))}
                                        getOptionLabel={(option) => option.label || ""}
                                        value={loc.sektor_id}
                                        onChange={(event, newValue) => handleChange(index, "sektor_id",newValue)}
                                        
                                        clearOnEscape
                                        disableClearable
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Bidang Urusan"
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
                                </div>
                            </div>
                            <div className="sm:col-span-2 -mt-2">
                                <div className="mt-0">
                                    <Autocomplete
                                        className='tsize-110 w-full'
                                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                        id="combo-box-satker"
                                        options={satkerku.map((row) => ({
                                        label: row.nama_opd,
                                        value: row.id_opd
                                        }))}
                                        getOptionLabel={(option) => option.label || ""}
                                        value={loc.satker_id}
                                        onChange={(event, newValue) => handleChange(index, "satker_id",newValue)}
                                        
                                        clearOnEscape
                                        disableClearable
                                        renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Satker"
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
                                </div>
                            </div>
                            
                        </div>
                        {locations.length > 1 && (
                            <button 
                                type="button"
                                className="mt-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-3 rounded-xl flex items-center"
                                onClick={() => removeLocationField(index)}
                            >
                                    <IoTrash   /> Hapus Baris
                            </button>
                        )}
                    </div>
                ))}
                <button 
                    type="button"
                    className="mt-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center"
                    onClick={addLocationField}
                >
                        <IoAdd   /> Tambah Baris
                </button>
                
                <div className="flex justify-center mt-12">
                    
                    <button 
                        type="submit"
                        className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                        <MdOutlineSave  className='mt-1 mx-1'  /><span>Simpan Semua Baris</span>
                    </button>
                </div>
                <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                    {/*step === 1 && (
                      <motion.div
                          key={step} // Add this line
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="w-100 mx-auto">
                            <div className="mt-3 flex">
                              <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                                <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                  <p className=" text-center text-white py-1">
                                    1
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                                <div className=" bg-cyan-200 rad15 w-8 h-8  float-right">
                                  <p className=" text-center text-gray-500 py-1">
                                    2
                                  </p>
                                </div>
                              </div>
                              
                              
                              
                          </div>
                          <div className="-mt-5 w-full h-2 bg-cyan-200">
                              <div className="h-full bg-cyan-600 rounded-3xl  w-1/2"></div>
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
                            <div className="mt-3 flex">
                              <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                                <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                  <p className=" text-center text-white py-1">
                                    1
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-2 -mt-2 py-1 justify-end w-1/2">
                                <div className=" bg-cyan-600 rad15 w-8 h-8  float-right">
                                  <p className=" text-center text-white py-1">
                                    2
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
                    )*/}
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

export default ModalTambahMulti;