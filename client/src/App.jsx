import axios from "axios";
import { UserProvider } from "./context/userContext";
import AppRouter from "./routes/AppRouter";

axios.defaults.baseURL = "https://production-connect.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
