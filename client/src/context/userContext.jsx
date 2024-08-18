import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userReload, setUserReload] = useState(false);

  useEffect(() => {
    axios.get("/profile").then(({ data }) => {
      setUser(data);
    });
  }, [userReload]);

  return (
    <UserContext.Provider value={{ user, setUser, setUserReload }}>
      {children}
    </UserContext.Provider>
  );
}
