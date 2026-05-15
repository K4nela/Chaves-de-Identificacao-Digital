import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminDashboard from "./AdminDashboard";

export default function ProtectedAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return <AdminDashboard onLogout={handleLogout} />;
}