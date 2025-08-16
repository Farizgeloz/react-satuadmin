
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import exporting from 'highcharts/modules/exporting';
import ChartColumn_Agama from "../chartku/kecamatan/ChartColumn_Kec_Agama";

import { 
  IoGrid

  } from "react-icons/io5";


//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Tabel_Kec_Agama() {

  const [pendudukku, setPenduduk] = useState([]);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk_kecamatan_sub`
    );
    setPenduduk(response.data.result_agama);
  };
    
 
  

  return (
    <div className="md:col-span-6 col-span-6 p-2">
      <div className="md:col-span-6 col-span-6">
        <ChartColumn_Agama />
      </div>
      <div className='col-span-3 bg-white drop-shadow-lg overflow-auto mb-9 p-2'>
        <div className="sm:col-span-6 rounded gap-x-6   p-2 bg-white">
              <h2 className="tsize-100 col-span-6 text-xl font-semibold text-gray-600 flex"><IoGrid  className="mt-2 mx-2"  />Data Tabel Status Agama</h2>
              <div className="garis garis1"></div>
              <div className="garis garis2"></div>
        </div>
        <table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full ">
          <thead>
            <tr className=" bg-blue-50 text-white w-full">
              <th className="tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Kecamatan</th>
              <th className="tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-4">Status Agama</th>
              <th className="text-center tsize-80 border-2 border-white bg-gray-700 text-white px-2 tracking-wide wp-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {pendudukku.map((penduduk,index) => (
              <tr key={index} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-4">{penduduk.kecamatan}</td>
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-4">{penduduk.agama}</td>
                <td className="tsize-80 border-slate-300  p-2 tracking-wide wp-2 text-center">{penduduk.count_agama}</td>
                
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

export default Tabel_Kec_Agama;