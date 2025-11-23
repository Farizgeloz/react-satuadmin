import React, { useState, useEffect} from "react";
import { motion } from 'framer-motion';
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import "../../styles/Modal.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { MdAddCircle,MdOutlineArrowCircleLeft,MdOutlineSave} from "react-icons/md";

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';
import { IoAdd, IoTrash } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
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

function ModalTambahMulti() {
  const [sektorku, setsektorku] = useState([""]);
  const [satkerku, setsatkerku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [loading, setLoading] = useState(false);
  

  const [locations, setLocations] = useState([
    { nama_location: "", satker_id: "", sektor_id: "" }
  ]);

  const addLocationField = () => {
    setLocations([
      ...locations,
      { nama_location: "", satker_id: "", sektor_id: "" }
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

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newLocations = [...locations];
    newLocations[index].file = file;
    newLocations[index].images = URL.createObjectURL(file);
    setLocations(newLocations);
  };

  const clearImage = (index) => {
    const newLocations = [...locations];
    newLocations[index].file = null;
    newLocations[index].images = "";
    setLocations(newLocations);
  };

  const saveDataset = async (e) => {
    e.preventDefault();

    const payloadLocations = locations.map((loc) => ({
      koleksi_data: loc.koleksi_data?.value ?? "",
      tipe: loc.tipe?.value ?? "",
      location_id: loc.location_id?.value?.toString() ?? "",
      title: loc.title?.trim() ?? "",
      satker_id: loc.satker_id?.value?.toString() ?? "",
      sektor_id: loc.sektor_id?.value?.toString() ?? "",
      periode: loc.periode?.value ?? "",
      tahun_rilis: loc.tahun_rilis?.toString() ?? "",
      pengukuran: loc.pengukuran?.trim() ?? "",
      visibilitas: loc.visibilitas?.value ?? "",
      deskripsi: loc.deskripsi?.trim() ?? "",
      admin: userloginadmin?.toString() ?? "",
    }));

    const formData = new FormData();
    formData.append("locations", JSON.stringify(payloadLocations));
    formData.append("admin", String(userloginadmin));
    formData.append("jenis", "Satu Peta Koleksi");
    formData.append("komponen", "Tambah Koleksi Satu Peta" );

    // kalau ada file upload
    locations.forEach((loc, idx) => {
      if (loc.file) {
        formData.append(`file_${idx}`, loc.file);
      }
    });

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
      await api_url_satuadmin.post("api/satupeta/Koleksi-Peta/addmulti", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
    setlocationku(response.data.resultlocation);
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

  function sweetsuccess() {
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
      },
    });
  }

  function sweeterror(error) {
    Swal.fire({
      title: "Gagal",
      html: error,
      timer: 1500,
      icon: "error",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const [step, setStep] = useState(1);

 
  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };

  
  const [errors, setErrors] = useState([]);

  const validateAll = () => {
    let newErrors = Array(locations.length).fill({}); // pastikan array sesuai panjang locations

    locations.forEach((loc, index) => {
      let rowErrors = {};

      if (!loc.koleksi_data) {
        rowErrors.koleksi_data = "Jenis koleksi data wajib dipilih";
      }

      if (!loc.tipe) {
        rowErrors.tipe = "Tipe map wajib dipilih";
      }

      // Kalau tipe selain Geomap/Layout → wajib pilih lokasi
      if (loc.tipe?.value && !(loc.tipe.value === "Geomap" || loc.tipe.value === "Layout")) {
        if (!loc.location_id) {
          rowErrors.location_id = "Lokasi wajib dipilih";
        }
      }

      if (!loc.title?.trim()) {
        rowErrors.title = "Judul wajib diisi";
      }

      if (!loc.satker_id) {
        rowErrors.satker_id = "Satker wajib dipilih";
      }

      if (!loc.sektor_id) {
        rowErrors.sektor_id = "Sektor wajib dipilih";
      }

      if (!loc.periode) {
        rowErrors.periode = "Periode wajib dipilih";
      }

      if (!loc.tahun_rilis || !/^\d{4}$/.test(loc.tahun_rilis)) {
        rowErrors.tahun_rilis = "Tahun rilis harus 4 digit";
      }

      if (!loc.visibilitas) {
        rowErrors.visibilitas = "Visibilitas wajib dipilih";
      }

      // ✅ Validasi file upload
      if (!loc.file) {
        rowErrors.file = "File wajib diupload";
      }

      newErrors[index] = rowErrors;
    });

    setErrors(newErrors);

    // return true kalau semua row tidak ada error
    return newErrors.every((row) => Object.keys(row).length === 0);
  };

  // tombol LANJUT
  const handleNext = () => {
    const isValid = validateAll();
    if (!isValid) {
      console.log("Form masih error, cek inputan");
      return;
    }
    // kalau valid, lanjut step
    nextStep();
  };


  

  return (
    <>
         <Link onClick={handleShow} className="col-span-3 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a mt-2">
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
                <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Lokasi Maplist</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2 bg-silver-light p-0">

              <div className="relative px-2">
                {step === 1 && (
                  <motion.div
                    key={step} // Add this line
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-100 mx-auto"
                  >

                    {locations.map((loc, index) => (
                        
                        <div key={index} className="mt-4">
                            <div className="grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2 -mt-4">
                                    
                                  <div className="mt-0 transisiku">
                                      <Autocomplete
                                        className="tsize-110"
                                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                        id="combo-box-location"
                                        options={[
                                          { label: "Peta Interaktif", value: "Peta Interaktif" },
                                          { label: "Peta Layout", value: "Peta Layout" }
                                        ]}
                                        getOptionLabel={(option) => option.label || ""}
                                        value={loc.koleksi_data || null}
                                        onChange={(event, newValue) => handleChange(index, "koleksi_data",newValue)}
                                        clearOnEscape
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Jenis Koleksi Data"
                                            variant="outlined"
                                            sx={(theme) => textFieldStyle(theme)}
                                            error={!!errors[index]?.koleksi_data}
                                            helperText={errors[index]?.koleksi_data}
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
                                <div className="sm:col-span-2 -mt-4">
                                    
                                    <div className="mt-0">
                                        <Autocomplete
                                          className="tsize-110"
                                          isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                          id="combo-box-location"
                                          options={[
                                            { label: "Layout", value: "Layout" },
                                            { label: "Geomap", value: "Geomap" },
                                            { label: "Marker", value: "Marker" },
                                          ]}
                                          getOptionLabel={(option) => option.label || ""}
                                          value={loc.tipe || null}
                                          onChange={(event, newValue) => handleChange(index, "tipe",newValue)}
                                          clearOnEscape
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Tipe Map"
                                              variant="outlined"
                                              sx={(theme) => textFieldStyle(theme)}
                                              error={!!errors[index]?.tipe}
                                              helperText={errors[index]?.tipe}
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
                                <div className="sm:col-span-2 -mt-4">
                                    <div className="mt-0">
                                      <Autocomplete
                                        className='tsize-110'
                                        disabled={loc.tipe && (loc.tipe?.value === "Geomap" || loc.tipe?.value === "Layout")}
                                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                        id="combo-box-location"
                                        options={locationku.map((row) => ({
                                          label: row.nama_location,
                                          value: row.id_location
                                        }))}
                                        getOptionLabel={(option) => option.label || ""}
                                        value={loc.location_id || null}
                                        onChange={(event, newValue) => handleChange(index, "location_id",newValue)}
                                        clearOnEscape
                                        renderInput={(params) => (
                                          <TextField
                                          {...params}
                                          label="Lokasi Infrastruktur"
                                          variant="outlined"
                                          sx={(theme) => textFieldStyle(theme)}
                                          error={!!errors[index]?.location_id}
                                          helperText={errors[index]?.location_id}
                                          />
                                        )}
                                        sx={{
                                            width: "100%",
                                            "& .MuiAutocomplete-popupIndicator": { color: "#1976d2", transition: "transform 0.3s" },
                                            "& .MuiAutocomplete-popupIndicatorOpen": { transform: "rotate(180deg)" }
                                        }}
                                      />
                                    </div>
                                </div>
                                <div className="sm:col-span-3 -mt-4">
                                    <div className="mt-0">
                                      <TextField
                                        label="Judul Maplist"
                                        className="bg-input rad15 w-full"
                                        value={loc.title}
                                        onChange={(e) => handleChange(index, "title", e.target.value)}
                                        error={!!errors[index]?.title}
                                        helperText={errors[index]?.title}
                                        InputProps={{
                                          endAdornment: (
                                            <>
                                              {loc.title && (
                                                <InputAdornment position="end">
                                                  <IconButton
                                                    onClick={() => handleChange(index, "title","")}
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
                                <div className="sm:col-span-3 -mt-4">
                                    <div className="mt-0">
                                      <Autocomplete
                                        className='tsize-110'
                                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                        id="combo-box-satker"
                                        options={satkerku.map((row) => ({
                                          label: row.nama_opd,
                                          value: row.id_opd
                                        }))}
                                        getOptionLabel={(option) => option.label || ""}
                                        value={loc.satker_id || null}
                                        onChange={(event, newValue) => handleChange(index, "satker_id",newValue)}
                                        clearOnEscape
                                        renderInput={(params) => (
                                          <TextField
                                          {...params}
                                          label="Satker"
                                          variant="outlined"
                                          sx={(theme) => textFieldStyle(theme)}
                                          error={!!errors[index]?.satker_id}
                                          helperText={errors[index]?.satker_id}
                                          />
                                        )}
                                        sx={{
                                            width: "100%",
                                            "& .MuiAutocomplete-popupIndicator": { color: "#1976d2", transition: "transform 0.3s" },
                                            "& .MuiAutocomplete-popupIndicatorOpen": { transform: "rotate(180deg)" }
                                        }}
                                      /> 
                                    </div>
                                </div>
                                <div className="sm:col-span-2 -mt-4">
                                    <div className="mt-0">
                                      <Autocomplete
                                        className='tsize-110'
                                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                        id="combo-box-sektor"
                                        options={sektorku.map((row) => ({
                                          label: row.nama_sektor,
                                          value: row.id_sektor
                                        }))}
                                        getOptionLabel={(option) => option.label || ""}
                                        value={loc.sektor_id || null}
                                        onChange={(event, newValue) => handleChange(index, "sektor_id",newValue)}
                                        clearOnEscape
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Sektor"
                                            variant="outlined"
                                            sx={(theme) => textFieldStyle(theme)}
                                            error={!!errors[index]?.sektor_id}
                                            helperText={errors[index]?.sektor_id}
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
                                <div className="sm:col-span-2 -mt-4">               
                                  <div className="mt-0 transisiku">
                                    <Autocomplete
                                      className="tsize-110"
                                      isOptionEqualToValue={(option, value) => option?.value === value?.value}
                                      id="combo-box-periode"
                                      options={[
                                        { label: "Harian", value: "Harian" },
                                        { label: "Mingguan", value: "Mingguan" },
                                        { label: "Bulanan", value: "Bulanan" },
                                        { label: "Tahunan", value: "Tahunan" }
                                      ]}
                                      getOptionLabel={(option) => option.label || ""}
                                      value={loc.periode || null}
                                      onChange={(event, newValue) => handleChange(index, "periode",newValue)}
                                      clearOnEscape
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Periode"
                                          variant="outlined"
                                          sx={(theme) => textFieldStyle(theme)}
                                          error={!!errors[index]?.periode}
                                          helperText={errors[index]?.periode}
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
                                
                                <div className="sm:col-span-2 -mt-4">
                                  <div className="mt-0 transisiku">
                                    <TextField
                                      label="Tahun Rilis"
                                      className="bg-input rad15 w-full"
                                      type="number"
                                      value={loc.tahun_rilis}
                                      onChange={(e) => handleChange(index, "tahun_rilis", e.target.value)}
                                      error={!!errors[index]?.tahun_rilis}
                                      helperText={errors[index]?.tahun_rilis}
                                      inputProps={{ maxLength: 4 }} // biar cuma 4 digit
                                      InputProps={{
                                        endAdornment: (
                                          <>
                                            {loc.pengukuran && (
                                              <InputAdornment position="end">
                                                <IconButton
                                                  onClick={() => handleChange(index, "tahun_rilis","")}
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
                                <div className="sm:col-span-3 -mt-4">
                                  <div className="mt-0">
                                      <TextField
                                        label="Pengukuran Skala"
                                        className="bg-input rad15 w-full"
                                        value={loc.pengukuran}
                                        onChange={(e) => handleChange(index, "pengukuran", e.target.value)}
                                        error={!!errors[index]?.pengukuran}
                                        helperText={errors[index]?.pengukuran}
                                        multiline   // <-- ini bikin jadi textarea
                                        rows={1}    // <-- tinggi awal textarea
                                        InputProps={{
                                          endAdornment: (
                                            <>
                                              {loc.pengukuran && (
                                                <InputAdornment position="end">
                                                  <IconButton
                                                    onClick={() => handleChange(index, "pengukuran","")}
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
                                            { label: "Publik", value: "Publik" },
                                          ]}
                                          getOptionLabel={(option) => option.label || ""}
                                          value={loc.visibilitas || null}
                                          onChange={(event, newValue) => handleChange(index, "visibilitas",newValue)}
                                          clearOnEscape
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Visibilitas"
                                              variant="outlined"
                                              sx={(theme) => textFieldStyle(theme)}
                                              error={!!errors[index]?.visibilitas}
                                              helperText={errors[index]?.visibilitas}
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
                                <div className="sm:col-span-6 -mt-2">
                                  <div className="mt-0">
                                      <TextField
                                        label="Deskripsi"
                                        className="bg-input rad15 w-full"
                                        value={loc.deskripsi}
                                        onChange={(e) => handleChange(index, "deskripsi", e.target.value)}
                                        error={!!errors[index]?.deskripsi}
                                        helperText={errors[index]?.deskripsi}
                                        multiline   // <-- ini bikin jadi textarea
                                        rows={7}    // <-- tinggi awal textarea
                                        InputProps={{
                                          endAdornment: (
                                            <>
                                              {loc.deskripsi && (
                                                <InputAdornment position="end">
                                                  <IconButton
                                                    onClick={() => handleChange(index, "deskripsi","")}
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
                                  </div>
                                </div>
                                <div className="sm:col-span-6 -mt-2">                     
                                  <div className="mt-0 transisiku grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <TextField
                                      type="file"
                                      label="Upload File"
                                      className="bg-input rad15 sm:col-span-4"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      onChange={(e) => handleImageChange(index, e)}  // ⬅️ per index
                                      error={!!errors[index]?.file}
                                      helperText={errors[index]?.file}
                                      InputProps={{
                                        endAdornment: (
                                          <>
                                            {loc.file && (
                                              <InputAdornment position="end">
                                                <IconButton
                                                  onClick={() => clearImage(index)}   // ⬅️ reset file + preview
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

                                    {loc.images && (
                                      <img
                                        src={loc.images}
                                        alt="preview"
                                        style={{ maxWidth: "100%", objectFit: "contain" }}  // ⬅️ camelCase
                                        className="rounded border p-1 sm:col-span-2"
                                      />
                                    )}
    
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
                            type="button"
                            onClick={handleNext}
                            className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                            <MdOutlineSave  className='mt-1 mx-1'  /><span>Lanjut</span>
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
                      className="md:w-1/2 mx-auto py-12">
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
              )}
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