import React, { useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Modal.css";
import "../../../App.css";

import { FaPlus } from "react-icons/fa"
import { IoTrash } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { api_url_satuadmin } from "../../../api/axiosConfig";


const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
const userloginadmin = userlogin.id || '';



function ModalDelete(props) {
  const id = props.id;
  const name = props.name;
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        jenis: "Satu Peta Artikel",
        komponen: "Delete Artikel Satu Peta"
      };

      await api_url_satuadmin.delete(`api/satupeta/map_artikel/delete/${id}`, {
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

  return (

    <>

        <Link
          to={`#`}
           onClick={handleShow} 
           className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right"
        >
            <button 
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                    <IoTrash   />
            </button>
        </Link>
        
  
        <Modal dialogClassName="my-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={deleteUser}>
            <Modal.Header closeButton>
                <Modal.Title>Hapus Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                    <p>Anda yakin akan hapus data "{name}"?</p>
                
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                    className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClose}>
                    Close
                </button>
                <button
                    className="bg-red-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Delete
                </button>
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalDelete;