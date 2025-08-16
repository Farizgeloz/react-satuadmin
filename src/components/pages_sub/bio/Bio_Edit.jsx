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
import Swal from 'sweetalert2';
import { motion, useAnimation } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MdDashboard,MdDataset,MdOutlineErrorOutline,
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
        MdOutlineSave,
        MdErrorOutline} from "react-icons/md";




import _ from "lodash";

const apiurl=process.env.REACT_APP_URL;



function MottoPengelolah() {
  const [satkerku, setProdukDataku] = useState([""]);
  const [kategoriku, setkategoriku] = useState([""]);
  const [idku, setid] = useState("");
  const [email, setemail] = useState('');
  const [telpon, settelpon] = useState('');
  const [fax, setfax] = useState('');
  const [alamat, setalamat] = useState('');
  const [luas, setluas] = useState('');
  const [populasi, setpopulasi] = useState('');
  const [kepadatan, setkepadatan] = useState('');
  const [zona, setzona] = useState('');
  const [kode_pos, setkode_pos] = useState('');
  const [instagram, setinstagram] = useState('');
  const [linkedin, setlinkedin] = useState('');
  const [facebook, setfacebook] = useState('');
  const [whatapp, setwhatapp] = useState('');
  const [twitter, settwitter] = useState('');


  const navigate = useNavigate();
  const { id } = useParams();

   
  useEffect(() => {
    getDataById()
    

  }, [id]);

 

  const getDataById = async () => {
    const response = await axios.get(apiurl+`open-item/ekosistem_bio_detail/${id}`);
    setid(response.data.id);
    setemail(response.data.email);
    settelpon(response.data.telpon);
    setfax(response.data.fax);
    setalamat(response.data.alamat);
    setluas(response.data.luas);
    setpopulasi(response.data.populasi);
    setkepadatan(response.data.kepadatan);
    setzona(response.data.zona);
    setkode_pos(response.data.kode_pos);
    setinstagram(response.data.instagram);
    setlinkedin(response.data.linkedin);
    setfacebook(response.data.facebook);
    setwhatapp(response.data.whatapp);
    settwitter(response.data.twitter);
    
  };


  const updateData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
     formData.append("email",email);
     formData.append("telpon",telpon);
     formData.append("fax",fax);
     formData.append("alamat",alamat);
     formData.append("luas",luas);
     formData.append("populasi",populasi);
     formData.append("kepadatan",kepadatan);
     formData.append("zona",zona);
     formData.append("kode_pos",kode_pos);
     formData.append("instagram",instagram);
     formData.append("linkedin",linkedin);
     formData.append("facebook",facebook);
     formData.append("whatapp",whatapp);
     formData.append("twitter",twitter);
    
    try {
      await axios.patch(`${apiurl}api/open-item/ekosistem_bio_update/${idku}`, formData, {
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
        html: "Data Berhasil Disimpan",
        timer: 2000,
        icon: "success",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          
        },
        willClose: () => {
              navigate(`/Data-Bio`);
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

  const [step, setStep] = useState(1);
  const nextStep = () => {
      setStep(step + 1);
  };

  const prevStep = () => {
      setStep(step - 1);
  };

  
  

  return (
    <div className="bg-gray-100  h-95    overflow-auto z-5 max-[640px]:mt-10">
      <NavSub  title="Motto Edit" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Motto" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Motto
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdEditSquare className="mt-1 textsize8" />Edit
          </NavLink>
        </p>
      </div>
        
      <main>
        
        
        
        <Row className='margin-t3 bg-white pb-5 mx-5 shaddow1'>
          <form onSubmit={updateData}>
            <div className="relative flex px-5">
              <div className="container max-w-screen-xl mx-auto my-auto relative flex flex-col w-4/5">
                  {step === 1 && (
                    <motion.div
                        key={step} // Add this line
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:w-full mx-auto">
                        
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          
                          
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Luas Kabupaten
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Luas"
                                value={luas}
                                onChange={(e) => setluas(e.target.value)}
                                type="text"
                                autoComplete="luas"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Populasi
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Populasi"
                                value={populasi}
                                onChange={(e) => setpopulasi(e.target.value)}
                                type="text"
                                autoComplete="populasi"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Kepadatan
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Kepadatan"
                                value={kepadatan}
                                onChange={(e) => setkepadatan(e.target.value)}
                                type="text"
                                autoComplete="kepadatan"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Zona
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Zona"
                                value={zona}
                                onChange={(e) => setzona(e.target.value)}
                                type="text"
                                autoComplete="zona"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Kode Pos
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Kode Pos"
                                value={kode_pos}
                                onChange={(e) => setkode_pos(e.target.value)}
                                type="text"
                                autoComplete="kode_pos"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Whatsapp
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="+62xxxxxxxxxxx"
                                value={whatapp}
                                onChange={(e) => setwhatapp(e.target.value)}
                                type="text"
                                autoComplete="whatapp"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Telpon
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="085xxxxxxxxx"
                                value={telpon}
                                onChange={(e) => settelpon(e.target.value)}
                                type="text"
                                autoComplete="telpon"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                            
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Fax
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="085xxxxxxxxx"
                                value={fax}
                                onChange={(e) => setfax(e.target.value)}
                                type="text"
                                autoComplete="fax"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                            
                          </div>
                          <div className="sm:col-span-6 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Email
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Example@mail.com"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                type="text"
                                autoComplete="email"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                            
                          </div>
                          
                          <div className="sm:col-span-6 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineShortText  className="mt-1 mx-2 text-cyan-500"  />Alamat
                            </label>
                            <div className="mt-0">
                                
                                <textarea 
                                  placeholder="Masukkan Konten"
                                  value={alamat}
                                  onChange={(e) => setalamat(e.target.value)}
                                  autoComplete="contents"
                                  rows="3" 
                                  className="input-green-2 tsize-110" 
                                  >

                                </textarea>
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Instagram
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Instagram"
                                value={instagram}
                                onChange={(e) => setinstagram(e.target.value)}
                                type="text"
                                autoComplete="instagram"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Linkedin
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Linkedin"
                                value={linkedin}
                                onChange={(e) => setlinkedin(e.target.value)}
                                type="text"
                                autoComplete="linkedin"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Facebook
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Facebook"
                                value={facebook}
                                onChange={(e) => setfacebook(e.target.value)}
                                type="text"
                                autoComplete="facebook"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          <div className="sm:col-span-3 -mt-4">
                            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-600 d-flex">
                            <MdOutlineScale className="mt-1 mx-2 text-cyan-500"  />Twitter
                            </label>
                            <div className="mt-0">
                                <input
                                placeholder="Twitter"
                                value={twitter}
                                onChange={(e) => settwitter(e.target.value)}
                                type="text"
                                autoComplete="twitter"
                                className="input-green-2 tsize-110"
                                />
                                  
                            </div>
                          </div>
                          
                          
                      </div>
                        <div className="flex justify-center mt-5">

                          <button type="button"
                            onClick={() => {
                              nextStep();
                            }}  
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                              <span>Lanjut</span><MdOutlineArrowCircleRight  className='mt-1 mx-1'  />
                          </button>
                        </div>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key={step} // Add this line
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:w-3/5 mx-auto py-12">
                        
                        <div className="mt-12 text-base  text-center">
                            Yakin Data Sudah Benar ?
                        </div>
                        <div>
                            <div className="flex justify-center mt-12">
                                <button 
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded-xl d-flex mx-1">
                                    <MdOutlineArrowCircleLeft  className='mt-1 mx-1'  /><span>Kembali</span>
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-4 border-b-4 border-green-700 hover:border-green-500 rounded-xl d-flex mx-1">
                                    <MdOutlineSave  className='mt-1 mx-1'  /><span>Simpan</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
              </div>
            </div>

          </form>
          
        </Row>
        
        
        
      </main>
    </div>
  );
}

export default MottoPengelolah;
