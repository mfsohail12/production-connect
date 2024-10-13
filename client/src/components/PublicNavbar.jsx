import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const PublicNavbar = () => {
  return (
    <nav className="sm:h-16 h-14 font-inter flex p-2 items-center w-screen bg-black bg-opacity-50 fixed top-0 z-10">
      <Link to="/" className="mr-auto ml-2">
        {/* <h1 className="text-violet-600 text-2xl">Production Connect</h1> */}
        <img
          src={logo}
          alt="production connect logo"
          className="sm:w-64 w-36"
        />
      </Link>
      <NavLink
        to="/login"
        className="mr-5 px-2 rounded-lg text-white font-light sm:text-lg text-sm hover:text-violet-700 hover:border-violet-700"
      >
        Login
      </NavLink>
      <NavLink
        to="/sign-up"
        className="mr-5 px-2 py-1 bg-violet-600 rounded-lg sm:text-lg font-bold text-sm text-white hover:bg-violet-700"
      >
        Sign up
      </NavLink>
    </nav>
  );
};

export default PublicNavbar;
