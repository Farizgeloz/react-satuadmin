import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Swal from 'sweetalert2';
import { MdArticle, MdAccountCircle } from "react-icons/md";

const Nav = (props) => {
  const title = props.title;
  const navigate = useNavigate();

  // ✅ Cek status login
  useEffect(() => {
    const token = localStorage.getItem('role');
    if (!token) {
      navigate('/Login');
    }
  }, [navigate]);

  // ✅ Ambil user info dari localStorage
  const rolelogin = localStorage.getItem('role');
  const userlogin = JSON.parse(localStorage.getItem('user') || '{}');
  const usernicklogin = userlogin.nick || '';

  // ✅ Fungsi Logout dengan konfirmasi SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar dari aplikasi?',
      text: 'Kamu akan logout dari akun ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

        // Tampilkan pesan sukses lalu redirect
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Logout!',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        }).then(() => {
          navigate('/Login');
        });
      }
    });
  };

  return (
    <div className="col-span-6 gap-x-6 grid grid-cols-1 grid-cols-6 h-14 bg-linear-8 mb-1 shaddow2 bg-white-borderbotom">
      <p className="col-span-4 max-[640px]:col-span-6 tsize-130 font-semibold text-white flex pt-3 uppercaseku">
        <MdArticle className="mt-1 mx-2" />
        {title}
      </p>

      <Dropdown className="col-span-2 max-[650px]:hidden">
        <Dropdown.Toggle id="dropdown-basic" className="bg-transparan d-flex mt-2">
          {rolelogin} {usernicklogin}
          <MdAccountCircle className="-mt-1 mx-2 textsize16" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Nav;
