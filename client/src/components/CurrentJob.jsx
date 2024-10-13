import { FaMagnifyingGlass } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { JobContext } from "../context/jobContext";

const CurrentJob = () => {
  const { user, setUserReload } = useContext(UserContext);
  const { job } = useContext(JobContext);

  const activateEditor = async () => {
    try {
      const { data } = await axios.put("/activate-editor", {
        userId: user._id,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("You will be connected with a job soon ... ");
        setUserReload((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[9.375rem] shadow-[4px_4px_22.2px_2px_rgba(0,0,0,0.25)] rounded-xl">
      <h1 className="w-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-t-lg h-[60px] flex justify-center items-center text-2xl font-bold text-white">
        Current Job
      </h1>
      <div className="px-8 py-4 flex justify-center items-center">
        {user.working ? (
          <button className="w-full h-[50px] p-4 rounded-full flex justify-between items-center text-slate-500 bg-violet-200">
            {job?.title}
          </button>
        ) : (
          <button
            className="bg-sky-500 rounded-full py-2 px-4 font-semibold text-white bg-gradient-to-r from-sky-600 to-sky-400 flex justify-between items-center gap-2 mt-2"
            onClick={activateEditor}
          >
            {user.active ? (
              <>
                Finding a Project
                <ImSpinner8 className="animate-spin" />
              </>
            ) : (
              <>
                Find a Project
                <FaMagnifyingGlass />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrentJob;
