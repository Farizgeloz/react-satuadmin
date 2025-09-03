import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory,{ PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {Container,Row,Col} from 'react-bootstrap';
import { motion } from "framer-motion";
import Image from 'react-bootstrap/Image';
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";





import "../../../App.css";
import NavSub from "../../NavSub"
import AccordionCard from '../../accordion/AccordionCard'
import ImagesModalTambah from "./ImagesModalTambah"
import ImagesModalDelete from "./ImagesModalDelete"


import { MdDashboard,MdDataset,MdInfoOutline,
        MdEditSquare, MdOutlineMoney} from "react-icons/md";

import { FaBuildingColumns, FaCodeCommit, FaHospitalUser, FaMoneyBillTrendUp, FaTreeCity } from "react-icons/fa6";
import { FaBuilding, FaEnvira, FaGraduationCap, FaPeopleArrows, FaUsers } from "react-icons/fa";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;

const Spinner = () => <div className="loader "></div>;
const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: "Data per halaman:"
      }
    }
  }
});

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Imageslist = () => {
  

  const [loading, setLoading] = useState(true);
  const [dataku, setImagesSearch] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    //getImagesUnsur();
    setTimeout(() => {
      getImagesSearch();
      setLoading(false);
    }, 2000);
    
  }, []);
 

  const getImagesSearch = async () => {
    const response = await axios.get(
      `${apiurl}api/open-item/images`
    );
    //console.log(response.data.resultsearch);
    setImagesSearch(response.data);
    setRowsFiltered(response.data);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(dataku);
    } else {
      const filtered = dataku.filter(
        (item) =>
          item.title?.toLowerCase().includes(value.toLowerCase()) ||
          item.contents?.toLowerCase().includes(value.toLowerCase())
      );
      setRowsFiltered(filtered);
    }
  };

  const columns =[
    {
      field: "no",
      headerName: "No",
      headerClassName: "custom-header",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        // Cari index row saat ini
        return params.api.getAllRowIds().indexOf(params.id) + 1;
      },
    },
    { 
      field: "kategori", 
      headerName: "Kategori", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "title", 
      headerName: "Judul", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "contents", 
      headerName: "Konten", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "presignedUrl1", 
      headerName: "Gambar", 
      flex: 1,  // 30%
      headerClassName: "custom-header", // kelas custom
      headerAlign: 'center',
      minWidth: 100,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <div style={{ textAlign: "center", width: "100%" }}>
              {row.presignedUrl1 && (
                <Image
                  src={row.presignedUrl1}
                  className="rad15 px-3"
                  style={{ maxwidth: "80%", objectFit: "contain" }}
                />
              )}
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              {row.presignedUrl2 && (
                <Image
                  src={row.presignedUrl2}
                  className="rad15 px-3"
                  style={{ maxwidth: "80%", objectFit: "contain" }}
                />
              )}
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              {row.presignedUrl3 && (
                <Image
                  src={row.presignedUrl3}
                  className="rad15 px-3"
                  style={{ maxwidth: "80%", objectFit: "contain" }}
                />
              )}
              
            </div>
          </>
        );
      }
    },
    
    {
      field: "aksi",
      headerName: "Aksi",
      flex: 1, // 20%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="p-2">
          <Link
            to={ `/Data-Images/Update/${params.row.kategori}` }
            className="flex items-center justify-center mb-[2px]"
          >
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 rounded-xl flex items-center">
              <MdEditSquare className="mr-1" />
            </button>
          </Link>
          
        </div>
      ),
    },
  ];
  

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
  
  
  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Komponen Lainnya" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-Images" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Komponen Lainnya
            </NavLink>
          </p>
        </div>
        
        
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <ImagesModalTambah/>
        
        </div>
        
      </div>

      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Judul, Kategori dan Isi Konten.</p>
            <div className="mb-3">
              <input
                type="text"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari data..."
                className="border p-2 rounded w-64 input-green2"
              />
            </div>
          </div>
          <Container fluid>
            <Row className='portfoliolist'>
              <Col sm={12} key={'bodyku'}>
                <Row>
                  {loading ? (
                      <Spinner />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <ThemeProvider theme={theme}>
                        <DataGrid
                          rows={rowsFiltered}
                          columns={columns}
                          getRowId={(row) => row.id}
                          disableSelectionOnClick
                          // Versi MUI baru (v5.17+ atau v6) → pakai ini
                          pageSizeOptions={[5, 10, 50,100]}
                          initialState={{
                            pagination: {
                              paginationModel: { pageSize: 10, page: 0 }
                            }
                          }}
                          getRowHeight={() => 'auto'} // otomatis menyesuaikan konten
                          // Styling agar versi lama tetap aman
                          sx={{
                            "& .custom-header": {
                              backgroundColor: "#1886ca",
                              color: "white",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              fontSize: "0.9rem"
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
                          )}
                  {/*<ToolkitProvider
                    keyField="id"
                    data={ datasetku }
                    columns={ columns }
                    exportCSV={ { onlyExportFiltered: true, exportAll: false } }
                     filter={ filterFactory() }
                    /*exportCSV={ { 
                      onlyExportFiltered: true,
                      exportAll: false,
                      fileName: 'custom.csv',
                      separator: '|',
                      ignoreHeader: false,
                      noAutoBOM: false,
                      blobType: 'text/csv;charset=ansi' 
                    } }*
                    search={ { afterSearch } }
                  >
                    {
                      props => (
                        <div>
                          
                          <SearchBar { ...props.searchProps } className="widthtt" placeholder="Cari Data" />
                          <hr />
                          <BootstrapTable
                            { ...props.baseProps }
                            pagination={ paginationFactory() }
                            expandRow={ expandRow }
                          />
                        </div>
                      )
                    }
                  </ToolkitProvider>*/}

                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        {/*<table className="max-[640px]:table-fixed border-collapse border-slate-400 w-full max-[640px]:w-full  overflow-auto">
          <thead>
            <tr className=" bg-blue-50 text-white w-full">
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3">Wilayah</th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3">Komponen</th>
              <th className="text-center tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/6">Kategori Sektoral</th>
              <th className="text-center tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/7">Actions</th>
            </tr>
          </thead>
          <tbody>
            dataset.map((user,index) => (
              <tr key={user.id} className=" even:bg-blue-50 odd:bg-white border-b-1 w-full">
                <td className="tsize-90 border-slate-300 tracking-wide p-2 w-1/3">{user.wilayah}</td>
                <td className="tsize-90 border-slate-300 tracking-wide p-2 w-1/3">{user.satker}</td>
                <td className="text-center tsize-90 border-slate-300 tracking-wide w-1/6">{user.komponen}</td>
                <td className="sm:flex justify-center justify-items-center tsize-90 border-slate-300 tracking-wide w-1/7">
                <UserModalEdit
                      id={user.id}
                      name={user.wilayah}
                      nick={user.satker}
                      email={user.komponen}
                      password={user.sifat_data}
                      confpassword={user.frekuensi}
                      role={user.kegiatan_statistik}
                  />
                  <ImagesModalDelete
                      id={user.id}
                      name={user.komponen}
                  />
                  
                </td>
                
              </tr>
            ))}
            <tr className=" bg-blue-50 text-white w-full h-3">
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3"></th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/3"></th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/6"></th>
              <th className="tsize-90 border-2 border-white tracking-wide bg-gray-700 text-white px-2 w-1/7"></th>
            </tr>
          </tbody>
         
        </table>

        <p>
          Total Data: <span className="text-green-600">{rows}</span> Halaman:  <span className="text-green-600">{rows ? page + 1 : 0}</span> Dari  <span className="text-green-600">{pages}</span>
        </p>
        <p className="has-text-centered has-text-danger">{msg}</p>
        <div className="item-center content-center mb-10 -mt-10">
          <nav
            className="pagination is-centered"
            key={rows}
            role="navigation"
            aria-label="Pagination"
          >
            <ReactPaginate
              previousLabel={
                <span className="block border-2 border-solid border-indigo-200  hover:bg-indigo-500 hover:text-white w-8 h-8 flex items-center justify-center bg-lightGray rounded-md">
                  <IoChevronBackSharp />
                </span>
              }
              nextLabel={
                <span className="block border-2 border-solid border-indigo-200 hover:bg-indigo-500 hover:text-white w-8 h-8 flex items-center justify-center bg-lightGray rounded-md">
                  <IoChevronForward />
                </span>
              }
              pageCount={Math.min(50, pages)}
              onPageChange={changePage}
              containerClassName="flex items-center justify-center mt-8 mb-4  mx-auto"
              pageClassName="block border-2 text-blue border-solid border-indigo-200 hover:bg-indigo-500 hover:text-white mx-1 w-8 h-8 flex items-center justify-center rounded-md"
              activeClassName="btn-skyku"
              //pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              //activeLinkClassName={"btn-blueku"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>     
        </div>*/}
        
      </div>
    </div>
  );
};

export default Imageslist;
