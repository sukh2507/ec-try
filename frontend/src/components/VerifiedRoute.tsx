import useUser from "@/context/User/UserHook";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const VerifiedRoute: React.FC = () => {
  const { user } = useUser();

  return user.isVerified >= 1 ? <Outlet /> : <Navigate to="/verify" />;
};

export default VerifiedRoute;
