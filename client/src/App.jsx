import axios from "axios";
import { UserProvider } from "./context/userContext";
import AppRouter from "./routes/AppRouter";
import { ProjectsProvider } from "./context/projectContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <AppRouter />
      </ProjectsProvider>
    </UserProvider>
  );
}

export default App;
