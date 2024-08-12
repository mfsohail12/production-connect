import DatePicker from "react-datepicker";
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
  const { projects, setReload } = useContext(ProjectContext);
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
        setReload((prev) => !prev);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <input
              type="text"
              className="border-2 border-violet-600 rounded-lg indent-3 p-1 block w-[250px] mt-3 font-normal"
              name="desiredLength"
              value={projectData.desiredLength || ""}
              onChange={(event) => handleChange(event, setProjectData)}
            />
          </label>
          <label className="font-semibold text-slate-600">
            Deadline
            <span className="border-2 border-violet-600 block w-[225px] mt-3 rounded-lg">
              <DatePicker
                showIcon
                selected={projectData.deadline || new Date()}
                onChange={(date) => {
                  setProjectData((prevData) => ({
                    ...prevData,
                    deadline: date,
                  }));
                }}
                className="rounded-lg"
              />
            </span>
          </label>
          <label className="font-semibold text-slate-600">
            Phone Number
            <input
              type="tel"
              className="border-2 border-violet-600 rounded-lg indent-3 p-1 block w-[250px] mt-3 font-normal"
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
