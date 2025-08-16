import React, { useEffect } from "react";
import Layout from "./Layout";
import Main from "../pages_sub/kategori/KategoriMain";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Users = () => {
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
    if (user && user.role !== "Super Admin") {
      navigate("/Dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <Main />
    </Layout>
  );
};

export default Users;
