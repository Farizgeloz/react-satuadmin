import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import "../../../App.css";
import NavSub from "../../NavSub";

import {
  IoDocumentTextOutline,IoInformationCircleOutline,
  IoChatbubblesOutline,
  IoPricetagOutline,
  IoEyeOutline,
  IoDownloadOutline,
  IoPeopleOutline,
  IoMapOutline,
  IoLocationOutline,
  IoLayersOutline,
  IoCloudDownloadOutline,
  IoPersonOutline,
  IoMegaphoneOutline,
} from 'react-icons/io5';
import { FaMapLocationDot } from "react-icons/fa6";

  import Chart from "../../chartku/Chart";
  import Jk_ChartBar from "../../chartku/Jk_ChartBar";
  import Jk_ChartLine from "../../chartku/Jk_ChartLine";
  import Jk_ChartColumn from "../../chartku/Jk_ChartColumn";
  import Agama_ChartColumn from "../../chartku/Agama_ChartColumn";
  import Pendidikan_ChartColumn from "../../chartku/Pendidikan_ChartColumn";
import {
  barChartOptions,
  columnChartOptions,
  lineChartOptions
} from "../../chartku/options";
import { MdDashboard } from "react-icons/md";
import { api_url_satuadmin } from "../../../api/axiosConfig";

const apiurl = import.meta.env.VITE_API_URL;

const InfoBox = ({ bgClass, title, count, Icon }) => (
  <Col md={4} className="mb-3">
    <Row className={` rounded p-2 m-0`} style={{backgroundColor:bgClass}}>
      <Col xs={4} className="text-center d-flex align-items-center justify-content-center">
        <Icon className="bg-white text-secondary rounded-circle p-2" size={50} />
      </Col>
      <Col xs={8} className="text-white p-2">
        <label className="d-block textsize14">{title}</label>
        <label className="textsize20 fw-bold">{count}</label>
      </Col>
    </Row>
  </Col>
);

const Welcome = () => {
  const [count_satuportal_iklan, setcount_satuportal_iklan] = useState([]);
  const [count_satuportal_pengumuman, setcount_satuportal_pengumuman] = useState([]);
  const [count_satuportal_visitors, setcount_satuportal_visitors] = useState([]);
  const [count_opendata_artikel, setcount_opendata_artikel] = useState([]);
  const [count_opendata_dataset_download, setcount_opendata_dataset_download] = useState([]);
  const [count_opendata_dataset_visitors, setcount_opendata_dataset_visitors] = useState([]);
  const [count_opendata_feedback, setcount_opendata_feedback] = useState([]);
  const [count_opendata_iklan, setcount_opendata_iklan] = useState([]);
  const [count_opendata_visitors, setcount_opendata_visitors] = useState([]);
  const [count_satupeta_artikel, setcount_satupeta_artikel] = useState([]);
  const [count_satupeta_feedback, setcount_satupeta_feedback] = useState([]);
  const [count_satupeta_iklan, setcount_satupeta_iklan] = useState([]);
  const [count_satupeta_locations, setcount_satupeta_locations] = useState([]);
  const [count_satupeta_location_maplist, setcount_satupeta_location_maplist] = useState([]);
  const [count_satupeta_location_maplist_download, setcount_satupeta_location_maplist_download] = useState([]);
  const [count_satupeta_location_maplist_visitors, setcount_satupeta_location_maplist_visitors] = useState([]);
  const [count_satupeta_location_points, setcount_satupeta_location_points] = useState([]);
  const [count_satupeta_visitors, setcount_satupeta_visitors] = useState([]);

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await api_url_satuadmin.get(
      `api/open-item/view_count`
    );
    setcount_satuportal_iklan(response.data.count_satuportal_iklan);
    setcount_satuportal_pengumuman(response.data.count_satuportal_pengumuman);
    setcount_satuportal_visitors(response.data.count_satuportal_visitors);
    setcount_opendata_artikel(response.data.count_opendata_artikel);
    setcount_opendata_dataset_download(response.data.count_opendata_dataset_download);
    setcount_opendata_dataset_visitors(response.data.count_opendata_dataset_visitors);
    setcount_opendata_feedback(response.data.count_opendata_feedback);
    setcount_opendata_iklan(response.data.count_opendata_iklan);
    setcount_opendata_visitors(response.data.count_opendata_visitors);
    setcount_satupeta_artikel(response.data.count_satupeta_artikel);
    setcount_satupeta_feedback(response.data.count_satupeta_feedback);
    setcount_satupeta_iklan(response.data.count_satupeta_iklan);
    setcount_satupeta_locations(response.data.count_satupeta_locations);
    setcount_satupeta_location_maplist(response.data.count_satupeta_location_maplist);
    setcount_satupeta_location_maplist_download(response.data.count_satupeta_location_maplist_download);
    setcount_satupeta_location_maplist_visitors(response.data.count_satupeta_location_maplist_visitors);
    setcount_satupeta_location_points(response.data.count_satupeta_location_points);
    setcount_satupeta_visitors(response.data.count_satupeta_visitors);
  };
  

  

  return (
    <div className="bg-gray-100  max-h-screen  max-[640px]:mt-12  overflow-y-auto">
      <NavSub  title="Dashboard" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
              <MdDashboard className="mt-1 textsize10"/>Dashboard
            </NavLink>
          </p>
        </div>
        
        
      </div>

      <Container className="mb-5">
        {/* Satu Portal Info Title */}
        {/* <Row>
          <Col>
            <p className="textsize10 mt-5">Open Data Info</p>
          </Col>
        </Row>
        <Row>
          <InfoBox bgClass="#B71C1C" title="Iklan" count={count_satuportal_iklan} Icon={IoPricetagOutline} />
          <InfoBox bgClass="#B71C1C" title="Pengumuman" count={count_satuportal_pengumuman} Icon={IoMegaphoneOutline } />
          <InfoBox bgClass="#B71C1C" title="Visitor" count={count_satuportal_visitors} Icon={IoEyeOutline} />
        </Row> */}
        {/* Open Data Info Title */}
        <Row>
          <Col>
            <p className="textsize10 mt-3">Open Data Info</p>
          </Col>
        </Row>
        <Row>
          <InfoBox bgClass="#0277BD" title="Artikel" count={count_opendata_artikel} Icon={IoDocumentTextOutline} />
          <InfoBox bgClass="#0277BD" title="Feedback" count={count_opendata_feedback} Icon={IoChatbubblesOutline} />
          <InfoBox bgClass="#0277BD" title="Iklan" count={count_opendata_iklan} Icon={IoPricetagOutline} />
          <InfoBox bgClass="#0277BD" title="Visitor" count={count_opendata_visitors} Icon={IoEyeOutline} />
          <InfoBox bgClass="#0277BD" title="Dataset Download" count={count_opendata_dataset_download} Icon={IoDownloadOutline} />
          <InfoBox bgClass="#0277BD" title="Dataset Visitor" count={count_opendata_dataset_visitors} Icon={IoEyeOutline} />
        </Row>

        {/* Satu Peta Info Title */}
        <Row>
          <Col>
            <p className="textsize10 mt-3">Satu Peta Info</p>
          </Col>
        </Row>
        <Row>
          <InfoBox bgClass="#F57F17" title="Artikel" count={count_satupeta_artikel} Icon={IoDocumentTextOutline} />
          <InfoBox bgClass="#F57F17" title="Feedback" count={count_satupeta_feedback} Icon={IoChatbubblesOutline} />
          <InfoBox bgClass="#F57F17" title="Iklan" count={count_satupeta_iklan} Icon={IoPricetagOutline} />
          <InfoBox bgClass="#F57F17" title="Satu Peta Visitor" count={count_satupeta_visitors} Icon={IoEyeOutline} />
          <InfoBox bgClass="#F57F17" title="Lokasi Peta" count={count_satupeta_locations} Icon={IoMapOutline} />
          <InfoBox bgClass="#F57F17" title="Titik Lokasi" count={count_satupeta_location_points} Icon={IoLocationOutline} />
          <InfoBox bgClass="#F57F17" title="Koleksi Peta" count={count_satupeta_location_maplist} Icon={FaMapLocationDot} />
          <InfoBox bgClass="#F57F17" title="Koleksi Download" count={count_satupeta_location_maplist_download} Icon={IoDownloadOutline} />
          <InfoBox bgClass="#F57F17" title="Koleksi Visitor" count={count_satupeta_location_maplist_visitors} Icon={IoEyeOutline} />
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;
