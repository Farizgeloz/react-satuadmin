import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import IklanModalDelete from "./VisitorModalDelete";
import { IoTrash } from "react-icons/io5";
import { Col, Container, Row } from "react-bootstrap";
import Swal from 'sweetalert2';
import { api_url_satuadmin } from "../../../api/axiosConfig";

const apiurl =  import.meta.env.VITE_API_URL;;

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
  const [loading, setLoading] = useState(true);
  const [dataku, setDataku] = useState([]);
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
    const res = await api_url_satuadmin.get(`openitem/ekosistem-visitor`);
    const data = res.data.data2 || [];
    setDataku(data);
    setRowsFiltered(data);
    setLoading(false);
    setSelectedIds([]); // reset selection on data load
    setSelectAll(false);
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
        await axios.post(`openitem/ekosistem-visitor/delete`, {
          ids: selectedIds,
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
      field: "ip_address", 
      headerName: "Ip Address", 
      flex: 2,  // 2%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "user_agent", 
      headerName: "User Agent", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    },
    { 
      field: "visited_at", 
      headerName: "Visited At", 
      flex: 1,  // 10%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100 
    }
  ];

  const filteredRows = dataku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satu Portal Visitor" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-silver-a mr-2 d-flex textsize10">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="text-silver-a mr-2 d-flex textsize10">
              <MdDataset className="mt-1" /> Satuportal Visitor
            </NavLink>
          </p>
        </div>
        
      </div>

      <div className="drop-shadow-lg overflow-auto mb-9 p-2">
        <section className="py-3 rounded-lg bg-white px-2">
          <div className="text-center mb-3">
            
          </div>

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
                        "--DataGrid-color-background-base": "transparent",
                          backgroundColor: "transparent !important", // paksa transparan table
                          border: "none", // hilangkan border utama,
                          marginBottom:"50px",
                        "& .MuiDataGrid-root": {
                          backgroundColor: "transparent", // ⬅ background utama transparan
                          marginBottom:"50px"
                        },
                        "& .MuiDataGrid-row": {
                          marginTop: "8px",
                          paddingTop:"10px",
                          paddingBottom:"10px",
                          paddingLeft:"5px",
                          paddingRight:"5px",
                          backgroundColor: "rgba(255, 255, 255, 0.9)", // bisa dihapus kalau mau full transparan
                          borderRadius: "6px",
                          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                          fontSize: "100%"
                          
                        },
                        "& .custom-header": {
                          backgroundColor: "#1886ca",
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          fontSize: "120%"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                          overflow: "auto !important" // ⬅ hilangkan scroll
                        },
                        "& .MuiDataGrid-cell": {
                          backgroundColor: "transparent", // ⬅ background cell transparan
                          borderTop:"none"
                        },
                        "& .MuiTablePagination-select option:not([value='5']):not([value='10']):not([value='20'])": {
                          display: "none"
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
                        },
                        // style kalau tidak ada data
                        "& .MuiDataGrid-overlay": {
                          backgroundColor: "#fff", // transparan
                          height: "100px",
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontStyle:"italic",
                          color: "#888",
                          marginTop: "-10%",
                          paddingTop: "40px",
                          textTransform: "uppercase",
                          borderRadius: "6px",
                        },
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
