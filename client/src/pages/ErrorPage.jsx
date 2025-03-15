import React from "react";
import { useRouteError } from "react-router-dom";
import { logoutUser } from "../helpers/logoutHelper";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-7xl mb-7 text-violet-600">:(</h1>
      <h1 className="flex justify-center items-center text-violet-600">
        Oh No! Something went wrong
      </h1>
      <button
        className="text-white bg-violet-600 hover:bg-violet-700 rounded-md px-3 py-2 mt-2"
        onClick={() => {
          logoutUser(setUser);
          navigate("/login");
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
