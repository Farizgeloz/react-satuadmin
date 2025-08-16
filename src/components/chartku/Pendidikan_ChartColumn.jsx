import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import exporting from 'highcharts/modules/exporting';

//exporting(Highcharts);
const apiurl=process.env.REACT_APP_URL;

function Pendidikan_ChartColumn() {

  const [pendidikanku, setRowsPendidikan] = useState([]);
  const monthku = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  useEffect(() => {
    getPenduduk();
  }, []);

  const getPenduduk = async () => {
    const response = await axios.get(
      apiurl+`backend_dashboard`
    );
    setRowsPendidikan(response.data.totalrowspenduduk_pendidikan);
  };

  const ab2= pendidikanku.map((pendidikanx, index) => (
      {
          name: [pendidikanx.pendidikan],
          data: [pendidikanx.count_pendidikan]
          
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
              text: "Diagram Pendidikan",
            },
            xAxis: {
              categories: ["Pendidikan"]
            },
            
            /*series: [
              {
                name: {ab},
                type: "column",
                data:
                  pendidikanku.map((pendidikanx,index) => (
                    pendidikanx.count_pendidikan
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

export default Pendidikan_ChartColumn;