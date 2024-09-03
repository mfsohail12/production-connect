import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useState, useEffect } from "react";
import { handleChange } from "../helpers/formHelper";
import axios from "axios";
import toast from "react-hot-toast";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });

  useEffect(() => {
    setProfileData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }, [user]);

  const cancelUpdate = () => {
    setProfileData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });

    toast.success("Your changes were cancelled");
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    const { firstName, lastName, email } = profileData;
    const { _id } = user;

    if (
      firstName === user.firstName &&
      lastName === user.lastName &&
      email === user.email
    ) {
      toast.success("No changes were made");
      return;
    }

    try {
      const { data } = await axios.put("/update-profile", {
        _id,
        firstName,
        lastName,
        email,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Your profile was updated!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    const { _id } = user;

    try {
      const { data } = await axios.delete("delete-account", {
        data: { _id },
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Your account was deleted successfully");

        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div>Loading ... </div>;
  }

  return (
    <div className="mt-[70px] flex flex-col justify-center items-center h-screen">
      <div className="w-[600px] bg-slate-100 rounded-3xl p-6">
        <h1 className="text-2xl font-bold text-violet-600 mb-5">
          Edit Profile
        </h1>
        <form className="flex flex-col gap-5 w-full" onSubmit={updateProfile}>
          <label htmlFor="firstName" className="text-slate-600">
            First Name
            <input
              id="firstName"
              type="text"
              className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
              name="firstName"
              value={profileData.firstName || ""}
              onChange={(event) => handleChange(event, setProfileData)}
            />
          </label>

          <label htmlFor="lastName" className="text-slate-600">
            Last Name
            <input
              id="lastName"
              type="text"
              className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
              name="lastName"
              value={profileData.lastName || ""}
              onChange={(event) => handleChange(event, setProfileData)}
            />
          </label>

          <label htmlFor="email" className="text-slate-600">
            Email Address
            <input
              id="email"
              type="email"
              className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
              name="email"
              value={profileData.email || ""}
              onChange={(event) => handleChange(event, setProfileData)}
            />
          </label>

          <span className="flex w-full justify-between items-center -mb-3">
            <label htmlFor="password" className="text-slate-600">
              Password
            </label>
            <Link
              className="text-sm text-violet-600 hover:text-violet-800 hover:underline hover:cursor-pointer"
              to="/change-password"
            >
              Change
            </Link>
          </span>
          <input
            id="password"
            type="password"
            className="border-2 block indent-1.5 p-[2px] w-full bg-violet-200"
            name="password"
            value={"*".repeat(12)}
            readOnly
          />

          <span className="flex justify-center items-center gap-4 mt-3">
            <button
              type="button"
              className="rounded-xl text-violet-600 font-semibold py-1"
              onClick={cancelUpdate}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-violet-600 hover:bg-violet-500 w-48 text-white font-semibold py-1"
            >
              Save changes
            </button>
          </span>
        </form>
      </div>
      <div className="w-[600px] bg-slate-100 rounded-3xl p-6 mt-8">
        <h1 className="text-2xl font-bold text-violet-600 mb-1">
          Delete Account
        </h1>
        <p className="mb-5 text-slate-500">
          Deleting your account will result in all your data being lost
        </p>
        <button
          type="button"
          className="rounded-xl bg-red-500 hover:bg-red-400 px-3 text-white font-semibold py-1"
          onClick={() =>
            confirm("Are you sure you want to delete your account?") &&
            deleteAccount()
          }
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
