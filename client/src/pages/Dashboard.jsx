import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import UserProjects from "../components/UserProjects";
import ProjectDetails from "../components/ProjectDetails";
import { ProjectContext } from "../context/projectContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const projects = useContext(ProjectContext);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?._id);

  if (user === null) {
    return (
      <div className="flex justify-center items-center text-3xl font-bold">
        Loading ...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen pt-24">
      <div className="w-[95%] h-[95%] mx-auto flex items-center gap-10">
        <UserProjects
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
        <ProjectDetails selectedProjectId={selectedProjectId} />
      </div>
    </div>
  );
};

export default Dashboard;
