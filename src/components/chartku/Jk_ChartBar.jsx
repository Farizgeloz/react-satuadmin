import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";
import exporting from 'highcharts/modules/exporting';

//exporting(Highcharts);


function ChartBar(props) {
  const laki = useState(props.laki);
  const wanita = useState(props.wanita);
  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={
         { 
            chart: {
              type: "bar",
            },
            title: {
              text: "Chart Bar",
            },
            xAxis: {
              categories: ["agama"]
            },
            series: [
              {
                name: "Laki-Laki",
                type: "column",
                data: [props.laki],
              },
              {
                name: "Perempuan",
                type: "column",
                data: [props.wanita],
              },
            ]
          }
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default ChartBar;