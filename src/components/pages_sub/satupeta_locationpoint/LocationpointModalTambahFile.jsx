import React, { useState, useEffect} from "react";
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

import Papa from "papaparse";
import * as XLSX from "xlsx";

import { MdAddCircle,MdErrorOutline,MdOutlineArrowCircleLeft,MdOutlineArrowCircleRight,
        MdOutlineQrCode,MdOutlineMap,MdOutlinePerson4,MdPermDeviceInformation,MdAccessibility,
        MdCalendarMonth,MdOutlineShortText,MdOutlineTag,MdOutlineScale,MdDescription,MdFileUpload, 
        MdDisabledVisible,
        MdOutlineSave,
        MdCategory,
        MdOutlineErrorOutline,
        MdArrowCircleRight} from "react-icons/md";
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

function DatasetModalTambahFile() {
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [locationku, setlocationku] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false); // <<--- ERROR FLAG
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50; // bisa diganti 20/100
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }; */

  useEffect(() => {
        getDatasetItem();
  }, []);
  const getDatasetItem = async () => {
    const response = await api_url_satuadmin.get("api/satupeta/map_data/admin", {
      params: { search_satker:userloginsatker }
    });

    const data = response.data;
    setlocationku(response.data.resultlocation);
    console.log("locationku:", data.resultlocation);
    
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);

    const ext = f.name.split('.').pop().toLowerCase();

    // reset error dulu
    setErrorLocation("");

    // 👉 allowed location dari JSON locationku
    const allowedValues = locationku.map((loc) => String(loc.id_location));

    if (ext === "csv") {
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rows = results.data;

          // VALIDASI LOCATION
          const invalid = rows.filter(
            (r) => !allowedValues.includes(String(r.location).trim())
          );

          if (invalid.length > 0) {
            setErrorLocation(
              `❌ Ada baris dengan nilai 'location' tidak valid. Hanya boleh: ${allowedValues.join(", ")}.`
            );
          } else {
            setErrorLocation("");
          }

          setPreviewData(rows);
          setShowPreview(true);
        },
      });
    } 
    else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        // VALIDASI LOCATION
        const invalid = data.filter(
          (r) => !allowedValues.includes(String(r.location).trim())
        );

        if (invalid.length > 0) {
          setErrorLocation(
            `❌ Ada baris dengan nilai 'location' tidak valid. Hanya boleh: ${allowedValues.join(", ")}.`
          );
        } else {
          setErrorLocation("");
        }

        setPreviewData(data);
        setShowPreview(true);
      };
      reader.readAsBinaryString(f);
    }
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
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses update data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      setMessage("");
      const res = await api_url_satuadmin.post(
        "api/satupeta/location_point/addcsv",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      Swal.close(); // tutup loading swal
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
              <h4 className="text-sky-600 flex"><MdAddCircle  className="textsize10 text-sky-600 mt-1"  />Tambah Lokasi Maplist Lewat File</h4>
              
          </Modal.Header>
          <Modal.Body className="mt-2 bg-silver-light px-5">

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <TextField
                  type="file"
                  label="Pilih file (CSV/XLS/XLSX)"
                  className="bg-input rad15 w-100"
                  inputProps={{
                    accept: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json', // hanya file gambar
                  }}
                  alt=""
                  InputLabelProps={{
                    shrink: true, // biar label tetap tampil di atas saat file dipilih
                  }}
                  onChange={handleFileChange}
                  sx={(theme) => textFieldStyle(theme)}
                />
              </Form.Group>
             
            </Form>
            {message && (
              <Alert className="mt-3" variant={message.startsWith("✅") ? "success" : "danger"}>
                {message}
              </Alert>
            )}

            {/* ================= PREVIEW DATA ================= */}
            {showPreview && (
              <div className="card mt-4 p-3">
                <h5>Konfirmasi Data Upload</h5>

                <p>
                  Pastikan kolom <b>location</b> sesuai dengan level akses yang Anda miliki
                  <br />
                  <b>{locationku.map(l => l.nama_location +"=>"+ l.id_location).join(", ")}</b>
                </p>

                {/* PAGINATION */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    Total Data: <b>{previewData.length}</b>
                  </div>

                  <div>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      ‹ Prev
                    </button>

                    <span>
                      Page <b>{currentPage}</b> / {Math.ceil(previewData.length / rowsPerPage)}
                    </span>

                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      disabled={currentPage === Math.ceil(previewData.length / rowsPerPage)}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Next ›
                    </button>
                  </div>
                </div>

                {/* TABLE */}
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr>
                        {Object.keys(previewData[0] || {}).map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {previewData
                        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                        .map((row, i) => {
                          const allowedValues = locationku.map((loc) =>
                            String(loc.id_location)
                          );
                          const isValid = allowedValues.includes(
                            String(row.location).trim()
                          );

                          return (
                            <tr key={i}>
                              {Object.keys(row).map((col) => (
                                <td
                                  key={col}
                                  className={
                                    col === "location"
                                      ? isValid
                                        ? "bg-success text-white"
                                        : "bg-danger text-white"
                                      : ""
                                  }
                                >
                                  {row[col]}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {/* UPLOAD BUTTON */}
                 {!errorLocation && (
                <button 
                    type="submit"
                     disabled={errorLocation}
                    className="w-50 bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1 mt-3">
                    <MdOutlineSave  className='mt-1 mx-1'  /><span>{loading ? <Spinner animation="border" size="sm" /> : "✔ Konfirmasi & Upload"}</span>
                </button>  
                 )}

                {errorLocation && (
                  <p className="text-danger mt-2">
                    ⚠ Ada baris yang kolom <b>location</b>-nya tidak sesuai. Hanya boleh:{" "}
                    <b>{locationku.map((l) => l.nama_location+"=>"+l.id_location).join(", ")}</b>
                  </p>
                )}
              </div>
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