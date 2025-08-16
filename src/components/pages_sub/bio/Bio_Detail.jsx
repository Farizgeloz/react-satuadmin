import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link, NavLink } from "react-router-dom";
import {Row,Col} from 'react-bootstrap';
import { FaPenToSquare} from "react-icons/fa6";
import { motion } from "framer-motion";

import { MdDashboard,MdDataset,MdDetails} from "react-icons/md";


const apiurl=process.env.REACT_APP_URL;

const Spinner = () => <div className="loader "></div>;


function MottoPengelolah() {
  const [loading, setLoading] = useState(true);
  const [idd, setid] = useState("");
  const [email, setemail] = useState("");
  const [telpon, settelpon] = useState("");
  const [fax, setfax] = useState("");
  const [alamat, setalamat] = useState("");
  const [luas, setluas] = useState("");
  const [populasi, setpopulasi] = useState("");
  const [kode_pos, setkode_pos] = useState("");
  const [kepadatan, setkepadatan] = useState("");
  const [zona, setzona] = useState("");
  const [instagram, setinstagram] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [facebook, setfacebook] = useState("");
  const [whatapp, setwhatapp] = useState("");
  const [twitter, settwitter] = useState("");
  const [msg, setmsg] = useState("");
  const { id } = useParams();


  

  useEffect(() => {
    setTimeout(() => {
      const getDataById = async () => {
        try {
          const response = await axios.get(
            apiurl+`backend_satudata_bio_detail/${id}`
          );
          setid(response.data.id);
          setemail(response.data.email);
          settelpon(response.data.telpon);
          setfax(response.data.fax);
          setalamat(response.data.alamat);
          setluas(response.data.luas);
          setpopulasi(response.data.populasi);
          setkode_pos(response.data.kode_pos);
          setkepadatan(response.data.kepadatan);
          setzona(response.data.zona);
          setinstagram(response.data.instagram);
          setlinkedin(response.data.linkedin);
          setfacebook(response.data.facebook);
          setwhatapp(response.data.whatapp);
          settwitter(response.data.twitter);

          //fetchData(response.data.document);
          
        } catch (error) {
          if (error.response) {
            setmsg(error.response.data.msg);
          }
        }
      };

      getDataById();
      setLoading(false);
    }, 2000);

    

  }, [id]);

 


  
 function convertDate(datePicker) {
      const selectedDate = new Date(datePicker);

      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      const dayName = dayNames[selectedDate.getDay()];
      const day = selectedDate.getDate();
      const monthName = monthNames[selectedDate.getMonth()];
      const year = selectedDate.getFullYear();

      const jam=selectedDate.getHours();
      const menit=selectedDate.getMinutes();
      const detik=selectedDate.getSeconds();

      const indonesianFormat = `${day} ${monthName} ${year}`+' Waktu : '+`${jam}:${menit}:${detik} WIB`;
      return indonesianFormat;
  }

  return (
    <div className="bg-gray-100  h-95 w-100  overflow-auto z-5  max-[640px]:mt-10">
      <NavSub  title="Motto Detail" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Bio" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Bio
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdDetails className="mt-1 textsize8" />Bio Detail
          </NavLink>
        </p>
      </div>
        
      
      
      <Row className='margin-t3 mx-2 max-w-full  bg-white rad15 garis5 shaddow1'>
        <p className='text-white textsize9 text-center btn-grad-sky-4 p-2 rad15'>Motto Info</p>
        <Col md={6} sm={12}>
            <Row className=''>
              
              <Col md={12} sm={12}>
                {loading ? (
                    <Spinner />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                    <Row className='rad15 transisi1'>
                      <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600'>Telpon</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9 capitalizeku'>{telpon}</p>
                      </Col>
                      <Col md={5} sm={5} className=''>
                        <p className='textsize9 font_weight600'>Fax</p>
                      </Col>
                      <Col md={7} sm={7} className=''>
                        <p className='textsize9 '>{fax}</p>
                      </Col>
                       <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600'>Whatsapp</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9 '>{whatapp}</p>
                      </Col>
                      <Col md={5} sm={5} className=''>
                        <p className='textsize9 font_weight600 mt-1'>Email</p>
                      </Col>
                      <Col md={7} sm={7} className=''>
                        <p className='textsize9 '>{email}</p>
                      </Col>
                      
                      <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600'>alamat</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9 '>{alamat}</p>
                      </Col>
                      
                      
                    </Row>
                    </motion.div>
                  )}
              </Col>
            </Row>
          
        </Col>
        <Col md={6} sm={12}>
          <Row className=''>
            <Col md={12} sm={12}>
            {loading ? (
              <Spinner />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Row className=' rad15'>
                  <Col md={5} sm={5}>
                    <p className='textsize9 font_weight600'>Kode Pos</p>
                  </Col>
                  <Col md={7} sm={7}>
                    <p className='textsize9 '>{kode_pos}</p>
                  </Col>
                  <Col md={5} sm={5} className='bg-silver'>
                    <p className='textsize9 font_weight600'>Luas Daerah</p>
                  </Col>
                  <Col md={7} sm={7} className='bg-silver'>
                    <p className='textsize9 '>{luas}</p>
                  </Col>
                  <Col md={5} sm={5} className=''>
                    <p className='textsize9 font_weight600'>Kepadatan</p>
                  </Col>
                  <Col md={7} sm={7} className=''>
                    <p className='textsize9 '>{kepadatan}</p>
                  </Col>
                  <Col md={5} sm={5} className='bg-silver'>
                    <p className='textsize9 font_weight600'>Populasi</p>
                  </Col>
                  <Col md={7} sm={7} className='bg-silver'>
                    <p className='textsize9 '>{populasi}</p>
                  </Col>
                   <Col md={5} sm={5}>
                    <p className='textsize9 font_weight600'>Zona</p>
                  </Col>
                  <Col md={7} sm={7}>
                    <p className='textsize9 '>{zona}</p>
                  </Col>
                  
                  
                </Row>
              </motion.div>
              )}
            </Col>
          </Row>
          
        </Col>
        <Col md={12} sm={12}>
          <Row className=''>
            <Col md={12} sm={12}>
            {loading ? (
              <Spinner />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Row className='rad15'>
                  <Col md={3} sm={5}>
                    <p className='textsize9 font_weight600'>Instagram</p>
                  </Col>
                  <Col md={9} sm={7}>
                    <p className='textsize9 '>{instagram}</p>
                  </Col>
                  <Col md={3} sm={5} className='bg-silver'>
                    <p className='textsize9 font_weight600'>Linkedin</p>
                  </Col>
                  <Col md={9} sm={7} className='bg-silver'>
                    <p className='textsize9 '>{linkedin}</p>
                  </Col>
                  <Col md={3} sm={5}>
                    <p className='textsize9 font_weight600'>Facebook</p>
                  </Col>
                  <Col md={9} sm={7}>
                    <p className='textsize9 '>{facebook}</p>
                  </Col>
                  <Col md={3} sm={5} className='bg-silver'>
                    <p className='textsize9 font_weight600'>Twitter</p>
                  </Col>
                  <Col md={9} sm={7} className='bg-silver'>
                    <p className='textsize9 '>{twitter}</p>
                  </Col>
                  
                  
                  
                </Row>
              </motion.div>
              )}
            </Col>
          </Row>
          
        </Col>
      </Row>
      <Row className='p-2 margin-t5 mx-1 bg-white rad15 margin-b10 max-w-full'>
         <Link to={ `/Data-Motto/Update/${idd}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-2">
                    <button 
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
                          <FaPenToSquare  className='mt-1 mx-1' /><span>Edit</span>
                    </button>
                  </Link>
        
      </Row> 
    </div>
  );
}

export default MottoPengelolah;
