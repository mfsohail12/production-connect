import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [clientActive, setClientActive] = useState(true);
  const [formData, setFormData] = useState({
    accountType: "client",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  // Handles activating account type button depending on which account type button is clicked
  function activateBtn(event) {
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
  }

  // Sets client/editor button class depending on if it is currently active
  const clientBtnClass = clientActive
    ? "h-7 w-44 border-2 rounded-lg border-sky-500 bg-sky-500 text-white"
    : "h-7 w-44 border-2 rounded-lg border-sky-500";

  const editorBtnClass = !clientActive
    ? "h-7 w-44 border-2 rounded-lg border-sky-500 bg-sky-500 text-white"
    : "h-7 w-44 border-2 rounded-lg border-sky-500";

  // Handles changes on form input fields
  function handleChange(event) {
    const { name, value } = event.target;

    name === "confirmPassword"
      ? setConfirmPass(value)
      : setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
  }

  const createAccount = (accountData) => {
    axios
      .post("http://localhost:8080/users", accountData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  // Handles form submission when sign up button is clicked
  function handleSubmit(event) {
    event.preventDefault();

    if (formData.password === confirmPass) {
      createAccount(formData);
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        id="signUpBox"
        className="w-[450px] h-[550px] shadow-lg flex flex-col items-center"
      >
        <NavLink to="/">
          <h1 className="text-sky-500 text-2xl font-bold mt-9">
            Production Connect
          </h1>
        </NavLink>
        <div
          id="accountTypeSelector"
          className="w-5/6 flex justify-between my-7 text-sky-500"
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
          className="flex flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <span className="flex gap-3">
            <label htmlFor="firstName">
              First Name
              <input
                id="firstName"
                type="text"
                required
                className="border-2 block indent-1.5 p-[2px] mt-1"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
              />
            </label>

            <label htmlFor="lastName">
              Last Name
              <input
                id="lastName"
                type="text"
                required
                className="border-2 block indent-1.5 p-[2px] mt-1"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
              />
            </label>
          </span>

          <label htmlFor="email" className="self-start w-full">
            Email Address
            <input
              id="email"
              type="email"
              required
              className="border-2 block w-full indent-1.5 p-[2px] mt-1"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </label>

          <span className="flex gap-3">
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                required
                className="border-2 block indent-1.5 p-[2px] mt-1"
                onChange={handleChange}
                name="password"
                value={formData.password}
              />
            </label>

            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                required
                className="border-2 block indent-1.5 p-[2px] mt-1"
                name="confirmPassword"
                value={confirmPass}
                onChange={handleChange}
              />
            </label>
          </span>
          <button className="w-full mt-5 h-9 bg-sky-500 rounded-lg text-white font-bold">
            Sign up
          </button>
        </form>
        <p className="text-sm mt-5">
          Already have an account?{" "}
          <NavLink to="/login" className="text-sky-500">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
