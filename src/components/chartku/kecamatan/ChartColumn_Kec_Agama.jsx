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
      apiurl+`backend_penduduk_kecamatan_sub`
    );
    setRowsAgama(response.data.totalrowspenduduk_agama);
  };

  const ab2= agamaku.map((agamax, index) => (
      {
          name: [agamax.kecamatan]+"-"+[agamax.agama],
          data: [agamax.count_agama]
          
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
              name:"coba"
            },
            title: {
              text: "Diagram Status Agama",
            },
            xAxis: {
              categories: ["Status Agama"]
            },
            series:ab2
          }      
             
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default Agama_ChartColumn;