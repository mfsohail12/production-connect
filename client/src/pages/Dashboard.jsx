import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import DashboardNavbar from "../components/DashboardNavbar";
import CreateProject from "../components/CreateProject";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [creatingProject, setCreatingProject] = useState(false);

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

  const desc =
    "Looking for a video editor to create a high-impact 'Corporate Promo Video.' I need a polished and professional video that highlights our company’s key strengths, values, and services. The video should include sleek transitions, engaging visuals, and a clear narrative that resonates with our target audience. Ideally, it will feature a blend of company footage, testimonials, and dynamic graphics. Deliverables should be ready for both online and offline presentations";

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
      <div className="w-screen h-screen">
        <DashboardNavbar setCreatingProject={setCreatingProject} />
        <span className="w-[90%] h-[90%] mx-auto flex items-center gap-10">
          <div className="w-1/3 h-[600px] shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
            <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
              My Projects
            </h1>
            <div className="p-8 h-[540px]">
              {user?.projects && user.projects.length > 0 ? (
                user.projects.map((project) => (
                  <button className="w-full h-[50px] rounded-full flex indent-6 items-center text-slate-500">
                    {project.title}
                  </button>
                ))
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="text-slate-500">
                    You currently have no projects
                  </p>
                  <button
                    className="border-2 bg-gradient-to-r from-violet-600 to-purple-400 p-2 rounded-lg text-white mt-5"
                    onClick={() => setCreatingProject(true)}
                  >
                    Create one
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-2/3 h-[600px] shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl p-10">
            <h1 className="text-3xl font-semibold mb-7 text-slate-600">
              Corporate Promo Video
            </h1>
            <h2 className="text-lg text-violet-600 mb-1">Description</h2>
            <p className="text-[15px] mb-4">{desc}</p>
            <h2 className="text-lg text-violet-600 mb-1">Desired Length</h2>
            <p className="text-[15px] mb-4">3 - 5 minutes</p>
            <h2 className="text-lg text-violet-600 mb-1">Deadline</h2>
            <p className="text-[15px] mb-4">August 21, 2024</p>
            <h2 className="text-lg text-violet-600 mb-1">
              Contact Information
            </h2>
            <p className="text-[15px] mb-4">{user?.email}</p>
          </div>
        </span>
        {creatingProject && (
          <CreateProject setCreatingProject={setCreatingProject} />
        )}

        <button
          onClick={logoutUser}
          className="border-2 border-sky-500 p-1 w-24"
        >
          Logout
        </button>
      </div>
    );
  }
};

export default Dashboard;
