import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import IklanModalTambah from "./ModalTambah";
import IklanModalDelete from "./ModalDelete";
import { Col, Container, Row } from "react-bootstrap";
import Swal from 'sweetalert2';
import { api_url_satuadmin } from "../../../api/axiosConfig";



const Spinner = () => <div className="loader"></div>;

const theme = createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: "Data per halaman:"
      }
    }
  }
});

export default function Iklanlist() {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const [loading, setLoading] = useState(true);
  const [datasetku, setDatasetku] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getIklanSearch();
    }, 1000);
  }, []);

  const getIklanSearch = async () => {
    const res = await api_url_satuadmin.get(`openitem/opendata_feedback`);
    const data = res.data || [];
    setDatasetku(data);
    setRowsFiltered(data);
    setLoading(false);
    setSelectedIds([]); // reset selection on data load
    setSelectAll(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(datasetku);
    } else {
      const filtered = datasetku.filter(
        (item) =>
          item.title?.toLowerCase().includes(value.toLowerCase()) ||
          item.content_a?.toLowerCase().includes(value.toLowerCase())
      );
      setRowsFiltered(filtered);
    }
  };

  // Toggle individual selection
  const toggleSelectId = (id) => {
    setSelectedIds((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      setSelectAll(newSelected.length === rowsFiltered.length);
      return newSelected;
    });
  };

  // Toggle select all checkbox
  const toggleSelectAll = () => {
    if (selectAll) {
      // unselect all
      setSelectedIds([]);
      setSelectAll(false);
    } else {
      // select all ids in filtered rows
      const allIds = rowsFiltered.map((row) => row.id);
      setSelectedIds(allIds);
      setSelectAll(true);
    }
  };

  const handleDeleteMultiple = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Tidak ada data terpilih',
        text: 'Silakan pilih data yang ingin dihapus.',
      });
      return;
    }

    const confirm = await Swal.fire({
      title: `Hapus ${selectedIds.length} data?`,
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      try {
  
        await api_url_satuadmin.post(`openitem/opendata_feedback/delete`, {
          ids: selectedIds,
          admin: userloginadmin,
          jenis: "Open Data Feedback",
          komponen: "Delete Feedback Open Data"
        });

        await getIklanSearch(); // refresh data
        setSelectedIds([]);
        setSelectAll(false);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data berhasil dihapus.',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error("Gagal hapus multiple:", error);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi kesalahan saat menghapus data.',
        });
      }
    }
  };


  const columns = [
    {
      field: "select",
      headerName: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          aria-label="Select all rows"
        />
      ),
      headerClassName: "custom-header",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(params.row.id)}
          onChange={() => toggleSelectId(params.row.id)}
          aria-label={`Select row ${params.row.id}`}
        />
      ),
    },
    { 
      field: "no", 
      headerName: "No", 
      width: 70,
      headerClassName: "custom-header", // kelas custom
    },
    { 
      field: "ip_address", 
      headerName: "Ip Address", 
      flex: 1,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.ip_address}
            </p>
          </>
        );
      }  
    },
    { 
      field: "user_agent", 
      headerName: "User Agent", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.user_agent}
            </p>
          </>
        );
      }  
    },
    { 
      field: "tujuan", 
      headerName: "Tujuan", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.tujuan}
            </p>
          </>
        );
      }  
    },
    { 
      field: "posisi", 
      headerName: "Posisi", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.posisi}
            </p>
          </>
        );
      }  
    },
    { 
      field: "feedback", 
      headerName: "Feedback", 
      flex: 4,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
               {row.feedback.length > 100 
                ? row.feedback.substring(0, 100) + "..." 
                : row.feedback}
            </p>
          </>
        );
      }  
    }
  ];

  const filteredRows = datasetku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );


  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Open Data Feedback" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="textsize10 text-silver-a mr-2 flex">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="textsize10 text-silver-a mx-2 flex">
              <MdDataset className="mt-1" /> Opendata Feedback
            </NavLink>
          </p>
        </div>
      </div>

      <div className="drop-shadow-lg overflow-auto mb-9 p-2">
        <section className="py-3 rounded-lg bg-white px-2">
          <Container fluid>
            <Row className='portfoliolist'>
              <div style={{ marginBottom: '10px' }}>
                <button 
                  onClick={handleDeleteMultiple} 
                  disabled={selectedIds.length === 0}
                  style={{
                    backgroundColor: selectedIds.length === 0 ? '#ccc' : '#e53935',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Hapus Terpilih ({selectedIds.length})
                </button>
              </div>
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
                          fontSize: "100%"
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
}
