import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
    logout();
    navigate("/");
  }, [logout, navigate]);
  return null;
};
export default Logout;
