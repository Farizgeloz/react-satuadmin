import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Modal.css";
import "../../../App.css";

import { FaPlus } from "react-icons/fa"
import { IoTrash } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';


const apiurl=process.env.REACT_APP_URL;



function ModalDelete(props) {
  const id = props.id;
  const name = props.name;
  
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteKategori = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(apiurl+`backend_satudata_kategori/${id}`);
      //navigate("/");
      setShow(false);
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
        icon: "error",
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
           <a href="#" onClick={handleShow} className="max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-1">
              <button 
                    className="bg-red-500 hover:bg-red-400 text-white font-bold textsize9 py-1 px-3 border-b-4 border-red-700 hover:border-red-500 rounded-xl d-flex">
                      <IoTrash   className="mt-1 mx-1" />
              </button>
            </a>
  
        <Modal dialogClassName="my-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={deleteKategori}>
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