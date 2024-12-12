import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import User from "../../types/User";
import { useNavigate } from "react-router-dom";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isVerified) {
      navigate(`/${user.role}`);
    } else if (user && user.isVerified === 0) {
      navigate("/verify");
    }
  }, [navigate, user]);

  const logout = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
    }
  };
  const addUser = (value: User) => {
    const str = JSON.stringify(value);
    localStorage.setItem("user", str);
    setUser(value);
  };
  return (
    <UserContext.Provider value={{ user, setUser: addUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
