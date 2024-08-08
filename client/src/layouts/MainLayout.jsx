import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const MainLayout = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? <DashboardNavbar /> : <Navbar />}
      <Outlet />
    </>
  );
};

export default MainLayout;
