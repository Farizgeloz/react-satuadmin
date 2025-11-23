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
        sweetsuccess();
        navigate("/Dashboard");
      }
    } catch (error) {
      sweeterror(error.response.data.message || "Terjadi kesalahan.");
      
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    try {
      

      const response_image = await api_url_satuadmin.get('api/open-item/images_item', {
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
  };

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
      <div className=" grid grid-cols-1 md:grid-cols-6 h-100v justify-center bg-gray-200">
       
         <div className="col-span-3 h-100v p-5 my-auto  max-[670px]:hidden" style={{backgroundColor:"#0D47A1"}}>
          <Image data-aos="zoom-in-up" className=" margin-t10" src='./assetku/login.png' />
         </div>
        <div className="col-span-3 grid grid-cols-6 gap-1 w-full bg-white text-center  h-100v pt-5">
          <div className="col-span-6 sm:mx-auto sm:w-full sm:max-w-sm margin-t10">
            <img
              alt="Kabupaten Probolinggo"
              src={`./logo.png`}
              className="mx-auto h-25 w-auto"
            />
            <p className="col-span-6 mt-2 text-center textsize20 font-bold tracking-tight text-gray-900">
              MASUK SATU ADMIN 
            </p>
            <form onSubmit={loginUser} className="space-y-1  mx-2 col-span-4 col-start-2">
              <div className=" text-center">
                <label htmlFor="email" className="block textsize12 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="email"
                    className="input-gray  textsize14 py-2 px-3 rad15 w-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    placeholder="Email"
                    autoComplete="email"

                  />
                </div>
              </div>

              <div className="mt-3 text-center">
                  <label htmlFor="password" className="block textsize12 font-medium text-gray-900">
                    Password
                  </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="email"
                    autoComplete="current-password"
                    className="input-gray textsize14  py-2 px-3 rad15 w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-3 mt-5 textsize12 font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Masuk
                </button>
              
              </div>
            </form>
         
            <p className="mt-2 text-center text-sm/6 text-gray-500 col-span-6">
              {isLoading ? "Loading..." : "Silahkan Hubungi Admin Jika Belum Punya Akun"}
            </p>
          
            {isError && <p className="text-centered textsize12 text-red-400">{message}</p>}
         
        </div>
      </div>
    </div>  
    
  );
};

export default Login;
