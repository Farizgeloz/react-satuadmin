import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Swal from 'sweetalert2';
import { api_url_satuadmin } from "../../../api/axiosConfig";



const ColorPickerDialog = ({ isOpen, onClose, rowData, onSave }) => {
  const [rolelogin, setRolelogin] = useState(localStorage.getItem('role'));
  const [userlogin, setUserlogin] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const userloginsatker = userlogin.opd_id || '';
  const userloginadmin = userlogin.id || '';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState({
    id: null,
    bg_header: '',
    bg_body: '',
    bg_title: '',
    bg_content: '',
    color_title: '',
    color_date: '',
  });

  // Ambil warna dari rowData atau dari backend saat pertama kali dialog dibuka
  useEffect(() => {
    if (isOpen) {
      if (rowData && rowData.id) {
        // Jika ada data dari props (rowData), pakai itu
        setColors({
          id: rowData.id || null,
          bg_header: rowData.bg_header || '',
          bg_body: rowData.bg_body || '',
          bg_title: rowData.bg_title || '',
          bg_content: rowData.bg_content || '',
          color_title: rowData.color_title || '',
          color_date: rowData.color_date || '',
        });
      } else {
        // Kalau tidak, ambil dari backend
        getSatuportal_listSearch();
      }
    }
  }, [isOpen]); // hanya saat dialog dibuka

  const getSatuportal_listSearch = async () => {
    try {
      const response = await api_url_satuadmin.get('open-item/site_opendata_setting');
      const res = response.data;

      if (Array.isArray(res) && res.length > 0) {
        setColors({
          id: res[0].id || null,
          bg_header: res[0].bg_header || '',
          bg_body: res[0].bg_body || '',
          bg_title: res[0].bg_title || '',
          bg_content: res[0].bg_content || '',
          color_title: res[0].color_title || '',
          color_date: res[0].color_date || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleChange = (field, value) => {
    setColors(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('bg_header', colors.bg_header);
    formData.append('bg_body', colors.bg_body);
    formData.append('bg_title', colors.bg_title);
    formData.append('bg_content', colors.bg_content);
    formData.append('color_title', colors.color_title);
    formData.append('color_date', colors.color_date);
    formData.append("admin",userloginadmin);
    formData.append("jenis","Open Data Color");
    formData.append("komponen","Update Color Open Data");
    try {
      setLoading(true);
      // tampilkan loading swal
      Swal.fire({
        title: "Mohon Tunggu",
        html: "Sedang memproses update data...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      console.log(`colorku:` + colors.id);
      
      await api_url_satuadmin.patch(`open-item/site_opendata_setting_update/${colors.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      Swal.close(); // tutup loading swal
      sweetsuccess();
      onClose();
    } catch (error) {
      console.error('Gagal menyimpan warna:', error);
      sweeterror('Gagal menyimpan warna');
    }
  };

  if (!isOpen) return null;

  function sweetsuccess(){
    Swal.fire({
        title: "Sukses",
        html: "Data Berhasil Disimpan",
        timer: 2000,
        icon: "success",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          
        },
        willClose: () => {
              //navigate(`/Data-Satuportal_list/Detail/${id}`);
              navigate(0);
        }
      }).then((result) => {
      });
  }
  function sweeterror(error){
      Swal.fire({
          title: "Gagal",
          html: error,
          timer: 1500,
          icon: "error",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            
          },
          willClose: () => {
          }
        }).then((result) => {
        });
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-80 flex justify-center items-start z-50 overflow-y-auto"
      style={{ paddingTop: "4rem", paddingBottom: "4rem", backgroundColor: "rgb(0 0 0 / 80%)" }}
    >
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">Pilih Warna</h2>
        <Row className='p-1 mx-2'>
          {Object.keys(colors).map((key) => {
            if (key === 'id') return null;

            return (
              <Col md={6} sm={6} key={key} className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key.replace(/_/g, ' ')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-12 h-10 cursor-pointer border rounded"
                  />
                  <input
                    type="text"
                    value={colors[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="flex-1 h-10 px-2 input-green-2 tsize-110"
                    placeholder="#000000"
                  />
                </div>
              </Col>
            );
          })}
        </Row>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerDialog;
