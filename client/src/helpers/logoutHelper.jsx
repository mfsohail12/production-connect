const logoutUser = (setUser) => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("token");
  setUser(null);
};

export { logoutUser };
