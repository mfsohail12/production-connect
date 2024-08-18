import defaultAvatar from "../assets/default-avatar.jpg";
import { FaPlus } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

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
      <nav className="w-screen h-[70px] bg-violet-600 flex px-6 items-center shadow-[0_5px_12.7px_3px_rgba(0,0,0,0.25)] fixed top-0 z-10">
        <div
          id="profile"
          className="h-[50px] flex items-center cursor-pointer"
          onClick={() => setShowProfileDropdown((prev) => !prev)}
        >
          <img
            src={defaultAvatar}
            className="w-[45px] h-[45px] rounded-md object-cover"
          />
          <p className="text-white text-sm font-bold ml-3">
            {user.firstName} {user.lastName}
          </p>
          <IoMdArrowDropdown className="text-3xl text-white ml-2 self-center"></IoMdArrowDropdown>
        </div>
        <IoNotifications
          id="notification-bell"
          className="text-3xl text-white ml-6 cursor-pointer"
        />
        {user.accountType === "client" && (
          <button
            className="w-44 h-[40px] ml-auto rounded-lg bg-white flex justify-center items-center gap-5"
            onClick={() => navigate("create-project")}
          >
            <FaPlus className="text-violet-600 text-2xl" />
            <span className="text-violet-600 font-semibold">
              Post a Project
            </span>
          </button>
        )}
      </nav>
      {showProfileDropdown && (
        <div className=" bg-white w-44 fixed top-[70px] left-2 border-l-2 border-b-2 border-r-2 border-violet-200">
          <button className="text-slate-600 w-full h-8 hover:bg-violet-100 hover:text-violet-500">
            Edit Profile
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
