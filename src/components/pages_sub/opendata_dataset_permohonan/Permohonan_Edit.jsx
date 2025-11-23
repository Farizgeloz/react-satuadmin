import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import {Row,Col,Image} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { motion, useAnimation } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineQrCode,
        MdOutlineMap,
        MdOutlinePerson4,
        MdOutlineArrowCircleLeft,
        MdOutlineSave} from "react-icons/md";


import _ from "lodash";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from "@mui/icons-material/Clear";
import { api_url_satuadmin, api_url_satudata } from "../../../api/axiosConfig";

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

const textFieldStyleMulti = (theme) => ({
  "& .MuiOutlinedInput-root": {
    height: 'auto',
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

function DatasetPengelolah() {
  
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [tiketDetail, setTiketDetail] = useState(null);
  const [jumlahTiketMap, setJumlahTiketMap] = useState({});

  const [loadingDetail, setLoadingDetail] = useState(false);  
  const [opd, setOpd] = useState("");
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState({ label: "Proses", value: "Proses" });
  const [loading, setLoading] = useState(false);

  
  
  const navigate = useNavigate();
  const { id } = useParams();

   
  useEffect(() => {
    getDataById();

  }, [tiketDetail]);
  

  const getDataById = async () => {
    try {
      const res = await api_url_satuadmin.get(`api/opendata/dataset_permohonan/detail/${id}`);
      const permohonan = res.data.permohonan;
      const tiket = res.data.tiket; // kalau butuh tiket juga
      
      setSelectedDetail(permohonan);
      setTiketDetail(tiket);
      const res3 = await api_url_satudata.get("dataset?limit=1000");
      const allDataset = res3.data || [];

      const satkerList = allDataset
      .map(item => ({
          id_opd: item.opd?.id_opd,
          nama_opd: item.opd?.nama_opd,
      }))
      .filter(opd => opd.id_opd && opd.nama_opd);

      // Buat unique berdasarkan id_opd
      const uniqueSatker = Array.from(
      new Map(satkerList.map(opd => [opd.id_opd, opd])).values()
      );

      // 🟢 Cocokkan nama OPD berdasarkan id_opd dari response
      const opd_id_from_response =
        typeof permohonan.opd === "object"
          ? permohonan.opd?.id_opd
          : permohonan.opd;

      const matchedOpd = uniqueSatker.find(opd => opd.id_opd === opd_id_from_response);

      setOpd(matchedOpd ? matchedOpd.nama_opd : permohonan.nama_opd || "-");
      //console.log("selectdata:", res3.data);
      
    } catch (err) {
      console.error("Gagal ambil detail:", err);
      setSelectedDetail(null);
    } finally {
      setLoadingDetail(false);
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault(); // ⛔ hentikan reload form bawaan browser
  try {
    const payload = {
      from: "Admin", // 🔹 tiket unik
      to: "Pemohon", // 🔹 tiket unik
      nomor_tiket: selectedDetail.nomor_tiket,
      pesan: pesan,
      status: status.value,
      admin: String(userloginadmin),
      jenis: "Permohonan Dataset",
      komponen: "Balas Permohonan Dataset"
    };

    await api_url_satuadmin.post("api/opendata/dataset_permohonan/tiket", payload);
    sweetsuccess();
    //console.log("pesannya" + response.data.msg);

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
              //navigate(`/Data-Dataset`);
        }
      }).then((result) => {
      });
  }
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

  
  
 
  // Format tanggal Indonesia aman
function convertDate(datePicker) {
  if (!datePicker) return "-";
  const selectedDate = new Date(datePicker);
  if (isNaN(selectedDate)) return "-";

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const day = selectedDate.getDate();
  const monthName = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();
  const jam = String(selectedDate.getHours()).padStart(2, "0");
  const menit = String(selectedDate.getMinutes()).padStart(2, "0");
  const detik = String(selectedDate.getSeconds()).padStart(2, "0");

  return `${day} ${monthName} ${year} Waktu : ${jam}:${menit}:${detik} WIB`;
}



  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Opendata Dataset Permohonan Tiket" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Opendata/Dataset/Permohonan" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Dataset Permohonan
          </NavLink> /
          <NavLink  className="text-silver-a mr-2 d-flex textsize10">
            <MdEditSquare className="mt-1 textsize10" />Pesan Tiket
          </NavLink>
        </p>
      </div>
        
      <main>
        <div className=' shaddow1 rad15 mx-0'>
          
          <Row className='p-1 mx-2'>
            
            <Col md={12} sm={12} className=' bg-linear-9 align-middle justify-content-center align-self-center mt-1 rad15'>
              
            </Col>
            
            
            
          </Row>
          
        </div>
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={handleSubmit}>
            <div className="relative flex px-5">
              <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
                  <div className="md:col-span-3 -mt-2">
                    {loadingDetail ? (
                      <p>Sedang memuat data...</p>
                    ) : selectedDetail ? (
                      <table className="table table-bordered table-sm">
                        <tbody>
                          <tr>
                            <th className="bg-light w-25">Nomor Tiket</th>
                            <td>{selectedDetail.nomor_tiket}</td>
                          </tr>
                          <tr>
                            <th>Nama Lengkap</th>
                            <td>{selectedDetail.nama_lengkap}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{selectedDetail.email}</td>
                          </tr>
                          <tr>
                            <th>Telpon</th>
                            <td>{selectedDetail.telpon}</td>
                          </tr>
                          <tr>
                            <th>Pekerjaan</th>
                            <td>{selectedDetail.pekerjaan}</td>
                          </tr>
                          <tr>
                            <th>Instansi</th>
                            <td>{selectedDetail.instansi}</td>
                          </tr>
                           <tr>
                            <th>Bidang Usaha</th>
                            <td>{selectedDetail.bidang_usaha}</td>
                          </tr>
                           <tr>
                            <th>Bidang Ilmu</th>
                            <td>{selectedDetail.bidang_ilmu}</td>
                          </tr>
                           <tr>
                            <th>Jabatan</th>
                            <td>{selectedDetail.jabatan}</td>
                          </tr>
                          <tr>
                            <th>Judul Permohonan</th>
                            <td>{selectedDetail.judul}</td>
                          </tr>
                          <tr>
                            <th>OPD Tujuan</th>
                            <td>{opd}</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>{selectedDetail.status}</td>
                          </tr>
                          <tr>
                            <th>Tanggal Dibuat</th>
                            <td>{convertDate(selectedDetail.created_at)}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p>Data tidak ditemukan</p>
                    )}

                    <div className="mt-0 mb-2 transisiku">
                      <Autocomplete
                        className="tsize-110"
                        isOptionEqualToValue={(option, value) => option?.value === value?.value}
                        id="combo-box-location"
                        options={[
                          { label: "Proses", value: "Proses" },
                          { label: "Selesai", value: "Selesai" }
                        ]}
                        getOptionLabel={(option) => option.label || ""}
                        value={status}
                        onChange={(event, newValue) => setStatus(newValue)}
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Status"
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
                    <div className="mt-0 transisiku">
                      <TextField
                        label="Pesan"
                        className="bg-input rad15 w-full"
                        value={pesan}
                        onChange={(e) => setPesan(e.target.value)}
                        multiline
                        rows={4} // <-- jumlah baris awal (bisa disesuaikan)
                        InputProps={{
                          endAdornment: (
                            <>
                              {pesan && (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setPesan("")}
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
                        sx={(theme) => textFieldStyleMulti(theme)}
                      />

                      
                        
                    </div>
                    <div className="flex justify-center mt-12">
                        <button 
                            type="button"
                            className="bg-slate-500 hover:bg-slate-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
                            <MdOutlineArrowCircleLeft  className='mt-1 mx-1'  /><span>Clear</span>
                        </button>
                        <button 
                            type="submit"
                            className="bg-green-500 hover:bg-green-400 text-white font-bold textsize10 py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                            <MdOutlineSave  className='mt-1 mx-1'  /><span>Kirim Pesan</span>
                        </button>
                      </div>

                  </div>
                  <div className="md:col-span-3 -mt-2">
                      {loadingDetail ? (
                        <p>Sedang memuat data...</p>
                      ) : selectedDetail ? (
                        
                        <div style={{ maxHeight: "71vh", }} className="py-2 px-3 overflow-yy-auto">
                            {tiketDetail.map((message) => (
                              
                              <div key={message.id_permohonan} className="p-1">
                                {/* Info pengirim & tanggal */}
                                <div
                                  className={`d-flex ${
                                    message.from === "Admin" ? "justify-content-end" : "justify-content-start"
                                  }`}
                                >
                                  {message.from === "Admin" ? (
                                    <>
                                      <p className="mb-0 italicku text-silver text-end px-5">
                                        {convertDate(message.updated_at)}
                                      </p>
                                      <p className="mb-0 italicku text-body text-end">Anda</p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="mb-0 italicku text-body text-end">Pemohon</p>
                                      <p className="mb-0 italicku text-silver text-end px-5">
                                        {convertDate(message.updated_at)}
                                      </p>
                                    </>
                                  )}
                                </div>

                                {/* Pesan */}
                                <div
                                  className={`rad10 py-2 pb-1 px-3 font_weight600 ${
                                    message.from === "Admin"
                                      ? "text-right"
                                      : "text-left bg-border2"
                                  } ${message.status === "read" ? "text-primary" : "text-body"}`}
                                  style={{
                                    backgroundColor: message.from === "Admin" ? "#94da828c" : "",
                                    whiteSpace: "pre-line",
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                    borderRadius: "10px",
                                    pointerEvents: "auto",
                                  }}
                                >
                                  {message.pesan.split(/((?:https?:\/\/|www\.)[^\s]+)/g).map((part, index) => {
                                    const isLink = /^(https?:\/\/|www\.)/.test(part);
                                    if (!isLink) return part;

                                    const href = part.startsWith("http") ? part : `http://${part}`;

                                    return (
                                      <Link
                                        to={`/Dashboard`}
                                        target="_blank"
                                        key={index}
                                        rel="noopener noreferrer"
                                        style={{
                                          textDecoration: "underline",
                                          color: "#007bff",
                                          cursor: "pointer",
                                          pointerEvents: "auto",
                                          wordBreak: "break-all",
                                          position: "relative",
                                          zIndex: 10,
                                        }}
                                      >
                                          {part}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>


                            ))}
                        </div>
                      ) : (
                        <p>Data tidak ditemukan</p>
                      )}
                  </div>
                </div>
              </div>
            </div>            
          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default DatasetPengelolah;
