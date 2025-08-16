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
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Swal from 'sweetalert2';
import { motion, useAnimation } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
        MdEditSquare,
        MdOutlineQrCode,
        MdOutlineMap,
        MdOutlinePerson4,
        MdDisabledVisible,
        MdOutlineSave,
        MdAccessibility} from "react-icons/md";



import _ from "lodash";

const apiurl=process.env.REACT_APP_URL;



function UserEdit() {
    const { id } = useParams();
    const [idku, setid] = useState("");
    
    const [satkerku, setsatkerku] = useState([]);
  
    const [name, setname] = useState("");
    const [nick, setnick] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confpassword, setconfpassword] = useState("");
    const [role, setrole] = useState("");
    const [satker, setsatker] = useState("");
    const [jabatan, setjabatan] = useState("");


  
  
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    getDatasetItem()
    
  }, [satker]);

  const getDatasetItem = async () => {
    const response = await axios.get(apiurl + 'api/opendata/dataset_item');

    const data = response.data;
    setsatkerku(response.data.resultSatker);
  };
   
  useEffect(() => {
    getDataById();

  }, [id]);

  

  const getDataById = async () => {
    const response = await axios.get(apiurl+`api/open-user/user/${id}`);
    setid(response.data.uuid);
    setname(response.data.name);
    setnick(response.data.nick);
    setemail(response.data.email);
    setpassword(response.data.password);
    setrole(response.data.role);
    setsatker(response.data.satker);
    setjabatan(response.data.jabatan);
   
  };


    const updateUser = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name",name);
      formData.append("nick",nick);
      formData.append("email",email);
      formData.append("password",password);
      formData.append("confPassword",confpassword);
      formData.append("role",role);
      formData.append("satker",satker);
      formData.append("jabatan",jabatan);
      try {
        await axios.patch(`${apiurl}api/open-user/user/update/${idku}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        sweetsuccess();
      
      } catch (error) {
        sweeterror(error.response?.data?.msg || "Terjadi kesalahan.");
      }
    };

    function sweetsuccess(){
        Swal.fire({
            title: "Sukses",
            html: "User Berhasil Diupdate",
            timer: 2000,
            icon: "success",
            timerProgressBar: true,
            didOpen: () => {
            Swal.showLoading();
            
        },
        willClose: () => {
            navigate(`/Data-User`);
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

  
  const [validasi_name, setvalidasi_name] = useState(false);
  const [validasi_nick, setvalidasi_nick] = useState(false);
  const [validasi_email, setvalidasi_email] = useState(false);
  const [validasi_password, setvalidasi_password] = useState(false);
  const [validasi_repassword, setvalidasi_repassword] = useState(false);
  const [validasi_role, setvalidasi_role] = useState(false);
  const [validasi_satker, setvalidasi_satker] = useState(false);
  const [validasi_jabatan, setvalidasi_jabatan] = useState(false);

  

  const handle_save = (event) => {
    if (name && name.length<3) {setvalidasi_name(true);}else{setvalidasi_name(false);}
    if (nick && nick.length<3) {setvalidasi_nick(true);}else{setvalidasi_nick(false);}
    if (email && email.length<3) {setvalidasi_email(true);}else{setvalidasi_email(false);}
    //if (password.length<3) {setvalidasi_password(true);}else{setvalidasi_password(false);}
    //if (confpassword!==password) {setvalidasi_repassword(true);}else{setvalidasi_repassword(false);}
    if (role.length<3) {setvalidasi_role(true);}else{setvalidasi_role(false);}

    if(name.length>=3 && nick.length>=3 && email.length>=3 && confpassword===password && role.length>=3){
      updateUser();
    }
  };



  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="User Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Dataset" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Dataset
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateUser}>
            <div className="relative flex px-5">
                <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineQrCode className="mt-1 mx-2 text-cyan-500"  /> Nama Lengkap
                            </label>
                            <div className="mt-0 transisiku">
                                <input
                                placeholder="Masukkan Nama Lengkap"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                type="text"
                                autoComplete="name"
                                className="input-gray tsize-110"
                                />
                                {validasi_name && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Nick
                            </label>
                            <div className="mt-0">
                                
                                <input
                                placeholder="Masukkan Nick"
                                value={nick}
                                onChange={(e) => setnick(e.target.value)}
                                type="text"
                                autoComplete="nick"
                                className="input-gray tsize-110"
                                />
                                {validasi_nick && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineMap className="mt-1 mx-2 text-cyan-500"  />Email
                            </label>
                            <div className="mt-0">
                                
                                <input
                                placeholder="Masukkan Nick"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                type="email"
                                autoComplete="email"
                                className="input-gray tsize-110"
                                />
                                {validasi_email && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Password
                            </label>
                            <div className="mt-0">
                                
                                <input
                                placeholder="Masukkan Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                type="password"
                                autoComplete="password"
                                className="input-gray tsize-110"
                                />
                                {validasi_password && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Harus Memasukkan Password.</p>}
                            </div>
                        </div>
                        <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlinePerson4 className="mt-1 mx-2 text-cyan-500"  />Re-Password
                            </label>
                            <div className="mt-0">
                                
                                <input
                                placeholder="Masukkan Password Kembali"
                                value={confpassword}
                                onChange={(e) => setconfpassword(e.target.value)}
                                type="password"
                                autoComplete="repassword"
                                className="input-gray tsize-110"
                                />
                                {validasi_repassword && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Password Tidak Sesuai.</p>}
                            </div>
                        </div>
                        
                        <div className="sm:col-span-2 -mt-2">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdDisabledVisible className="mt-1 mx-2 text-cyan-500"  />Role
                            </label>
                            <div className="mt-0">
                            <select
                                value={role}
                                onChange={(e) => setrole(e.target.value)}
                                autoComplete="role"
                                className="input-gray tsize-110"
                                >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
                            {validasi_role && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}  
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
                        
                        
                    </div>
                    
                    <div className="flex justify-center mt-12">
                        
                        <button 
                            type="submit"
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                            <MdOutlineSave  className='mt-1 mx-1'  /><span>Simpan</span>
                        </button>
                            
                    </div>
                </div>
            </div>

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default UserEdit;
