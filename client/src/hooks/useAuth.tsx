import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  return { token };
};
