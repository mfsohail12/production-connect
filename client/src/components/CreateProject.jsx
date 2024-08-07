import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const createProject = ({ setCreatingProject }) => {
  return (
    <div className="w-screen h-screen backdrop-blur-md absolute top-0 flex justify-center items-center">
      <div className="bg-sky-100 w-[900px] h-[700px] rounded-xl absolute">
        <IoIosCloseCircle
          className="relative top-4 ml-auto right-4 text-2xl"
          onClick={() => setCreatingProject(false)}
        />
        <form>
          <label htmlFor="email" className="w-full">
            Email Address
            <input
              id="email"
              type="text"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              name="email"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default createProject;
