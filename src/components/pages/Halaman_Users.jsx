import React, { useEffect } from "react";
import Layout from "./Layout";
import Main_User from "../pages_sub/user/UserMain";
import '../styles/style_font.css';
import '../styles/style_bg.css';
import '../styles/style_button.css';
import '../styles/style_design.css';

const Users = () => {

  /*useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);*/

  /*useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "Super Admin") {
      navigate("/Dashboard");
    }
  }, [isError, user, navigate]);*/
  return (
    <Layout>
      <Main_User />
    </Layout>
  );
};

export default Users;
