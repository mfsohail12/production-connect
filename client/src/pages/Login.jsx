import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handles changes on login input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();

    const { email, password } = loginData;

    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        toast.success(
          `Logged in successfully. Welcome ${data.user.firstName}!`
        );
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
        className="w-[375px] h-[425px] shadow-lg flex flex-col items-center"
      >
        <Link to="/">
          <h1 className="text-sky-500 text-2xl font-bold mt-9">
            Production Connect
          </h1>
        </Link>
        <form
          id="signUpForm"
          className="w-5/6 flex flex-col gap-5 mt-7"
          onSubmit={loginUser}
        >
          <label htmlFor="email" className="w-full">
            Email Address
            <input
              id="email"
              type="text"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password" className="w-full">
            Password
            <input
              id="password"
              type="password"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </label>

          <button className="w-full mt-2 h-9 bg-sky-500 rounded-lg text-white font-bold">
            Login
          </button>
        </form>
        <p className="text-sm mt-5">
          Don't have an account yet?{" "}
          <Link to="/sign-up" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
