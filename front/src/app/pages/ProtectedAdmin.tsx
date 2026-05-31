import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminDashboard from "./AdminDashboard";

export default function ProtectedAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const estaAutenticado = sessionStorage.getItem("isAuthenticated");

    if (!estaAutenticado) {
      navigate("/login");
    }
  }, [navigate]);

  const estaAutenticado = sessionStorage.getItem("isAuthenticated");

  if (!estaAutenticado) {
    return null;
  }

  const realizarLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return <AdminDashboard onLogout={realizarLogout} />;
}