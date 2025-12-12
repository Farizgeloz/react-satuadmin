
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import Navbar from "../Nav";
import Sidebar from "../Sidebar";


const Layout = ({ children,itemmenu }) => {
  
  const [username, setName] = useState("");
  const [usernick, setNick] = useState("");
  const [userrole, setRole] = useState("");
  const [userorganisasi, setOrganisasi] = useState("");
  const [userjabatan, setJabatan] = useState("");
  


   useEffect(() => {
    //getUser();
  }, []);
  
  /*const getUser = async () => {
    try {
      const response = await api_url_satuadmin.get(apiurl+`me`, { withCredentials: true });
      setName(response.data.name);
      setNick(response.data.nick);
      setRole(response.data.role);
      setOrganisasi(response.data.organisasi);
      setJabatan(response.data.jabatan);
      
      
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        
      }
    }
  };*/
  return (
    <React.Fragment>
     
      <div className="flex p-0 h-95v">
        <Sidebar
        username={username}
        usernick={usernick}
        userrole={userrole}
        userorganisasi={userorganisasi}
        userjabatan={userjabatan}
         itemmenu={itemmenu}
        />
        <div className="h-98v flex-1 p-0 overflow-auto">
           <Navbar
              username={username}
              usernick={usernick}
              userrole={userrole}
              userorganisasi={userorganisasi}
              userjabatan={userjabatan}
              itemmenu={itemmenu}
            />
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
