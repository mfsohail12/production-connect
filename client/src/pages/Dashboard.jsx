import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import UserProjects from "../components/UserProjects";
import ProjectDetails from "../components/ProjectDetails";
import CurrentJob from "../components/CurrentJob";
import ClientDetails from "../components/ClientDetails";
import { JobProvider } from "../context/jobContext";
import { ImSpinner8 } from "react-icons/im";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(null);

  if (user === null) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <ImSpinner8 className="animate-spin cursor-pointe text-5xl text-violet-600" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen pt-24">
      {user.accountType === "client" ? (
        <div className="sm:w-[95%] sm:h-[95%] w-[90%] h-[50rem] mx-auto flex sm:flex-row sm:items-center sm:gap-10 gap-7 flex-col sm:pb-0 pb-10">
          <UserProjects active={active} setActive={setActive} />
          <ProjectDetails active={active} />
        </div>
      ) : (
        <JobProvider>
          <div className="sm:w-[95%] sm:h-[95%] w-full h-[1000px] mx-auto flex sm:flex-row flex-col items-center sm:gap-10 gap-6 pb-10">
            <span className="sm:w-1/3 w-11/12 flex flex-col sm:gap-7 gap-6 justify-center">
              <CurrentJob />
              <ClientDetails />
            </span>
            <ProjectDetails />
          </div>
        </JobProvider>
      )}
    </div>
  );
};

export default Dashboard;
