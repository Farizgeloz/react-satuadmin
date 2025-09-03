import React, { useState} from "react";
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import { MdAddCircle,MdAccessibility,MdPerson,MdEmail, MdPassword, MdAdd, MdOutlineSave, MdOutlineExitToApp, MdOutlineQrCode, MdOutlineMap, MdOutlinePerson4, MdOutlineErrorOutline} from "react-icons/md";



function ModalTambahUser() {
  const [kode, setkode] = useState("");
  const [wilayah, setwilayah] = useState("");
  const [organisasi, setorganisasi] = useState("");
  

  const [validasi_kode, setvalidasi_kode] = useState(false);
  const [validasi_wilayah, setvalidasi_wilayah] = useState(false);
  const [validasi_organisasi, setvalidasi_organisasi] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("kode",kode);
    formData.append("wilayah",wilayah);
    formData.append("organisasi",organisasi);
    if (kode.length<1) {setvalidasi_kode(true);}else{setvalidasi_kode(false);}
    if (wilayah.length<1) {setvalidasi_wilayah(true);}else{setvalidasi_wilayah(false);}
    if (organisasi.length<1) {setvalidasi_organisasi(true);}else{setvalidasi_organisasi(false);}

    if(kode.length>=1 && wilayah.length>=1 && organisasi.length>=1){
      try {
      await axios.post(`http://localhost:5000/backend_satudata_produsen`, formData, {
          headers: {
          "Content-type": "multipart/form-data",
          },
      });
      sweetsuccess();
      setShow(false);
      
      } catch (error) {
        sweeterror(error);
      
      }
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
  }
  function sweeterror(){
      Swal.fire({
          title: "Gagal",
          html: "Data Gagal Disimpan",
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

  return (

    <>
            
        
        <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Produsen</span>
          </button>
        </Link>

        <Modal dialogClassName="my-modal2"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveUser}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Data Produsen</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2">
              <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <MdOutlineQrCode className="mt-1 mx-2 text-cyan-500"  /> Kode
                    </label>
                    <div className="mt-0 transisiku">
                        <input
                        placeholder="Masukkan Nama Lengkap"
                        value={kode}
                        onChange={(e) => setkode(e.target.value)}
                        type="text"
                        autoComplete="kode"
                        className="input-gray tsize-110"
                        />
                        {validasi_kode && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Wilayah
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
                        {validasi_wilayah && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                    </div>
                  </div>
                  <div className="sm:col-span-6 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Organisasi
                    </label>
                    <div className="mt-0">
                        
                        <input
                        placeholder="Masukkan Produk Data"
                        value={organisasi}
                        onChange={(e) => setorganisasi(e.target.value)}
                        type="text"
                        autoComplete="organisasi"
                        className="input-gray tsize-110"
                        />
                        {validasi_organisasi && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                    </div>
                  </div>
                                    
              </div>

                
            </Modal.Body>
            <Modal.Footer>
                <button 
                    type="button"
                    onClick={handleClose}
                    className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
                    <MdOutlineExitToApp  className='mt-1 mx-1'  /><span>Batal</span>
                </button>
                <button 
                    type="submit"
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                    <MdOutlineSave  className='mt-1 mx-1'  /><span>Simpan</span>
                </button>
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalTambahUser;