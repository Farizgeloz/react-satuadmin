import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import UserModalDelete from "./Location_MaplistModalDelete"
import NavSub from "../../NavSub"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import {Row,Col} from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FaPenToSquare,FaClipboardList } from "react-icons/fa6";
import Dropdown from 'react-bootstrap/Dropdown';
import { CSVLink, CSVDownload } from "react-csv";
import { motion } from "framer-motion";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';

import { MdDashboard,MdDataset,MdDetails} from "react-icons/md";

//import XLSX from 'xlsx';



import Papa from 'papaparse';
import useFetch from './useFeach';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { readString } from 'react-papaparse';

const apiurl=process.env.REACT_APP_URL;

const XLSX = require('sheetjs-style');

const Spinner = () => <div className="loader "></div>;

const { SearchBar } = Search;

function Location_MaplistPengelolah() {
  const [loading, setLoading] = useState(true);
  const [idd, setid] = useState("");
  const [komponen, setkomponen] = useState("");
  const [kode, setkode] = useState("");
  const [kategori, setkategori] = useState("");
  const [organisasi, setorganisasi] = useState("");
  const [sifat_data, setsifat_data] = useState("");
  const [frekuensi, setfrekuensi] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const [updatedAt, setupdatedAt] = useState("");
  const [kegiatan_statistik, setkegiatan_statistik] = useState("");
  const [klasifikasi, setklasifikasi] = useState("");
  const [konsep, setkonsep] = useState("");
  const [definisi, setdefinisi] = useState("");
  const [ukuran, setukuran] = useState("");
  const [satuan, setsatuan] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [documentt, setDocument] = useState();

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  const [groupedData, setGroupedData] = useState({});
  const [groupCounts, setGroupCounts] = useState({});
  const [groupedSums, setGroupedSums] = useState({});

  

  useEffect(() => {
    setTimeout(() => {
      const getDataById = async () => {
        try {
          const response = await axios.get(apiurl+`api/opendata/dataset_data_detail/${id}`);
          setid(response.data.id);
          setkomponen(response.data.komponen);
          setkode(response.data.kode);
          setkategori(response.data.kategori);
          setorganisasi(response.data.nama_satker);
          setsifat_data(response.data.sifat_data);
          setfrekuensi(response.data.frekuensi);
          setcreatedAt(convertDate(response.data.createdAt));
          setupdatedAt(convertDate(response.data.updatedAt));
          setkegiatan_statistik(response.data.kegiatan_statistik);
          setklasifikasi(response.data.klasifikasi);
          setkonsep(response.data.konsep);
          setdefinisi(response.data.definisi);
          setukuran(response.data.ukuran);
          setsatuan(response.data.satuan);
          setketerangan(response.data.keterangan);
          setDocument(response.data.document);

          getCsvData(response.data.presignedUrl,response.data.ukuran);
          //fetchData(response.data.document);
          
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };

      getDataById();
      setLoading(false);
    }, 2000);

    const getCsvData = async (documen, ukurann) => {
  try {
    const response = await fetch(documen);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return;
    }

    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);

    // Parse CSV dengan header
    const parsedResult = Papa.parse(csvData, { header: true });
    const parsedData = parsedResult.data;

    // Filter baris kosong atau tidak memiliki nilai tahun
    const cleanedData = parsedData.filter(row =>
      row &&
      (row.Tahun || row.tahun) &&
      Object.keys(row).some(key => row[key] !== "") // tidak semua kolom kosong
    );

    // Simpan ke state utama
    setData(cleanedData);

    // Setup kolom tabel
    const hiddenFields = ['id', '_key', ''];
    const keys = Object.keys(cleanedData[0]);
    const columnDefs = keys.map((key) => ({
      dataField: key,
      text: key.toUpperCase(),
      hidden: hiddenFields.includes(key),
      sort: true,
      className: 'input-gray',
      filter: textFilter({
        style: { display: 'block', color: '#334856' },
        placeholder: 'Cari ' + key,
      }),
      headerAlign: () => 'center',
      style: {
        fontWeight: 'bold',
        fontSize: '80%'
      },
      headerFormatter: HeadFormatter,
      headerStyle: { backgroundColor: '#126cb5' }
    }));

    setColumns(columnDefs);

    // Group by Tahun (dengan sanitasi dan lowercase opsional)
    const grouped = cleanedData.reduce((acc, item) => {
      const tahunRaw = item.Tahun || item.tahun || "";
      const tahun = tahunRaw.toString().trim(); // hilangkan spasi

      if (!tahun) return acc;

      if (!acc[tahun]) {
        acc[tahun] = [];
      }
      acc[tahun].push(item);
      return acc;
    }, {});
    setGroupedData(grouped);

    // Hitung jumlah per grup
    const counts = countGroupsWithIndices(cleanedData);
    setGroupCounts(counts);

    // Ubah semua key dan value menjadi lowercase untuk proses selanjutnya
    const lowercaseData = cleanedData.map((row) => {
      const lowerRow = {};
      for (let key in row) {
        if (!row[key]) continue;
        lowerRow[key.toLowerCase()] = row[key].toString().toLowerCase();
      }
      return lowerRow;
    });

    // Hitung total/sum berdasarkan grup tahun dan field ukurann
    const summ = sumValuesByGroup(lowercaseData, "tahun", ukurann.toLowerCase());
    setGroupedSums(summ);

    console.log("Ukuran (field):", ukurann);

  } catch (error) {
    console.error("Terjadi kesalahan saat membaca CSV:", error);
  }
    };

    

    const sumValuesByGroup = (array, groupKey, valueKey) => {
      return array.reduce((acc, item) => {
        const group = String(item[groupKey]).toLowerCase();
        const value = parseFloat(item[valueKey]) || 0.0;
        acc[group] = (acc[group] || 0) + value;
        
        return acc;
      }, {});
    };

    

    //fetchCsvData(DataCSV, setDataCoba);

   const countGroupsWithIndices = (parsedData) => {
    const groupMap = {};

    // Loop through items and group by their group value
    parsedData.forEach((item, index) => {
      if (!groupMap[item.tahun ||item.Tahun ]) {
        groupMap[item.tahun ||item.Tahun] = { count: 1, indices: [] };
      }
      else{
        groupMap[item.tahun ||item.Tahun].count += 1;
        groupMap[item.tahun ||item.Tahun].indices.push(index);
      }
      

      
    });

    return groupMap;
  };
  
    

  }, [id]);

  
  //console.log(datacoba);

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );


  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const data_chart_pie= Object.entries(groupedSums).map(([group, data]) => (
  {
      name: [group],
      y: data
      
  }));

  const metadata=[
     {
      "Kode":kode
    },
     {
      "Komponen":komponen
    },
  ]
  //console.log(metadata);
  
 // console.log(data);
  
 function convertDate(datePicker) {
      const selectedDate = new Date(datePicker);

      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

      const dayName = dayNames[selectedDate.getDay()];
      const day = selectedDate.getDate();
      const monthName = monthNames[selectedDate.getMonth()];
      const year = selectedDate.getFullYear();

      const jam=selectedDate.getHours();
      const menit=selectedDate.getMinutes();
      const detik=selectedDate.getSeconds();

      const indonesianFormat = `${day} ${monthName} ${year}`+' Waktu : '+`${jam}:${menit}:${detik} WIB`;
      return indonesianFormat;
  }
  
  
const downloadxls = ()=>{
    const rowHeight = 25;
    const colWidth = 19;
    let ws = XLSX.utils.json_to_sheet(data);

    // Define a style
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "0170b5" } },
      alignment: {
        horizontal: "center", // Center text horizontally
        vertical: "center",   // Center text vertically
        wrapText: true        // Wrap text
      },
    };

    // Apply style to cells A1:M1
    for (let col = 0; col < 13; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // r: row 0, c: col index
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = headerStyle;
    }

    
    var wscols = new Array(10).fill({ wch: colWidth });
    ws['!cols'] = wscols;

    ws['!rows'] = [
            {'hpt' : 30}]; //height for row 2*/


    let ws2 = XLSX.utils.aoa_to_sheet(
      [
        [komponen],
        [""],
        [""],
        ["Metadata Info :"],
        ["Kode",": "+kode],
         ["Kategori",": "+kategori],
        ["Produsen Data",": "+organisasi],
        ["Sifat Data",": "+sifat_data],
        ["Frekuensi",": "+frekuensi],
        ["Konsep",": "+konsep],
        ["Klasifikasi",": "+klasifikasi],
        ["Tanggal Unggah",": "+createdAt],
        ["Tanggal Update",": "+updatedAt],
        [""],
        ["Additional Info :"],
        ["Kegiatan Statistik",": "+kegiatan_statistik],
        ["Definisi",": "+definisi],
        ["Ukuran",": "+ukuran],
        ["Satuan",": "+satuan],
        ["Keterangan",": "+keterangan]
      ]
    );
    ws2["!merges"] = [
      XLSX.utils.decode_range("A1:H2"),
      XLSX.utils.decode_range("A4:C4"),
      XLSX.utils.decode_range("B6:H6"),
      XLSX.utils.decode_range("B7:H7"),
      XLSX.utils.decode_range("B8:H8"),
      XLSX.utils.decode_range("B9:H9"),
      XLSX.utils.decode_range("B10:H10"),
      XLSX.utils.decode_range("B11:H11")
    ];
    
    



    ws2["A1"].s = {
      font: {
        name: 'Arial',
        sz: 12,
        color: { rgb: '#FF000000' },
        bold: true,
        italic: false,
        underline: false,
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
      },
    };
    ws2["A4"].s = {
      font: {
        sz: 12,
        color: { rgb: '#0099F7' },
        bold: true,
        italic: false,
        underline: false,
      }
      
    };
    ws2["A15"].s = {
      font: {
        sz: 12,
        color: { rgb: '#0099F7' },
        bold: true,
        italic: false,
        underline: false,
      }
      
    };
     
     
    var wscols2 = [
        {wch:20},
        {wch:20}
    ];
   
    ws2['!cols'] = wscols2;
    /*ws2['!rows'] = [
            {'hpt' : 30}]; //height for row 2*/
    
    /*ws2['!rows'] = [
            {'hpt' : 30}]; //height for row 2*/
    ws2['!rows'] = new Array(data.length).fill({ hpt: rowHeight });
    
    //let ws3 = XLSX.utils.json_to_sheet(metadata2);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dataset");
    XLSX.utils.book_append_sheet(wb, ws2, "Metadata");
    
    //XLSX.utils.decode_range("A1:B2,A2:H2");
    //XLSX.utils.decode_range("A8:B8");
    let buf = XLSX.write(wb, {bookType:'xlsx', type:'buffer'}); // generate a nodejs buffer
    let str = XLSX.write(wb, {bookType:'xlsx', type:'binary'}); // generate a binary string in web browser
    XLSX.writeFile(wb, `${kode}-${komponen}-${updatedAt}.xlsx`);
  }


  const afterSearch = (newResult) => {
    console.log(newResult);
  };

  function HeadFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column',color: 'white',fontSize:'80%' } }>
         { column.text }
        { filterElement }
       
        { sortElement }
      </div>
    );
  }

  const pagecustomTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total px-2">
      Menampilkan { from } Sampai { to } dari { size } data
    </span>
  );
  const pageoptions = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'Awal',
    prePageText: 'Kembali',
    nextPageText: 'Lanjut',
    lastPageText: 'Akhir',
    nextPageTitle: 'Page Awal',
    prePageTitle: 'Page Akhir',
    firstPageTitle: 'Page Awal',
    lastPageTitle: 'Page Akhir',
    showTotal: true,
    paginationTotalRenderer: pagecustomTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      
      text: '10', value: 10
    }, {
      text: '20', value: 20
    }, {
      text: '30', value: 30
    }, {
      text: '40', value: 40
    }, {
      text: '50', value: 50
    }, {
      text: '100', value: 100
    }, {
      text: 'All', value: data.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

   const rowStyle = { fontSize: '100%' };


  return (
    <div className="bg-gray-100  h-95 w-100  overflow-auto z-5  max-[640px]:mt-10">
      <NavSub  title="Location Maplist Detail" />
      <div className="col-span-6">
        <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
            <MdDashboard className="mt-1 textsize8"/>Dashboard
          </NavLink> / 
          <NavLink to="/Data-Location_Maplist" className="text-link-sky mx-2 d-flex">
            <MdDataset className="mt-1 textsize8" />Location Maplist
          </NavLink> /
          <NavLink  className="text-link-sky mx-2 d-flex">
            <MdDetails className="mt-1 textsize8" />Detail
          </NavLink>
        </p>
      </div>
        
      
      <div className='col-span-6 shaddow1 rad15 mx-2 '>
        
        <Row className='p-0 mx-2'>
          
          <Col md={12} sm={12} className=' bg-linear-9 align-middle justify-content-center align-self-center mt-1 rad15'>
            {loading ? (
                    <Spinner />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <p className='text-white textsize14 text-left p-2 rad15 align-middle mb-1 line-hight-1'>{komponen}</p>
                      <p className='text-white textsize9 text-center font_weight600 bg-red max-width-180 rad15'>{kategori}</p>
                    </motion.div>
                  )}
          </Col>
          
          
          
        </Row>
        
      </div>
      <Row className='margin-t3  max-w-full'>
        <Col md={6} sm={12}>
            <Row className='p-2 mx-1 bg-white rad15 garis5 shaddow1'>
              <p className='text-white textsize9 text-center btn-grad-sky-4 p-2 rad15'>Location_Maplist Info</p>
              <Col md={12} sm={12}>
                {loading ? (
                    <Spinner />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                    <Row className='p-2 rad15 transisi1'>
                      <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600 mt-1'>Kode</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9 '>{kode}</p>
                      </Col>
                      <Col md={5} sm={5}>
                        <p className='textsize9 font_weight600'>Produsen Data</p>
                      </Col>
                      <Col md={7} sm={7} className=''>
                        <p className='textsize9 capitalizeku'>{organisasi}</p>
                      </Col>
                      <Col md={5} sm={5} className=''>
                        <p className='textsize9 font_weight600'>Sifat Data</p>
                      </Col>
                      <Col md={7} sm={7} className=''>
                        <p className='textsize9 '>{sifat_data}</p>
                      </Col>
                      
                      <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600'>Frekuensi Data</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9 '>{frekuensi}</p>
                      </Col>
                      <Col md={5} sm={5} className=''>
                        <p className='textsize9 font_weight600'>Konsep</p>
                      </Col>
                      <Col md={7} sm={7} className=''>
                        <p className='textsize9 '>{konsep}</p>
                      </Col>
                      <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600'>Klasifikasi</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9 '>{klasifikasi}</p>
                      </Col>
                      
                      
                      <Col md={5} sm={5} className=''>
                        <p className='textsize9 font_weight600'>Tgl. Dibuat</p>
                      </Col>
                      <Col md={7} sm={7} className=''>
                        <p className='textsize9 '>{createdAt}</p>
                      </Col>
                      <Col md={5} sm={5} className='bg-silver'>
                        <p className='textsize9 font_weight600'>Tgl. Update</p>
                      </Col>
                      <Col md={7} sm={7} className='bg-silver'>
                        <p className='textsize9'>{updatedAt}</p>
                      </Col>
                      
                    </Row>
                    </motion.div>
                  )}
              </Col>
            </Row>
          
        </Col>
        <Col md={6} sm={12}>
          <Row className='p-2 mx-1 bg-white rad15 garis5 shaddow1'>
            <p className='text-white textsize9 text-center btn-grad-sky-4 p-2 rad15'>Additional Info</p>
            <Col md={12} sm={12}>
            {loading ? (
              <Spinner />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Row className='p-2 rad15'>
                
                  <Col md={12} sm={12} className='bg-silver'>
                    <p className='textsize9 font_weight600 mt-1 mb-1'>Kegiatan Statistik</p>
                  </Col>
                  <Col md={12} sm={12} className='bg-silver'>
                    <p className='textsize9 '>{kegiatan_statistik}</p>
                  </Col>
                  <Col md={12} sm={12}>
                    <p className='textsize9 font_weight600 mb-1'>Definisi</p>
                  </Col>
                  <Col md={12} sm={12} className=''>
                    <p className='textsize9 capitalizeku'>{definisi}</p>
                  </Col>
                  <Col md={5} sm={5} className='bg-silver'>
                    <p className='textsize9 font_weight600'>Ukuran</p>
                  </Col>
                  <Col md={7} sm={7} className='bg-silver'>
                    <p className='textsize9 '>{ukuran}</p>
                  </Col>
                  
                  <Col md={5} sm={5}>
                    <p className='textsize9 font_weight600'>Satuan</p>
                  </Col>
                  <Col md={7} sm={7} className=''>
                    <p className='textsize9 '>{satuan}</p>
                  </Col>
                  <Col md={12} sm={12}>
                    <p className='textsize9 font_weight600'>Keterangan</p>
                  </Col>
                  <Col md={12} sm={12} className=''>
                    <p className='textsize9 '>{keterangan}</p>
                  </Col>
                  
                </Row>
              </motion.div>
              )}
            </Col>
          </Row>
          
        </Col>
      </Row>
      {loading ? (
          <Spinner />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <Dropdown data-bs-theme="dark" className='m-2'>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              Download
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" >
                <NavLink onClick={downloadxls} className="text-link-white">Download xlsx</NavLink>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <CSVLink data={data} className="text-link-white">Download Csv</CSVLink>
              </Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
        </motion.div>
      )}
      
      <Row className='p-2 margin-t5 mx-1 bg-white rad15 margin-b10 max-w-full'>
        {loading ? (
          <Spinner />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Tabs
              defaultActiveKey="series"
              id="uncontrolled-tab-example"
              className="mb-3 max-w-full"
            >
              <Tab eventKey="visual" title="Visualisasi" className='container'>
                {/*Object.keys(datacoba[0] || {}).map(header => (
                          <th className='bg-border4 bg-sage2' key={header}>{header}</th>
                        ))}
                {datacoba.map(recipe => (
                    <p>{recipe.tahun}</p>
                  ))*/}
                  
                  {/*Grafik Pie*/}
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={
                      { 
                        /*chart: {
                          type: "bar",
                          name:"coba"
                        },
                        title: {
                          text: "Diagram Kecamatan",
                        },
                        xAxis: {
                          categories: ["Kecamatan"]
                        },
                        series:data_kecamatan2*/
                        chart: {
                          plotBackgroundColor: null,
                          plotBorderWidth: null,
                          plotShadow: false,
                          type: 'pie'
                        },
                        colors: ['#029b7a','#3ea992','#6aa094','#8da06a','#bbb443'],
                        title: {
                            text: 'Visualisasi Per Tahun',
                            style: {
                              fontSize: '14px',
                              fontFamily: 'Poppins, sans-serif',
                              color: '#666666'
                            }
                        },
                        tooltip: {
                          pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
                        },
                        accessibility: {
      enabled: false
    },
                        plotOptions: {
                            pie: {
                              allowPointSelect: true,
                              cursor: 'pointer',
                              dataLabels: [{
                                  enabled: true,
                                  distance: 0,
                                  style: {
                                    fontSize: '0.5em',
                                    opacity: 0.7
                                },
                              }, 
                              {
                                enabled: true,
                                distance: -40,
                                format: '{point.percentage:.1f}%',
                                style: {
                                    fontSize: '0.5em',
                                    opacity: 0.7
                                },
                                /*filter: {
                                    operator: '>',
                                    property: 'percentage',
                                    value: 10
                                }*/
                                
                              }],
                              cursor: 'pointer',
                              showInLegend: true
        
                            }
                        },
                        series: [{
                            name: 'Banyak Data',
                            colorByPoint: true,
                            data: data_chart_pie,
                        }],
                        legend: {
                            enabled: true,
                            
                            itemStyle: {
                                    color: '#000',
                                    fontFamily: 'MuseoS500',
                                    fontSize: '70%'
                            }
                        }
                      }      
                        
                    }
                    containerProps={{ style: { height: "100%", width: "100%", } }}
                  />
                  {/*Grafik Column
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={
                      { 
                        chart: {
                          type: "line",
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
                                    color: '#999999'
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
                            colors: ['#029b7a','#3ea992','#6aa094','#8da06a','#bbb443'],
                            colorByPoint: true,
                            groupPadding: 0,
                            data: data_chart_pie,
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
                                    color:'#999999'
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
                  />*/}
                  
              </Tab>

              <Tab eventKey="series" title="Data Series">
                <div className='w-100'>
                
                  {/*<div>
                    {Object.entries(groupedData).map(([key, items]) => (
                      <div key={key}>
                        <h2>{key}</h2>
                        <ul>
                          {items.map((item, index) => (
                            <li key={index}>{JSON.stringify(item)}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>*/}
                  <table  className='w-100 table-responsive rad15'>
                    <thead className='rad15 bg-linear-9'>
                      <tr className=' py-2 text-center text-light'>
                        <th rowSpan={2} className='bg-sky-600 bg-border4'>Kode</th>
                        <th rowSpan={2} className='bg-sky-600 bg-border4'>Komponen</th>
                        <th colSpan={100}

                        className='bg-border4 bg-sky-600'>Tahun</th>
                      </tr>
                      <tr className=' py-2 text-center text-light'>
                        {Object.entries(groupedSums) ? Object.entries(groupedSums).map(([group, total]) => (
                          <th className='bg-border4 bg-sky-700' key={group}>{group}</th>
                        )) :<p>Data Kosong</p>}
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className='bg-border3'> {kode}</td>
                          <td className='bg-border3'> {komponen}</td>
                          {Object.entries(groupedSums) ? Object.entries(groupedSums).map(([group, total]) => (
                            <td className='bg-border3' key={group}>
                             
                              {total}
                            </td>
                           

                          )) :<p>Data Kosong</p>}
                          {/* Object.entries(groupCounts) ? Object.entries(groupCounts).map(([group, data]) => (
                            <td className='bg-border3' key={group}>
                             
                              {data.count}
                            </td>
                          )) :<p>Data Kosong</p>*/}
                        </tr>
                    </tbody>
                  </table>
                      

                
                </div>
              </Tab>
              <Tab eventKey="raws" title="Data Raw" className='w-full  overflow-xx-auto'>
                <div className=' max-w-full'>
                  <input type="text" className=' max-w-full text-search rad10' value={search} onChange={e => setSearch(e.target.value)} placeholder='Cari Data'/>
                  {data.length > 0 && <BootstrapTable 
                    keyField="key"
                    data={ data } 
                    columns={ columns } 
                    //rowStyle={ rowStyle }
                    rowStyle={ rowStyle }
                    exportCSV={ { onlyExportFiltered: true, exportAll: false } }
                    filter={ filterFactory() }
                    search={ { afterSearch } }
                    pagination={ paginationFactory(pageoptions) }
                    //pagination={ paginationFactory(pageoptions) }
                    //expandRow={ expandRow }
                    hover 
                    
                    >

                      {
                        props => (
                          <div>
                            <SearchBar { ...props.searchProps } className="widthtt" placeholder="Cari Data" />
                            <hr />
                          
                            <BootstrapTable
                              { ...props.baseProps }
                              // pagination={ paginationFactory() }
                              //expandRow={ expandRow }
                            />
                          
                          </div>
                        )
                      }
                    </BootstrapTable>}         
                 
                  {/*<table  className=' max-w-full overflow-xx-auto table-responsive rad15'>
                    <thead className='rad15 bg-sage2'>
                      <tr className=' py-2 text-center text-light'>
                        {Object.keys(data[0] || {}).map(header => (
                          <th className='bg-border4 bg-sky-600 ' key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData ?paginatedData.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((cell, index) => (
                            <td className='bg-border3' key={index}>{cell}</td>
                          ))}
                        </tr>
                      )) :<p>Data Kosong</p>}
                    </tbody>
                  </table>
                  <div className='float-right margin-t5'>
                    <button className='btn-page' onClick={() => setPage(page - 1)} disabled={page === 1}><i className="fas fa-chevron-left"></i></button>
                    <span>{page} / {totalPages}</span>
                    <button className='btn-page' onClick={() => setPage(page + 1)} disabled={page === totalPages}><i className="fas fa-chevron-right"></i></button>
                  </div>*/}
                </div>
              </Tab>
              <Tab eventKey="aksi" title="Aksi">
                <div className='w-100 d-flex'>
                  
                  <Link to={ `/Data-Location_Maplist/Update/${komponen}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-2">
                    <button 
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
                          <FaPenToSquare  className='mt-1 mx-1' /><span>Edit</span>
                    </button>
                  </Link>
                  <UserModalDelete
                        id={idd}
                        name={komponen}
                        
                    />
                  
                
                </div>
              </Tab>
            </Tabs>
          </motion.div>
        )}
      </Row> 
    </div>
  );
}

export default Location_MaplistPengelolah;
