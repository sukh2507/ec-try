import { Navigate, Outlet } from "react-router-dom";
import useUser from "@/context/User/UserHook";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const TeacherRoute = () => {
  const { user, logout } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.isVerified === 1) {
      toast({
        variant: "destructive",
        title: "🚫 Access Denied 🔒",
        description:
          "You will be allowed to use the app once the admin approves your account. ✅📲",
      });
      logout();
    }
  }, [user, toast, logout]);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== "teacher") {
    return <Navigate to="/student" />;
  }

  return <Outlet />;
};

export default TeacherRoute;
