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

const apiurl = process.env.REACT_APP_URL;

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
    const res = await axios.get(`${apiurl}api/open-item/ekosistem-visitor`);
    const data = res.data.data2 || [];
    setDataku(data);
    setRowsFiltered(data);
    setLoading(false);
    setSelectedIds([]); // reset selection on data load
    setSelectAll(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(dataku);
    } else {
      const filtered = dataku.filter(
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
    if (selectedIds.length === 0) return alert("Pilih data dulu!");
    if (window.confirm(`Yakin ingin menghapus ${selectedIds.length} data?`)) {
      try {
        await axios.post(`${apiurl}api/open-item/ekosistem-visitor/delete`, {
          ids: selectedIds,
        });
        await getIklanSearch();
        setSelectedIds([]);
        setSelectAll(false);
      } catch (error) {
        console.error("Gagal hapus multiple:", error);
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


  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Satu Portal Visitor" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="text-link-sky mr-2 flex">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="text-link-sky mx-2 flex">
              <MdDataset className="mt-1" /> Satuportal Visitor
            </NavLink>
          </p>
        </div>
        
      </div>

      <div className="drop-shadow-lg overflow-auto mb-9 p-2">
        <section className="py-3 rounded-lg bg-white px-2">
          <div className="text-center mb-3">
            
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3">
                {selectedIds.length > 0 && (
                
                <button 
                  onClick={handleDeleteMultiple}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-xl flex items-center">
                        <IoTrash   /> Hapus Terpilih ({selectedIds.length})
                </button>
              )}
              </div>

              <div style={{ height: 500, width: "100%" }}>
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

              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
