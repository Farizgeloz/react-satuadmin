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
  const [satkerku, setsatkerku] = useState([""]);
  const [nama_locations, setnama_locations] = useState("");
  const [satker, setsatker] = useState(null);
  const [sektor, setsektor] = useState(null);
  const [visibilitas, setvisibilitas] = useState(null);

  const id_location = props.id_location;
  const id = props.title;
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 useEffect(() => {
  if (id_location) {
    getDataById();
  }
}, [id_location]);
  const getDataById = async () => {
    try {
      const response = await api_url_satuadmin.get(`satupeta/locations/detail/${id_location}`);

      // Ambil data utama
      setnama_locations(response.data.nama_location);
      setsatker({ value: response.data.satker_id, label: response.data.nama_opd });
      setsektor({ value: response.data.sektor_id, label: response.data.nama_sektor });
      setvisibilitas({ value: response.data.visibilitas, label: response.data.visibilitas });

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
    
    formData.append("nama_location",nama_locations);
    formData.append("satker_id",satker.value);
    formData.append("sektor_id",sektor.value);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Satu Peta Lokasi");
    formData.append("komponen","Update Lokasi Satu Peta");
    formData.append("visibilitas",visibilitas.value);
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
      await api_url_satuadmin.patch(`satupeta/locations/update/${id_location}`, formData, {
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

  
  function sweetsuccess(){
    Swal.fire({
        title: "Sukses",
        html: "Status Berhasil Diupdate",
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
          html: "Status Gagal Diupdate",
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
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
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
                <Modal.Title>{nama_locations}</Modal.Title>
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