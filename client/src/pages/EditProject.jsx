import { useContext, useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { handleChange } from "../helpers/formHelper";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectContext } from "../context/projectContext";

const EditProject = () => {
  const navigate = useNavigate();

  // Finds current project data to populate in form
  const { projects, setProjectReload } = useContext(ProjectContext);
  const { projectId } = useParams();
  const project = projects.find((project) => project._id === projectId);
  const [projectData, setProjectData] = useState({
    title: project?.title,
    description: project?.description,
    desiredLength: project?.desiredLength,
    deadline: project?.deadline,
    phone: project?.phone,
  });

  useEffect(() => {
    setProjectData({
      title: project?.title,
      description: project?.description,
      desiredLength: project?.desiredLength,
      deadline: project?.deadline,
      phone: project?.phone,
    });
  }, [project]);

  const editProject = async (e) => {
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
      const { data } = await axios.put("/edit-project", {
        ...projectData,
        projectId: project._id,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Project Updated");
        setProjectReload((prev) => !prev);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (deadlineString) => {
    const date = new Date(deadlineString);
    return date.toISOString().split("T")[0];
  };

  if (project) formatDate(project.deadline);

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center text-3xl font-bold">
        Loading ...
      </div>
    );
  }

  return (
    <div className="pt-24">
      <form
        className=" w-[1000px] mx-auto flex flex-col gap-6"
        onSubmit={editProject}
      >
        <label className="text-3xl font-bold text-slate-600">
          Project Title
          <input
            type="text"
            className="mt-3 h-16 text-2xl border-2 border-violet-600 rounded-lg indent-3 p-1 text-slate-600 block w-full font-normal"
            name="title"
            value={projectData.title || ""}
            onChange={(event) => handleChange(event, setProjectData)}
          />
        </label>

        <label className="font-semibold text-slate-600 text-xl">
          Description
          <textarea
            type="text"
            className="mt-3 border-2 border-violet-600 rounded-lg p-5 h-[230px] block w-full font-normal text-[16px]"
            name="description"
            value={projectData.description || ""}
            onChange={(event) => handleChange(event, setProjectData)}
          />
        </label>

        <span className="flex justify-between w-full">
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
              value={formatDate(project.deadline)}
              onChange={(event) => handleChange(event, setProjectData)}
            />
          </label>
          <label className="font-semibold text-slate-600">
            Phone Number
            <input
              type="tel"
              className="border-2 border-violet-600 rounded-lg indent-3 p-1 block w-[250px] mt-3 font-normal h-[40px]"
              name="phone"
              value={projectData.phone || ""}
              onChange={(event) => handleChange(event, setProjectData)}
            />
          </label>
        </span>
        <span className="mt-5 flex w-full gap-7">
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
            Update Project
          </button>
        </span>
      </form>
    </div>
  );
};

export default EditProject;
