import { NavLink, Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const Navbar = () => {
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
      background: "#0BA5E9",
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
        <h1 className="text-sky-500 text-2xl">Production Connect</h1>
      </Link>
      <NavLink
        to="/sign-up"
        className="mr-5 px-2 py-1 bg-sky-500 rounded-lg text-black hover:bg-sky-600"
      >
        Sign up
      </NavLink>
      <NavLink
        to="/login"
        className="mr-5 px-2 border-sky-500 border-4 rounded-lg text-sky-500 hover:text-sky-600 hover:border-sky-600"
      >
        Login
      </NavLink>
      <Menu right styles={menuStyles}>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/testimonials">Testimonials</Link>
      </Menu>
    </nav>
  );
};

export default Navbar;
