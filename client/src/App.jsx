import axios from "axios";
import { UserProvider } from "./context/userContext";
import AppRouter from "./routes/AppRouter";
import { Analytics } from "@vercel/analytics/react";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserProvider>
        <AppRouter />
      </UserProvider>
      <Analytics />
    </>
  );
}

export default App;
