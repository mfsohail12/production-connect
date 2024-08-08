import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import CreateProject from "../pages/CreateProject";
import Protected from "./Protected";
import { isAuthenticated } from "./Helpers";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<Home />}
            loader={async () => await isAuthenticated()}
          />
          <Route element={<Protected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-project" element={<CreateProject />} />
          </Route>
        </Route>
        <Route
          path="/login"
          element={<Login />}
          loader={async () => await isAuthenticated()}
        />
        <Route
          path="/sign-up"
          element={<SignUp />}
          loader={async () => await isAuthenticated()}
        />

        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
