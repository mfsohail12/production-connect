import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logoutUser = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <h1>Welcome {user.firstName}!</h1>}
      <button onClick={logoutUser} className="border-2 border-sky-500 p-1 w-24">
        Logout
      </button>
    </div>
  );
};

export default ClientDashboard;
