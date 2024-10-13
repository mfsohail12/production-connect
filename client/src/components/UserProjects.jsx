import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";
import ProjectBtn from "./ProjectBtn";

const UserProjects = (props) => {
  const navigate = useNavigate();
  const { projects } = useContext(ProjectContext);

  return (
    <div className="sm:w-1/3 w-full sm:h-full h-1/2 shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg sm:h-[3.75rem] h-12 flex justify-center items-center sm:text-2xl text-xl font-bold text-white">
        My Projects
      </h1>
      <div className="sm:px-8 sm:py-4 px-5 py-3 sm:h-[90%] h-[85%] overflow-y-scroll">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectBtn
              title={project.title}
              active={props.active}
              setActive={props.setActive}
              key={project._id}
              id={project._id}
            />
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
