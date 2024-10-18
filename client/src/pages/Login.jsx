import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { handleChange } from "../helpers/formHelper";
import logo from "../assets/logo.svg";
import { ImSpinner8 } from "react-icons/im";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);
  const [loggingIn, setLoggingIn] = useState(false);

  const loginUser = async (event) => {
    event.preventDefault();
    setLoggingIn(true);

    const { email, password } = loginData;

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoggingIn(false);
      } else {
        localStorage.setItem("token", data.token);
        toast.success(
          `Logged in successfully. Welcome ${data.user.firstName}!`
        );
        setLoggingIn(false);
        setUser(data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        id="loginBox"
        className="sm:w-96 w-72 sm:h-[24rem] h-[22rem] shadow-lg flex flex-col items-center bg-white"
      >
        <Link to="/">
          {/* <h1 className="text-violet-600 text-2xl font-bold mt-9">
            Production Connect
          </h1> */}
          <img
            src={logo}
            alt="production connect logo"
            className="sm:w-64 w-48 mt-9"
          />
        </Link>
        <form
          id="signUpForm"
          className="w-5/6 flex flex-col sm:gap-5 gap-4 mt-7"
          onSubmit={loginUser}
        >
          <label htmlFor="email" className="sm:text-base text-sm">
            Email Address
            <input
              id="email"
              type="text"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              name="email"
              value={loginData.email}
              onChange={(event) => handleChange(event, setLoginData)}
            />
          </label>
          <label htmlFor="password" className="sm:text-base text-sm">
            Password
            <input
              id="password"
              type="password"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              name="password"
              value={loginData.password}
              onChange={(event) => handleChange(event, setLoginData)}
            />
          </label>

          <button
            type="submit"
            className="w-full mt-2 sm:h-9 h-7 bg-violet-600 rounded-lg text-white font-bold"
          >
            {loggingIn ? (
              <ImSpinner8 className="animate-spin text-md font-bold text-white mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="sm:text-sm text-xs sm:mt-6 mt-7">
          Don't have an account yet?{" "}
          <Link to="/sign-up" className="text-violet-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
