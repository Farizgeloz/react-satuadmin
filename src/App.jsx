

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Satuportal_List_Detail from "./components/pages/Halaman_Satuportal_List_Detail";
import Satuportal_List_Update from "./components/pages/Halaman_Satuportal_List_Update";
import Satuportal_Setting from "./components/pages/Halaman_Satuportal_Setting";

/* import Images from "./components/pages/Halaman_Images";
import Images_Update from "./components/pages/Halaman_Images_Update"; 
import Location_Maplist from "./components/pages/Halaman_Location_Maplist";
import Location_Maplist_Detail from "./components/pages/Halaman_Location_Maplist_Detail";
import Location_Maplist_Update from "./components/pages/Halaman_Location_Maplist_Update";*/


import Opendata_Dataset from "./components/pages/Halaman_Opendata_Dataset";
import Opendata_Dataset_Detail from "./components/pages/Halaman_Opendata_Dataset_Detail";
import Opendata_Dataset_Update from "./components/pages/Halaman_Opendata_Dataset_Update";
import Opendata_Iklan from "./components/pages/Halaman_Opendata_Iklan";
import Opendata_Iklan_Update from "./components/pages/Halaman_Opendata_Iklan_Update";
import Opendata_Setting from "./components/pages/Halaman_Opendata_Setting";

import Satupeta_Locations from "./components/pages/Halaman_Satupeta_Locations";
import Satupeta_Locations_Update from "./components/pages/Halaman_Satupeta_Locations_Update";
import Satupeta_Location_Maplist from "./components/pages/Halaman_Satupeta_Location_Maplist";
import Satupeta_Location_Maplist_Update from "./components/pages/Halaman_Satupeta_Location_Maplist_Update";
import Satupeta_Locationpoint from "./components/pages/Halaman_Satupeta_Locationpoint";
import Satupeta_Locationpoint_Update from "./components/pages/Halaman_Satupeta_Locationpoint_Update";
import Satupeta_Iklan from "./components/pages/Halaman_Satupeta_Iklan";
import Satupeta_Iklan_Update from "./components/pages/Halaman_Satupeta_Iklan_Update";
import Satupeta_Berita from "./components/pages/Halaman_Satupeta_Berita";
import Satupeta_Berita_Update from "./components/pages/Halaman_Satupeta_Berita_Update";
import Satupeta_Setting from "./components/pages/Halaman_Satupeta_Setting";

import Komponen from "./components/pages/Halaman_Komponen";
import Komponen_Detail from "./components/pages/Halaman_Komponen_Detail";
import Komponen_Update from "./components/pages/Halaman_Komponen_Update";

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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          

          
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <RequireRole allowedRoles={['User','Admin', 'Super Admin']}>
                  <Dashboard />
                </RequireRole>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Data-User"
            element={
              <ProtectedRoute>
                <RequireRole allowedRoles={['Super Admin']}>
                  <Users />
                </RequireRole>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Data-User/Update/:id"
            element={
              <ProtectedRoute>
                <RequireRole allowedRoles={['Super Admin']}>
                  <Users_Edit />
                </RequireRole>
              </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Motto" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_Motto />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Motto/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_Motto_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Iklan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_Iklan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satuportal/Iklan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
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
          <Route path="/Satuportal/List/Detail/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_List_Detail />
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

          <Route path="/Satuportal/Setting" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satuportal_Setting />
              </RequireRole>
            </ProtectedRoute>
            }
          />


          <Route path="/Opendata/Dataset" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Opendata_Dataset />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          <Route path="/Opendata/Dataset/Detail/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Opendata_Dataset_Detail />
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
          <Route path="Opendata/Iklan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Opendata_Iklan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Iklan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Opendata_Iklan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Opendata/Setting" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Opendata_Setting />
              </RequireRole>
            </ProtectedRoute>
            }
          />

          <Route path="/Satupeta/Locations" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Satupeta_Locations />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          
          <Route path="/Satupeta/Locations/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Satupeta_Locations_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />  
          <Route path="/Satupeta/Location_Maplist" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Satupeta_Location_Maplist />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          <Route path="/Satupeta/Location_Maplist/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Satupeta_Location_Maplist_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />  
          <Route path="/Satupeta/LocationPoint" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Satupeta_Locationpoint />
              </RequireRole>
            </ProtectedRoute>
          }
          />
          <Route path="/Satupeta/LocationPoint/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin','Super Admin']}>
                <Satupeta_Locationpoint_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Iklan" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satupeta_Iklan />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Iklan/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satupeta_Iklan_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Berita" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satupeta_Berita />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Berita/Update/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satupeta_Berita_Update />
              </RequireRole>
            </ProtectedRoute>
            }
          />
          <Route path="/Satupeta/Setting" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Satupeta_Setting />
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
          <Route path="/Komponen-Statik/Detail/:id" element={
            <ProtectedRoute>
              <RequireRole allowedRoles={['Admin', 'Super Admin']}>
                <Komponen_Detail />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
