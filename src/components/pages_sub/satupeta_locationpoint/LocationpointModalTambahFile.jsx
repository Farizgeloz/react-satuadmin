import React, { useState } from "react";
import { Form, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import { MdAddCircle,MdErrorOutline,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,
        MdOutlineQrCode,MdOutlineMap,MdOutlinePerson4,MdPermDeviceInformation,MdAccessibility,
        MdCalendarMonth,MdOutlineShortText,MdOutlineTag,MdOutlineScale,MdDescription,MdFileUpload, 
        MdDisabledVisible,
        MdOutlineSave,
        MdCategory,
        MdOutlineErrorOutline,
        MdArrowCircleRight} from "react-icons/md";

const apiurl = process.env.REACT_APP_URL;

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

function DatasetModalTambahFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Silakan pilih file CSV/Excel terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(
        apiurl + "api/satupeta/location_point/addcsv",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      sweetsuccess(`✅ ${res.data.message} | Inserted: ${res.data.inserted}, Skipped: ${res.data.skipped}`);
      
    } catch (err) {
      if (err.response?.status === 400) {
        setMessage(`❌ Upload gagal: ${err.response.data.error} (${err.response.data.detail})`);
      } else {
        setMessage(`❌ Terjadi error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  function sweetsuccess(msg){
    Swal.fire({
        title: "Sukses",
        html: msg,
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

  return (
    <>
      <Link onClick={handleShow} className="col-span-1 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right mt-2 ">
        <button 
          className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
            <MdAddCircle className="mt-1 mx-1" /><span>Upload Data</span>
        </button>
      </Link>
    
      <Modal dialogClassName="my-modal3"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
          <Modal.Header closeButton className="border-b ">
              <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Lokasi Maplist Lewat File</h4>
              
          </Modal.Header>
          <Modal.Body className="mt-2 bg-silver-light px-5">

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <TextField
                  type="file"
                  label="Pilih file (CSV/XLS/XLSX)"
                  className="bg-input rad15 w-100"
                  inputProps={{
                    accept: "image/*", // hanya file gambar
                  }}
                  alt=""
                  InputLabelProps={{
                    shrink: true, // biar label tetap tampil di atas saat file dipilih
                  }}
                  onChange={handleFileChange}
                  sx={(theme) => textFieldStyle(theme)}
                />
              </Form.Group>
              <button 
                  type="submit"
                  className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1 mt-3">
                  <MdOutlineSave  className='mt-1 mx-1'  /><span>{loading ? <Spinner animation="border" size="sm" /> : "Upload"}</span>
              </button>  
            </Form>
            {message && (
              <Alert className="mt-3" variant={message.startsWith("✅") ? "success" : "danger"}>
                {message}
              </Alert>
            )}
              
          </Modal.Body>
          <Modal.Footer>
              <button type="button"
                  className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleClose}>
                  Keluar
              </button>
                
              
          </Modal.Footer>
      </Modal>
    </>  
  );
}

export default DatasetModalTambahFile;