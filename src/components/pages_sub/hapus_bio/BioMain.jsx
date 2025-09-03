import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory,{ PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {Container,Row,Col} from 'react-bootstrap';
import { motion } from "framer-motion";

import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { Box, Button } from '@mui/material';





import "../../../App.css";
import NavSub from "../../NavSub"
import AccordionCard from '../../accordion/AccordionCard'


import { MdDashboard,MdDataset,MdInfoOutline,
        MdEditSquare, MdOutlineMoney} from "react-icons/md";

import { FaBuildingColumns, FaCodeCommit, FaHospitalUser, FaMoneyBillTrendUp, FaTreeCity } from "react-icons/fa6";
import { FaBuilding, FaEnvira, FaGraduationCap, FaPeopleArrows, FaUsers } from "react-icons/fa";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;

const Spinner = () => <div className="loader "></div>;

const { SearchBar } = Search;
//const { ExportCSVButton } = CSVExport;

const Biolist = () => {
  

  const [loading, setLoading] = useState(true);
  const [dataset, setdataset] = useState([]);
  const [dataku, setBioSearch] = useState([]);
  //const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [search_wilayah, setsearch_wilayah] = useState("");
  const [search_kategori, setsearch_kategori] = useState("");
  const [search_satker, setsearch_satker] = useState("");
  const [search_sifat_data, setsearch_sifat_data] = useState("");
  const [search_frekuensi, setsearch_frekuensi] = useState("");
  const [search_kegiatan_statistik, setsearch_kegiatan_statistik] = useState("");
  const [search_klasifikasi, setsearch_klasifikasi] = useState("");
  const [search_konsep, setsearch_konsep] = useState("");
  const [search_satuan, setsearch_satuan] = useState("");
  const [search_ukuran, setsearch_ukuran] = useState("");
  const [search_tag, setsearch_tag] = useState("");
  const [search_visibilitas, setsearch_visibilitas] = useState("");
  const [search_updatedAt, setsearch_updatedAt] = useState("");

  const [kategoriku, setBioKategori] = useState([]);
  const [satkerku, setBioProdukData] = useState([]);
  const [sifat_dataku, setBioSifatData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [allRows, setAllRows] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;


  
  

  const [msg, setMsg] = useState("");

  useEffect(() => {
    //getBioUnsur();
    setTimeout(() => {
      
      getData();
      setLoading(false);
    }, 2000);
    
  }, []);
   const totalPages = Math.ceil(allRows.length / pageSize);
  const paginatedRows = allRows.slice(page * pageSize, (page + 1) * pageSize);

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex);
  };

  const getData = async () => {
    const response = await axios.get(
      `${apiurl}api/open-item/ekosistem_bio`
    );
    //console.log(response.data.resultsearch);
    setBioSearch(response.data);
    setAllRows(response.data);
  };

 
  

  function HeadFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={ { display: 'flex', flexDirection: 'column' } }>
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
    defaultProps: [{text: '10', value: 10}],
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
      text: 'All', value: dataku.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

  pageoptions.defaultProps = {
    sizePerPage: 10,
  };

  const pageButtonRenderer = ({
  page,
  active,
  disabled,
  title,
  onPageChange
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  // ....
  return (
    <li className="page-item">
      <a href="#" onClick={ handleClick }>{ page }</a>
    </li>
  );
};

const options = {
  pageButtonRenderer
};

 

  const columns =[
    {
      dataField: 'nomor',
      text: 'No',
      headerAlign: 'center',
      headerFormatter: HeadFormatter,
      formatter: (cell, row, rowIndex) => rowIndex + 1,
      style: {
        width: '5%',
        textAlign: 'center'
      },
      align: 'center',
      csvExport: false,
      sort: false
    },
    {
      dataField:'alamat',
      text:"Alamat",
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '35%'
      },
      sort: true
    },
    {
      dataField:'kode_pos',
      text:"Kode Pos",
     
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '20%'
      },
      sort: true
    },
   
    {
      dataField:'luas',
      text:"Luas",
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '20%'
      },
      sort: true
    },

    {
      dataField:'id',
      text:"Aksi",
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      formatter: (cell, row) => {
        //console.log(row);
         return <div className="d-flex">
          <Link to={ `/Data-Bio/Update/${row.id}` } className="col-span-4 max-[640px]:col-span-3 tsize-100 font-semibold text-white-a flex-right px-1">
            <button 
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
                <MdEditSquare className="mt-1 mx-1" /><span>Edit</span>
            </button>
          </Link>
        </div>;
      },
      style: {
        'width': '20%'
      },
      sort: true
    },
    
    
  ];

  const rowStyle = { fontSize: '80%' };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true
  };
  

  const afterSearch = (newResult) => {
    console.log(newResult);
  };



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
      <NavSub  title="Bio" />
      

      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-Bio" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Bio
            </NavLink>
          </p>
        </div>
        
        
       
        
      </div>

      
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Judul, Kategori Sektoral atau Penghasil Data.</p>
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
                      <BootstrapTable 
                      keyField='id' 
                      data={ dataku } 
                      columns={ columns } 
                      rowStyle={ rowStyle }
                      exportCSV={ { onlyExportFiltered: true, exportAll: false } }
                      filter={ filterFactory() }
                      search={ { afterSearch } }
                      pagination={ paginationFactory(pageoptions) }
                      hover 
                      
                      >
                        {
                          props => (
                            <div>
                              
                              <SearchBar { ...props.searchProps } className="widthtt" placeholder="Cari Data" />
                              <hr />
                              <BootstrapTable
                                { ...props.baseProps }
                                pagination={ paginationFactory(pageoptions) }
                              />
                            </div>
                          )
                        }

                       
                      </BootstrapTable>
                      

                      <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
                        <Button
                          variant="outlined"
                          disabled={page === 0}
                          onClick={() => setPage(page - 1)}
                        >
                          &lt; Sebelumnya
                        </Button>

                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <Button
                            key={idx}
                            variant={idx === page ? 'contained' : 'outlined'}
                            onClick={() => handlePageClick(idx)}
                          >
                            {idx + 1}
                          </Button>
                        ))}

                        <Button
                          variant="outlined"
                          disabled={page === totalPages - 1}
                          onClick={() => setPage(page + 1)}
                        >
                          Berikutnya &gt;
                        </Button>
                      </Box>
                   </motion.div>
                          )}
                  

                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        
        
      </div>
    </div>
  );
};

export default Biolist;
