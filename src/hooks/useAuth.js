import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) {
      navigate("/");
    }
  }, [authToken, navigate]);
  return authToken;
};

export default useAuth;
