import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { handleChange } from "../helpers/formHelper";
import logo from "../assets/logo.svg";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [clientActive, setClientActive] = useState(true);
  const [formData, setFormData] = useState({
    accountType: "client",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handles activating account type button
  const activateBtn = (event) => {
    if (event.target.id === "clientBtn" && !clientActive) {
      setClientActive(true);
      setFormData((prevData) => ({
        ...prevData,
        accountType: "client",
      }));
    } else if (event.target.id === "editorBtn" && clientActive) {
      setClientActive(false);
      setFormData((prevData) => ({
        ...prevData,
        accountType: "editor",
      }));
    }
  };

  // Set client/editor button class
  const clientBtnClass = clientActive
    ? "sm:h-7 h-6 sm:w-44 w-32 border-2 rounded-lg border-violet-600 bg-violet-600 text-white sm:text-base text-[0.65rem]"
    : "sm:h-7 h-6 sm:w-44 w-32 border-2 rounded-lg border-violet-600 sm:text-base text-[0.65rem]";

  const editorBtnClass = !clientActive
    ? "sm:h-7 h-6 sm:w-44 w-32 border-2 rounded-lg border-violet-600 bg-violet-600 text-white sm:text-base text-[0.65rem]"
    : "sm:h-7 h-6 sm:w-44 w-32 border-2 rounded-lg border-violet-600 sm:text-base text-[0.65rem]";

  // Checks if provided user data is appropriate
  const isValid = (userData) => {
    const { firstName, lastName, email, password, confirmPassword } = userData;

    // Verify full name is provided
    if (!firstName || !lastName) {
      toast.error("Please provide your full name");
      return false;
    }

    // Verify email is provided and is not previously used
    if (!email) {
      toast.error("Please provide an email address");
      return false;
    }

    // Verify password is appropriate and matches with confirmation password
    if (password.length < 6) {
      toast.error(
        "Please provide a password that is greater than 6 characters"
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  // Registers user when sign up button is clicked
  const registerUser = async (event) => {
    event.preventDefault();

    if (!isValid(formData)) {
      return;
    }

    const { accountType, firstName, lastName, email, password } = formData;

    try {
      const { data } = await axios.post("/signup", {
        accountType,
        firstName,
        lastName,
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Account created successfully. Please login");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        id="signUpBox"
        className="sm:w-[28.125rem] w-[20rem] sm:h-[34.375rem] h-[29rem] shadow-lg flex flex-col items-center"
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
        <div
          id="accountTypeSelector"
          className="w-5/6 flex justify-between my-7 text-violet-600"
        >
          <button
            id="clientBtn"
            className={clientBtnClass}
            onClick={(event) => activateBtn(event)}
          >
            I'm a Project Manager
          </button>
          <button
            id="editorBtn"
            className={editorBtnClass}
            onClick={(event) => activateBtn(event)}
          >
            I'm an Editor
          </button>
        </div>
        <form
          id="signUpForm"
          className="flex flex-col items-center sm:gap-5 gap-4 w-5/6"
          onSubmit={registerUser}
        >
          <span className="flex gap-3 w-full">
            <label htmlFor="firstName" className="sm:text-base text-sm">
              First Name
              <input
                id="firstName"
                type="text"
                className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
                onChange={(event) => handleChange(event, setFormData)}
                name="firstName"
                value={formData.firstName}
              />
            </label>

            <label htmlFor="lastName" className="sm:text-base text-sm">
              Last Name
              <input
                id="lastName"
                type="text"
                className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
                onChange={(event) => handleChange(event, setFormData)}
                name="lastName"
                value={formData.lastName}
              />
            </label>
          </span>

          <label htmlFor="email" className="w-full sm:text-base text-sm">
            Email Address
            <input
              id="email"
              type="email"
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              onChange={(event) => handleChange(event, setFormData)}
              name="email"
              value={formData.email}
            />
          </label>

          <span className="flex gap-3">
            <label htmlFor="password" className="sm:text-base text-sm">
              Password
              <input
                id="password"
                type="password"
                className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
                onChange={(event) => handleChange(event, setFormData)}
                name="password"
                value={formData.password}
              />
            </label>

            <label htmlFor="confirmPassword" className="sm:text-base text-sm">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(event) => handleChange(event, setFormData)}
              />
            </label>
          </span>
          <button
            type="submit"
            className="w-full sm:mt-5 mt-3 h-9 bg-violet-600 rounded-lg text-white font-bold"
          >
            Sign up
          </button>
        </form>
        <p className="sm:text-sm text-xs mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
