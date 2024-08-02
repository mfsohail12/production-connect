import { NavLink } from "react-router-dom";
import background from "../assets/pexels-pixabay-257904.jpg";

const Hero = () => {
  return (
    <div className="text-white relative">
      <img
        src={background}
        alt="Video editing software"
        className="absolute w-screen h-screen object-cover brightness-50 -z-10"
      />
      <span className="flex items-center justify-center h-screen ml-8">
        <span>
          <h1 className="text-4xl font-bold mb-5">
            Connect with Top Editors Effortlessly
          </h1>
          <p className="text-2xl w-1/2 font-light mb-10">
            Streamline your video editing needs by effortlessly matching with
            top editors, saving time and ensuring the perfect fit for every
            project. Focus on your vision while we handle the connections.
          </p>
          <NavLink
            to="/sign-up"
            className="text-2xl font-bold p-3 rounded-lg bg-orange-500"
          >
            Get Started
          </NavLink>
        </span>
      </span>
    </div>
  );
};

export default Hero;
