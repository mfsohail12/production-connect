import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const MainLayout = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? <DashboardNavbar /> : <PublicNavbar />}
      <Outlet />
    </>
  );
};

export default MainLayout;
