import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



export default function Chart({ chartOptions }) {
  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: "100%" } }}
      />
    </div>
  );
}