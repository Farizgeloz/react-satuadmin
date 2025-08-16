import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useRef, useState, useEffect } from "react";



function ChartLine(props) {
  const laki = useState(props.laki);
  const wanita = useState(props.wanita);
  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={
         { 
            title: {
              text: "Line Chart",
            },
            series: [
              {
                name:"Laki-Laki",
                type: "line",
                data: [props.laki, 2, 3],
              },
              {
                name:"Perempuan",
                type: "line",
                data: [props.wanita, 7, 6, 9, 5, 4],
              },
             
            ]
          }
        }
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}

export default ChartLine;