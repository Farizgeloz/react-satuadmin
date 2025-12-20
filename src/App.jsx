import { HashRouter, Routes, Route,BrowserRouter } from "react-router-dom";
import Dashboard from "./components/pages/Halaman_Dashboard";
import Login from "./components/Login";
import Users from "./components/pages/Halaman_Users";
import Users_Edit from "./components/pages/Halaman_Users_Update";
import Satuportal_Motto from "./components/pages/Halaman_Satuportal_Motto";
import Satuportal_Motto_Update from "./components/pages/Halaman_Satuportal_Motto_Update";
import Satuportal_Iklan from "./components/pages/Halaman_Satuportal_Iklan";
import Satuportal_Iklan_Update from "./components/pages/Halaman_Satuportal_Iklan_Update";
import Satuportal_Visitor from "./components/pages/Halaman_Satuportal_Visitor";
import Satuportal_List from "./components/pages/Halaman_Satuportal_List";
import Satuportal_List_Update from "./components/pages/Halaman_Satuportal_List_Update";
import Satuportal_Color from "./components/pages/Halaman_Satuportal_Color";

/* import Images from "./components/pages/Halaman_Images";
import Images_Update from "./components/pages/Halaman_Images_Update"; 
import Location_Maplist from "./components/pages/Halaman_Location_Maplist";
import Location_Maplist_Detail from "./components/pages/Halaman_Location_Maplist_Detail";
import Location_Maplist_Update from "./components/pages/Halaman_Location_Maplist_Update";*/


import Opendata_Dataset from "./components/pages/Halaman_Opendata_Dataset";
import Opendata_Dataset_Update from "./components/pages/Halaman_Opendata_Dataset_Update";
import Opendata_Dataset_Permohonan from "./components/pages/Halaman_Opendata_Dataset_Permohonan";
import Opendata_Dataset_Permohonan_Update from "./components/pages/Halaman_Opendata_Dataset_Permohonan_Update";
import Opendata_Iklan from "./components/pages/Halaman_Opendata_Iklan";
import Opendata_Iklan_Update from "./components/pages/Halaman_Opendata_Iklan_Update";
import Opendata_Berita from "./components/pages/Halaman_Opendata_Berita";
import Opendata_Berita_Update from "./components/pages/Halaman_Opendata_Berita_Update";
import Opendata_Infografik from "./components/pages/Halaman_Opendata_Infografik";
import Opendata_Infografik_Update from "./components/pages/Halaman_Opendata_Infografik_Update";
import Opendata_Bantuan from "./components/pages/Halaman_Opendata_Bantuan";
import Opendata_Bantuan_Update from "./components/pages/Halaman_Opendata_Bantuan_Update";
import Opendata_Color from "./components/pages/Halaman_Opendata_Color";
import Opendata_Feedback from "./components/pages/Halaman_Opendata_Feedback";

import Satupeta_Locations from "./components/pages/Halaman_Satupeta_Locations";
import Satupeta_Locations_Update from "./components/pages/Halaman_Satupeta_Locations_Update";
import Satupeta_Location_Maplist from "./components/pages/Halaman_Satupeta_Location_Maplist";
import Satupeta_Location_Maplist_Update from "./components/pages/Halaman_Satupeta_Location_Maplist_Update";
import Satupeta_Locationpoint from "./components/pages/Halaman_Satupeta_Locationpoint";
import Satupeta_Locationpoint_Update from "./components/pages/Halaman_Satupeta_Locationpoint_Update";
import Satupeta_Location_Geospasial from "./components/pages/Halaman_Satupeta_Location_Geospasial";
import Satupeta_Location_Geospasial_Update from "./components/pages/Halaman_Satupeta_Location_Geospasial_Update";
import Satupeta_Iklan from "./components/pages/Halaman_Satupeta_Iklan";
import Satupeta_Iklan_Update from "./components/pages/Halaman_Satupeta_Iklan_Update";
import Satupeta_Berita from "./components/pages/Halaman_Satupeta_Berita";
import Satupeta_Berita_Update from "./components/pages/Halaman_Satupeta_Berita_Update";
import Satupeta_Bantuan from "./components/pages/Halaman_Satupeta_Bantuan";
import Satupeta_Bantuan_Update from "./components/pages/Halaman_Satupeta_Bantuan_Update";
import Satupeta_Color from "./components/pages/Halaman_Satupeta_Color";
import Satupeta_Feedback from "./components/pages/Halaman_Satupeta_Feedback";

import Komponen from "./components/pages/Halaman_Komponen";
import Komponen_Update from "./components/pages/Halaman_Komponen_Update";
import Aplikasi_Terhubung from "./components/pages/Halaman_Aplikasi_Terhubung";
import Aplikasi_Terhubung_Update from "./components/pages/Halaman_Aplikasi_Terhubung_Update";
import Log from "./components/pages/Halaman_Log";
import RuleInformasi from "./components/pages/Halaman_Rule_Informasi";

/*import Satkercode from "./components/pages/Halaman_Satkercode";
import Satkercode_Detail from "./components/pages/Halaman_Satkercode_Detail";
import Satkercode_Update from "./components/pages/Halaman_Satkercode_Update";
import Bio from "./components/pages/Halaman_Bio";
import Bio_Update from "./components/pages/Halaman_Bio_Update";
import Bio_Detail from "./components/pages/Halaman_Bio_Detail";
import Kategori from "./components/pages/Halaman_Kategori";
import Produsen from "./components/pages/Halaman_Produsen";
import Produsen_Edit from "./components/pages/Halaman_Produsen_Update";*/



/* import Penduduk from "./components/pages/Halaman_Penduduk";
import Penduduk_Kecamatan from "./components/pages/Halaman_Penduduk_Kecamatan"; */

//import RequireAdmin from './components/features/RequireAdmin';
import RequireRole from './components/features/RequireRole';
import ProtectedRoute from './components/features/ProtectedRoute';
import { useEffect } from "react";



function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      const expiredAt = localStorage.getItem('expiredAt');
      if (expiredAt && new Date() > new Date(expiredAt)) {
        localStorage.clear();
        window.location.href = "/Login";
      }
    }, 5000); // cek tiap 5 detik

    return () => clearInterval(interval);
  }, []);

  const Router =
    process.env.NODE_ENV === "development" ? BrowserRouter : HashRouter;
  return (
    <div>
      <Router>
        <Routes>
          

          
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <RequireRole allowedRoles={['Operator','Operator Opd','Verifikator Opd','Admin', 'Super Admin']}>
                  <Dashboard />
                </RequireRole>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Data-User"
            element={
              <ProtectedRoute>
                <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                  <Users />
                </RequireRole>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Data-User/Update/:id"
            element={
              <ProtectedRoute>
                <RequireRole allowedRoles={['Admin','Super Admin']}>
                  <Users_Edit />
                </RequireRole>
              </ProtectedRoute>
            }
          />
          {/* <Route path="/Satuportal/Motto" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satuportal_Motto />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Motto/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satuportal_Motto_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Iklan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satuportal_Iklan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Iklan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satuportal_Iklan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="Satuportal/Visitor" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_Visitor />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Satuportal/List" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_List />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          
          <Route path="/Satuportal/List/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_List_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Satuportal/Color" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_Color />
              </RequireRole>
            </ProtectedRoute>
            }
          /> */}


          <Route path="/Opendata/Dataset" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Opendata_Dataset />
              </RequireRole>
            </ProtectedRoute>
          }
          />
         
          <Route path="/Opendata/Dataset/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Opendata_Dataset_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Dataset/Permohonan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin','Super Admin']}>
                <Opendata_Dataset_Permohonan />
              </RequireRole>
            </ProtectedRoute>
          }
          />
         
          <Route path="/Opendata/Dataset/Permohonan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin','Super Admin']}>
                <Opendata_Dataset_Permohonan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="Opendata/Iklan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Iklan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Iklan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Iklan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Artikel" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Berita />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Artikel/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Berita_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Infografik" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Infografik />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Infografik/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Infografik_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Bantuan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Bantuan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Bantuan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Opendata_Bantuan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Color" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Opendata_Color />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Feedback" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Opendata_Feedback />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Satupeta/Lokasi-Peta" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Verifikator Opd','Admin','Super Admin']}>
                <Satupeta_Locations />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          
          <Route path="/Satupeta/Lokasi-Peta/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Verifikator Opd','Admin','Super Admin']}>
                <Satupeta_Locations_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />  
          <Route path="/Satupeta/Koleksi-Peta" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Verifikator Opd','Admin','Super Admin']}>
                <Satupeta_Location_Maplist />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          <Route path="/Satupeta/Koleksi-Peta/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Verifikator Opd','Admin','Super Admin']}>
                <Satupeta_Location_Maplist_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />  
          <Route path="/Satupeta/Titik-Lokasi-Peta" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Admin','Super Admin']}>
                <Satupeta_Locationpoint />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          <Route path="/Satupeta/Titik-Lokasi-Peta/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Admin','Super Admin']}>
                <Satupeta_Locationpoint_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Geospasial" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Admin','Super Admin']}>
                <Satupeta_Location_Geospasial />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          <Route path="/Satupeta/Geospasial/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Admin','Super Admin']}>
                <Satupeta_Location_Geospasial_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Iklan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Iklan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Iklan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Iklan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Artikel" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Berita />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Artikel/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Berita_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Bantuan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Bantuan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Bantuan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Bantuan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Color" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satupeta_Color />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Feedback" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Admin', 'Super Admin']}>
                <Satupeta_Feedback />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Komponen-Statik" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Komponen />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          
          <Route path="/Komponen-Statik/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Komponen_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Aplikasi-Terhubung" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Aplikasi_Terhubung />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Aplikasi-Terhubung/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Aplikasi_Terhubung_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
           <Route path="/Rule-Informasi" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Operator','Operator Opd','Verifikator Opd','Admin','Super Admin']}>
                <RuleInformasi />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Log" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Log />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          


          


          {/*<Route path="/Data-Location_Maplist" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Location_Maplist />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Data-Location_Maplist/Detail/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Location_Maplist_Detail />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Data-Location_Maplist/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Location_Maplist_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />


          
           <Route path="/Data-Satkercode" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satkercode />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Data-Satkercode/Detail/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satkercode_Detail />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Data-Satkercode/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satkercode_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Data-Bio" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Bio />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Data-Bio/Detail/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Bio_Detail />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Data-Bio/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Bio_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          
          <Route path="/Data-Kategori" element={<Kategori />} />
          <Route path="/Data-Kategori/Update/:id" element={<Produsen_Edit />} />
          <Route path="/Data-Produsen" element={<Produsen />} />
          <Route path="/Data-Produsen/Update/:id" element={<Produsen_Edit />} />

          <Route path="/Data-Penduduk" element={<Penduduk />} />
          <Route path="/Data-Penduduk-Kecamatan" element={<Penduduk_Kecamatan />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
