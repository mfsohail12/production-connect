import { useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { handleChange } from "../helpers/formHelper";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";
import { UserContext } from "../context/userContext";

const CreateProject = () => {
  const { user } = useContext(UserContext);
  const { setProjectReload } = useContext(ProjectContext);
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    desiredLength: "Shorter than 1 minute",
    deadline: new Date().toISOString().split("T")[0],
    phone: "",
  });

  const postProject = async (e) => {
    e.preventDefault();

    // Checks for appropriate project data
    if (!projectData.title) {
      toast.error("Please provide a project title");
      return;
    }

    if (!projectData.description) {
      toast.error("Please provide a description for your project");
      return;
    }

    try {
      const { data } = await axios.post("/create-project", projectData);

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Project Created");
        setProjectReload((prev) => !prev);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-24">
      <form
        className="sm:w-[62.5rem] w-screen px-6 sm:pb-0 pb-6 mx-auto flex flex-col gap-6"
        onSubmit={postProject}
      >
        <label className="text-3xl font-bold text-slate-600">
          Project Title
          <input
            type="text"
            className="mt-3 h-16 text-2xl border-2 border-violet-600 rounded-lg indent-3 p-1 text-slate-600 block w-full font-normal"
            name="title"
            value={projectData.title}
            onChange={(event) => handleChange(event, setProjectData)}
          />
        </label>

        <label className="font-semibold text-slate-600 text-xl">
          Description
          <textarea
            type="text"
            className="mt-3 border-2 border-violet-600 rounded-lg p-5 h-[230px] block w-full font-normal text-[16px]"
            name="description"
            value={projectData.description}
            onChange={(event) => handleChange(event, setProjectData)}
          />
        </label>

        <span className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between w-full">
          <label className="font-semibold text-slate-600">
            Desired Length
            <select
              name="desiredLength"
              value={projectData.desiredLength}
              className="border-2 border-violet-600 rounded-lg indent-3 p-1 block w-[250px] mt-3 font-normal h-[40px]"
              onChange={(event) => handleChange(event, setProjectData)}
            >
              <option value="Shorter than 1 minute">
                Shorter than 1 minute
              </option>
              <option value="1 - 5 minutes">1 - 5 minutes</option>
              <option value="5 - 10 minutes">5 - 10 minutes</option>
              <option value="10 - 30 minutes">10 - 30 minutes</option>
              <option value="30 - 60 minutes">30 - 60 minutes</option>
              <option value="Longer than 1 hour">Longer than 1 hour</option>
            </select>
          </label>
          <label className="font-semibold text-slate-600">
            Deadline
            <input
              type="date"
              className="border-2 border-violet-600 rounded-lg py-1 px-2 block mt-3 font-normal h-[40px]"
              name="deadline"
              value={projectData.deadline}
              onChange={(event) => handleChange(event, setProjectData)}
            />
          </label>
          <label className="font-semibold text-slate-600">
            Phone Number
            <input
              type="tel"
              className="border-2 border-violet-600 rounded-lg indent-3 p-1 block w-[250px] mt-3 font-normal h-[40px]"
              name="phone"
              value={projectData.phone}
              onChange={(event) => handleChange(event, setProjectData)}
            />
          </label>
        </span>
        <span className="sm:mt-5 mt-2 flex w-full sm:gap-7 gap-3">
          <button
            className="border-2 w-1/3 shrink bg-gradient-to-r from-red-600 to-red-400 p-2 rounded-full text-white font-bold"
            onClick={() => navigate("/dashboard")}
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border-2 w-2/3 bg-gradient-to-r from-violet-600 to-purple-400 p-2 rounded-full text-white font-bold"
          >
            Create Project
          </button>
        </span>
      </form>
    </div>
  );
};

export default CreateProject;
