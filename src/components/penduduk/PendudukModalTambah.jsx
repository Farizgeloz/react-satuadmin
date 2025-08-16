import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Modal.css";

import { 
  IoAddCircleOutline,
  IoLogoGoogle,
  IoPerson,
  IoAccessibility,
  IoKey 
} from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../App.css";
import Swal from 'sweetalert2';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//import Autocomplete from "../auto/Autocomplete";

const apiurl=process.env.REACT_APP_URL;


function ModalPendudukTambah() {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [tgl_lahir, setTgl_Lahir] = useState("");
  const [tempat_lahir, setTempat_Lahir] = useState("");
  const [jk, setJK] = useState("");
  const [kecamatanku, setKecamatanku] = useState([]);
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");

  const [selected, setSelected] = useState("");

  const [desa, setDesa] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getKecamatan = async () => {
    const response = await axios.get(
      apiurl+`get_kecamatan`
    );
    setKecamatanku(response.data.result);
  };

  getKecamatan();


  const savePenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/backend_penduduk", {
        name: name,
        nik: nik,
        tgl_lahir: tgl_lahir,
        tempat_lahir: tempat_lahir,
        kabupaten: kabupaten,
        kecamatan: kecamatan,
        desa: desa,
      });
      
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

  /*const dayList = [
    "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
  ];*/

  const styles = theme => ({
      textField: {
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'white',
          paddingBottom: 0,
          marginTop: 0,
          fontWeight: 500,
          
      },
  });

  return (

    <>
         
        <a
            onClick={handleShow}
            className="col-span-2  bg-white rounded text-link-sky text-center tsize-110 mt-1">
            <div className="py-2 px-2 h-9 mr-2 text-center  flex">
              <IoAddCircleOutline className="tsize-120 text-sky-600"  />
              <span className="mt-1 tsize-90">Tambah Data Baru</span>
            </div>
           
        </a>

        <Modal dialogClassName="my-modal4"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={savePenduduk}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><IoAddCircleOutline  className="tsize-90 text-sky-600 mt-1"  />Tambah Data Penduduk</h4>
                  
            </Modal.Header>
            <Modal.Body className="mt-2">
              <p>you selected: {selected} </p>
                    <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 -mt-2">
                          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                            <IoPerson className="mt-2 mx-2 text-cyan-500"  /> Nama Lengkap
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="Nama Lengkap"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              autoComplete="nama"
                              className="input-gray tsize-90"
                              />
                          </div>
                        </div>
                        <div className="sm:col-span-3 -mt-2">
                          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                            <IoPerson className="mt-2 mx-2 text-cyan-500"  />NIK
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="NIK"
                              value={nik}
                              onChange={(e) => setNik(e.target.value)}
                              type="text"
                              autoComplete="nik"
                              className="input-gray tsize-90"
                              />
                          </div>
                        </div>
                        

                        <div className="sm:col-span-2 -mt-2">
                          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                           <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Tanggal Lahir
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="Example@mail.com"
                              value={tgl_lahir}
                              onChange={(e) => setTgl_Lahir(e.target.value)}
                              type="text"
                              autoComplete="tgl_lahir"
                              className="input-gray tsize-90"
                              />
                          </div>
                        </div>
                        <div className="sm:col-span-2 -mt-2">
                          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                           <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Tempat Lahir
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="Example@mail.com"
                              value={tempat_lahir}
                              onChange={(e) => setTempat_Lahir(e.target.value)}
                              type="text"
                              autoComplete="tempat_lahir"
                              className="input-gray tsize-90"
                              />
                          </div>
                        </div>
                        <div className="col-span-2 -mt-2">
                          <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                           <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Jenis Kelamin
                          </label>
                          <div className="mt-2 grid grid-cols-1">
                              <select
                              value={jk}
                              onChange={(e) => setJK(e.target.value)}
                              autoComplete="role"
                              className="input-gray tsize-90"
                              >
                              <option value="L">Laki-Laki</option>
                              <option value="P">Perempuan</option>
                              </select>
                          
                          </div>
                        </div>
                        <div className="sm:col-span-2 -mt-2">
                          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                           <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Kabupaten
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="Kabupaten"
                              value={kabupaten}
                              onChange={(e) => setKabupaten(e.target.value)}
                              type="text"
                              autoComplete="kabupaten"
                              className="input-gray tsize-90"
                              />
                              
                          </div>
                        </div>
                        <div className="sm:col-span-2 -mt-2">
                          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                           <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Kecamatan
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="Kecamatan"
                              value={kecamatan}
                              onChange={(e) => setKecamatan(e.target.value)}
                              type="text"
                              autoComplete="kecamatan"
                              className="input-gray tsize-90"
                              />
                              
                              <Autocomplete
                                disablePortal
                                isOptionEqualToValue={(option, value) => option?.label === value?.label}
                                id="combo-box-demo"
                                options={
                                  kecamatanku.map((kec,index) => (
                                    kec.kecamatan
                              
                                  ))
                                }
                                defaultValue="Chairs"
                                fullwidth
                                value={kecamatan}
                                onChange={(event, value) => setKecamatan(value)}
                                renderInput={(params) => 
                                  <TextField {...params}  
                                  style={{
                                      borderRadius:10,
                                      color: "white",
                                      border: '2px solid gray',
                                  }}
                                  placeholder="Pilih Kecamatan" />
                                }
                                
                              />
                          </div>
                        </div>
                        <div className="sm:col-span-2 -mt-2">
                          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                           <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Desa
                          </label>
                          <div className="mt-2">
                              <input
                              placeholder="Desa"
                              value={desa}
                              onChange={(e) => setDesa(e.target.value)}
                              type="text"
                              autoComplete="desa"
                              className="input-gray tsize-90"
                              />
                          </div>
                        </div>
                        
                        
                    </div>

                
            </Modal.Body>
            <Modal.Footer>
                <button type="button"
                    className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClose}>
                    Close
                </button>
                <button
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Simpan
                </button>
            </Modal.Footer>
            </form>
        </Modal>

    </>

    
  );
}

export default ModalPendudukTambah;