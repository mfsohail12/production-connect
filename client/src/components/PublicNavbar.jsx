import { NavLink, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const PublicNavbar = () => {
  // Hamburger menu styling
  const menuStyles = {
    bmBurgerButton: {
      position: "relative",
      right: "10px",
      width: "37px",
      height: "20px",
      marginLeft: "15px",
    },
    bmBurgerBars: {
      background: "#ffffff",
    },
    bmCrossButton: {
      width: "24px",
      height: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      top: "0",
      height: "100vh",
      width: "25vw",
    },
    bmMenu: {
      background: "#000000",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      margin: "15px 0",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <nav className="h-[70px] font-inter flex p-2 items-center w-screen bg-black bg-opacity-50 font-bold text-lg fixed top-0 z-10">
      <Link to="/" className="mr-auto ml-2">
        <h1 className="text-violet-600 text-2xl">Production Connect</h1>
      </Link>
      <NavLink
        to="/login"
        className="mr-5 px-2 rounded-lg text-white font-light text-md hover:text-violet-700 hover:border-violet-700"
      >
        Login
      </NavLink>
      <NavLink
        to="/sign-up"
        className="mr-5 px-2 py-1 bg-violet-600 rounded-lg text-white hover:bg-violet-700"
      >
        Sign up
      </NavLink>

      <Menu right styles={menuStyles}>
        <Link to="/about">
          <span className="hover:text-violet-600">About</span>
        </Link>
        <Link to="/contact">
          <span className="hover:text-violet-600">Contact</span>
        </Link>
        <Link to="/faq">
          <span className="hover:text-violet-600">FAQ</span>
        </Link>
        <Link to="/testimonials">
          <span className="hover:text-violet-600">Testimonials</span>
        </Link>
      </Menu>
    </nav>
  );
};

export default PublicNavbar;
