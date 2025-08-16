import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../../App.css";
import { IoTrash,
  IoChevronBackSharp ,
  IoChevronForward,
  IoLogoGoogle,
  IoPerson,
  IoInformationCircleOutline,
  IoGrid,
  IoSearchCircle   

  } from "react-icons/io5";

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

const apiurl=process.env.REACT_APP_URL;

const Welcome = () => {
  const [pendudukku, setPenduduk] = useState([]);
  const [lahirmonthku, setLahirMonth] = useState([]);
  const [agamaku, setAgamaku] = useState([]);
  const [rowsp, setRowsP] = useState("5");
  const [rowsl, setRowsL] = useState("6");
  const { user } = useSelector((state) => state.auth);
  const monthku = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_dashboard`
    );
    setPenduduk(response.data.resultpenduduk);
    setLahirMonth(response.data.resultlahirmonth);
    setRowsP(response.data.totalrowspendudukP);
    setRowsL(response.data.totalrowspendudukL);
    setAgamaku(response.data.totalrowspenduduk_agama);
  };
  

  

  return (
    <div className="bg-gray-100  max-h-screen  max-[640px]:mt-12  overflow-y-auto">
      <div className="col-span-6 rounded gap-x-6 grid grid-cols-1 grid-cols-6 h-14 bg-white mb-10">
        <p className="col-span-4 max-[640px]:col-span-3 tsize-130 font-semibold text-sky-600 flex pt-2"><IoSearchCircle  className="mt-2 mx-2"  />Dashboard</p>
        <p className="col-span-2 max-[640px]:col-span-3 tsize-90 font-semibold text-gray-500 flex flex-row-reverse pt-2 mt-2 mx-3">
          <NavLink to="/Dashboard" className="text-link-gray">Dashboard</NavLink>
        </p>
        <div className="col-span-6">
          <div className="garis2 garis1b"></div>
        </div>
      </div>
      
      <div className="col-span-6 rounded m-1 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        
        
        
      </div>
      <div className="col-span-6 grid grid-cols-1 grid-cols-6 p-2 mb-20">
      <div className="md:col-span-2 grid grid-cols-1 grid-cols-6  bg-white  margin-0 rounded p-1">
          
          <div className="col-span-4 margin-0 align-center text-center p-2">
            <label className="flex block tsize-80 text-gray-500">Total Laki-Laki</label>
            <label className="tsize-120 font-bold">{rowsl}</label>
          </div>
          <div className="col-span-2 align-center text-center bg-sky-600 px-2 py-2 rounded -mt-5 mb-4">
            <div className="block tsize-200 font-medium text-white">
              <IoInformationCircleOutline className="mt-2 mx-2"  />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 grid-cols-6  bg-white  margin-0 rounded p-1">
          
          <div className="col-span-4 margin-0 align-center text-center p-2">
            <label className="flex block tsize-80 text-gray-500">Total Perempuan</label>
            <label className="tsize-120 font-bold">{rowsp}</label>
          </div>
          <div className="col-span-2 align-center text-center bg-sky-600 px-2 py-2 rounded -mt-5 mb-4">
            <div className="block tsize-200 font-medium text-white">
              <IoInformationCircleOutline className="mt-2 mx-2"  />
            </div>
          </div>
        </div>
        <div className="md:col-span-3 col-span-6 p-2">
          <Jk_ChartBar
              laki={rowsl}
              wanita={rowsp}
          />
          </div>
          <div className="md:col-span-3 col-span-6 p-2">
            <Jk_ChartLine
                laki={rowsl}
                wanita={rowsp}
            />
          </div>
          <div className="md:col-span-3 col-span-6 p-2">
            <Jk_ChartColumn />
          </div>
          <div className="md:col-span-3 col-span-6 p-2">
            <Agama_ChartColumn />
          </div>
          <div className="md:col-span-3 col-span-6 p-2">
            <Pendidikan_ChartColumn />
          </div>
        
        
        
      </div>
    </div>
  );
};

export default Welcome;
