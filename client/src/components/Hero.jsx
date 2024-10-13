import { Link } from "react-router-dom";
import background from "../assets/pexels-pixabay-257904.jpg";

const Hero = () => {
  return (
    <div className="text-white relative">
      <img
        src={background}
        alt="Video editing software"
        className="absolute w-screen h-screen object-cover brightness-50 -z-10"
      />
      <div className="flex flex-col justify-center h-screen ml-8">
        <h1 className="sm:text-4xl text-xl font-bold sm:mb-5 mb-3">
          Connect with Top Editors Effortlessly
        </h1>
        <p className="sm:text-2xl text-sm sm:w-1/2 w-3/4 font-light sm:mb-10 mb-5">
          Streamline your video editing needs by effortlessly matching with top
          editors, saving time and ensuring the perfect fit for every project.
          Focus on your vision while we handle the connections.
        </p>
        <Link
          to="/sign-up"
          className="sm:text-2xl text-sm sm:w-40 w-24 text-center font-bold sm:p-3 p-2 rounded-lg bg-violet-600 hover:bg-violet-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
