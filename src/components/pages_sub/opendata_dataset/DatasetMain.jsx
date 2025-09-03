import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';

import "../../../App.css";
import NavSub from "../../NavSub";
import DatasetModalTambah from "./DatasetModalTambah";
import DatasetModalDelete from "./DatasetModalDelete";

import { MdDashboard, MdDataset, MdInfoOutline, MdEditSquare } from "react-icons/md";

const apiurl = process.env.REACT_APP_URL;

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



// Format tanggal Indonesia aman
function convertDate(datePicker) {
  if (!datePicker) return "-";
  const selectedDate = new Date(datePicker);
  if (isNaN(selectedDate)) return "-";

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const day = selectedDate.getDate();
  const monthName = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();
  const jam = String(selectedDate.getHours()).padStart(2, "0");
  const menit = String(selectedDate.getMinutes()).padStart(2, "0");
  const detik = String(selectedDate.getSeconds()).padStart(2, "0");

  return `${day} ${monthName} ${year} Waktu : ${jam}:${menit}:${detik} WIB`;
}

const Datasetlist = () => {
  const [loading, setLoading] = useState(true);
  const [dataku, setDatasetSearch] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [kategoriku, setDatasetKategori] = useState([]);
  const [satkerku, setDatasetProdukData] = useState([]);
  const [sifat_dataku, setDatasetSifatData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const [searchRes, itemRes] = await Promise.all([
            axios.get(apiurl + 'api/opendata/dataset_data'),
            axios.get(apiurl + 'api/opendata/dataset_item')
          ]);
          setDatasetSearch(searchRes.data || []);
          setDatasetSifatData(itemRes.data?.resultSifatData || []);
          setDatasetProdukData(itemRes.data?.resultSatker || []);
          setDatasetKategori(itemRes.data?.resultBidangUrusan || []);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          
        
            setLoading(false);
          
        }
      };
      
      fetchData();
    }, 2000);
  }, []);

  // Data untuk DataGrid
  const rowsku = Array.isArray(dataku)
    ? dataku.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row,
        nama_dataset_nama_opd: `${row.nama_dataset ?? ''} ${row.nama_opd ?? ''}`
      }))
    : [];
    

  const columns = [
    { 
      field: "no", 
      headerName: "No", 
      width: 70,
      headerClassName: "custom-header", // kelas custom
    },
    { 
      field: "nama_sektor", 
      headerName: "Dimensi", 
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const row = params.row;
        return (
          <div className="justify-items-center" style={{ textAlign: "center", width: "100%" }}>
            {row.presignedUrl && (
              <Image
                src={row.presignedUrl}
                className="rad15 px-3"
                style={{ maxWidth: 100, objectFit: "contain" }}
              />
            )}
            {row.nama_sektor && (
              <p className="textsize10 text-center">{row.nama_sektor}</p>
            )}
          </div>
        );
      }
    },
    { 
      field: "nama_dataset_nama_opd", 
      headerName: "nama_dataset & Satker", 
      flex: 4,
      filterable: true,
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        const textColor = row.visibilitas !== "Publik" ? "text-red-a2" : "text-sky-a2";
        return (
          <div>
            <p className={`${textColor} my-1 textsize10`}>{row.nama_dataset}</p>
            <p className="textsize8 rounded my-1 px-2 py-1 d-inline-block text-white bg-orange-600">
              {row.nama_opd}
            </p>
            <p className="textsize8">
              <span className="font_weight600">Diperbaharui Tanggal: </span>{convertDate(row.updatedAt)}
            </p>
          </div>
        );
      }
    },
    { 
      field: "sifat_data", 
      headerName: "Sifat Data", 
      flex: 2,
      minWidth: 100,
      filterable: true,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const isPrioritas = params.row.sifat_data === "Data Prioritas";
        return (
          <div className="text-center">
            <p className={`textsize8 rounded px-2 py-1 d-inline-block text-white ${
              isPrioritas ? "bg-green-600" : "bg-silver-dark"
            }`}>
              {params.row.sifat_data || "-"}
            </p>
          </div>
        );
      }
    },
    { 
      field: "visibilitas", 
      headerName: "Visibilitas", 
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      renderCell: (params) => {
        const textColor = params.row.visibilitas !== "Publik" ? "text-red-a2" : "text-sky-a2";
        return <p className={`${textColor} textsize10 text-center`}>{params.row.visibilitas}</p>;
      }
    },
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1,
      minWidth: 60,
      headerAlign: 'center',
      headerClassName: "custom-header", // kelas custom
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <Tooltip title="Lihat detail dataset" arrow>
            <Link to={`/Opendata/Dataset/Detail/${params.row.nama_dataset}`} className="flex items-center justify-center mb-[2px]">
              <button className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                <MdInfoOutline className="mr-1" />
              </button>
            </Link>
          </Tooltip>
          <Tooltip title="Edit dataset" arrow>
            <Link to={`/Opendata/Dataset/Update/${params.row.nama_dataset}`} className="flex items-center justify-center mb-[2px]">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                <MdEditSquare className="mr-1" />
              </button>
            </Link>
          </Tooltip>
          <DatasetModalDelete id={params.row.id} name={params.row.nama_dataset} />
        </div>
      ),
    },
  ];

   // Filter data manual
  const filteredRows = rowsku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="bg-slate-100 max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Dataset" />
      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className="tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8" />Dashboard
            </NavLink> / 
            <NavLink to="/Data-Dataset" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Dataset
            </NavLink>
          </p>
        </div>
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <DatasetModalTambah />
        </div>
      </div>

      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block py-3 rad15 shaddow1 bg-white">
          <div className="text-center">
            <p className="text-sage textsize8">Pencarian berdasarkan Nama Dataset, Dimensi dan Prioritas Data.</p>
            <div className="mb-3">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Cari data..."
                className="border p-2 rounded w-64 input-green2"
              />
            </div>
          </div>
          <Container fluid>
            <Row className='portfoliolist'>
              <Col sm={12}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
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
                  </ThemeProvider>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Datasetlist;
