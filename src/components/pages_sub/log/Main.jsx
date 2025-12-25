import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import { Col, Container, Row } from "react-bootstrap";
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
  const [datasetku, setDatasetku] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      getIklanSearch();
    }, 1000);
  }, []);

  const getIklanSearch = async () => {
    const res = await api_url_satuadmin.get(`open-item/log`);
    const data = res.data.data || [];
    setDatasetku(data);
    setRowsFiltered(data);
    setLoading(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(datasetku);
    } else {
      const filtered = datasetku.filter(
        (item) =>
          item.jenis?.toLowerCase().includes(value.toLowerCase()) ||
          item.kategori?.toLowerCase().includes(value.toLowerCase()) ||
          item.item?.toLowerCase().includes(value.toLowerCase()) ||
          item.deskripsi?.toLowerCase().includes(value.toLowerCase())
      );
      setRowsFiltered(filtered);
    }
  };

  const rowsku = Array.isArray(rowsFiltered)
    ? rowsFiltered.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row
      }))
    : [];

  

  const filteredRows = rowsku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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


  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      <NavSub title="Aktivitas Satu Admin" />

      <div className="col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-3">
          <p className="font-semibold text-gray-300 flex pt-2 mt-2 mx-3 mb-0">
            <NavLink to="/Dashboard" className="textsize10 text-silver-a mr-2 flex">
              <MdDashboard className="mt-1" /> Dashboard
            </NavLink>{" "}
            /{" "}
            <NavLink to="#" className="textsize10 text-silver-a mx-2 flex">
              <MdDataset className="mt-1" /> Aktivitas
            </NavLink>
          </p>
        </div>
        
      </div>

      <div className="drop-shadow-lg overflow-auto mb-9 p-2">
        <section className="py-3 rounded-lg bg-white px-2">

          <Container fluid>
            <Row className='portfoliolist'>
              <Col md={6}>
                <p className="text-gray-500 text-md">
                  Cari Riwayat (Log) Perubahan Data.
                </p>
                <div className="mb-3 w-100">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Cari data..."
                    className="border p-2 rounded w-100 input-gray textsize12"
                  />
                </div>
              </Col>
              <Col md={12}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {paginatedRows.map((message) => {
                    const kategori = message.kategori?.toLowerCase() || "";

                    const kategoriClass = kategori.includes("delete")
                      ? "bg-danger-subtle text-danger"
                      : kategori.includes("tambah") || kategori.includes("create")
                      ? "bg-success-subtle text-success"
                      : kategori.includes("update")
                      ? "bg-primary-subtle text-primary"
                      : kategori.includes("balas")
                      ? "bg-warning-subtle text-warning"
                      : "bg-secondary-subtle text-dark";

                    return (
                      <div key={message.id} className="p-2">
                        <div className="card border-0 shadow-sm rad15 p-3 bg-white">

                          {/* HEADER */}
                          <div className="d-flex justify-content-between align-items-center mb-2 gap-2">
                            <div className="d-flex flex-column">
                              <p className="mb-0 fw-semibold text-dark">
                                <span className="text-primary">{message.role_admin}</span>
                                <span className="text-muted mx-1">•</span>
                                {message.nick_admin}
                              </p>
                              <small className="text-muted">
                                {convertDate(message.updated_at)}
                              </small>
                            </div>

                            <span
                              className={`badge ${kategoriClass} px-3 py-2 text-capitalize shadow-sm`}
                              style={{ borderRadius: "999px", fontSize: "12px" }}
                            >
                              {message.kategori}
                            </span>
                          </div>

                          {/* CONTENT */}
                          <div className="mt-2">
                            <p className="fw-semibold mb-1">Bagian</p>
                            <p className="text-muted mb-2 textsize12">{message.jenis}</p>

                            <p className="fw-semibold mb-1">Judul</p>
                            <p className="text-muted mb-2 textsize12">{message.item}</p>

                            <p className="fw-semibold mb-1">Deskripsi</p>
                            <p className="text-muted mb-2 textsize12">{message.deskripsi}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
                <div className="d-flex justify-content-center mt-3 gap-1">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    ‹ Prev
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`btn btn-sm ${
                        currentPage === i + 1
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next ›
                  </button>
                </div>

              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
}
