import { useContext } from "react";
import { UserContext } from "../context/userContext";

const UserProjects = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-1/3 h-full shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        My Projects
      </h1>
      <div className="p-8 h-[540px]">
        {user?.projects && user.projects.length > 0 ? (
          user.projects.map((project) => (
            <button
              key={project._id}
              className="w-full h-[50px] rounded-full flex indent-6 items-center text-slate-500 focus:bg-violet-200"
            >
              {project.title}
            </button>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-slate-500">You currently have no projects</p>
            <button className="border-2 bg-gradient-to-r from-violet-600 to-purple-400 p-2 rounded-lg text-white mt-5">
              Create one
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
