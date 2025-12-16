// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(sessionStorage.getItem("user")); // atau localStorage sesuai implementasi
  //console.log("🔍 Cek user dari sessionStorage:", user); // 👈 Log user
  if (!user) {
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(user.role)) {
     return <Navigate to="/Dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
