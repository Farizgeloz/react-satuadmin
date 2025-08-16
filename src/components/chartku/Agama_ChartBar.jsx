import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import exporting from 'highcharts/modules/exporting';

//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Agama_ChartColumn() {

  const [agamaku, setRowsAgama] = useState([]);
  const monthku = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_dashboard`
    );
    setRowsAgama(response.data.totalrowspenduduk_agama);
  };
  const ab=
    agamaku.map((agamax,index) => (
    
      {name:agamax.agama},
      {type:"column"},
      {data:agamax.count_agama}
    
    ));
    const ab2=
    agamaku.map((agamax, index) => (
      {
          name: (agamax.agama),
          type: "column",
          data: (agamax.count_agama),
      }
    ));
  

  return (
    <div className="w-ful)l">
      <HighchartsReact
        highcharts={Highcharts}
        options={
          { 
            chart: {
              type: "column",
            },
            title: {
              text: "Diagram Agama",
            },
            xAxis: {
              categories: 
                agamaku.map((agamax,index) => (
                  agamax.agama
                )),
              crosshair: true,
            },
            /*series: [
              {
                name: {ab},
                type: "column",
                data:
                  agamaku.map((agamax,index) => (
                    agamax.count_agama
                  )),
                
              },
            ],*/
            series:ab2
          }      
             
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default Agama_ChartColumn;