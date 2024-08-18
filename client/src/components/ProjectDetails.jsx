import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { ProjectContext } from "../context/projectContext";
import axios from "axios";
import toast from "react-hot-toast";
import { JobContext } from "../context/jobContext";

const ProjectDetails = (props) => {
  const { user } = useContext(UserContext);
  const { projects, setProjectReload } = useContext(ProjectContext);
  const project = projects.find((project) => project._id === props.active);
  const { job } = useContext(JobContext);

  const assignEditor = async (projectId) => {
    try {
      const { data } = await axios.put("/assign-editor", { projectId });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("You have been connected with an editor");
        setProjectReload((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user.accountType === "client") {
    return (
      <div className="w-2/3 h-full shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl p-10 overflow-x-scroll">
        {project ? (
          <>
            <h1 className="text-3xl font-semibold mb-7 text-slate-600 break-words">
              {project.title}
            </h1>
            <h2 className="text-lg text-violet-600 mb-1">Description</h2>
            <p className="text-[15px] mb-4 break-words">
              {project.description}
            </p>
            {project.desiredLength && (
              <>
                <h2 className="text-lg text-violet-600 mb-1">Desired Length</h2>
                <p className="text-[15px] mb-4">{project.desiredLength}</p>
              </>
            )}
            <h2 className="text-lg text-violet-600 mb-1">Deadline</h2>
            <p className="text-[15px] mb-4">{project.deadline}</p>
            <h2 className="text-lg text-violet-600 mb-1">
              Contact Information
            </h2>
            <p className="text-[15px]">{user?.email}</p>
            {project.phone && (
              <p className="text-[15px] mt-1">{project.phone}</p>
            )}
            {project.videoEditor ? (
              <div className="border-2 bg-green-500 py-2 px-4 rounded-full text-white font-bold absolute bottom-12 right-12">
                You are connected with user: {project.videoEditor}
              </div>
            ) : (
              <button
                className="border-2 bg-gradient-to-r from-sky-600 to-sky-400 py-2 px-4 rounded-full text-white font-bold absolute bottom-12 right-12"
                onClick={() => assignEditor(project._id)}
              >
                Connect with an Editor
              </button>
            )}
          </>
        ) : (
          <h1 className="w-full h-full flex justify-center items-center text-2xl text-slate-500">
            No Project Selected
          </h1>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-2/3 h-full shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl p-10 overflow-x-scroll">
        {job ? (
          <>
            <h1 className="text-3xl font-semibold mb-7 text-slate-600 break-words">
              {job?.title}
            </h1>
            <h2 className="text-lg text-violet-600 mb-1">Description</h2>
            <p className="text-[15px] mb-4 break-words">{job?.description}</p>
            {job?.desiredLength && (
              <>
                <h2 className="text-lg text-violet-600 mb-1">Desired Length</h2>
                <p className="text-[15px] mb-4">{job?.desiredLength}</p>
              </>
            )}
            <h2 className="text-lg text-violet-600 mb-1">Deadline</h2>
            <p className="text-[15px] mb-4">{job?.deadline}</p>
            <button className="border-2 bg-gradient-to-r from-red-600 to-red-400 py-2 px-4 rounded-full text-white font-bold absolute bottom-12 right-12">
              Quit Job
            </button>
          </>
        ) : (
          <h1 className="flex justify-center items-center w-full h-full text-lg font-semibold text-slate-500">
            You are not currently connected to a project
          </h1>
        )}
      </div>
    );
  }
};

export default ProjectDetails;
