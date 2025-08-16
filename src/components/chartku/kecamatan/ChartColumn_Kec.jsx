import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import exporting from 'highcharts/modules/exporting';


//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Kecamatan_ChartColumn() {

  const [kecamatanku, setRowsKecamatan] = useState([]);
  const monthku = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk_kecamatan`
    );
    setRowsKecamatan(response.data.result);
  };

  const ab2= kecamatanku.map((kecamatanx, index) => (
      {
          name: [kecamatanx.kecamatan],
          data: [kecamatanx.count_kecamatan]
          
      }
  ));
  

  return (
    <div className="w-ful)l">
      <HighchartsReact
        highcharts={Highcharts}
        options={
          { 
            chart: {
              type: "bar",
              name:"coba"
            },
            title: {
              text: "Diagram Kecamatan",
            },
            xAxis: {
              categories: ["Kecamatan"]
            },
            series:ab2
          }      
             
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default Kecamatan_ChartColumn;