import defaultAvatar from "../assets/default-avatar.jpg";
import { FaPlus } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-screen h-[70px] bg-violet-600 flex px-6 items-center shadow-[0_5px_12.7px_3px_rgba(0,0,0,0.25)] fixed top-0 z-10">
      <div id="profile" className="h-[50px] flex items-center cursor-pointer">
        <img
          src={defaultAvatar}
          className="w-[45px] h-[45px] rounded-md object-cover"
        />
        <p className="text-white text-sm font-bold ml-3">User Name</p>
        <IoMdArrowDropdown className="text-3xl text-white ml-2 self-center"></IoMdArrowDropdown>
      </div>
      <IoNotifications
        id="notification-bell"
        className="text-3xl text-white ml-6 cursor-pointer"
      />
      <button
        className="w-44 h-[40px] ml-auto rounded-lg bg-white flex justify-center items-center gap-5"
        onClick={() => navigate("create-project")}
      >
        <FaPlus className="text-violet-600 text-2xl" />
        <span className="text-violet-600 font-semibold">Post a Project</span>
      </button>
    </nav>
  );
};

export default DashboardNavbar;
