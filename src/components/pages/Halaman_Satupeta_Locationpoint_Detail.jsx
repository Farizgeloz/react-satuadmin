import React, { useEffect } from "react";
import Layout from "./Layout";
import '../styles/style_font.css';
import '../styles/style_bg.css';
import '../styles/style_button.css';
import '../styles/style_design.css';

import Main_Detail from "../pages_sub/satupeta_locationpoint/Locationpoint_Detail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  /*useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "Super Admin") {
      navigate("/Dashboard");
    }
  }, [isError, user, navigate]);*/
  return (
    <Layout itemmenu="Satupeta Titik" >
      <Main_Detail />
    </Layout>
  );
};

export default Users;
