import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Modal.css";
import "../../../App.css";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IoSwapHorizontal, IoTrash } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import Tooltip from "@mui/material/Tooltip";
import { api_url_satuadmin } from "../../../api/axiosConfig";


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


function ModalStatus(props) {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [sektorku, setsektorku] = useState([""]);
  const [locationku, setlocationku] = useState([""]);
  const [satkerku, setsatkerku] = useState([""]);
  const [location, setlocation] = useState(null);
  const [satker, setsatker] = useState(null);
  const [sektor, setsektor] = useState(null);
  const [id_data, setid_data] = useState(null);
  const [koleksi_data, setkoleksi_data] = useState(null);
  const [title, settitle] = useState("");
  const [tahun, settahun] = useState("");
  const [pengukuran, setpengukuran] = useState("");
  const [deskripsi, setdeskripsi] = useState("");
  const [tipe, settipe] = useState(null);
  const [periode, setperiode] = useState(null);
  const [visibilitas, setvisibilitas] = useState(null);

  const id_maplist = props.id_maplist;
  const id = props.title;
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 useEffect(() => {
  if (id_maplist) {
    getDataById();
  }
}, [id_maplist]);
  const getDataById = async () => {
    try {
      const response = await api_url_satuadmin.get(`satupeta/Koleksi-Peta/detail/${id}`);

      // Ambil data utama
      setid_data(response.data.data.id_maplist);
      setkoleksi_data({ value: response.data.data.koleksi_data, label: response.data.data.koleksi_data });
      settitle(response.data.data.title);
      settahun(response.data.data.tahun_rilis);
      settipe({ value: response.data.data.tipe, label: response.data.data.tipe });
      //setimages(response.data.data.presignedUrl);
      setperiode({ value: response.data.data.periode, label: response.data.data.periode });
      setvisibilitas({ value: response.data.data.visibilitas, label: response.data.data.visibilitas });
      setlocation({ value: response.data.data.location_id, label: response.data.data.nama_location });
      setsatker({ value: response.data.data.satker_id, label: response.data.data.nama_opd });
      setsektor({ value: response.data.data.sektor_id, label: response.data.data.nama_sektor });
      
      
      setpengukuran(response.data.data.pengukuran);
      setdeskripsi(response.data.data.deskripsi);

      
      

    } catch (err) {
      console.error("❌ Gagal ambil data detail:", err);
    }
  };

  const updateStatus = async (e) => {
    e.preventDefault();
    let locationn=location.value;
    if(locationn === null){
      locationn="0";
    }
    const formData = new FormData();
    
    formData.append("koleksi_data",koleksi_data.value);
    formData.append("title",title);
    formData.append("tahun_rilis",tahun);
    formData.append("pengukuran",pengukuran);
    formData.append("deskripsi",deskripsi);
    formData.append("tipe",tipe.value);
    formData.append("periode",periode.value);
    /* formData.append(
      "visibilitas",
      rolelogin === "Super Admin" || rolelogin === "Admin"
        ? visibilitas.value
        : "Privat"
    ); */
    formData.append("visibilitas",visibilitas.value);
    formData.append("location_id",locationn);
    formData.append("satker_id",satker.value);
    formData.append("sektor_id",sektor.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis", "Satu Peta Koleksi");
    formData.append("komponen", "Update Status Koleksi Satu Peta" );
    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses update data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await api_url_satuadmin.patch(`satupeta/Koleksi-Peta/update/${id_data}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
      
    } catch (error) {
      sweeterror(error.response?.data?.msg || "Terjadi kesalahan.");
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses hapus data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const payload = {
        admin: userloginadmin,
        jenis: "Satu Peta Koleksi",
        komponen: "Delete Koleksi Satu Peta"
      };

      await api_url_satuadmin.delete(`satupeta/Koleksi-Peta/delete/${id}`, {
        data: payload, // body DELETE dikirim lewat "data"
        headers: { 'Content-Type': 'application/json' }
      });
      //navigate("/");
      setShow(false);
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
      
    } catch (error) {
      console.log(error);
      sweeterror();
    }
  };

  function sweetsuccess(){
    Swal.fire({
        title: "Sukses",
        html: "Data Berhasil Dihapus",
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
  function sweeterror(){
      Swal.fire({
          title: "Gagal",
          html: "Data Gagal Dihapus",
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
  }

  const getStatusOptions = () => {
    if (rolelogin === "Super Admin") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
        { label: "Publik", value: "Publik" },
        { label: "Privat", value: "Privat" },
      ];
    } else if (rolelogin === "Admin") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
        { label: "Publik", value: "Publik" },
        { label: "Privat", value: "Privat" },
      ];
      
    } else if (rolelogin === "Operator") {
      return [
        { label: "Pending", value: "Pending" },
        { label: "Verified", value: "Verified" },
      ]; // atau return [] jika tidak boleh pilih sama sekali
    } else if (rolelogin === "Operator Opd") {
      return [
        { label: "Draft", value: "Draft" }
      ]; // atau return [] jika tidak boleh pilih sama sekali
    } else if (rolelogin === "Verifikator Opd") {
      return [
        { label: "Draft", value: "Draft" },
        { label: "Pending", value: "Pending" },
      ]; // atau return [] jika tidak boleh pilih sama sekali
    } else {
      return [];
    }
  };

  return (

    <>
        <Tooltip title="Edit Status" arrow>
          <Link to="#" onClick={handleShow} className="flex items-center justify-center mb-[2px]">
            <button 
                  className="bg-purple-500 hover:bg-red-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                    <IoSwapHorizontal   />
            </button>
          </Link>
        </Tooltip>
        
  
        <Modal dialogClassName="my-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={updateStatus}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                        <div className="p-3 rad15 border bg-white shadow-sm">


                          <Autocomplete
                            className='tsize-110'
                            //disabled={rolelogin !== "Super Admin" && rolelogin !== "Admin"}   // ⬅ DISABLE jika bukan admin
                            isOptionEqualToValue={(option, value) => option?.value === value?.value}
                            id="combo-box-location"
                            options={getStatusOptions()}
                            getOptionLabel={(option) => option.label || ""}
                            
                            // jika bukan admin, value dipaksa privat
                            value={visibilitas
                            }

                            onChange={(event, newValue) => {
                              // jika bukan admin → jangan bisa ubah
                              //if (rolelogin !== "Super Admin" && rolelogin !== "Admin") return;

                              setvisibilitas(newValue);
                            }}

                            clearOnEscape
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                className="bg-input rad15 w-full"
                                InputLabelProps={{ shrink: false }}
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
                
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                    className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClose}>
                    Close
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Update
                </button>
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalStatus;