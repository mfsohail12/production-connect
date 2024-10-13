import defaultAvatar from "../assets/default-avatar.jpg";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { ImSpinner8 } from "react-icons/im";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const logoutUser = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="w-screen sm:h-[4.375rem] h-16 bg-violet-600 flex sm:px-6 px-3 items-center shadow-[0_5px_12.7px_3px_rgba(0,0,0,0.25)] fixed top-0 z-10">
        {user ? (
          <button
            id="profile"
            className="h-[3.125rem] flex items-center cursor-pointer"
            onClick={() => setShowProfileDropdown((prev) => !prev)}
          >
            <img
              src={defaultAvatar}
              className="sm:w-[2.813rem] sm:h-[2.813rem] w-8 h-8 rounded-sm object-cover"
            />
            <p className="text-white sm:text-sm text-xs font-bold sm:ml-3 ml-2">
              {user.firstName} {user.lastName}
            </p>
            <IoMdArrowDropdown className="text-3xl text-white sm:ml-2 ml-1 self-center"></IoMdArrowDropdown>
          </button>
        ) : (
          <div className="flex justify-center items-center">
            <ImSpinner8 className="animate-spin sm:h-8 sm:w-40 h-6 w-32 cursor-pointer text-white" />
          </div>
        )}
        {user && user.accountType === "client" && (
          <button
            className="sm:w-44 w-32 sm:h-10 h-8 ml-auto rounded-lg bg-white flex justify-center items-center sm:gap-5 gap-1"
            onClick={() => navigate("create-project")}
          >
            <FaPlus className="text-violet-600 sm:text-2xl text-sm" />
            <span className="text-violet-600 sm:text-base text-sm font-semibold">
              Post a Project
            </span>
          </button>
        )}
      </nav>
      {showProfileDropdown && (
        <div className=" bg-white w-44 fixed sm:top-[4.375rem] top-16 left-2 border-l-2 border-b-2 border-r-2 border-violet-200">
          <button
            className="text-slate-600 w-full h-8 hover:bg-violet-100 hover:text-violet-500"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className="text-slate-600 w-full h-8 hover:bg-violet-100 hover:text-violet-500"
            onClick={() => navigate("/account-settings")}
          >
            Account Settings
          </button>
          <button
            className="text-slate-600 w-full h-8 hover:bg-violet-100 hover:text-violet-500"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default DashboardNavbar;
