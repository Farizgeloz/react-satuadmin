import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import exporting from 'highcharts/modules/exporting';

//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function ChartColumn() {

  const [pendudukku, setPenduduk] = useState([]);
  const [lahirmonthku, setLahirMonth] = useState([]);
  const [lahirmonthku2, setLahirMonth2] = useState([]);
  const [rowsp, setRowsP] = useState("5");
  const [rowsl, setRowsL] = useState("6");
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
  };
 
  

  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={
          { 
            chart: {
              type: "column",
            },
            title: {
              text: "Chart Colomn",
            },
            xAxis: {
              categories: 
                lahirmonthku.map((lahirmonth,index) => (
                  monthku[lahirmonth.bulan]
                )),
              crosshair: true,
            },
            series: [
              {
                name: "Tgl Lahir Tahun Ini",
                type: "column",
                data:
                  lahirmonthku.map((lahirmonth,index) => (
                    lahirmonth.count
                  )),
                
              },
              /*{
                name: "Tokyo",
                type: "column",
                data: [
                  3, 2, 1,
                ],
              },
              {
                name: "New York",
                type: "column",
                data: [
                  8.6, 7.8, 3.5,
                ],
              },*/
              
            ],
          }
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default ChartColumn;