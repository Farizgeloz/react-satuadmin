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
import { MdDashboard,MdDataset,MdOutlineErrorOutline,MdArrowCircleLeft,
        MdArrowCircleRight,MdEditSquare,
        MdOutlineQrCode,
        MdOutlineMap,
        MdOutlinePerson4,
        MdDisabledVisible,
        MdPermDeviceInformation,
        MdOutlineShortText,
        MdOutlineArrowCircleLeft,
        MdOutlineArrowCircleRight,
        MdOutlineTag,
        MdDescription,
        MdFileUpload,
        MdOutlineScale,
        MdOutlineSave} from "react-icons/md";



import _ from "lodash";

const apiurl=process.env.REACT_APP_URL;



function KategoriEdit() {
  const { id } = useParams();
  const [idku, setid] = useState("");
  const [kategori, setkategori] = useState("");
  const [validasi_kategori, setvalidasi_kategori] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  

   
  useEffect(() => {
    getDataById();

  }, [id]);

  

  const getDataById = async () => {
    const response = await axios.get(apiurl+`backend_satudata_kategori/${id}`);
    setid(response.data.id);
    setkategori(response.data.kategori);
   
  };


  

    const updateKategori = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("kategori",kategori);
        if(kategori.length>=3){
          try {
          await axios.patch(`http://localhost:5000/backend_satudata_kategori/${idku}`, formData, {
              headers: {
              "Content-type": "multipart/form-data",
              },
          });
          sweetsuccess();
          
          
          } catch (error) {
            sweeterror(error);
          
          }
        }else{
          setvalidasi_kategori(true);
        }
    };

    function sweetsuccess(){
        Swal.fire({
            title: "Sukses",
            html: "Kategori Berhasil Disimpan",
            timer: 2000,
            icon: "success",
            timerProgressBar: true,
            didOpen: () => {
            Swal.showLoading();
            
        },
        willClose: () => {
            navigate(`/Data-Kategori`);
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


  return (
    <div className="bg-gray-100  h-full    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Kategori Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Kategori" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Data Kategori
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
          </NavLink>
        </p>
      </div>
        
      <main className='h-100'>
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1 h-95 mb-5'>
          <form onSubmit={updateKategori}>
            <div className="relative flex px-5">
                <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 d-flex justify-content-center">
                        <div className="sm:col-span-3 -mt-2">
                            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-600 d-flex justify-content-center">
                            <MdOutlineQrCode className="mt-1 mx-2 text-cyan-500"  /> Kategori Sektoral
                            </label>
                            <div className="mt-0 transisiku">
                                <input
                                placeholder="Masukkan Kategori"
                                value={kategori}
                                onChange={(e) => setkategori(e.target.value)}
                                type="text"
                                autoComplete="kategori"
                                className="input-gray tsize-110"
                                />
                                {validasi_kategori && <p className="transisi mb-0 text-red-700 d-flex"><MdOutlineErrorOutline className="mt-1 mx-2" />Minimal 3 karakter.</p>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-3">
                        
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

export default KategoriEdit;
