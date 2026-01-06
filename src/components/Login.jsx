import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { LoginUser, reset } from "./features/authSlice";
import Image from 'react-bootstrap/Image';
import Swal from 'sweetalert2';
import "../App.css";
import { api_url_satuadmin } from "../api/axiosConfig";

const portal = "Portal Satu Admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api_url_satuadmin.post('loginuser', {
        email,
        password
      });

      const { token, role, user } = response.data;
      const now = new Date();
      //const expiredAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 jam dari sekarang
      const expiredAt = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 jam dari sekarang

      // ✅ Simpan ke localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user', JSON.stringify(user)); // karena user adalah object
      localStorage.setItem('expiredAt', expiredAt.toISOString());

      if (response.data.role !== '') {
        sweetsuccess(response.data.role);
        navigate("/Dashboard");
      }
    }catch (error) {
      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Terjadi kesalahan koneksi ke server';

      sweeterror(message);
    }
  };

  /* useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      

      const response_image = await api_url_satuadmin.get('openitem/images_item', {
        params: {
          portal:portal
        }
      });
      const data_image = response_image.data.image_logo;
      setImage1(data_image.presignedUrl1);
      setImage2(data_image.presignedUrl3);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }; */

  function sweetsuccess(user){
    Swal.fire({
        title: "Sukses",
        html: "Selamat Datang "+user,
        timer: 2000,
        icon: "success",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          
        },
        willClose: () => {
              navigate(`/Dashboard`);
              //navigate(`/Data-Dataset`);
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
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">

      <div
        className="grid grid-cols-1 md:grid-cols-6 
                  w-full max-w-6xl h-full mx-auto
                  rounded-2xl overflow-hidden shadow-xl"
      >

        {/* KIRI */}
        <div
          className="col-span-3 hidden md:flex items-center justify-center"
          style={{ backgroundColor: "#0D47A1" }}
        >
          <Image
            data-aos="zoom-in-up"
            className="max-w-md"
            src="./assetku/login.png"
          />
        </div>

        {/* KANAN */}
        <div className="col-span-3 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm px-4 text-center">

            <img src="./logo.png" className="mx-auto h-20" />

            <p className="mt-2 textsize14 font-bold text-gray-900">
              MASUK SATU ADMIN
            </p>

            <form onSubmit={loginUser} className="space-y-3 mt-4">
              <div>
                <label className="block textsize10 font-medium text-gray-900">
                  Email address
                </label>
                <input
                  type="text"
                  className="input-gray w-full py-2 px-3 rad15"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="block textsize10 font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  className="input-gray w-full py-2 px-3 rad15"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-sky-600 py-2 mt-3 text-white textsize12 font-semibold hover:bg-sky-500"
              >
                Masuk
              </button>
            </form>

            <p className="mt-3 text-sm text-gray-500">
              {isLoading ? "Loading..." : "Silahkan Hubungi Admin Jika Belum Punya Akun"}
            </p>

            {isError && (
              <p className="textsize12 text-red-400 mt-1">{message}</p>
            )}
          </div>
        </div>

      </div>
    </div>



 
    
  );
};

export default Login;
