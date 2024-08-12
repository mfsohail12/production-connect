import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext({});

export function JobProvider({ children }) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get("/job").then(({ data }) => {
      setJob(data);
    });
  }, []);

  return (
    <JobContext.Provider value={{ job, setJob }}>
      {children}
    </JobContext.Provider>
  );
}
