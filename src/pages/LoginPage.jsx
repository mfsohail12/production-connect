import { NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        id="loginBox"
        className="w-[375px] h-[425px] shadow-lg flex flex-col items-center"
      >
        <NavLink to="/">
          <h1 className="text-sky-500 text-2xl font-bold mt-9">
            Production Connect
          </h1>
        </NavLink>
        <form id="signUpForm" className="w-5/6 flex flex-col gap-5 mt-7">
          <label htmlFor="email" className="w-full">
            Email Address
            <input
              id="email"
              type="text"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
            />
          </label>
          <label htmlFor="password" className="w-full">
            Password
            <input
              id="password"
              type="password"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
            />
          </label>

          <button className="w-full mt-2 h-9 bg-sky-500 rounded-lg text-white font-bold">
            Login
          </button>
        </form>
        <p className="text-sm mt-5">
          Don't have an account yet?{" "}
          <NavLink to="/sign-up" className="text-sky-500">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
