import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DashboardNavbar from "../components/DashboardNavbar";
import UserProjects from "../components/UserProjects";
import ProjectDetails from "../components/ProjectDetails";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // const createProject = async () => {
  //   // const fakeProject = {
  //   //   title: "Corporate Promo Video",
  //   //   description: "blahblahblah",
  //   //   desiredLength: "3 - 5 minutes",
  //   //   deadline: new Date("August 24, 2024"),
  //   //   phone: "555-555-5555",
  //   // };

  //   setCreatingProject(true);

  //   try {
  //     const { data } = await axios.post("/create-project", fakeProject);

  //     if (data.error) {
  //       toast.error(data.error);
  //     } else {
  //       toast.success("Project Created");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const logoutUser = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (!user) {
    return null;
  } else {
    return (
      <div className="w-screen h-screen pt-24">
        <div className="w-[95%] h-[95%] mx-auto flex items-center gap-10">
          <UserProjects />
          <ProjectDetails />

          {/* <button
          onClick={logoutUser}
          className="border-2 border-sky-500 p-1 w-24"
        >
          Logout
        </button> */}
        </div>
      </div>
    );
  }
};

export default Dashboard;
