import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../pages_sub/dashboard/Dashboard_Total";
import DashboardGraph from "../pages_sub/dashboard/Dashboard_Graph";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <Layout>
      <DashboardGraph />
    </Layout>
  );
};

export default Dashboard;
