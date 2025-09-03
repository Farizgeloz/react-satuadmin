import React, { useEffect } from "react";
import Layout from "./Layout";
import Main_Penduduk from "../Main_Penduduk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Penduduk = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    /*if (user && user.role !== "Super Admin") {
      navigate("/Dashboard");
    }*/
  }, [isError, user, navigate]);
  return (
    <Layout>
      <Main_Penduduk />
    </Layout>
  );
};

export default Penduduk;
