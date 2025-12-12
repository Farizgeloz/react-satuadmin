import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Modal.css";
import "../../../App.css";
import { 
    IoCreateSharp,
    IoLogoGoogle,
    IoPerson,
    IoAccessibility,
    IoKey 
} from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { api_url_satuadmin } from "../../../api/axiosConfig";



function UserModalEdit(props) {
    const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
    const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const userloginsatker = userlogin.opd_id || '';
    const userloginadmin = userlogin.id || '';
    const id = useState(props.id);
    const [name, setName] = useState(props.name);
    const [nick, setNick] = useState(props.nick);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);
    const [confPassword, setConfPassword] = useState(props.confpassword);
    const [role, setRole] = useState(props.role);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    /*useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await api_url_satuadmin.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
      };*/

      useEffect(() => {
        /*const getUserById = async () => {
          try {
            const response = await api_url_satuadmin.get(`http://localhost:5000/users2/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setRole(response.data.role);
          } catch (error) {
            if (error.response) {
              //setMsg(error.response.data.msg);
            }
          }
        };
        getUserById();*/
      }, []);

    

    const updateUser = async (e) => {
        e.preventDefault();
        try {
          await api_url_satuadmin.patch(`backend_users/${id}`, {
            name: name,
            nick: nick,
            email: email,
            passwordku: password,
            confPassword: confPassword,
            role: role,
          });
          setShow(false);
          sweetsuccess();
          
         
        } catch (error) {
            if (error.response) {
                //setMsg(error.response.data.msg);
                //sweeterror(error.response.data.msg);
                }
          
        }
    };

      
    

    function sweetsuccess(){
        Swal.fire({
            title: "Sukses",
            html: "Data Berhasil Diupdate",
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
    function sweeterror(valku){
        Swal.fire({
            title: "Gagal",
            html: valku,
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
                className="btnku btnku-blue m-1"
            >
               <IoCreateSharp />
            </button>

            <Modal dialogClassName="my-modal"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={updateUser}>
                <Modal.Header closeButton className="border-b ">
                    <h4 className="text-sky-600 flex"><IoCreateSharp  className="textsize10 text-sky-600 mt-1"  />Edit Data User {id}</h4>
                    
                </Modal.Header>
                <Modal.Body>
                    
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                                <IoPerson className="mt-2 mx-2 text-cyan-500"  /> Nama Lengkap
                                </label>
                                <div className="mt-2">
                                    <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    autoComplete="nama"
                                    className="input-gray textsize10"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                                    <IoPerson className="mt-2 mx-2 text-cyan-500"  /> Nama Panggilan
                                </label>
                                <div className="mt-2">
                                    <input
                                    value={nick}
                                    onChange={(e) => setNick(e.target.value)}
                                    type="text"
                                    autoComplete="nick"
                                    className="input-gray textsize10"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                                    <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Email
                                </label>
                                <div className="mt-2">
                                    <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    autoComplete="email"
                                    className="input-gray textsize10"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 -mt-2">
                                <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                                    <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Role
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    
                                    <select
                                    onChange={(e) => setRole(e.target.value)}
                                    autoComplete="role"
                                    className="input-gray textsize10"
                                    >
                                        <option value={role}>{role}</option>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                
                                </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                                    <IoKey className="mt-2 mx-2 text-cyan-500"  />Password
                                </label>
                                <div className="mt-2">
                                    <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="******"
                                    className="input-gray textsize10"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3 -mt-2">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                                    <IoKey className="mt-2 mx-2 text-cyan-500"  />Konfirmasi Password
                                </label>
                                <div className="mt-2">
                                    <input
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                    type="password"
                                    placeholder="******"
                                    className="input-gray textsize10"
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
                        Update
                    </button>
                </Modal.Footer>
                </form>
            </Modal>

        </>
    );
}

export default UserModalEdit;
