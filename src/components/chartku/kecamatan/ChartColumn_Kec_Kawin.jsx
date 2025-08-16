import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import exporting from 'highcharts/modules/exporting';


//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Kawin_ChartColumn() {

  const [kawinku, setRowsKawin] = useState([]);
  const monthku = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk_kecamatan_sub`
    );
    setRowsKawin(response.data.totalrowspenduduk_kawin);
  };

  const ab2= kawinku.map((kawinx, index) => (
      {
          name: [kawinx.kecamatan]+"-"+[kawinx.status_kawin],
          data: [kawinx.count_kawin]
          
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
              text: "Diagram Status Kawin",
            },
            xAxis: {
              categories: ["Status Kawin"]
            },
            series:ab2
          }      
             
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default Kawin_ChartColumn;