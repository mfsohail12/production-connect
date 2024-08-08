import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import UserProjects from "../components/UserProjects";
import ProjectDetails from "../components/ProjectDetails";
import { ProjectContext } from "../context/projectContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const projects = useContext(ProjectContext);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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
          <UserProjects
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
          />
          <ProjectDetails selectedProjectId={selectedProjectId} />
        </div>
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
