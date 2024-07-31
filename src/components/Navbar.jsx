import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="font-inter flex p-2 items-center w-screen bg-black font-bold text-lg fixed top-0 z-10">
      <NavLink to="/" className="mr-auto">
        <img src={logo} alt="Production Connect logo" className="w-60" />
      </NavLink>
      <NavLink
        to="/sign-up"
        className="mr-5 px-2 py-1 bg-sky-500 rounded-lg text-black"
      >
        Sign up
      </NavLink>
      <NavLink
        to="/login"
        className="mr-5 px-2 border-sky-500 border-4 rounded-lg text-sky-500"
      >
        Login
      </NavLink>
    </nav>
  );
};

export default Navbar;
