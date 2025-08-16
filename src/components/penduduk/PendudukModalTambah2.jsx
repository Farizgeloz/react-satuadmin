import React, { useRef, useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Modal.css";
import "../../App.css";

import { 
  IoAddCircleOutline,
  IoLogoGoogle,
  IoPerson,
  IoAccessibility,
  IoKey 
} from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';



const apiurl=process.env.REACT_APP_URL;


function ModalPendudukTambah() {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [tgl_lahir, setTgl_Lahir] = useState("2000-01-01");
  const [tempat_lahir, setTempat_Lahir] = useState("");
  const [jk, setJK] = useState("L");
  const [status_kawin, setStatusKawin] = useState("Belum Kawin");
  const [agama, setAgama] = useState("Islam");
  const [pendidikan, setPedidikan] = useState("SD");
  const [kepala_keluarga, setKepalaKeluarga] = useState("Anggota");
  const [list_kabupatenku, setListKabupatenku] = useState([]);
  const [list_kecamatanku, setListKecamatanku] = useState([]);
  const [list_desaku, setListDesaku] = useState([]);
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [desa, setDesa] = useState("");

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isFocusKabupaten, setIsFocusKabupaten] = useState(false);
	const [isHoveredKabupaten, setIsHoveredKabupaten] = useState(false);
	const inputRefKabupaten = useRef();

  const [isFocusKecamatan, setIsFocusKecamatan] = useState(false);
	const [isHoveredKecamatan, setIsHoveredKecamatan] = useState(false);
	const inputRefKecamatan = useRef();

  const [isFocusDesa, setIsFocusDesa] = useState(false);
	const [isHoveredDesa, setIsHoveredDesa] = useState(false);
	const inputRefDesa = useRef();

  useEffect(() => {
    getKabupaten();
    getKecamatan();
    getdesa();
  }, []);
 
  const getKabupaten = async () => {
    const response = await axios.get(
      apiurl+`get_kabupaten`
    );
    setListKabupatenku(response.data.result);
  };

 

  const getKecamatan = async () => {
    const response = await axios.get(
      apiurl+`get_kecamatan`
    );
    setListKecamatanku(response.data.result);
  };

 

  const getdesa = async () => {
    const response = await axios.get(
      apiurl+`get_desa`
    );
    setListDesaku(response.data.result);
  };

  


  const savePenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/backend_penduduk", {
        name: name,
        nik: nik,
        tgl_lahir: tgl_lahir,
        tempat_lahir: tempat_lahir,
        kabupaten: kabupaten,
        kecamatan: kecamatan,
        desa: desa,
        jk: jk,
        status_kawin: status_kawin,
        agama: agama,
        pendidikan: pendidikan,
        kepala_keluarga: kepala_keluarga
      });
      
      //navigate("/");
      setShow(false);
      sweetsuccess();
      
    } catch (error) {
      console.log(error);
      sweeterror();
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
            navigate(0);
        }
      }).then((result) => {
      });
  }
  function sweeterror(){
      Swal.fire({
          title: "Gagal",
          html: "Data Gagal Disimpan",
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
  }

  const [default_tgl_lahir, setDefault_Tgl_Lahir] = React.useState("2000-01-01");

  function handleChange(event) {
    event.preventDefault();
    setDefault_Tgl_Lahir(event.target.value);
  }


  return (

    <>
         
        <a
            onClick={handleShow}
            className="col-span-2 text-link-sky text-center tsize-110 mt-1">
            <div className=" rounded-full py-2 px-2 h-10 mr-2 text-center  flex bg-white">
              <IoAddCircleOutline className="tsize-120 text-sky-600"  />
              <span className="tsize-90">Tambah Data Baru</span>
            </div>
            
        </a>

        <Modal dialogClassName="my-modal4"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false} >
          <form onSubmit={savePenduduk}>
            <Modal.Header closeButton className="border-b ">
                <h4 className="text-sky-600 flex"><IoAddCircleOutline  className="tsize-90 text-sky-600 mt-1"  />Tambah Data Penduduk</h4>
                  
            </Modal.Header>
            <Modal.Body className="mt-2">
              <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-10">
                <div className="md:col-span-3 col-span-10 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoPerson className="mt-2 mx-2 text-cyan-500"  /> Nama Lengkap
                    </label>
                    <div className="mt-2">
                        <input
                        placeholder="Nama Lengkap"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        autoComplete="nama"
                        className="input-gray tsize-90"
                        />
                    </div>
                </div>
                <div className="md:col-span-3 col-span-10 -mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoPerson className="mt-2 mx-2 text-cyan-500"  />NIK
                    </label>
                    <div className="mt-2">
                        <input
                        placeholder="NIK"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        type="number"
                        autoComplete="nik"
                        className="input-gray tsize-90"
                        />
                    </div>
                </div>
                

                <div className="md:col-span-2 col-span-5 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Tanggal Lahir
                    </label>
                    <div className="mt-2">
                        <input
                        placeholder="0000-00-00"
                        value={tgl_lahir}
                        onChange={(e) => setTgl_Lahir(e.target.value)}
                        type="date"
                        autoComplete="tgl_lahir"
                        className="input-gray tsize-90"
                        />
                    </div>
                </div>
                <div className="md:col-span-2 col-span-5 -mt-2">
                    <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Tempat Lahir
                    </label>
                    <div className="mt-2">
                        <input
                        placeholder="Tempat Lahir"
                        value={tempat_lahir}
                        onChange={(e) => setTempat_Lahir(e.target.value)}
                        type="text"
                        autoComplete="tempat_lahir"
                        className="input-gray tsize-90"
                        />
                    </div>
                </div>
                <div className="md:col-span-10 col-span-10 -mt-2 -mb-5 text-center border-b-2">
                  <p className="text-gray-400 tsize-80">Wilayah</p>
                </div>
                <div className="md:col-span-3 col-span-10 -mt-2">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Kabupaten
                  </label>
                  <div className="mt-2">
                      
                      <input
                        className="input-gray tsize-90"
                        placeholder="kabupaten"
                        onFocus={() => setIsFocusKabupaten(true)}
                        onBlur={() => {
                          if (!isHoveredKabupaten) {
                            setIsFocusKabupaten(false);
                          }
                        }}
                        value={kabupaten}
                        onChange={(e) => setKabupaten(e.target.value)}
                        ref={inputRefKabupaten}
                      />
                      {isFocusKabupaten && (
                        <div
                          className="bg-white border-2 border-gray-200 rounded text-gray-600 absolute w-3/6 max-height1"
                          onMouseEnter={() => {
                            setIsHoveredKabupaten(true);
                          }}
                          onMouseLeave={() => {
                            setIsHoveredKabupaten(false);
                          }}
                        >
                          {list_kabupatenku.map((suggestion, index) => {
                            const isMatchKabupaten =
                              suggestion.kabupaten.toLowerCase().indexOf(kabupaten.toLowerCase()) >
                              -1;
                            return (
                              <div key={index} className="">
                                {isMatchKabupaten && (
                                  <div
                                    className="p-2 hover:bg-sky-600 hover:text-white cursor-pointer rounded"
                                    onClick={() => {
                                      setKabupaten(suggestion.kabupaten);
                                      inputRefKabupaten.current.focus();
                                    }}
                                  >
                                    {suggestion.kabupaten}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                </div>
                <div className="md:col-span-3 col-span-10 -mt-2">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Kecamatan
                  </label>
                  <div className="mt-2">
                      
                      <input
                        className="input-gray tsize-90"
                        placeholder="Kecamatan"
                        onFocus={() => setIsFocusKecamatan(true)}
                        onBlur={() => {
                          if (!isHoveredKecamatan) {
                            setIsFocusKecamatan(false);
                          }
                        }}
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                        ref={inputRefKecamatan}
                      />
                      {isFocusKecamatan && (
                        <div
                          className="bg-white border-2 border-gray-200 rounded text-gray-600 absolute w-3/6 max-height1"
                          onMouseEnter={() => {
                            setIsHoveredKecamatan(true);
                          }}
                          onMouseLeave={() => {
                            setIsHoveredKecamatan(false);
                          }}
                        >
                          {list_kecamatanku.map((suggestion, index) => {
                            const isMatchKecamatan =
                              suggestion.kecamatan.toLowerCase().indexOf(kecamatan.toLowerCase()) >
                              -1;
                            return (
                              <div key={index} className="">
                                {isMatchKecamatan && (
                                  <div
                                    className="p-2 hover:bg-sky-600 hover:text-white cursor-pointer rounded"
                                    onClick={() => {
                                      setKecamatan(suggestion.kecamatan);
                                      inputRefKecamatan.current.focus();
                                    }}
                                  >
                                    {suggestion.kecamatan}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                </div>
                <div className="md:col-span-4 col-span-10 -mt-2">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoLogoGoogle className="mt-2 mx-2 text-cyan-500"  />Desa
                  </label>
                  <div className="mt-2">
                      
                      <input
                        className="input-gray tsize-90"
                        placeholder="Desa"
                        onFocus={() => setIsFocusDesa(true)}
                        onBlur={() => {
                          if (!isHoveredDesa) {
                            setIsFocusDesa(false);
                          }
                        }}
                        value={desa}
                        onChange={(e) => setDesa(e.target.value)}
                        ref={inputRefDesa}
                      />
                      {isFocusDesa && (
                        <div
                          className="bg-white border-2 border-gray-200 rounded text-gray-600 absolute w-3/6 max-height1"
                          onMouseEnter={() => {
                            setIsHoveredDesa(true);
                          }}
                          onMouseLeave={() => {
                            setIsHoveredDesa(false);
                          }}
                        >
                          {list_desaku.map((suggestion, index) => {
                            const isMatchDesa =
                              suggestion.desa.toLowerCase().indexOf(desa.toLowerCase()) >
                              -1;
                            return (
                              <div key={index} className="">
                                {isMatchDesa && (
                                  <div
                                    className="p-2 hover:bg-sky-600 hover:text-white cursor-pointer rounded"
                                    onClick={() => {
                                      setDesa(suggestion.desa);
                                      inputRefDesa.current.focus();
                                    }}
                                  >
                                    {suggestion.desa}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                </div>
                <div className="md:col-span-2 col-span-5 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Jenis Kelamin
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                          value={jk}
                          onChange={(e) => setJK(e.target.value)}
                          autoComplete="role"
                          className="input-gray tsize-90"
                          >
                          <option value="L">L</option>
                          <option value="P">P</option>
                        </select>
                    
                    </div>
                </div>
                <div className="md:col-span-2 col-span-5 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Status Kawin
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                          onChange={(e) => setStatusKawin(e.target.value)}
                          autoComplete="role"
                          className="input-gray tsize-90"
                          >
                          <option value="Belum Kawin">Belum Kawin</option>
                          <option value="Kawin">Kawin</option>
                          <option value="Cerai Hidup">Cerai Hidup</option>
                          <option value="Cerai Mati">Cerai Mati</option>
                        </select>
                    
                    </div>
                </div>
                <div className="md:col-span-2 col-span-5 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Agama
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                          value={agama}
                          onChange={(e) => setAgama(e.target.value)}
                          autoComplete="role"
                          className="input-gray tsize-90"
                          >
                          <option value="Islam">Islam</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katholik">Katholik</option>
                          <option value="Konghucu">Konghucu</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                    
                    </div>
                </div>
                <div className="md:col-span-2 col-span-5 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Pendidikan
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                          value={pendidikan}
                          onChange={(e) => setPedidikan(e.target.value)}
                          autoComplete="role"
                          className="input-gray tsize-90"
                          >
                          <option value="SD">SD</option>
                          <option value="SMP">SMP</option>
                          <option value="SMA">SMA</option>
                          <option value="Strata-1">Strata-1</option>
                          <option value="Strata-2">Strata-2</option>
                          <option value="Strata-3">Strata-3</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                    
                    </div>
                </div>
                <div className="md:col-span-2 col-span-10 -mt-2">
                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-400 flex">
                    <IoAccessibility className="mt-2 mx-2 text-cyan-500"  />Kepala Keluarga
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                          value={kepala_keluarga}
                          onChange={(e) => setKepalaKeluarga(e.target.value)}
                          autoComplete="role"
                          className="input-gray tsize-90"
                          >
                          <option value="Anggota">Anggota</option>
                          <option value="Kepala">Kepala</option>
                        </select>
                    
                    </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button"
                  className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                  onClick={handleClose}>
                  Close
              </button>
              <button
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                  type="submit">
                  Simpan
              </button>
            </Modal.Footer>
          </form>
        </Modal>

    </>

    
  );
}

export default ModalPendudukTambah;