import defaultAvatar from "../assets/default-avatar.jpg";
import { FaPlus } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const DashboardNavbar = () => {
  return (
    <nav className="w-screen h-20 bg-violet-600 flex px-6 items-center shadow-[0_5px_12.7px_3px_rgba(0,0,0,0.25)]">
      <div id="profile" className="h-[50px] flex">
        <img src={defaultAvatar} className="w-[50px] object-cover" />
        <span className="text-white text-sm font-bold ml-2">User Name</span>
        <IoMdArrowDropdown className="text-3xl text-white ml-4 self-center"></IoMdArrowDropdown>
      </div>
      <IoNotifications
        id="notification-bell"
        className="text-3xl text-white ml-6"
      />
      <div className="w-48 h-[50px] ml-6 rounded-lg bg-white flex justify-center items-center gap-5">
        <FaPlus className="text-violet-600 text-2xl" />
        <span className="text-violet-600 font-semibold">Post a Project</span>
      </div>
      <h1 className="text-white text-2xl font-bold ml-auto">
        Production Connect
      </h1>
    </nav>
  );
};

export default DashboardNavbar;
