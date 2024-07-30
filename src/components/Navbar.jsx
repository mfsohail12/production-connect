import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex p-2 items-center w-screen bg-black bg-opacity-50 font-bold text-lg fixed top-0 z-10">
      <img src={logo} alt="Production Connect logo" className="w-60 mr-auto" />
      <a href="" className="mr-5 px-2 py-1 bg-sky-500 rounded-lg text-black">
        Sign up
      </a>
      <a
        href=""
        className="mr-5 px-2 border-sky-500 border-4 rounded-lg text-sky-500"
      >
        Login
      </a>
    </nav>
  );
};

export default Navbar;
