import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Modal.css";
import "../../App.css";

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

  const deletePenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(apiurl+`backend_penduduk/${id}`);
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
          <button
              onClick={handleShow}
              className="btnku btnku-red m-1">
                <IoTrash   />
        </button>
  
        <Modal dialogClassName="my-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={deletePenduduk}>
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