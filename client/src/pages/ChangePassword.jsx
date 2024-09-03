import { useContext, useState } from "react";
import { handleChange } from "../helpers/formHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const updatePassword = async (event) => {
    event.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = passwordData;
    const { _id } = user;

    if (newPassword.length < 6) {
      toast.error(
        "Please provide a password that is greater than 6 characters"
      );
      return;
    } else if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { data } = await axios.put("/update-password", {
        _id,
        currentPassword,
        newPassword,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Password changed successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[600px] bg-slate-100 rounded-3xl p-6">
        <h1 className="text-2xl font-bold text-violet-600 mb-5">
          Change Password
        </h1>
        <form className="flex flex-col gap-5 w-full" onSubmit={updatePassword}>
          <label htmlFor="currentPassword" className="text-slate-600">
            Current Password
            <input
              id="currentPassword"
              type="password"
              className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
              name="currentPassword"
              onChange={(event) => handleChange(event, setPasswordData)}
              value={passwordData.currentPassword}
            />
          </label>

          <label htmlFor="newPassword" className="text-slate-600">
            New Password
            <input
              id="newPassword"
              type="password"
              className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
              name="newPassword"
              onChange={(event) => handleChange(event, setPasswordData)}
              value={passwordData.newPassword}
            />
          </label>

          <label htmlFor="confirmNewPassword" className="text-slate-600">
            Confirm New Password
            <input
              id="confirmNewPassword"
              type="password"
              className="border-2 block indent-1.5 p-[2px] mt-1 w-full"
              name="confirmNewPassword"
              onChange={(event) => handleChange(event, setPasswordData)}
              value={passwordData.confirmNewPassword}
            />
          </label>

          <span className="flex justify-center items-center gap-4 mt-3">
            <button
              type="button"
              className="rounded-xl bg-red-500 hover:bg-red-400 w-32 text-white font-semibold py-1"
              onClick={() => navigate("/account-settings")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-violet-600 hover:bg-violet-500 w-48 text-white font-semibold py-1"
            >
              Change password
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
