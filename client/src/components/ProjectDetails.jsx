import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { ProjectContext } from "../context/projectContext";

const ProjectDetails = ({ selectedProjectId }) => {
  const { user } = useContext(UserContext);
  const projects = useContext(ProjectContext);

  const project = projects.find((project) => project._id === selectedProjectId);

  return (
    <div className="w-2/3 h-full shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl p-10 overflow-x-scroll">
      {project ? (
        <>
          <h1 className="text-3xl font-semibold mb-7 text-slate-600">
            {project.title}
          </h1>
          <h2 className="text-lg text-violet-600 mb-1">Description</h2>
          <p className="text-[15px] mb-4 break-words">{project.description}</p>
          {project.desiredLength && (
            <>
              <h2 className="text-lg text-violet-600 mb-1">Desired Length</h2>
              <p className="text-[15px] mb-4">{project.desiredLength}</p>
            </>
          )}
          <h2 className="text-lg text-violet-600 mb-1">Deadline</h2>
          <p className="text-[15px] mb-4">{project.deadline}</p>
          <h2 className="text-lg text-violet-600 mb-1">Contact Information</h2>
          <p className="text-[15px]">{user?.email}</p>
          {project.phone && <p className="text-[15px] mt-1">{project.phone}</p>}
          <button className="border-2 bg-gradient-to-r from-sky-600 to-sky-400 py-2 px-4 rounded-full text-white font-bold absolute bottom-12 right-12">
            Connect with an Editor
          </button>
        </>
      ) : (
        <h1 className="w-full h-full flex justify-center items-center text-2xl text-slate-500">
          No Project Selected
        </h1>
      )}
    </div>
  );
};

export default ProjectDetails;
