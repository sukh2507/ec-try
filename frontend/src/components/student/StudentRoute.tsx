import { Navigate, Outlet } from "react-router-dom";
import useUser from "@/context/User/UserHook";

const StudentRoute = () => {
  const { user  } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "student") {
    return <Navigate to="/teacher" />;
  }

  return <Outlet />;
};

export default StudentRoute;
