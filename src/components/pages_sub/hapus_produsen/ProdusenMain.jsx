import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter,selectFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {  CSVExport,Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {Container,Row,Col} from 'react-bootstrap';
import { motion } from "framer-motion";

import "../../../App.css";
import AccordionCard from '../../accordion/AccordionCard'
import ProdusenModalTambah from "./ProdusenModalTambah"
import ProdusenModalDelete from "./ProdusenModalDelete"
import NavSub from "../../NavSub"


import { MdDashboard,MdDataset,MdInfo,MdInfoOutline,MdAccountCircle,MdEditSquare} from "react-icons/md";

import { 
  IoChevronBackSharp ,
  IoChevronForward,
  IoLogoGoogle,
  IoPerson,
  IoInformationCircleOutline,
  IoGrid,
  IoSearchCircle   

  } from "react-icons/io5";

//const apikey=process.env.REACT_APP_API_KEY;
const apiurl=process.env.REACT_APP_URL;
const Spinner = () => <div className="loader "></div>;
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const Produsenlist = () => {
  const [loading, setLoading] = useState(true);
  const [produsenku, setProdusen] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProdusen();
    setTimeout(() => {
      
      setLoading(false);
    }, 2000);
  }, []);

  const getProdusen = async () => {
    const response = await axios.get(
      apiurl+`backend_satudata_produsen`
    );
    setProdusen(response.data.resultprodusen);
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
      text: 'All', value: produsenku.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

  const columns =[
    {
      dataField:'kode',
      text:"Kode",
      filter: textFilter(),
      headerAlign: (column, colIndex) => 'center',
      headerFormatter: HeadFormatter,
      style: {
        'width': '15%'
      },
      sort: true
    },
    {
      dataField:'organisasi',
      text:"Organisasi",
      filter: textFilter({style:{display:'block'}}),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90 uppercaseku',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      style: {
        'width': '30%'
      },
      sort: true
      
    },
    {
      dataField:'wilayah',
      text:"Wilayah",
      filter: textFilter({style:{display:'block'}}),
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      style: {
        'width': '15%'
      },
      sort: true
    },
    {
      dataField:'',
      text:"Aksi",
      headerAlign: (column, colIndex) => 'center',
      className: 'input-gray tsize-90',
      headerFormatter: HeadFormatter,
      headerClasses: 'bg-blue',
      formatter: (cell, row) => {
        //console.log(row);
        return <div className="d-flex  grid-cols-6">
        <Link to={ `/Data-Produsen/Update/${row.id}` } className="max-[640px]:col-span-6 tsize-100 font-semibold text-white-a flex-right p-1">
          <button 
            className="max-[640px]:col-span-6 bg-blue-500 hover:bg-blue-400 text-white font-bold textsize9 py-1 px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl d-flex">
              <MdEditSquare className="mt-1 mx-1" />
          </button>
        </Link>
        <ProdusenModalDelete
            id={row.id}
            name={row.kode}
        />
        </div>;
        
      },
      style: {
        'width': '15%'
      }
    },
  ];

  const rowStyle = { fontSize: '80%' };

  const afterSearch = (newResult) => {
    console.log(newResult);
  };

  return (
    <div className="bg-slate-100  max-h-screen sm:pt-0  max-[640px]:mt-12 ">
      <NavSub  title="Data Produsen" />
      <div className="col-span-3 rounded grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 drop-shadow-lg">
        <div className="col-span-3">
          <p className=" tsize-90 font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 d-flex">
              <MdDashboard className="mt-1 textsize8"/>Dashboard
            </NavLink> / 
            <NavLink to="/Data-Produsen" className="text-link-sky mx-2 d-flex">
              <MdDataset className="mt-1 textsize8" />Data Produsen
            </NavLink>
          </p>
        </div>
        <div className="md:col-span-2 margin-0 px-10 mt-2">
          <ProdusenModalTambah/>
        </div>
      </div>
      <div className='drop-shadow-lg overflow-xx-auto mb-9 p-2'>
        <section id="teams" className="block   py-3 rad15 shaddow1 bg-white">
          
          <div className="text-center">
            <p className="text-sage textsize8 ">Pencarian berdasarkan Kode, Wilayah, Produk Data, atau Bidang Urusan.</p>
          </div>
          <Container fluid>
            <Row className='portfoliolist overflow-xx-auto'>
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
                      data={ produsenku } 
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
                             
                              <BootstrapTable
                                { ...props.baseProps }
                                pagination={ paginationFactory() }
                              />
                            
                            </div>
                          )
                        }
                      </BootstrapTable>
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

export default Produsenlist;
