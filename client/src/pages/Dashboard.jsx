import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const DashboardPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <h1>Welcome {user.firstName}!</h1>}
    </div>
  );
};

export default DashboardPage;
