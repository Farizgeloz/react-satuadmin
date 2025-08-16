import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate,Link, NavLink } from "react-router-dom";
import "../../styles/Modal.css";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import "../../../App.css";
import Swal from 'sweetalert2';

import { MdAddCircle,MdAccessibility,MdPerson,MdEmail, MdPassword, MdOutlineSave, MdOutlineExitToApp,
        MdErrorOutline,MdOutlinePerson4,MdCategory} from "react-icons/md";

const apiurl=process.env.REACT_APP_URL;

function ModalTambahUser() {
  const [satkerku, setsatkerku] = useState([]);
  const [kategoriku, setkategoriku] = useState([]);
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [satker, setsatker] = useState("");
  const [jabatan, setjabatan] = useState("");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getDatasetItem()
    
  }, [satker]);

  const getDatasetItem = async () => {
    const response = await axios.get(apiurl + 'api/opendata/dataset_item');

    const data = response.data;
    setsatkerku(response.data.resultSatker);
    setkategoriku(response.data.resultBidangUrusan);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiurl+"backend_users", {
        name: name,
        nick: nick,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
        satker: satker,
        jabatan: jabatan,
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

  return (

    <>
            
        
        <Link onClick={handleShow} className="col-span-2 max-[640px]:col-span-2 tsize-130 font-semibold text-white-a flex-right ">
          <button 
            className="styles_button__u_d5l h-6v hover:bg-teal-600 text-white font-bold py-1 px-4 border-b-4 border-teal-600 hover:border-teal-500 rounded-xl d-flex">
              <MdAddCircle className="mt-1 mx-1" /><span>Tambah User</span>
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
                <h4 className="text-sky-600 flex"><MdAddCircle  className="tsize-90 text-sky-600 mt-1"  />Tambah Data User</h4>
                
            </Modal.Header>
            <Modal.Body className="mt-2">
              <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdPerson className="mt-1 mx-2 text-cyan-500"  /> Nama Lengkap
                    </label>
                    <div className="">
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
                      <MdPerson className="mt-1 mx-2 text-cyan-500"  />Nama Panggilan
                    </label>
                    <div className="">
                        <input
                        placeholder="Nama Panggilan"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        type="text"
                        autoComplete="namapanggilan"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>

                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdEmail className="mt-1 mx-2 text-cyan-500"  />Email
                    </label>
                    <div className="">
                        <input
                        placeholder="Example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        autoComplete="email"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="col-span-3 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdAccessibility  className="mt-1 mx-2 text-cyan-500"  />Role
                    </label>
                    <div className=" grid grid-cols-1">
                        <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        autoComplete="role"
                        className="input-gray tsize-90"
                        >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        </select>
                    
                    </div>
                  </div>
                  <div className="sm:col-span-4 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                    <MdOutlinePerson4  className="mt-1 mx-2 text-cyan-500"  />ORGANISASI / PRODUSEN DATA
                    </label>
                    <div className="mt-0">
                        
                        <Autocomplete className=""
                          disablePortal
                          isOptionEqualToValue={(option, value) => option?.label === value?.label}
                          id="combo-box-demo"
                          options={satkerku.map((row) => ({
                            label: row.nama_satker,  // Ganti sesuai properti nama di datamu
                            value: row.id_satker
                          }))}
                          defaultValue=""
                          value={satker}
                          onChange={(event, value) => {
                              setsatker(value);
                              /*getBidangUrusan();*/
                            }
                          }
                          renderInput={(params) => 
                            <TextField {...params}  
                            style={{
                                borderRadius:10,
                                color: "white",
                                border: '2px solid gray',
                            }}
                            placeholder="Pilih Organisasi" />
                          }
                          
                        />
                       
                    </div>
                  </div>
                  <div className="col-span-3 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdAccessibility  className="mt-1 mx-2 text-cyan-500"  />Jabatan
                    </label>
                    <div className=" grid grid-cols-1">
                        <select
                        value={jabatan}
                        onChange={(e) => setjabatan(e.target.value)}
                        autoComplete="jabatan"
                        className="input-gray tsize-90"
                        >
                        <option value="">Pilih Jabatan</option>
                        <option value="Operator">Operator</option>
                        <option value="Eksekutif">Eksekutif</option>
                        </select>
                    
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdPassword className="mt-1 mx-2 text-cyan-500"  />Password
                    </label>
                    <div className="">
                        <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="******"
                        className="input-gray tsize-90"
                        />
                    </div>
                  </div>
                  <div className="sm:col-span-3 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                      <MdPassword className="mt-1 mx-2 text-cyan-500"  />Konfirmasi Password
                    </label>
                    <div className="">
                        <input
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        type="password"
                        placeholder="******"
                        className="input-gray tsize-90"
                        />
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