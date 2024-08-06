import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "../context/userContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
