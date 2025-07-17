import { redirect } from "react-router-dom";
import { getCookie } from "../helpers/cookieHelper";

export const isAuthenticated = async () => {
  const cookie = getCookie("token");
  const localCookie = localStorage.getItem("token");
  if (cookie && localCookie) throw redirect("/dashboard");
  return null;
};
