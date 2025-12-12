import React, { useEffect } from "react";
import Layout from "./Layout";
import '../styles/style_font.css';
import '../styles/style_bg.css';
import '../styles/style_button.css';
import '../styles/style_design.css';

import Main_User from "../pages_sub/satupeta_locations/LocationsMain";
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
  }, [isError, user, navigate]);*/
  return (
    <Layout key ="locationpoint" itemmenu="Satupeta Lokasi">
      <Main_User />
    </Layout>
  );
};

export default Users;
