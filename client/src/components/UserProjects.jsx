import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ProjectBtn from "./ProjectBtn";

const UserProjects = (props) => {
  const navigate = useNavigate();
  const projects = useContext(ProjectContext);
  const [active, setActive] = useState(projects[0]?._id);

  return (
    <div className="w-1/3 h-full shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        My Projects
      </h1>
      <div className="px-8 py-4 h-[548px] overflow-y-scroll">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectBtn
              title={project.title}
              active={active}
              setActive={setActive}
              key={project._id}
              id={project._id}
              selectedProjectId={props.selectedProjectId}
              setSelectedProjectId={props.setSelectedProjectId}
            />

            // <button // passing activeIndex/setActiveIndex as prop
            //   key={project._id}
            //   className="w-full h-[50px] p-4 rounded-full flex justify-between items-center text-slate-500 focus:bg-violet-200"
            //   onClick={() => setSelectedProjectId(project._id)}
            // >
            //   {project.title.length < 35
            //     ? project.title
            //     : `${project.title.slice(0, 36)}...`}
            //   <span className="flex gap-4">
            //     <MdEdit className="opacity-30 hover:opacity-100 text-xl" />
            //     <FaTrash className="opacity-30 hover:opacity-100 text-xl" />
            //   </span>
            // </button>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-slate-500">You currently have no projects</p>
            <button
              className="border-2 bg-gradient-to-r from-violet-600 to-purple-400 p-2 rounded-lg text-white mt-5"
              onClick={() => {
                navigate("/create-project");
              }}
            >
              Create one
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
