import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";
import ProjectBtn from "./ProjectBtn";

const UserProjects = (props) => {
  const navigate = useNavigate();
  const projects = useContext(ProjectContext);

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
