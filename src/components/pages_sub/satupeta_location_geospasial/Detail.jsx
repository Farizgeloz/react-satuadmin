import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import UserModalDelete from "./LocationpointModalDelete"
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
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MdDashboard,MdDataset,MdDetails} from "react-icons/md";

//import XLSX from 'xlsx';



import Papa from 'papaparse';
import useFetch from './useFeach';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { readString } from 'react-papaparse';
import { api_url_satuadmin } from '../../../api/axiosConfig';


// Theme MUI custom label pagination
const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: "Data per halaman:"
      }
    }
  }
});

const XLSX = require('sheetjs-style');

const Spinner = () => <div className="loader "></div>;


function DatasetPengelolah() {
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
  const [variabel_a, setvariabel_a] = useState("");
  const [kuantitas_a, setkuantitas_a] = useState("");
  const [grafik_a, setgrafik_a] = useState("");
  const [variabel_b, setvariabel_b] = useState("");
  const [kuantitas_b, setkuantitas_b] = useState("");
  const [grafik_b, setgrafik_b] = useState("");
  const [variabel_c, setvariabel_c] = useState("");
  const [kuantitas_c, setkuantitas_c] = useState("");
  const [grafik_c, setgrafik_c] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [documentt, setDocument] = useState();

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  const [groupedData, setGroupedData] = useState({});
  const [groupCounts, setGroupCounts] = useState({});
  const [groupedSums_a, setGroupedSums_a] = useState({});
  const [groupedSums_b, setGroupedSums_b] = useState({});
  const [groupedSums_c, setGroupedSums_c] = useState({});

  

  useEffect(() => {
    setTimeout(() => {
      const getDataById = async () => {
        try {
          const response = await api_url_satuadmin.get(`api/opendata/dataset_data_detail/${id}`);
          setid(response.data.id);
          setkomponen(response.data.komponen);
          setkode(response.data.kode);
          setkategori(response.data.kategori);
          setorganisasi(response.data.nama_opd);
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
          setvariabel_a(response.data.variabel_a);
          setkuantitas_a(response.data.kuantitas_a);
          setgrafik_a(response.data.grafik_a);
          setvariabel_b(response.data.variabel_b);
          setkuantitas_b(response.data.kuantitas_b);
          setgrafik_b(response.data.grafik_b);
          setvariabel_c(response.data.variabel_c);
          setkuantitas_c(response.data.kuantitas_c);
          setgrafik_c(response.data.grafik_c);
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
          //(row.Tahun || row.tahun) &&
          Object.keys(row).some(key => row[key] !== "") // tidak semua kolom kosong
        );

        const rowscleanWithId = cleanedData.map((row, index) => ({
          id: index + 1, // buat id dari index
          ...row
        }));

        // Simpan ke state utama
        setData(rowscleanWithId);

        // Setup kolom tabel
        //const hiddenFields = ['id', '_key', ''];
        const keys = Object.keys(cleanedData[0]);

        const rowsWithId = keys.map((row, index) => ({
          id: index + 1, // buat id dari index
          ...row
        }));
        
        const columnDefs = keys.map((key) => ({


          field: key, 
          headerName: key.toUpperCase(), 
          minWidth: 100,
          headerAlign: 'center',
          headerClassName: "custom-header", // kelas custom
          minWidth: 100,
          flex: 1, // supaya lebar kolom fleksibel otomatis
          
          /*dataField: key,
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
          headerStyle: { backgroundColor: '#126cb5' }*/
        }));

        setColumns(columnDefs);

        // Group by Tahun (dengan sanitasi dan lowercase opsional)
        /*const grouped = cleanedData.reduce((acc, item) => {
          //const tahunRaw = item.Tahun || item.tahun || "";
          const tahunRaw = item.Wilayah_Kecamatan || item.wilayah_kecamatan || "";
          const tahun = tahunRaw.toString().trim(); // hilangkan spasi

          if (!tahun) return acc;

          if (!acc[tahun]) {
            acc[tahun] = [];
          }
          acc[tahun].push(item);
          return acc;
        }, {});
        setGroupedData(grouped);*/

        // Hitung jumlah per grup
        /*const counts = countGroupsWithIndices(cleanedData);
        setGroupCounts(counts);*/

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
        //const summ = sumValuesByGroup(lowercaseData, "tahun", ukurann.toLowerCase());
        let variabelku_a = [];
        if (variabel_a) { // cek kalau variabel_c tidak null/undefined/empty
            variabelku_a = variabel_a.toLowerCase().split(",");
        }
        let variabelku_b = [];
        if (variabel_b) { // cek kalau variabel_c tidak null/undefined/empty
            variabelku_b = variabel_b.toLowerCase().split(",");
        }
        let variabelku_c = [];
        if (variabel_c) { // cek kalau variabel_c tidak null/undefined/empty
            variabelku_c = variabel_c.toLowerCase().split(",");
        }

        if (variabelku_a.length === 2) {
          const variabelku_a1=variabelku_a[0];
          const variabelku_a2=variabelku_a[1];
          if (kuantitas_a === "sum") {
            const summ = sumValuesByGroup(lowercaseData, variabelku_a1, variabelku_a2);
            setGroupedSums_a(summ);
          }else{
            const countt = countByGroup(lowercaseData, variabelku_a1, variabelku_a2);
            setGroupedSums_a(countt);
          }
        }

        if (variabelku_b.length === 2) {
          const variabelku_b1=variabelku_b[0];
          const variabelku_b2=variabelku_b[1];
          if (kuantitas_b === "sum") {
            const summ = sumValuesByGroup(lowercaseData, variabelku_b1, variabelku_b2);
            setGroupedSums_b(summ);
          }else{
            const countt = countByGroup(lowercaseData, variabelku_b1, variabelku_b2);
            setGroupedSums_b(countt);
          }
        }

        if (variabelku_c.length === 2) {
          const variabelku_c1=variabelku_c[0];
          const variabelku_c2=variabelku_c[1];
          if (kuantitas_c === "sum") {
            const summ = sumValuesByGroup(lowercaseData, variabelku_c1, variabelku_c2);
            setGroupedSums_c(summ);
          }else{
            const countt = countByGroup(lowercaseData, variabelku_c1, variabelku_c2);
            setGroupedSums_c(countt);
          }
        }
        

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

    const countByGroup = (array, groupKey) => {
      return array.reduce((acc, item) => {
        const group = String(item[groupKey]).toLowerCase();
        acc[group] = (acc[group] || 0) + 1; // tambah 1 setiap item di grup yang sama
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
  
    

  }, [id,variabel_a,kuantitas_a,grafik_a,variabel_b,kuantitas_b,grafik_b,variabel_c,kuantitas_c,grafik_c]);

  
  //console.log(datacoba);

   // Filter data manual
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );


  

  const data_chart_a= Object.entries(groupedSums_a).map(([group, data]) => (
  {
      name: [group],
      y: data
      
  }));

  const data_chart_b= Object.entries(groupedSums_b).map(([group, data]) => (
  {
      name: [group],
      y: data
      
  }));

  const data_chart_c= Object.entries(groupedSums_c).map(([group, data]) => (
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


  return (
    <div className="bg-gray-100  h-95 w-100  overflow-auto z-5  max-[640px]:mt-10">
      <NavSub  title="Dataset Detail" />
      <div className="col-span-6">
        <p className=" textsize10 font-semibold text-gray-300 flex pt-2 mt-1 mx-3 mb-0">
          <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
            <MdDashboard className="mt-1 textsize10"/>Dashboard
          </NavLink> / 
          <NavLink to="/Opendata/Dataset" className="text-silver-a mr-2 d-flex textsize10">
            <MdDataset className="mt-1 textsize10" />Dataset
          </NavLink> /
          <NavLink  className="text-silver-a mr-2 d-flex textsize10">
            <MdDetails className="mt-1 textsize10" />Dataset Detail
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
              <p className='text-white textsize9 text-center btn-grad-sky-4 p-2 rad15'>Dataset Info</p>
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
                  
                  {grafik_a ? (
                    <div className='mt-10'>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                          chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            // Donut chart di Highcharts sebenarnya type "pie"
                            type: grafik_a === "donut" ? "pie" : grafik_a.toLowerCase() || "pie"
                          },
                          colors: ['#029b7a', '#3ea992', '#6aa094', '#8da06a', '#bbb443'],
                          title: {
                            text: 'VISUALISASI DATA PER ' + (variabel_a ? variabel_a.toUpperCase().split(",")[0] : ""),
                            style: {
                              fontSize: '14px',
                              fontFamily: 'Poppins, sans-serif',
                              color: '#666666'
                            }
                          },
                          tooltip:
                            grafik_a === "pie" || grafik_a === "donut"
                              ? { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)' }
                              : { shared: true, valueSuffix: '' },
                          accessibility: { enabled: false },
  
                          // ✅ Sumbu X untuk column & line
                          xAxis:
                            grafik_a === "column" || grafik_a === "line"
                              ? {
                                  categories: data_chart_a.map(item => item.name),
                                  title: { text: null }
                                }
                              : undefined,
  
                          plotOptions:
                            grafik_a === "pie" || grafik_a === "donut"
                              ? {
                                  pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    innerSize: grafik_a === "donut" ? "50%" : undefined, // ✅ Donut setting
                                    dataLabels: [
                                      {
                                        enabled: true,
                                        distance: 0,
                                        style: { fontSize: '0.5em', opacity: 0.7 }
                                      },
                                      {
                                        enabled: true,
                                        distance: -40,
                                        format: '{point.percentage:.1f}%',
                                        style: { fontSize: '0.5em', opacity: 0.7 }
                                      }
                                    ],
                                    showInLegend: true
                                  }
                                }
                              : grafik_a === "column"
                              ? {
                                  column: {
                                    dataLabels: { enabled: true },
                                    borderWidth: 0
                                  }
                                }
                              : {
                                  line: {
                                    dataLabels: { enabled: true },
                                    enableMouseTracking: true
                                  }
                                },
  
                          series:
                            grafik_a === "column" || grafik_a === "line"
                              ? [
                                  {
                                    name:  variabel_a ? variabel_a.toLowerCase().split(",")[1]+" data" : "",
                                    colorByPoint: true, // ✅ Biar tiap kolom beda warna seperti pie
                                    data: data_chart_a.map(item => item.y) // ✅ Hanya ambil nilai y
                                  }
                                ]
                              : [
                                  {
                                    name: variabel_a ? variabel_a.toLowerCase().split(",")[1]+" data" : "",
                                    colorByPoint: true,
                                    data: data_chart_a
                                  }
                                ],
  
                          legend: (grafik_a === "pie" || grafik_a === "donut") ? {
                            enabled: true,
                            itemStyle: {
                              color: '#000',
                              fontFamily: 'MuseoS500',
                              fontSize: '70%'
                            }
                          } : {
                            enabled: false
                          },
                        }}
                        containerProps={{ style: { height: "100%", width: "100%" } }}
                      />
                    </div>
                  ) : ""}

                  {grafik_b ? (
                    <div className='mt-10'>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                          chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            // Donut chart di Highcharts sebenarnya type "pie"
                            type: grafik_b === "donut" ? "pie" : grafik_b.toLowerCase() || "pie"
                          },
                          colors: ['#029b7a', '#3ea992', '#6aa094', '#8da06a', '#bbb443'],
                          title: {
                            text: 'VISUALISASI DATA PER ' + (variabel_b ? variabel_b.toUpperCase().split(",")[0] : ""),
                            style: {
                              fontSize: '14px',
                              fontFamily: 'Poppins, sans-serif',
                              color: '#666666'
                            }
                          },
                          tooltip:
                            grafik_b === "pie" || grafik_b === "donut"
                              ? { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)' }
                              : { shared: true, valueSuffix: '' },
                          accessibility: { enabled: false },
  
                          // ✅ Sumbu X untuk column & line
                          xAxis:
                            grafik_b === "column" || grafik_b === "line"
                              ? {
                                  categories: data_chart_b.map(item => item.name),
                                  title: { text: null }
                                }
                              : undefined,
  
                          plotOptions:
                            grafik_b === "pie" || grafik_b === "donut"
                              ? {
                                  pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    innerSize: grafik_b === "donut" ? "50%" : undefined, // ✅ Donut setting
                                    dataLabels: [
                                      {
                                        enabled: true,
                                        distance: 0,
                                        style: { fontSize: '0.5em', opacity: 0.7 }
                                      },
                                      {
                                        enabled: true,
                                        distance: -40,
                                        format: '{point.percentage:.1f}%',
                                        style: { fontSize: '0.5em', opacity: 0.7 }
                                      }
                                    ],
                                    showInLegend: true
                                  }
                                }
                              : grafik_b === "column"
                              ? {
                                  column: {
                                    dataLabels: { enabled: true },
                                    borderWidth: 0
                                  }
                                }
                              : {
                                  line: {
                                    dataLabels: { enabled: true },
                                    enableMouseTracking: true
                                  }
                                },
  
                          series:
                            grafik_b === "column" || grafik_b === "line"
                              ? [
                                  {
                                    name: variabel_b ? variabel_b.toLowerCase().split(",")[1]+" data" : "",
                                    colorByPoint: true, // ✅ Biar tiap kolom beda warna seperti pie
                                    data: data_chart_b.map(item => item.y) // ✅ Hanya ambil nilai y
                                  }
                                ]
                              : [
                                  {
                                    name: variabel_b ? variabel_b.toLowerCase().split(",")[1]+" data" : "",
                                    colorByPoint: true,
                                    data: data_chart_b
                                  }
                                ],
  
                          legend: (grafik_b === "pie" || grafik_b === "donut") ? {
                            enabled: true,
                            itemStyle: {
                              color: '#000',
                              fontFamily: 'MuseoS500',
                              fontSize: '70%'
                            }
                          } : {
                            enabled: false
                          },
                        }}
                        containerProps={{ style: { height: "100%", width: "100%" } }}
                      />
                    </div>
                  ) : ""}

                  {grafik_c ? (
                    <div className='mt-10'>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                          chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            // Donut chart di Highcharts sebenarnya type "pie"
                            type: grafik_c === "donut" ? "pie" : grafik_c.toLowerCase() || "pie"
                          },
                          colors: ['#029b7a', '#3ea992', '#6aa094', '#8da06a', '#bbb443'],
                          title: {
                            text: 'VISUALISASI DATA PER ' + (variabel_c ? variabel_c.toUpperCase().split(",")[0] : ""),
                            style: {
                              fontSize: '14px',
                              fontFamily: 'Poppins, sans-serif',
                              color: '#666666'
                            }
                          },
                          tooltip:
                            grafik_c === "pie" || grafik_c === "donut"
                              ? { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)' }
                              : { shared: true, valueSuffix: '' },
                          accessibility: { enabled: false },
  
                          // ✅ Sumbu X untuk column & line
                          xAxis:
                            grafik_c === "column" || grafik_c === "line"
                              ? {
                                  categories: data_chart_c.map(item => item.name),
                                  title: { text: null }
                                }
                              : undefined,
  
                          plotOptions:
                            grafik_c === "pie" || grafik_c === "donut"
                              ? {
                                  pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    innerSize: grafik_c === "donut" ? "50%" : undefined, // ✅ Donut setting
                                    dataLabels: [
                                      {
                                        enabled: true,
                                        distance: 0,
                                        style: { fontSize: '0.5em', opacity: 0.7 }
                                      },
                                      {
                                        enabled: true,
                                        distance: -40,
                                        format: '{point.percentage:.1f}%',
                                        style: { fontSize: '0.5em', opacity: 0.7 }
                                      }
                                    ],
                                    showInLegend: true
                                  }
                                }
                              : grafik_c === "column"
                              ? {
                                  column: {
                                    dataLabels: { enabled: true },
                                    borderWidth: 0
                                  }
                                }
                              : {
                                  line: {
                                    dataLabels: { enabled: true },
                                    enableMouseTracking: true
                                  }
                                },
  
                          series:
                            grafik_c === "column" || grafik_c === "line"
                              ? [
                                  {
                                    name: variabel_c ? variabel_c.toLowerCase().split(",")[1]+" data" : "",
                                    colorByPoint: true, // ✅ Biar tiap kolom beda warna seperti pie
                                    data: data_chart_c.map(item => item.y) // ✅ Hanya ambil nilai y
                                  }
                                ]
                              : [
                                  {
                                    name: variabel_c ? variabel_c.toLowerCase().split(",")[1]+" data" : "",
                                    colorByPoint: true,
                                    data: data_chart_c
                                  }
                                ],
  
                          legend: (grafik_c === "pie" || grafik_c === "donut") ? {
                            enabled: true,
                            itemStyle: {
                              color: '#000',
                              fontFamily: 'MuseoS500',
                              fontSize: '70%'
                            }
                          } : {
                            enabled: false
                          },
                        }}
                        containerProps={{ style: { height: "100%", width: "100%" } }}
                      />
                    </div>
                  ) : ""}
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
                        {Object.entries(groupedSums_a) ? Object.entries(groupedSums_a).map(([group, total]) => (
                          <th className='bg-border4 bg-sky-700' key={group}>{group}</th>
                        )) :<p>Data Kosong</p>}
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className='bg-border3'> {kode}</td>
                          <td className='bg-border3'> {komponen}</td>
                          {Object.entries(groupedSums_a) ? Object.entries(groupedSums_a).map(([group, total]) => (
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
                  <div className="text-center">
                    <p className="text-sage textsize10">Pencarian berdasarkan Komponen, Dimensi dan Prioritas Data.</p>
                    <div className="mb-3 max-w-full px-2">
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Cari data..."
                        className="border p-2 rounded max-w-full input-green2"
                      />
                    </div>
                  </div>
                  {data.length > 0 && 
                    <ThemeProvider theme={theme}>
                      <DataGrid
                        loading={loading}
                        rows={filteredRows}
                        columns={columns}
                        pageSizeOptions={[5, 10, 50, 100]}
                        initialState={{
                          pagination: {
                            paginationModel: { pageSize: 10, page: 0 }
                          }
                        }}
                      
                        disableSelectionOnClick
                        getRowHeight={() => 'auto'}
                        
                        sx={{
                          "& .custom-header": {
                            backgroundColor: "#1886ca",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            fontSize: "80%"
                          },
                          "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon": {
                            opacity: 1,
                            visibility: "visible",
                            width: "auto",
                            color: "#fff"
                          },
                          "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
                            opacity: 1
                          },
                          "& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon button svg": {
                            fill: "#fff"
                          },
                          '& .MuiDataGrid-cell': {
                            whiteSpace: 'normal', // biar teks wrap
                            lineHeight: '1.2rem',  // lebih rapat
                            padding: '8px'
                          },
                          "& .MuiTablePagination-select option:not([value='5']):not([value='10']):not([value='20'])": {
                            display: "none" // sembunyikan opsi default MUI yang tidak diinginkan
                          },
                          "& .MuiTablePagination-selectLabel": {
                            color: "#444",
                            fontWeight: "bold",
                            marginTop: "15px"
                          },
                          "& .MuiTablePagination-displayedRows": {
                            color: "#666",
                            marginTop: "15px"
                          },
                          "& .MuiTablePagination-select": {
                            color: "#000",
                            fontWeight: "600",
                            backgroundColor: "#dbdbdb",
                            borderRadius: "6px"
                          }
                        }}
                      />
                    </ThemeProvider>}         
                 
                  
                </div>
              </Tab>
              <Tab eventKey="aksi" title="Aksi">
                <div className='w-100 d-flex'>
                  
                  <Link to={ `/Opendata/Dataset/Update/${komponen}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right p-2">
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

export default DatasetPengelolah;
