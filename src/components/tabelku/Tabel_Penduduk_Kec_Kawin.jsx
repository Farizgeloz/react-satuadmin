
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import exporting from 'highcharts/modules/exporting';
import ChartColumn_Kawin from "../chartku/kecamatan/ChartColumn_Kec_Kawin";

import { 
  IoGrid

  } from "react-icons/io5";


//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Tabel_Kec_Kawin(props) {
  const search_kecamatan = useState(props.search_kecamatan);
  const [pendudukku_kec_kawin, setPenduduk_Kec_Kawin] = useState([]);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk_kecamatan_sub`
    );
    
    setPenduduk_Kec_Kawin(response.data.result_kawin);
  };
    
 
  

  return (
    <div className="md:col-span-6 col-span-6 p-2">
      <div className="md:col-span-6 col-span-6">
        <ChartColumn_Kawin />
      </div>
      <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
        <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
              <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Status Kawin</h2>
              <div className="garis garis1"></div>
              <div className="garis garis2"></div>
        </div>
        <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
          <thead>
            <tr className=" bg-blue-50 text-white w-full">
              <th className="tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Kecamatan</th>
              <th className="tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Status Kawin</th>
              <th className="text-center tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {pendudukku_kec_kawin.map((penduduk_kec_kawinx,index) => (
              <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_kawinx.kecamatan}</td>
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-4">{penduduk_kec_kawinx.status_kawin}</td>
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-2 text-center">{penduduk_kec_kawinx.count_kawin}</td>
                
              </tr>
            ))}
            <tr className=" bg-blue-50 text-white w-full h-3">
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-4"></th>
              <th className="tsize-80 border-2 border-white tracking-wide bg-gray-700 text-white px-2 tracking-wide wp-2"></th>
            </tr>
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default Tabel_Kec_Kawin;