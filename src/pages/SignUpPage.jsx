import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const SignUpPage = () => {
  const [clientActive, setClientActive] = useState(true);
  const [editorActive, setEditorActive] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "client",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handles activating account type button depending on which account type button is clicked
  function activateBtn(event) {
    if (event.target.id === "clientBtn" && editorActive) {
      setClientActive(true);
      setEditorActive(false);
      setFormData((prevData) => ({
        ...prevData,
        accountType: "client",
      }));
    } else if (event.target.id === "editorBtn" && clientActive) {
      setEditorActive(true);
      setClientActive(false);
      setFormData((prevData) => ({
        ...prevData,
        accountType: "editor",
      }));
    }
  }

  // Sets client button class depending on if it is currently active
  // Note: DRY
  const clientBtnClass = clientActive
    ? "h-7 w-44 border-2 rounded-lg border-sky-500 bg-sky-500 text-white"
    : "h-7 w-44 border-2 rounded-lg border-sky-500";

  // Sets editor button class depending on if it is currently active
  // Note: DRY
  const editorBtnClass = editorActive
    ? "h-7 w-44 border-2 rounded-lg border-sky-500 bg-sky-500 text-white"
    : "h-7 w-44 border-2 rounded-lg border-sky-500";

  // Handles changes on form input fields
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handles form submission when sign up button is clicked
  function handleSubmit(event) {
    event.preventDefault();
    const confirmPass = document.getElementById("confirmPassword").value;

    if (formData.password === confirmPass) {
      return navigate("/login");
    } else {
      alert("Passwords do not match");
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div
        id="signUpBox"
        className="w-[450px] h-2/3 shadow-lg flex flex-col items-center"
      >
        <img src={logo} alt="Production Connect logo" className="w-60" />
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
          className="w-5/6 flex flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <span className="flex gap-3">
            <label htmlFor="firstName" className="">
              First Name
              <input
                id="firstName"
                type="text"
                required
                className="border-2 block"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
              />
            </label>

            <label htmlFor="lastName" className="">
              Last Name
              <input
                id="lastName"
                type="text"
                required
                className="border-2 block"
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
              className="border-2 block w-full"
              onChange={handleChange}
              name="email"
              value={formData.email}
            />
          </label>

          <span className="flex gap-3">
            <label htmlFor="password" className="">
              Password
              <input
                id="password"
                type="text"
                required
                className="border-2 block"
                onChange={handleChange}
                name="password"
                value={formData.password}
              />
            </label>

            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                id="confirmPassword"
                type="text"
                required
                className="border-2 block"
              />
            </label>
          </span>
          <button className="w-32 h-9 bg-sky-500 rounded-lg text-white font-bold">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
