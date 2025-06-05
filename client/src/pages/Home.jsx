import Hero from "../components/Hero";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Hero />
      <footer className="bg-black h-10 flex justify-center items-center relative px-4">
        <Link to="https://github.com/mfsohail12/production-connect">
          <FaGithub className="text-violet-600 text-xl" />
        </Link>
        <p className="text-white text-xs ml-auto">© 2025</p>
      </footer>
    </>
  );
};

export default HomePage;
