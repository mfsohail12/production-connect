import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import UserProjects from "../components/UserProjects";
import ProjectDetails from "../components/ProjectDetails";
import CurrentJob from "../components/CurrentJob";
import ClientDetails from "../components/ClientDetails";
import { JobContext } from "../context/jobContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(null);
  const { job } = useContext(JobContext);

  if (user === null) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl font-bold z-50">
        Loading ...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen pt-24">
      {user.accountType === "client" ? (
        <div className="w-[95%] h-[95%] mx-auto flex items-center gap-10">
          <UserProjects active={active} setActive={setActive} />
          <ProjectDetails active={active} />
        </div>
      ) : (
        <div className="w-[95%] h-[95%] mx-auto flex items-center gap-10">
          <span className="w-1/3 flex flex-col gap-7 justify-center">
            <CurrentJob />
            {job && <ClientDetails />}
          </span>
          <ProjectDetails active={active} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
