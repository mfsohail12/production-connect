import axios from "axios";
import { createContext, useState, useLayoutEffect } from "react";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
