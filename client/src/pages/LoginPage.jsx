import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  // Handles changes on login input fields
  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8080/users/login", loginData)
      .then((res) => console.log(res.data))
      .catch((error) => setLoginError(error.response.data));
  }

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
        <form
          id="signUpForm"
          className="w-5/6 flex flex-col gap-5 mt-7"
          onSubmit={handleSubmit}
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
          <NavLink to="/sign-up" className="text-sky-500">
            Sign up
          </NavLink>
        </p>
        {loginError && (
          <div className="mt-4 w-1/2 bg-red-200 text-sm p-3 rounded-lg text-center border-red-600 border-2">
            {loginError}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
