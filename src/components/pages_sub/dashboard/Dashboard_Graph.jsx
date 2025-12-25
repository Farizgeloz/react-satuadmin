import React, { useRef,useState, useEffect } from "react";
import {NavLink } from "react-router-dom";
import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {Row,Col,Image} from 'react-bootstrap';
import NavSub from "../../NavSub"


import { MdDashboard,MdDataset,MdDetails} from "react-icons/md";
import { api_url_satuadmin } from "../../../api/axiosConfig";

  

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl = import.meta.env.VITE_API_URL;

const DatasetGraph = () => {
  const [row_graph, setRowsGraph] = useState([]);

  const [datasetku, setCountDataset] = useState("");
  const [datasetku_satker, setCountDataset_satker] = useState("");
  const [datasetku_kecamatan, setCountDataset_Kecamatan] = useState("");
  const [datasetku_desa, setCountDataset_Desa] = useState("");

  

  useEffect(() => {
    getData();
    getStatistik();
  }, []);

  
  
  const getStatistik = async () => {
    try {
      const response2 = await api_url_satuadmin.get('opendata/count');
      const data2 = response2.data;
      console.log('DATA DARI BACKEND:', response2.data);
      setCountDataset(data2.totalDatasetPublik);
      setCountDataset_satker(data2.datasetPerSatker);
      setCountDataset_Kecamatan(data2.totalKecamatan);
      setCountDataset_Desa(data2.totalDesa);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }

    

  };

  const getData = async () => {
    try {
      const response = await api_url_satuadmin.get('opendata/dataset_graph_satker');

      setRowsGraph(response.data.countPerSatker);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
 

  

  
  const data_kecamatan2= row_graph.map((rows, index) => (
  {
      name: [rows.nama_opd],
      y: rows.count_satker
      
  }));
  

 

  
  
  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Dashboard" />
      
      <Row className="  bg-linear-8 py-2 ">
        <Col  md={3} sm={12} className=" px-5 text-white">
          <Row>
            <Col  md={12} sm={12}>
              <p className="textsize9 margin-t5 mb-1 text-center">Dataset Tesedia :</p>
              <p className="textsize16 font_weight600 text-sage-dark text-center bg-white rad15 p-1 d-flex  justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up svg-1 text-white bg-linear-1" viewBox="0 0 16 16">
                  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                </svg>
                <span className="mt-1">{datasetku}</span>
              </p>
            </Col>
            <Col  md={12} sm={12}>
              <p className="textsize9 mb-1 text-center">Lembaga Terhubung :</p>
              <p className="textsize16 font_weight600 text-sage-dark text-center bg-white rad15 p-1 d-flex  justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up svg-1 text-white bg-linear-1" viewBox="0 0 16 16">
                  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                </svg>
                <span className="mt-1">{datasetku_satker}</span>
              </p>
            </Col>
            <Col  md={12} sm={12}>
              <p className="textsize9 mb-1 text-center">Kecamatan Terhubung :</p>
              <p className="textsize16 font_weight600 text-sage-dark text-center bg-white rad15 p-1 d-flex  justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up svg-1 text-white bg-linear-1" viewBox="0 0 16 16">
                  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                </svg>
                <span className="mt-1">{datasetku_kecamatan}</span>
              </p>
            </Col>
            <Col  md={12} sm={12}>
              <p className="textsize9 mb-1 text-center">Desa Terhubung :</p>
              <p className="textsize16 font_weight600 text-sage-dark text-center bg-white rad15 p-1 d-flex  justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-up svg-1 text-white bg-linear-1" viewBox="0 0 16 16">
                  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                </svg>
                <span className="mt-1">{datasetku_desa}</span>
              </p>
            </Col>
          
          </Row>
        
        
        </Col>    
        <Col  md={9} sm={12} className="drop-shadow-lg max-height2">
          <div className="md:col-span-4 col-span-6 p-2 ">
            

            <HighchartsReact
              highcharts={Highcharts}
              options={
                { 
                  chart: {
                    type: "column",
                    name:"coba",
                    backgroundColor: 'transparent',
                  },
                  title: {
                    text: "Grafik Jumlah Per Produk Data",
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#ffffff'
                    }
                  },
                  
                  xAxis: {
                      type: 'category',
                      labels: {
                          autoRotation: [-45, -90],
                          style: {
                              fontSize: '10px',
                              fontFamily: 'Poppins, sans-serif',
                              color: '#ffffff'
                          }
                      }
                  },
                  yAxis: {
                      min: 0,
                      title: {
                          text: 'Banyak Data',
                          style: {
                              fontSize: '10px',
                              fontFamily: 'Poppins, sans-serif',
                              color: '#ffffff'
                          }
                      },
                      labels: {
                          autoRotation: [-45, -90],
                          style: {
                              fontSize: '10px',
                              fontFamily: 'Poppins, sans-serif',
                              color: 'yellow'
                          }
                      }
                  },
                  /*tooltip: {
                    useHTML: true,
                    headerFormat: '<div>',
                    footerFormat: '</div>',
                    pointFormatter: function() {
                      var dataSum = 0,
                        percentage;

                      this.series.points.forEach(function(point) {
                        dataSum += point.y;
                      });

                      percentage = (this.y / dataSum) * 100;

                      return `<p><span><b>${this.name}</b></span></p>
                            <p><span>Banyak Data:${this.y}</span><span>({${percentage}:0.1f%})</span></p>`
                    }
                  },*/
                  tooltip: {
                    useHTML: true,
                    headerFormat: '<div>',
                    footerFormat: '</div>',
                    pointFormatter: function() {
                      var dataSum = 0,
                        percentage;

                      this.series.points.forEach(function(point) {
                        dataSum += point.y;
                      });

                      percentage = (this.y / dataSum) * 100;
                      let result = percentage.toString().substring(0, 5);

                      return `<p><span><b>${this.name}</b></span></p>
                            <p><span>Banyak Data: <b>${this.y}</b></span> (<span>${result}%</span>)</p>`
                    }
                  },
                  plotOptions: {
                      column: {
                          borderRadius: '5%',
                          dataLabels: {
                              enabled: true
                          },
                          groupPadding: 0.1,
                          borderColor:'white',
                          borderWidth:3,
                      }
                  },
                  series: [{
                    name: 'Population',
                      colors: [
                          '#ffffff59'
                      ],
                      colorByPoint: true,
                      groupPadding: 0,
                      data: data_kecamatan2,
                      dataLabels: {
                          enabled: true,
                          rotation: -90,
                          color: '#FFFFFF',
                          inside: true,
                          verticalAlign: 'top',
                          format: '{point.y:1f}', // one decimal
                          y: 10, // 10 pixels down from the top
                          style: {
                              fontSize: '13px',
                              fontFamily: 'Poppins, sans-serif',
                              color:'#ffffff'
                          }
                      }
                  }],
                  legend: {
                      enabled: false,
                      
                      itemStyle: {
                              color: '#000',
                              fontFamily: 'MuseoS500',
                              fontSize: '70%'
                      }
                  },
                  responsive: {
                    rules: [{
                        condition: {
                            maxWidth: '80vh'
                        },
                        chartOptions: {
                            chart: {
                                height: 300
                            },
                            subtitle: {
                                text: null
                            },
                            navigator: {
                                enabled: false
                            }
                        }
                    }]
                }
                }      
                  
              }
              containerProps={{ style: { height: "80vh" } }}
            />
          </div>
          
        </Col>
        
      </Row>
    
    </div>
  );
};

export default DatasetGraph;
