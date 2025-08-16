import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import exporting from 'highcharts/modules/exporting';


//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Jk_ChartColumn() {

  const [jkku, setRowsJk] = useState([]);
  const monthku = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_penduduk_kecamatan_sub`
    );
    setRowsJk(response.data.totalrowspenduduk_jk);
  };

  const ab2= jkku.map((jkx, index) => (
      {
          name: [jkx.kecamatan]+"-"+[jkx.jk],
          data: [jkx.count_jk]
          
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
              text: "Diagram Jenis kelamin",
            },
            xAxis: {
              categories: ["Jenis kelamin"]
            },
            series:ab2
          }      
             
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default Jk_ChartColumn;