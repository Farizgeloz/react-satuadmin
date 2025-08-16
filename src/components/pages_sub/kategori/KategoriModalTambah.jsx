import React, { useState} from "react";
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import { MdAddCircle,MdAccessibility,MdPerson,MdEmail, MdPassword, MdAdd, MdOutlineSave, MdOutlineExitToApp, MdErrorOutline} from "react-icons/md";



function ModalTambahKategori() {
  const [kategori, setkategori] = useState("");
  const [validasi_kategori, setvalidasi_kategori] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveKategori = async (e) => {
    e.preventDefault();
    if (kategori.length>3) {
      try {
        await axios.post("http://localhost:5000/backend_satudata_kategori", {
          kategori: kategori,
        });
        
        //navigate("/");
        setShow(false);
        sweetsuccess();
        
      } catch (error) {
        console.log(error);
        sweeterror();
      }
    }else{
      setvalidasi_kategori(true);
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
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah Kategori</span>
          </button>
        </Link>

        <Modal dialogClassName="my-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={saveKategori}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Data Kategori</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2">
              <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdPerson className="mt-1 mx-2 text-cyan-500"  /> Kategori
                    </label>
                    <div className="">
                        <input
                        placeholder="Kategori Sektoral"
                        value={kategori}
                        onChange={(e) => setkategori(e.target.value)}
                        type="text"
                        autoComplete="nama"
                        className="input-gray tsize-90"
                        />
                        {validasi_kategori && <p className="transisi mb-0 text-red-700 d-flex"><MdErrorOutline  className="mt-1 mx-2" />Minimal 3 karakter.</p>}
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

export default ModalTambahKategori;