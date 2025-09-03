import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
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

const DownloadTemplateDropdown = () => {

  const downloadTemplateCSV = () => {
    const csvContent = [
      ["nama_location","bidang_urusan","opd"]
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template_locations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTemplateExcel = async () => {
    const XLSX = await import("xlsx");
    const worksheet = XLSX.utils.aoa_to_sheet([
      ["nama_location","bidang_urusan","opd"]
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, "template_locations.xlsx");
  };

  return (
    <div className="col-span-1 max-[640px]:col-span-2 mt-0 " style={{zIndex:"999"}}>
        <Dropdown data-bs-theme="dark" className='m-2' style={{zIndex:"999"}}>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                Download
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" >
                <NavLink onClick={downloadTemplateExcel} className="text-link-white">Download xlsx</NavLink>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
               <Dropdown.Item as="button" onClick={downloadTemplateCSV}>
                Download CSV
                </Dropdown.Item>
                </Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
      
    </div>
  );
};

export default DownloadTemplateDropdown;
