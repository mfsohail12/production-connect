import { JobContext } from "../context/jobContext";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const CurrentJob = () => {
  const { user } = useContext(UserContext);
  const { job, setJob } = useContext(JobContext);

  console.log(user);

  const findProject = async () => {
    try {
      const { data } = await axios.put("/find-job", { editorId: user.id });

      if (data.error) {
        toast.error(data.error);
      } else if (data.unsuccessful) {
        toast(data.unsuccessful);
      } else {
        setJob(data);
        toast.success("You have been connected with a job");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[150px] shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        Current Job
      </h1>
      <div className="px-8 py-4 flex justify-center items-center">
        {job ? (
          <button className="w-full h-[50px] p-4 rounded-full flex justify-between items-center text-slate-500 bg-violet-200">
            {job.title}
          </button>
        ) : (
          <button
            className="bg-sky-500 rounded-full py-2 px-4 font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-400 flex justify-between items-center gap-2 mt-2"
            onClick={findProject}
          >
            Find a Project
            <FaMagnifyingGlass />
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrentJob;
